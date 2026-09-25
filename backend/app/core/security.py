import hashlib
import hmac
import time
from typing import Optional, Dict, Any

def create_access_token(data: dict, expires_delta_minutes: int = 60 * 24 * 7) -> str:
    """Generate a lightweight secure dev/prod token payload"""
    timestamp = int(time.time()) + (expires_delta_minutes * 60)
    user_id = str(data.get("sub", ""))
    role = str(data.get("role", "teacher"))
    signature = hashlib.sha256(f"{user_id}:{role}:{timestamp}".encode()).hexdigest()[:16]
    return f"pl_{user_id}_{role}_{timestamp}_{signature}"

def verify_token(token: str) -> Optional[Dict[str, Any]]:
    """Verify access token format and expiration"""
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
        return {"sub": user_id, "role": role}
    except Exception:
        return None
