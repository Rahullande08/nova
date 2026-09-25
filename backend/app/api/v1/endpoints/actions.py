from typing import List, Dict, Any, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from backend.app.api.deps import get_db
from backend.app.models.entities import Action
from backend.app.schemas.schemas import ActionCreate, ActionStatusUpdate, ActionResponse

router = APIRouter()

@router.get("", response_model=List[Dict[str, Any]])
def get_actions(
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Action)
    if status and status != "All":
        query = query.filter(Action.status == status)
    if search:
        s_term = f"%{search}%"
        query = query.filter(
            (Action.action.ilike(s_term)) |
            (Action.owner.ilike(s_term)) |
            (Action.school.ilike(s_term))
        )
    actions = query.order_by(Action.created_at.desc()).all()
    
    return [
        {
            "id": a.id,
            "action": a.action,
            "owner": a.owner,
            "targetTeacher": a.target_teacher or a.owner,
            "school": a.school,
            "schoolId": a.school_id,
            "createdDate": a.created_date or (a.created_at.strftime("%Y-%m-%d") if a.created_at else "2026-09-24"),
            "dueDate": a.due_date or "2026-09-30",
            "status": a.status,
            "priority": a.priority,
            "evidenceRequired": a.evidence_required or "Classroom practice check / tracker update",
            "notes": a.notes or "Logged via Practice Layer system.",
            "verificationNote": a.verification_note,
            "lastUpdated": a.last_updated
        }
        for a in actions
    ]

@router.post("", response_model=Dict[str, Any], status_code=status.HTTP_201_CREATED)
def create_action(action_in: ActionCreate, db: Session = Depends(get_db)):
    action_id = f"act-{int(datetime.utcnow().timestamp() * 1000)}"
    new_action = Action(
        id=action_id,
        action=action_in.action,
        owner=action_in.owner,
        target_teacher=action_in.target_teacher or action_in.owner,
        school=action_in.school,
        school_id=action_in.school_id,
        created_date=datetime.utcnow().strftime("%Y-%m-%d"),
        due_date=action_in.due_date or datetime.utcnow().strftime("%Y-%m-%d"),
        status="Open",
        priority=action_in.priority or "Medium",
        evidence_required=action_in.evidence_required or "Classroom practice check / tracker update",
        notes=action_in.notes or "Logged via Practice Layer system."
    )
    db.add(new_action)
    db.commit()
    db.refresh(new_action)
    
    return {
        "id": new_action.id,
        "action": new_action.action,
        "owner": new_action.owner,
        "targetTeacher": new_action.target_teacher,
        "school": new_action.school,
        "schoolId": new_action.school_id,
        "createdDate": new_action.created_date,
        "dueDate": new_action.due_date,
        "status": new_action.status,
        "priority": new_action.priority,
        "evidenceRequired": new_action.evidence_required,
        "notes": new_action.notes
    }

@router.patch("/{action_id}", response_model=Dict[str, Any])
def update_action(
    action_id: str,
    update_data: ActionStatusUpdate,
    db: Session = Depends(get_db)
):
    action = db.query(Action).filter(Action.id == action_id).first()
    if not action:
        raise HTTPException(status_code=404, detail="Action not found")
        
    action.status = update_data.status
    if update_data.verification_note is not None:
        action.verification_note = update_data.verification_note
    action.last_updated = datetime.utcnow().isoformat()
    
    db.commit()
    db.refresh(action)
    
    return {
        "id": action.id,
        "action": action.action,
        "owner": action.owner,
        "targetTeacher": action.target_teacher,
        "school": action.school,
        "schoolId": action.school_id,
        "createdDate": action.created_date,
        "dueDate": action.due_date,
        "status": action.status,
        "priority": action.priority,
        "evidenceRequired": action.evidence_required,
        "notes": action.notes,
        "verificationNote": action.verification_note,
        "lastUpdated": action.last_updated
    }

@router.delete("/{action_id}")
def delete_action(action_id: str, db: Session = Depends(get_db)):
    action = db.query(Action).filter(Action.id == action_id).first()
    if not action:
        raise HTTPException(status_code=404, detail="Action not found")
    db.delete(action)
    db.commit()
    return {"success": True, "message": "Action deleted"}
