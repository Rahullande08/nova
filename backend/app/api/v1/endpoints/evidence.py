import os
import time
import uuid
from typing import Optional, Dict, Any, List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session
from backend.app.api.deps import get_db, get_current_user
from backend.app.models.entities import Evidence, PracticeAnalysis, Coaching, User
from backend.app.schemas.schemas import PracticeAnalysisResponse, AudioTranscriptionResponse
from backend.app.services.ai_service import ai_service
from backend.app.services.audio_service import audio_service
from backend.app.core.config import settings

router = APIRouter()

MAX_BYTES = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024

@router.post("/transcribe", response_model=AudioTranscriptionResponse)
async def transcribe_audio_endpoint(
    audio_file: Optional[UploadFile] = File(None),
    language: str = Form("mr")
):
    """
    Transcribes teacher or mentor audio voice note.
    """
    file_path = None
    audio_bytes = None
    mime_type = "audio/webm"

    if audio_file:
        if audio_file.content_type and audio_file.content_type not in settings.ALLOWED_AUDIO_TYPES:
            # Check extension as well
            ext = os.path.splitext(audio_file.filename or "")[1].lower()
            if ext not in [".webm", ".wav", ".mp3", ".ogg", ".m4a"]:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Unsupported audio format. Please provide webm, wav, mp3, ogg, or m4a."
                )

        audio_bytes = await audio_file.read()
        if len(audio_bytes) > MAX_BYTES:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"Audio file exceeds maximum allowed size of {settings.MAX_UPLOAD_SIZE_MB}MB."
            )

        mime_type = audio_file.content_type or "audio/webm"
        file_ext = os.path.splitext(audio_file.filename or "")[1] or ".webm"
        file_name = f"audio_{uuid.uuid4().hex[:12]}{file_ext}"
        file_path = os.path.join(settings.UPLOAD_DIR, file_name)
        with open(file_path, "wb") as f:
            f.write(audio_bytes)
            
    res = await audio_service.transcribe_audio(
        file_path=file_path,
        language=language,
        audio_bytes=audio_bytes,
        mime_type=mime_type
    )
    return res

@router.post("/upload")
async def upload_evidence(
    tracker_photo: Optional[UploadFile] = File(None),
    audio_file: Optional[UploadFile] = File(None),
    language: str = Form("mr"),
    transcript: Optional[str] = Form(None),
    teacher_name: str = Form("Sunita Rao"),
    school_name: str = Form("ZP Primary School Wadgaon"),
    grade: str = Form("Grade 3"),
    db: Session = Depends(get_db)
):
    """
    Accepts real multipart evidence (tracker image and/or audio recording) and validates file boundaries.
    """
    image_url = None
    img_bytes = None
    if tracker_photo:
        img_bytes = await tracker_photo.read()
        if len(img_bytes) > MAX_BYTES:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"Image file exceeds maximum allowed size of {settings.MAX_UPLOAD_SIZE_MB}MB."
            )

        ext = os.path.splitext(tracker_photo.filename or "")[1] or ".jpg"
        img_name = f"tracker_{uuid.uuid4().hex[:12]}{ext}"
        img_path = os.path.join(settings.UPLOAD_DIR, img_name)
        with open(img_path, "wb") as f:
            f.write(img_bytes)
        image_url = f"/uploads/{img_name}"

    audio_url = None
    aud_bytes = None
    if audio_file:
        aud_bytes = await audio_file.read()
        if len(aud_bytes) > MAX_BYTES:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"Audio file exceeds maximum allowed size of {settings.MAX_UPLOAD_SIZE_MB}MB."
            )

        ext = os.path.splitext(audio_file.filename or "")[1] or ".webm"
        aud_name = f"voice_{uuid.uuid4().hex[:12]}{ext}"
        aud_path = os.path.join(settings.UPLOAD_DIR, aud_name)
        with open(aud_path, "wb") as f:
            f.write(aud_bytes)
        audio_url = f"/uploads/{aud_name}"

    # If transcript was not provided but audio was, transcribe it
    final_transcript = transcript
    if not final_transcript and audio_file:
        trans_res = await audio_service.transcribe_audio(
            language=language,
            audio_bytes=aud_bytes,
            mime_type=audio_file.content_type or "audio/webm"
        )
        final_transcript = trans_res.get("transcript")

    evidence_id = f"ev-{int(time.time() * 1000)}"
    new_evidence = Evidence(
        id=evidence_id,
        teacher_name=teacher_name,
        school_name=school_name,
        grade=grade,
        tracker_image=image_url,
        audio_url=audio_url,
        transcript=final_transcript,
        language=language,
        processing_status="completed"
    )
    db.add(new_evidence)
    db.commit()
    db.refresh(new_evidence)

    return {
        "evidenceId": evidence_id,
        "trackerImage": image_url,
        "audioUrl": audio_url,
        "transcript": final_transcript,
        "language": language,
        "status": "completed"
    }

@router.post("/analyze", response_model=PracticeAnalysisResponse)
async def analyze_practice_endpoint(
    tracker_photo: Optional[UploadFile] = File(None),
    audio_file: Optional[UploadFile] = File(None),
    transcript: Optional[str] = Form(None),
    language: str = Form("mr"),
    tracker_image_url: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    """
    Full AI Practice Rubric analysis pipeline with safe boundary checks.
    """
    img_bytes = None
    if tracker_photo:
        img_bytes = await tracker_photo.read()
        if len(img_bytes) > MAX_BYTES:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"Image file exceeds maximum allowed size of {settings.MAX_UPLOAD_SIZE_MB}MB."
            )

    aud_bytes = None
    if audio_file:
        aud_bytes = await audio_file.read()
        if len(aud_bytes) > MAX_BYTES:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"Audio file exceeds maximum allowed size of {settings.MAX_UPLOAD_SIZE_MB}MB."
            )

    final_transcript = transcript
    if not final_transcript and audio_file:
        trans_res = await audio_service.transcribe_audio(
            language=language,
            audio_bytes=aud_bytes,
            mime_type=audio_file.content_type or "audio/webm"
        )
        final_transcript = trans_res.get("transcript")

    analysis_data = ai_service.generate_practice_analysis(
        tracker_image_path=tracker_image_url,
        tracker_image_bytes=img_bytes,
        transcript_text=final_transcript,
        language=language
    )

    # Persist in DB
    ev_id = f"ev-{int(time.time() * 1000)}"
    evidence_entry = Evidence(
        id=ev_id,
        teacher_name="Sunita Rao",
        school_name="ZP Primary School Wadgaon",
        tracker_image=tracker_image_url,
        transcript=final_transcript,
        language=language,
        processing_status="analyzed"
    )
    db.add(evidence_entry)

    analysis_entry = PracticeAnalysis(
        id=analysis_data["analysisId"],
        evidence_id=ev_id,
        overall_confidence=analysis_data["overallConfidence"],
        processing_time_sec=analysis_data["processingTimeSec"],
        rubric=analysis_data["rubric"]
    )
    db.add(analysis_entry)

    coach_info = analysis_data["coachingRecommendation"]
    coaching_entry = Coaching(
        id=f"coach-{int(time.time() * 1000)}",
        analysis_id=analysis_data["analysisId"],
        one_next_step=coach_info["oneNextStep"],
        why_this=coach_info["whyThis"],
        recommended_activity=coach_info.get("recommendedActivity"),
        marathi_audio_script=coach_info.get("marathiAudioScript"),
        hindi_audio_script=coach_info.get("hindiAudioScript"),
        language=language
    )
    db.add(coaching_entry)

    db.commit()

    return analysis_data

@router.get("", response_model=List[Dict[str, Any]])
def list_evidence(db: Session = Depends(get_db)):
    evidences = db.query(Evidence).order_by(Evidence.created_at.desc()).limit(20).all()
    return [
        {
            "id": ev.id,
            "teacherName": ev.teacher_name,
            "schoolName": ev.school_name,
            "grade": ev.grade,
            "trackerImage": ev.tracker_image,
            "audioUrl": ev.audio_url,
            "transcript": ev.transcript,
            "language": ev.language,
            "status": ev.processing_status,
            "createdAt": ev.created_at.isoformat() if ev.created_at else None
        }
        for ev in evidences
    ]
