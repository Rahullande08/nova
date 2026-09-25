from typing import List, Dict, Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.api.deps import get_db
from backend.app.models.entities import TrainingModule

router = APIRouter()

@router.get("", response_model=List[Dict[str, Any]])
def get_training_modules(db: Session = Depends(get_db)):
    modules = db.query(TrainingModule).all()
    return [
        {
            "id": tm.id,
            "title": tm.title,
            "domain": tm.domain,
            "teachersEnrolled": tm.teachers_enrolled,
            "teachersCompleted": tm.teachers_completed,
            "adoptionRate": tm.adoption_rate,
            "verifiedShiftRate": tm.verified_shift_rate,
            "status": tm.status,
            "frictionPoint": tm.friction_point,
            "systemAction": tm.system_action
        }
        for tm in modules
    ]
