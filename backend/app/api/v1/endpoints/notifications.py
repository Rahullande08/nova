from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.api.deps import get_db, get_current_user
from backend.app.models.entities import Notification, User

router = APIRouter()

@router.get("", response_model=List[Dict[str, Any]])
def get_notifications(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Notification)
    # Filter by current user or global notifications (user_id is None)
    if current_user.role != "admin":
        query = query.filter((Notification.user_id == current_user.id) | (Notification.user_id == None))
    notifs = query.order_by(Notification.created_at.desc()).all()
    return [
        {
            "id": n.id,
            "type": n.type,
            "title": n.title,
            "description": n.description,
            "time": n.time,
            "unread": n.unread,
            "targetRoute": n.target_route
        }
        for n in notifs
    ]

@router.patch("/{notif_id}/read")
def mark_read(
    notif_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    notif = db.query(Notification).filter(Notification.id == notif_id).first()
    if notif:
        notif.unread = False
        db.commit()
    return {"success": True, "id": notif_id, "unread": False}

@router.post("/mark-all-read")
def mark_all_read(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Notification)
    if current_user.role != "admin":
        query = query.filter((Notification.user_id == current_user.id) | (Notification.user_id == None))
    query.update({"unread": False})
    db.commit()
    return {"success": True, "message": "All notifications marked read"}
