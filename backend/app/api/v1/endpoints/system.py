from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.api.deps import get_db
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
def reset_system_data(db: Session = Depends(get_db)):
    init_db(db=db, force_reset=True)
    return {
        "success": True,
        "message": "System reset to default seed dataset completed successfully."
    }
