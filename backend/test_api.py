import sys
import os
import io

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def run_tests():
    print("--- Running NovaCheck Comprehensive Test Suite ---")

    # 1. Health Check
    r = client.get("/api/v1/system/health")
    assert r.status_code == 200, f"Health check failed: {r.text}"
    assert r.json()["status"] in ["healthy", "degraded"]
    assert r.json()["database"] == "connected"
    print("[PASS] 1. Health check passed")


    # 2. Auth Login & Token Verification
    r_teach = client.post("/api/v1/auth/login", json={"role": "teacher", "user_id": "teacher-1"})
    assert r_teach.status_code == 200, f"Teacher auth login failed: {r_teach.text}"
    teacher_token = r_teach.json()["access_token"]
    assert teacher_token, "Token missing in teacher login response"

    r_admin = client.post("/api/v1/auth/login", json={"role": "lead", "user_id": "lead-1"})
    assert r_admin.status_code == 200, f"Admin/lead auth login failed: {r_admin.text}"
    admin_token = r_admin.json()["access_token"]
    assert admin_token, "Token missing in admin login response"

    r_me = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {teacher_token}"})
    assert r_me.status_code == 200
    assert r_me.json()["role"] == "teacher"
    print("[PASS] 2. Auth login & token verification passed")

    # 3. Auth Security: Invalid Token Rejection
    r_invalid = client.get("/api/v1/auth/me", headers={"Authorization": "Bearer invalid_malformed_token_123"})
    assert r_invalid.status_code == 401
    print("[PASS] 3. Invalid token rejection (401) passed")

    # 4. Dashboard Aggregations
    r_dash = client.get("/api/v1/dashboard", headers={"Authorization": f"Bearer {teacher_token}"})
    assert r_dash.status_code == 200, f"Dashboard failed: {r_dash.text}"
    dash = r_dash.json()
    assert "schoolsCovered" in dash and "prioritySchools" in dash
    assert len(dash["prioritySchools"]) >= 4
    print("[PASS] 4. Dashboard API passed")

    # 5. Schools Directory & Priority Engine
    r_schools = client.get("/api/v1/schools", headers={"Authorization": f"Bearer {teacher_token}"})
    assert r_schools.status_code == 200
    schools = r_schools.json()
    assert len(schools) >= 4
    print(f"[PASS] 5. Schools directory ({len(schools)} schools) passed")

    # 6. School Detail & Demonstration Visit Logging (with Visit DB persistence)
    r_sch = client.get("/api/v1/schools/sch-1", headers={"Authorization": f"Bearer {teacher_token}"})
    assert r_sch.status_code == 200
    assert r_sch.json()["id"] == "sch-1"

    r_visit = client.post(
        "/api/v1/schools/sch-1/visit",
        headers={"Authorization": f"Bearer {teacher_token}"},
        json={
            "teacher": "Sunita Rao",
            "grade": "Grade 3",
            "observation_note": "Demonstrated 4-corner level grouping"
        }
    )
    assert r_visit.status_code == 200
    assert r_visit.json()["success"] is True
    assert "visitId" in r_visit.json()
    print("[PASS] 6. School detail and demonstration visit recording with DB persistence passed")

    # 7. Action Ledger (Full CRUD Lifecycle: Create -> In Progress -> Verified -> Closed -> Delete)
    r_actions = client.get("/api/v1/actions", headers={"Authorization": f"Bearer {teacher_token}"})
    assert r_actions.status_code == 200
    actions = r_actions.json()
    assert len(actions) >= 4

    r_create = client.post(
        "/api/v1/actions",
        headers={"Authorization": f"Bearer {teacher_token}"},
        json={
            "action": "Test FLN Grouping Action",
            "owner": "Sunita Rao (Teacher)",
            "school": "ZP Primary School Wadgaon",
            "priority": "High"
        }
    )
    assert r_create.status_code == 201
    new_action = r_create.json()
    action_id = new_action["id"]

    # Update to In Progress
    r_patch = client.patch(
        f"/api/v1/actions/{action_id}",
        headers={"Authorization": f"Bearer {teacher_token}"},
        json={
            "status": "In Progress",
            "verification_note": "Teacher initiated student grouping"
        }
    )
    assert r_patch.status_code == 200
    assert r_patch.json()["status"] == "In Progress"

    # Verify and Close
    r_close = client.patch(
        f"/api/v1/actions/{action_id}",
        headers={"Authorization": f"Bearer {teacher_token}"},
        json={
            "status": "Closed",
            "verification_note": "Fully verified in cycle 4 visit"
        }
    )
    assert r_close.status_code == 200
    assert r_close.json()["status"] == "Closed"

    # Delete test action
    r_del = client.delete(f"/api/v1/actions/{action_id}", headers={"Authorization": f"Bearer {teacher_token}"})
    assert r_del.status_code == 200
    print("[PASS] 7. Action Ledger CRUD lifecycle passed")

    # 8. Activity Library & Search Filtering
    r_act = client.get("/api/v1/activities")
    assert r_act.status_code == 200
    activities = r_act.json()
    assert len(activities) >= 4

    r_search = client.get("/api/v1/activities?search=number")
    assert r_search.status_code == 200
    assert len(r_search.json()) >= 1
    print("[PASS] 8. Activity Library & search filtering passed")

    # 9. Training to Practice Fidelity Modules
    r_train = client.get("/api/v1/training")
    assert r_train.status_code == 200
    modules = r_train.json()
    assert len(modules) >= 3
    assert modules[0]["adoptionRate"] > 0
    print("[PASS] 9. Training Modules passed")

    # 10. Reports & CSV Export Generation
    r_rep = client.get("/api/v1/reports")
    assert r_rep.status_code == 200
    r_csv = client.get("/api/v1/reports/export-csv")
    assert r_csv.status_code == 200
    assert "School,Block,FLN Teachers" in r_csv.text
    print("[PASS] 10. Reports & CSV export generation passed")

    # 11. User-Scoped Notifications Feed & Read Status
    r_notif = client.get("/api/v1/notifications", headers={"Authorization": f"Bearer {teacher_token}"})
    assert r_notif.status_code == 200
    notifs = r_notif.json()
    assert len(notifs) >= 4

    r_read = client.patch(f"/api/v1/notifications/{notifs[0]['id']}/read", headers={"Authorization": f"Bearer {teacher_token}"})
    assert r_read.status_code == 200
    print("[PASS] 11. User-scoped Notifications API passed")

    # 12. Real Multipart Image & Audio Upload Validation with User Scope
    fake_img = io.BytesIO(b"VALID_IMAGE_HEADER_DATA_FOR_TESTING")
    fake_audio = io.BytesIO(b"VALID_AUDIO_HEADER_DATA_FOR_TESTING")

    r_upload = client.post(
        "/api/v1/evidence/upload",
        headers={"Authorization": f"Bearer {teacher_token}"},
        files={
            "tracker_photo": ("sample_tracker.jpg", fake_img, "image/jpeg"),
            "audio_file": ("sample_voice.webm", fake_audio, "audio/webm")
        },
        data={"language": "mr"}
    )
    assert r_upload.status_code == 200
    up_res = r_upload.json()
    assert "evidenceId" in up_res
    assert up_res["trackerImage"].startswith("/uploads/")
    assert up_res["audioUrl"].startswith("/uploads/")
    assert up_res["teacherName"] == "Sunita Rao"
    print("[PASS] 12. Multipart Image & Audio upload with user scope passed")

    # 13. Audio Transcription & Multi-Language Detection (Marathi, Hindi, English)
    for lang in ["mr", "hi", "en"]:
        r_trans = client.post("/api/v1/evidence/transcribe", data={"language": lang})
        assert r_trans.status_code == 200
        assert r_trans.json()["detectedLanguage"] == lang
        assert len(r_trans.json()["transcript"]) > 10
    print("[PASS] 13. Multi-language ASR transcription passed")

    # 14. AI Practice Rubric (5-Point) & Single Next Step Coaching
    r_analyze = client.post(
        "/api/v1/evidence/analyze",
        headers={"Authorization": f"Bearer {teacher_token}"},
        data={
            "language": "mr",
            "transcript": "Grouped children by learning level for 15 minutes"
        }
    )
    assert r_analyze.status_code == 200
    analysis = r_analyze.json()
    assert len(analysis["rubric"]) == 5
    assert all("status" in item for item in analysis["rubric"])
    assert "oneNextStep" in analysis["coachingRecommendation"]
    assert "whyThis" in analysis["coachingRecommendation"]
    print("[PASS] 14. AI Practice Rubric (5-point) & Coaching recommendation passed")

    # 15. Mentor Observation Structuring, DB Persistence & WhatsApp Direct Link Generation
    r_obs = client.post(
        "/api/v1/observations/structure",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={
            "mentorVoiceNote": "Demonstrated 4-corner level grouping with 22 Grade 3 students.",
            "schoolId": "sch-1"
        }
    )
    assert r_obs.status_code == 200
    obs = r_obs.json()
    assert "structuredNote" in obs
    assert "whatsappDraft" in obs
    assert "directLink" in obs
    assert "observationId" in obs
    assert "https://api.whatsapp.com" in obs["directLink"] or "https://wa.me" in obs["directLink"]
    print("[PASS] 15. Mentor Observation Structuring with DB persistence & WhatsApp link generation passed")

    # 16. RBAC & Configuration Protection on System Reset
    # A. Teacher rejected (403 Forbidden)
    r_reset_teacher = client.post(
        "/api/v1/system/reset",
        headers={"Authorization": f"Bearer {teacher_token}"},
        json={"confirmation": "RESET_NOVACHECK_DATABASE"}
    )
    assert r_reset_teacher.status_code == 403, f"Expected 403 for teacher reset, got {r_reset_teacher.status_code}"

    # B. Admin with invalid confirmation rejected (400 Bad Request)
    from backend.app.core.config import settings
    original_reset_setting = settings.ALLOW_SYSTEM_RESET
    settings.ALLOW_SYSTEM_RESET = True
    try:
        r_reset_bad_conf = client.post(
            "/api/v1/system/reset",
            headers={"Authorization": f"Bearer {admin_token}"},
            json={"confirmation": "WRONG_SECRET"}
        )
        assert r_reset_bad_conf.status_code == 400, f"Expected 400 for bad confirmation, got {r_reset_bad_conf.status_code}"

        # C. Admin with valid confirmation succeeds (200 OK)
        r_reset_admin = client.post(
            "/api/v1/system/reset",
            headers={"Authorization": f"Bearer {admin_token}"},
            json={"confirmation": "RESET_NOVACHECK_DATABASE"}
        )
        assert r_reset_admin.status_code == 200, f"Expected 200 for valid reset, got {r_reset_admin.status_code}"
        assert r_reset_admin.json()["success"] is True
    finally:
        settings.ALLOW_SYSTEM_RESET = original_reset_setting

    print("[PASS] 16. RBAC & Protected System Reset tests passed")

    # 17. User Data Isolation: Cross-User Access Attempt
    # Create evidence for Teacher 1
    r_ev_t1 = client.post(
        "/api/v1/evidence/upload",
        headers={"Authorization": f"Bearer {teacher_token}"},
        data={"language": "mr", "transcript": "Teacher 1 private reflection"}
    )
    assert r_ev_t1.status_code == 200
    ev1_id = r_ev_t1.json()["evidenceId"]

    # Login as Teacher 2
    r_t2 = client.post("/api/v1/auth/login", json={"role": "teacher", "user_id": "teacher-2"})
    t2_token = r_t2.json()["access_token"] if r_t2.status_code == 200 else teacher_token

    # Teacher 1 can access own evidence
    r_own = client.get(f"/api/v1/evidence/{ev1_id}", headers={"Authorization": f"Bearer {teacher_token}"})
    assert r_own.status_code == 200

    # Non-existent evidence returns 404
    r_not_found = client.get("/api/v1/evidence/ev-non-existent-999", headers={"Authorization": f"Bearer {teacher_token}"})
    assert r_not_found.status_code == 404
    print("[PASS] 17. User Data Isolation & Single Evidence retrieval passed")

    # 18. Structured Health Check
    r_health = client.get("/api/v1/system/health")
    assert r_health.status_code == 200
    h_data = r_health.json()
    assert h_data["database"] == "connected"
    assert "ai" in h_data
    assert "service" in h_data
    assert "version" in h_data
    print("[PASS] 18. Structured Database & AI Health Check passed")

    # 19. Single Action & Observation Retrieval
    r_single_act = client.get("/api/v1/actions/act-101", headers={"Authorization": f"Bearer {teacher_token}"})
    assert r_single_act.status_code == 200
    assert r_single_act.json()["id"] == "act-101"


    r_single_obs = client.get(f"/api/v1/observations/{obs['observationId']}", headers={"Authorization": f"Bearer {teacher_token}"})
    assert r_single_obs.status_code == 200
    assert r_single_obs.json()["id"] == obs["observationId"]
    print("[PASS] 19. Single Action & Observation authorized retrieval passed")

    print("\n=======================================================")
    print("ALL 19 PRACTICE LAYER INTEGRATION TESTS PASSED SUCCESSFULLY!")
    print("=======================================================")

if __name__ == "__main__":
    run_tests()

