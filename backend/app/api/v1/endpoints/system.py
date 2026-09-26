from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.api.deps import get_db, require_role, get_current_user
from backend.app.models.entities import User
from backend.app.db.init_db import init_db

router = APIRouter()

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Practice Layer Backend API",
        "version": "1.0.0"
    }

@router.post("/reset")
def reset_system_data(
    current_user: User = Depends(require_role(["admin", "lead"])),
    db: Session = Depends(get_db)
):
    """
    Restricted to institutional administrators and program leads.
    Resets the database to default seed dataset.
    """
    init_db(db=db, force_reset=True)
    return {
        "success": True,
        "message": f"System reset to default seed dataset completed by {current_user.name}."
    }
