import time
from typing import Dict, Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.api.deps import get_db, get_current_user
from backend.app.models.entities import Observation, User
from backend.app.schemas.schemas import MentorObservationRequest, MentorObservationResponse
from backend.app.services.ai_service import ai_service
from backend.app.services.whatsapp_service import whatsapp_service

router = APIRouter()

@router.post("/structure")
def structure_observation(
    req: MentorObservationRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    result = ai_service.structure_mentor_observation(
        mentor_voice_note=req.mentorVoiceNote,
        school_id=req.schoolId or "sch-1"
    )
    direct_link = whatsapp_service.generate_direct_link(message=result["whatsappDraft"])

    # Persist Observation record in DB
    obs_id = f"obs-{int(time.time() * 1000)}"
    new_obs = Observation(
        id=obs_id,
        school_id=req.schoolId or "sch-1",
        mentor_id=current_user.id if current_user else None,
        teacher_name="Sunita Rao",
        grade="Grade 3",
        transcript=req.mentorVoiceNote,
        structured_note=result["structuredNote"],
        suggested_action=result["suggestedAction"],
        rubric_feedback=result.get("rubricFeedback", {}),
        whatsapp_draft=result["whatsappDraft"],
        verification_status="Verified"
    )
    db.add(new_obs)
    db.commit()

    return {
        **result,
        "observationId": obs_id,
        "directLink": direct_link,
        "integrationMode": "DEMO_DIRECT_LINK" if not whatsapp_service.api_token else "LIVE_CLOUD_API"
    }
