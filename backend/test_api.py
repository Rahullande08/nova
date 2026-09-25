import sys
import os
import io

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def run_tests():
    print("--- Running Practice Layer Comprehensive Test Suite ---")

    # 1. Health Check
    r = client.get("/api/v1/system/health")
    assert r.status_code == 200, f"Health check failed: {r.text}"
    assert r.json()["status"] == "healthy"
    print("[PASS] 1. Health check passed")

    # 2. Auth Login & Token Verification
    r = client.post("/api/v1/auth/login", json={"role": "teacher", "user_id": "teacher-1"})
    assert r.status_code == 200, f"Auth login failed: {r.text}"
    token = r.json()["access_token"]
    assert token, "Token missing in login response"

    r_me = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert r_me.status_code == 200
    assert r_me.json()["role"] == "teacher"
    print("[PASS] 2. Auth login & token verification passed")

    # 3. Dashboard Aggregations
    r = client.get("/api/v1/dashboard")
    assert r.status_code == 200, f"Dashboard failed: {r.text}"
    dash = r.json()
    assert "schoolsCovered" in dash and "prioritySchools" in dash
    assert len(dash["prioritySchools"]) >= 4
    print("[PASS] 3. Dashboard API passed")

    # 4. Schools Directory & Priority Engine
    r = client.get("/api/v1/schools")
    assert r.status_code == 200
    schools = r.json()
    assert len(schools) >= 4
    print(f"[PASS] 4. Schools directory ({len(schools)} schools) passed")

    # 5. School Detail & Demonstration Visit Logging
    r = client.get("/api/v1/schools/sch-1")
    assert r.status_code == 200
    assert r.json()["id"] == "sch-1"

    r_visit = client.post("/api/v1/schools/sch-1/visit", json={
        "teacher": "Sunita Rao",
        "grade": "Grade 3",
        "observation_note": "Demonstrated 4-corner level grouping"
    })
    assert r_visit.status_code == 200
    assert r_visit.json()["success"] is True
    print("[PASS] 5. School detail and demonstration visit recording passed")

    # 6. Action Ledger (Full CRUD Lifecycle: Create -> In Progress -> Verified -> Closed -> Delete)
    r = client.get("/api/v1/actions")
    assert r.status_code == 200
    actions = r.json()
    assert len(actions) >= 4

    r_create = client.post("/api/v1/actions", json={
        "action": "Test FLN Grouping Action",
        "owner": "Sunita Rao (Teacher)",
        "school": "ZP Primary School Wadgaon",
        "priority": "High"
    })
    assert r_create.status_code == 201
    new_action = r_create.json()
    action_id = new_action["id"]

    # Update to In Progress
    r_patch = client.patch(f"/api/v1/actions/{action_id}", json={
        "status": "In Progress",
        "verification_note": "Teacher initiated student grouping"
    })
    assert r_patch.status_code == 200
    assert r_patch.json()["status"] == "In Progress"

    # Verify and Close
    r_close = client.patch(f"/api/v1/actions/{action_id}", json={
        "status": "Closed",
        "verification_note": "Fully verified in cycle 4 visit"
    })
    assert r_close.status_code == 200
    assert r_close.json()["status"] == "Closed"

    # Delete test action
    r_del = client.delete(f"/api/v1/actions/{action_id}")
    assert r_del.status_code == 200
    print("[PASS] 6. Action Ledger CRUD lifecycle passed")

    # 7. Activity Library & Search Filtering
    r = client.get("/api/v1/activities")
    assert r.status_code == 200
    activities = r.json()
    assert len(activities) >= 4

    r_search = client.get("/api/v1/activities?search=number")
    assert r_search.status_code == 200
    assert len(r_search.json()) >= 1
    print("[PASS] 7. Activity Library & search filtering passed")

    # 8. Training to Practice Fidelity Modules
    r = client.get("/api/v1/training")
    assert r.status_code == 200
    modules = r.json()
    assert len(modules) >= 3
    assert modules[0]["adoptionRate"] > 0
    print("[PASS] 8. Training Modules passed")

    # 9. Reports & CSV Export Generation
    r = client.get("/api/v1/reports")
    assert r.status_code == 200
    r_csv = client.get("/api/v1/reports/export-csv")
    assert r_csv.status_code == 200
    assert "School,Block,FLN Teachers" in r_csv.text
    print("[PASS] 9. Reports & CSV export generation passed")

    # 10. Notifications Feed & Read Status
    r = client.get("/api/v1/notifications")
    assert r.status_code == 200
    notifs = r.json()
    assert len(notifs) >= 4

    r_read = client.patch(f"/api/v1/notifications/{notifs[0]['id']}/read")
    assert r_read.status_code == 200
    print("[PASS] 10. Notifications API passed")

    # 11. Real Multipart Image & Audio Upload Validation
    fake_img = io.BytesIO(b"FAKE_IMAGE_HEADER_DATA_FOR_TESTING")
    fake_audio = io.BytesIO(b"FAKE_AUDIO_HEADER_DATA_FOR_TESTING")

    r_upload = client.post(
        "/api/v1/evidence/upload",
        files={
            "tracker_photo": ("sample_tracker.jpg", fake_img, "image/jpeg"),
            "audio_file": ("sample_voice.webm", fake_audio, "audio/webm")
        },
        data={"language": "mr", "teacher_name": "Sunita Rao"}
    )
    assert r_upload.status_code == 200
    up_res = r_upload.json()
    assert "evidenceId" in up_res
    assert up_res["trackerImage"].startswith("/uploads/")
    assert up_res["audioUrl"].startswith("/uploads/")
    print("[PASS] 11. Multipart Image & Audio upload passed")

    # 12. Audio Transcription & Multi-Language Detection (Marathi, Hindi, English)
    for lang in ["mr", "hi", "en"]:
        r_trans = client.post("/api/v1/evidence/transcribe", data={"language": lang})
        assert r_trans.status_code == 200
        assert r_trans.json()["detectedLanguage"] == lang
        assert len(r_trans.json()["transcript"]) > 10
    print("[PASS] 12. Multi-language ASR transcription passed")

    # 13. AI 5-Point Practice Rubric & Single Next Step Coaching
    r_analyze = client.post("/api/v1/evidence/analyze", data={
        "language": "mr",
        "transcript": "Grouped children by learning level for 15 minutes"
    })
    assert r_analyze.status_code == 200
    analysis = r_analyze.json()
    assert len(analysis["rubric"]) == 5
    assert all("status" in item for item in analysis["rubric"])
    assert "oneNextStep" in analysis["coachingRecommendation"]
    assert "whyThis" in analysis["coachingRecommendation"]
    print("[PASS] 13. AI Practice Rubric (5-point) & Coaching recommendation passed")

    # 14. Mentor Observation Structuring & WhatsApp Direct Link Generation
    r_obs = client.post("/api/v1/observations/structure", json={
        "mentorVoiceNote": "Demonstrated 4-corner level grouping with 22 Grade 3 students.",
        "schoolId": "sch-1"
    })
    assert r_obs.status_code == 200
    obs = r_obs.json()
    assert "structuredNote" in obs
    assert "whatsappDraft" in obs
    assert "directLink" in obs
    assert "https://api.whatsapp.com" in obs["directLink"] or "https://wa.me" in obs["directLink"]
    print("[PASS] 14. Mentor Observation Structuring & WhatsApp link generation passed")

    # 15. System Data Reset
    r_reset = client.post("/api/v1/system/reset")
    assert r_reset.status_code == 200
    assert r_reset.json()["success"] is True
    print("[PASS] 15. System data reset endpoint passed")

    print("\n=======================================================")
    print("ALL 15 PRACTICE LAYER INTEGRATION TESTS PASSED SUCCESSFULLY!")
    print("=======================================================")

if __name__ == "__main__":
    run_tests()
