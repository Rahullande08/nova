from typing import Dict, Any
from fastapi import APIRouter
from backend.app.schemas.schemas import MentorObservationRequest, MentorObservationResponse
from backend.app.services.ai_service import ai_service
from backend.app.services.whatsapp_service import whatsapp_service

router = APIRouter()

@router.post("/structure")
def structure_observation(req: MentorObservationRequest):
    result = ai_service.structure_mentor_observation(
        mentor_voice_note=req.mentorVoiceNote,
        school_id=req.schoolId or "sch-1"
    )
    direct_link = whatsapp_service.generate_direct_link(message=result["whatsappDraft"])
    return {
        **result,
        "directLink": direct_link,
        "integrationMode": "DEMO_DIRECT_LINK" if not whatsapp_service.api_token else "LIVE_CLOUD_API"
    }
