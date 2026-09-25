import hashlib
import hmac
import time
import os
from typing import Optional, Dict, Any

def hash_password(password: str, salt: Optional[str] = None) -> str:
    """Hash password using PBKDF2-HMAC-SHA256 with salt"""
    if not salt:
        salt = os.urandom(16).hex()
    hashed = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        100000
    ).hex()
    return f"{salt}${hashed}"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against stored salt and hash"""
    if not hashed_password or "$" not in hashed_password:
        return False
    try:
        salt, stored_hash = hashed_password.split("$", 1)
        expected_hash = hashlib.pbkdf2_hmac(
            "sha256",
            plain_password.encode("utf-8"),
            salt.encode("utf-8"),
            100000
        ).hex()
        return hmac.compare_digest(stored_hash, expected_hash)
    except Exception:
        return False

def create_access_token(data: dict, expires_delta_minutes: int = 60 * 24 * 7) -> str:
    """Generate a lightweight secure dev/prod token payload"""
    timestamp = int(time.time()) + (expires_delta_minutes * 60)
    user_id = str(data.get("sub", ""))
    role = str(data.get("role", "teacher"))
    signature = hashlib.sha256(f"{user_id}:{role}:{timestamp}".encode()).hexdigest()[:16]
    return f"pl_{user_id}_{role}_{timestamp}_{signature}"

def verify_token(token: str) -> Optional[Dict[str, Any]]:
    """Verify access token format, signature, and expiration"""
    if not token or not token.startswith("pl_"):
        return None
    try:
        parts = token.split("_")
        if len(parts) != 5:
            return None
        _, user_id, role, expiry_str, sig = parts
        expiry = int(expiry_str)
        if time.time() > expiry:
            return None
        expected_sig = hashlib.sha256(f"{user_id}:{role}:{expiry}".encode()).hexdigest()[:16]
        if not hmac.compare_digest(sig, expected_sig):
            return None
        return {"sub": user_id, "role": role, "exp": expiry}
    except Exception:
        return None
