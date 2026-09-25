from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.api.deps import get_db, get_current_user
from backend.app.models.entities import User
from backend.app.schemas.schemas import Token, UserLogin, UserResponse
from backend.app.core.security import create_access_token

router = APIRouter()

@router.post("/login", response_model=Token)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    user = None
    if login_data.user_id:
        user = db.query(User).filter(User.id == login_data.user_id).first()
    if not user and login_data.role:
        user = db.query(User).filter(User.role == login_data.role).first()
    if not user:
        user = db.query(User).first()
        
    access_token = create_access_token(data={"sub": user.id, "role": user.role})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "role": user.role,
            "roleLabel": user.role_label,
            "school": user.school_name,
            "schoolId": user.school_id,
            "cluster": user.cluster,
            "avatar": user.avatar,
            "language": user.language
        }
    }

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
