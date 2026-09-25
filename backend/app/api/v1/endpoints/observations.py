from typing import Dict, Any
from fastapi import APIRouter, Depends
from backend.app.schemas.schemas import MentorObservationRequest, MentorObservationResponse
from backend.app.services.ai_service import ai_service

router = APIRouter()

@router.post("/structure", response_model=MentorObservationResponse)
def structure_observation(req: MentorObservationRequest):
    result = ai_service.structure_mentor_observation(
        mentor_voice_note=req.mentorVoiceNote,
        school_id=req.schoolId or "sch-1"
    )
    return result
