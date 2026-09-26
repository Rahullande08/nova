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
        school_id=req.schoolId or "sch-1",
        language=req.language or "mr"
    )
    direct_link = whatsapp_service.generate_direct_link(message=result["whatsappDraft"])


    # Persist Observation record in DB
    obs_id = f"obs-{int(time.time() * 1000)}"
    try:
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
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to persist structured observation."
        )

    return {
        **result,
        "observationId": obs_id,
        "directLink": direct_link,
        "integrationMode": "DEMO_DIRECT_LINK" if not whatsapp_service.api_token else "LIVE_CLOUD_API"
    }

@router.get("/{observation_id}")
def get_observation_by_id(
    observation_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    obs = db.query(Observation).filter(Observation.id == observation_id, Observation.is_archived == False).first()
    if not obs:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Observation not found")

    return {
        "id": obs.id,
        "schoolId": obs.school_id,
        "mentorId": obs.mentor_id,
        "teacherName": obs.teacher_name,
        "grade": obs.grade,
        "transcript": obs.transcript,
        "structuredNote": obs.structured_note,
        "suggestedAction": obs.suggested_action,
        "rubricFeedback": obs.rubric_feedback,
        "whatsappDraft": obs.whatsapp_draft,
        "verificationStatus": obs.verification_status,
        "createdAt": obs.created_at.isoformat() if obs.created_at else None
    }

