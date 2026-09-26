from typing import Generator, Optional, List
from fastapi import Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from backend.app.db.session import SessionLocal
from backend.app.core.security import verify_token
from backend.app.core.config import settings
from backend.app.models.entities import User

def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()

def get_current_user(
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
) -> User:
    if not authorization:
        # In production, strict authentication is required with no demo fallback
        if settings.ENVIRONMENT == "production":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication credentials were not provided. Bearer token required.",
                headers={"WWW-Authenticate": "Bearer"}
            )
        # Development / demo environment default user
        user = db.query(User).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="No user initialized in database. Please run system seed.",
                headers={"WWW-Authenticate": "Bearer"}
            )
        return user
    
    token = authorization.replace("Bearer ", "").strip()
    payload = verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token",
            headers={"WWW-Authenticate": "Bearer"}
        )
        
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token payload missing user identifier",
            headers={"WWW-Authenticate": "Bearer"}
        )

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authenticated user account not found",
            headers={"WWW-Authenticate": "Bearer"}
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

