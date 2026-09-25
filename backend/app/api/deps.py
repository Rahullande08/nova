from typing import Generator, Optional
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
) -> Optional[User]:
    if not authorization:
        # Default development user
        return db.query(User).first()
    
    token = authorization.replace("Bearer ", "").strip()
    payload = verify_token(token)
    if not payload:
        return db.query(User).first()
        
    user = db.query(User).filter(User.id == payload.get("sub")).first()
    return user or db.query(User).first()
