from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Response
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from sqlalchemy import text
from backend.app.api.deps import get_db, require_role
from backend.app.models.entities import User
from backend.app.db.init_db import init_db
from backend.app.core.config import settings

router = APIRouter()

class SystemResetRequest(BaseModel):
    confirmation: str = Field(..., description="Confirmation token required to perform system reset")

@router.get("/health")
def health_check(response: Response, db: Session = Depends(get_db)):
    """
    Structured health check reporting application, database, and AI service readiness.
    Never exposes internal credentials or connection strings.
    """
    db_status = "unavailable"
    ai_status = "available" if settings.GEMINI_API_KEY else "fallback_mode"
    
    try:
        db.execute(text("SELECT 1"))
        db_status = "connected"
    except Exception as e:
        db_status = "unavailable"
        print(f"[HealthCheck] Database connectivity error: {type(e).__name__}")

    is_healthy = db_status == "connected"
    overall_status = "healthy" if is_healthy and ai_status == "available" else ("degraded" if is_healthy else "unhealthy")
    
    if not is_healthy:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE

    return {
        "status": overall_status,
        "database": db_status,
        "ai": ai_status,
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT
    }

@router.post("/reset")
def reset_system_data(
    payload: SystemResetRequest,
    current_user: User = Depends(require_role(["admin", "lead"])),
    db: Session = Depends(get_db)
):
    """
    Strictly protected administrative endpoint to reset the database to default seed dataset.
    Requires:
    1. Admin or Lead authenticated role.
    2. ALLOW_SYSTEM_RESET enabled in server configuration.
    3. Explicit confirmation payload with exact confirmation token.
    """
    if not settings.ALLOW_SYSTEM_RESET:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="System reset is disabled in this environment. Configure ALLOW_SYSTEM_RESET=true to enable."
        )

    if payload.confirmation != "RESET_NOVACHECK_DATABASE":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid confirmation code. System reset requires confirmation='RESET_NOVACHECK_DATABASE'."
        )

    try:
        init_db(db=db, force_reset=True)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to complete system reset due to database error."
        )

    return {
        "success": True,
        "message": f"System reset to default seed dataset successfully executed by {current_user.name}."
    }

