import os
from typing import List, Union
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Practice Layer API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # Environment & Host ("development", "staging", "production")
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Database (SQLite for dev/demo, PostgreSQL for production)
    DATABASE_URL: str = "sqlite:///./practice_layer.db"

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000"
    ]

    # Security / Auth
    SECRET_KEY: str = os.getenv("SECRET_KEY", "practice_layer_super_secret_dev_key_2026_change_in_production")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Uploads Storage
    UPLOAD_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../uploads"))
    MAX_UPLOAD_SIZE_MB: int = 25
    ALLOWED_IMAGE_TYPES: List[str] = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    ALLOWED_AUDIO_TYPES: List[str] = ["audio/webm", "audio/wav", "audio/mp3", "audio/mpeg", "audio/ogg", "audio/m4a", "audio/x-m4a"]

    # AI Providers Configuration
    AI_PROVIDER: str = "gemini"  # "gemini" | "fallback"
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-1.5-flash"
    AI_TIMEOUT_SECONDS: int = 15

    # WhatsApp Business API Configuration (Optional live integration)
    WHATSAPP_API_TOKEN: str = ""
    WHATSAPP_PHONE_NUMBER_ID: str = ""
    WHATSAPP_BUSINESS_ACCOUNT_ID: str = ""

    # Privacy Policy
    PURGE_AUDIO_AFTER_TRANSCRIPTION: bool = False  # If True, delete raw audio after transcription
    STORE_CHILD_FACES: bool = False

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

# Validate secret key in production
if settings.ENVIRONMENT == "production":
    if "dev_key" in settings.SECRET_KEY or len(settings.SECRET_KEY) < 32:
        raise ValueError("CRITICAL: In production mode, SECRET_KEY must be a secure environment variable with at least 32 characters.")

# Ensure uploads directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
