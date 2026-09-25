import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def run_tests():
    print("--- Running Practice Layer Backend API Tests ---")

    # 1. Health Check
    r = client.get("/api/v1/system/health")
    assert r.status_code == 200, f"Health check failed: {r.text}"
    print("[PASS] Health check passed")

    # 2. Auth Login
    r = client.post("/api/v1/auth/login", json={"role": "teacher", "user_id": "teacher-1"})
    assert r.status_code == 200, f"Auth login failed: {r.text}"
    token = r.json()["access_token"]
    assert token, "Token missing in login response"
    print("[PASS] Auth login passed")

    # 3. Dashboard
    r = client.get("/api/v1/dashboard")
    assert r.status_code == 200, f"Dashboard failed: {r.text}"
    dash = r.json()
    assert "schoolsCovered" in dash and "prioritySchools" in dash
    print("[PASS] Dashboard API passed")

    # 4. Schools
    r = client.get("/api/v1/schools")
    assert r.status_code == 200
    schools = r.json()
    assert len(schools) >= 4
    print(f"[PASS] Schools list ({len(schools)} schools) passed")

    # 5. School Detail & Visit Record
    r = client.get("/api/v1/schools/sch-1")
    assert r.status_code == 200
    assert r.json()["id"] == "sch-1"

    r = client.post("/api/v1/schools/sch-1/visit", json={
        "teacher": "Sunita Rao",
        "grade": "Grade 3",
        "observation_note": "Demonstrated 4-corner grouping"
    })
    assert r.status_code == 200
    assert r.json()["success"] is True
    print("[PASS] School detail and visit recording passed")

    # 6. Action Ledger (CRUD)
    r = client.get("/api/v1/actions")
    assert r.status_code == 200
    actions = r.json()
    assert len(actions) >= 4

    r = client.post("/api/v1/actions", json={
        "action": "Test FLN Grouping Action",
        "owner": "Sunita Rao (Teacher)",
        "school": "ZP Primary School Wadgaon",
        "priority": "High"
    })
    assert r.status_code == 201
    new_action = r.json()
    action_id = new_action["id"]

    r = client.patch(f"/api/v1/actions/{action_id}", json={
        "status": "In Progress",
        "verification_note": "Teacher started implementation"
    })
    assert r.status_code == 200
    assert r.json()["status"] == "In Progress"
    print("[PASS] Action Ledger CRUD passed")

    # 7. Activities
    r = client.get("/api/v1/activities")
    assert r.status_code == 200
    activities = r.json()
    assert len(activities) >= 4
    print("[PASS] Activity Library passed")

    # 8. Training Modules
    r = client.get("/api/v1/training")
    assert r.status_code == 200
    modules = r.json()
    assert len(modules) >= 3
    print("[PASS] Training Modules passed")

    # 9. Reports & CSV Export
    r = client.get("/api/v1/reports")
    assert r.status_code == 200
    r_csv = client.get("/api/v1/reports/export-csv")
    assert r_csv.status_code == 200
    assert "School,Block" in r_csv.text
    print("[PASS] Reports & Insights & CSV Export passed")

    # 10. Notifications
    r = client.get("/api/v1/notifications")
    assert r.status_code == 200
    notifs = r.json()
    assert len(notifs) >= 4
    r_read = client.patch(f"/api/v1/notifications/{notifs[0]['id']}/read")
    assert r_read.status_code == 200
    print("[PASS] Notifications API passed")

    # 11. Evidence Transcription & AI Practice Analysis
    r = client.post("/api/v1/evidence/transcribe", data={"language": "mr"})
    assert r.status_code == 200
    assert "transcript" in r.json()

    r = client.post("/api/v1/evidence/analyze", data={
        "language": "mr",
        "transcript": "Grouped children by learning level"
    })
    assert r.status_code == 200
    analysis = r.json()
    assert len(analysis["rubric"]) == 5
    assert "oneNextStep" in analysis["coachingRecommendation"]
    print("[PASS] AI Practice Rubric (5-point) and Coaching passed")

    # 12. Mentor Observation Structuring
    r = client.post("/api/v1/observations/structure", json={
        "mentorVoiceNote": "Demonstrated 4-corner level grouping",
        "schoolId": "sch-1"
    })
    assert r.status_code == 200
    obs = r.json()
    assert "structuredNote" in obs and "whatsappDraft" in obs
    print("[PASS] Mentor Observation Structuring passed")

    print("\nALL 12 BACKEND INTEGRATION TEST SUITES PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    run_tests()
