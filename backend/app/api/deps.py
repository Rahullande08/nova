from typing import Generator, Optional, List
from fastapi import Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from backend.app.db.session import SessionLocal
from backend.app.core.security import verify_token
from backend.app.models.entities import User

def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
) -> User:
    if not authorization:
        # Default active demo user in development
        user = db.query(User).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="No user initialized in database"
            )
        return user
    
    token = authorization.replace("Bearer ", "").strip()
    payload = verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token"
        )
        
    user = db.query(User).filter(User.id == payload.get("sub")).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authenticated user account not found"
        )
    return user

def require_role(allowed_roles: List[str]):
    def role_checker(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access forbidden: action requires one of {allowed_roles} roles"
            )
        return current_user
    return role_checker
