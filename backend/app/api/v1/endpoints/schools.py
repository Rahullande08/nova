from typing import List, Dict, Any
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.api.deps import get_db
from backend.app.models.entities import School, Action
from backend.app.schemas.schemas import SchoolResponse, SchoolVisitUpdate
from backend.app.services.visit_planning_service import visit_planning_service

router = APIRouter()

@router.get("", response_model=List[Dict[str, Any]])
def get_schools(db: Session = Depends(get_db)):
    schools = db.query(School).all()
    result = []
    for s in schools:
        # Check for open actions for dynamic priority recalculation
        open_actions = db.query(Action).filter(
            Action.school == s.name,
            Action.status.in_(["Open", "In Progress"])
        ).count()
        
        dyn = visit_planning_service.calculate_priority(s, open_actions)
        
        result.append({
            "id": s.id,
            "name": s.name,
            "block": s.block,
            "teachersCount": s.teachers_count,
            "studentsCount": s.students_count,
            "priority": s.priority or dyn["priority"],
            "priorityScore": s.priority_score or dyn["priority_score"],
            "daysSinceVisit": s.days_since_visit,
            "flaggedSignal": s.flagged_signal,
            "suggestedDemo": s.suggested_demo,
            "status": s.status or dyn["status"],
            "lastEvidence": s.last_evidence,
            "reasons": s.reasons if s.reasons else dyn["reasons"],
            "levelsDistribution": s.levels_distribution or {},
            "recentEvidence": s.recent_evidence or []
        })
    return result

@router.get("/{school_id}", response_model=Dict[str, Any])
def get_school_by_id(school_id: str, db: Session = Depends(get_db)):
    school = db.query(School).filter(School.id == school_id).first()
    if not school:
        school = db.query(School).first()
    if not school:
        raise HTTPException(status_code=404, detail="School not found")
        
    return {
        "id": school.id,
        "name": school.name,
        "block": school.block,
        "teachersCount": school.teachers_count,
        "studentsCount": school.students_count,
        "priority": school.priority,
        "priorityScore": school.priority_score,
        "daysSinceVisit": school.days_since_visit,
        "flaggedSignal": school.flagged_signal,
        "suggestedDemo": school.suggested_demo,
        "status": school.status,
        "lastEvidence": school.last_evidence,
        "reasons": school.reasons or [],
        "levelsDistribution": school.levels_distribution or {},
        "recentEvidence": school.recent_evidence or []
    }

@router.post("/{school_id}/visit")
def record_school_visit(
    school_id: str,
    visit_update: SchoolVisitUpdate,
    db: Session = Depends(get_db)
):
    school = db.query(School).filter(School.id == school_id).first()
    if not school:
        raise HTTPException(status_code=404, detail="School not found")
        
    school.days_since_visit = 0
    school.status = "Visit Completed (Verified)"
    
    new_ev = {
        "id": f"ev-{int(datetime.utcnow().timestamp() * 1000)}",
        "teacher": visit_update.teacher or "Sunita Rao",
        "grade": visit_update.grade or "Grade 3",
        "time": "Just now (Visit Verified)",
        "type": "Demonstration Visit",
        "signal": visit_update.observation_note or "Classroom demonstration completed & verified"
    }
    
    current_recent = list(school.recent_evidence or [])
    school.recent_evidence = [new_ev] + current_recent
    
    db.commit()
    db.refresh(school)
    
    return {
        "success": True,
        "school": {
            "id": school.id,
            "name": school.name,
            "daysSinceVisit": school.days_since_visit,
            "status": school.status,
            "recentEvidence": school.recent_evidence
        }
    }
