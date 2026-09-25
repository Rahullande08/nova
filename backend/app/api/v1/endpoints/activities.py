from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from backend.app.api.deps import get_db
from backend.app.models.entities import Activity
from backend.app.schemas.schemas import ActivityResponse

router = APIRouter()

@router.get("", response_model=List[Dict[str, Any]])
def get_activities(
    search: Optional[str] = Query(None),
    subject: Optional[str] = Query("All"),
    level: Optional[str] = Query("All"),
    db: Session = Depends(get_db)
):
    query = db.query(Activity)
    activities = query.all()
    
    filtered = []
    for act in activities:
        matches_search = (
            not search or
            search.lower() in act.name.lower() or
            search.lower() in act.description.lower() or
            search.lower() in act.practice_area.lower()
        )
        matches_subject = subject == "All" or subject in act.subject
        matches_level = level == "All" or level in act.target_level
        
        if matches_search and matches_subject and matches_level:
            filtered.append({
                "id": act.id,
                "name": act.name,
                "subject": act.subject,
                "grade": act.grade,
                "targetLevel": act.target_level,
                "duration": act.duration,
                "materials": act.materials,
                "language": act.language,
                "practiceArea": act.practice_area,
                "description": act.description,
                "steps": act.steps or []
            })
            
    return filtered

@router.get("/{activity_id}", response_model=Dict[str, Any])
def get_activity_by_id(activity_id: str, db: Session = Depends(get_db)):
    act = db.query(Activity).filter(Activity.id == activity_id).first()
    if not act:
        act = db.query(Activity).first()
    if not act:
        raise HTTPException(status_code=404, detail="Activity not found")
        
    return {
        "id": act.id,
        "name": act.name,
        "subject": act.subject,
        "grade": act.grade,
        "targetLevel": act.target_level,
        "duration": act.duration,
        "materials": act.materials,
        "language": act.language,
        "practiceArea": act.practice_area,
        "description": act.description,
        "steps": act.steps or []
    }
