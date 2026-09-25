import json
from datetime import datetime
from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    Boolean,
    Text,
    DateTime,
    ForeignKey,
    JSON
)
from sqlalchemy.orm import relationship
from backend.app.db.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(128), nullable=False)
    role = Column(String(32), nullable=False, default="teacher")  # teacher, mentor, lead, admin
    role_label = Column(String(128), nullable=True)
    school_id = Column(String(64), nullable=True)
    school_name = Column(String(128), nullable=True)
    cluster = Column(String(128), nullable=True)
    avatar = Column(String(64), default="person")
    language = Column(String(10), default="MR")
    password_hash = Column(String(256), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class School(Base):
    __tablename__ = "schools"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(256), nullable=False)
    block = Column(String(128), default="Haveli")
    cluster = Column(String(128), default="Haveli Cluster")
    teachers_count = Column(Integer, default=4)
    students_count = Column(Integer, default=100)
    priority = Column(String(32), default="MEDIUM")  # HIGH, MEDIUM, LOW, ON_TRACK
    priority_score = Column(Integer, default=50)
    days_since_visit = Column(Integer, default=0)
    flagged_signal = Column(Text, nullable=True)
    suggested_demo = Column(Text, nullable=True)
    status = Column(String(128), default="Active")
    last_evidence = Column(String(128), nullable=True)
    reasons = Column(JSON, default=list)
    levels_distribution = Column(JSON, default=dict)
    recent_evidence = Column(JSON, default=list)
    mentor_id = Column(String(64), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(String(64), primary_key=True, index=True)
    teacher_id = Column(String(64), nullable=True)
    teacher_name = Column(String(128), default="Sunita Rao")
    school_id = Column(String(64), nullable=True)
    school_name = Column(String(256), default="ZP Primary School Wadgaon")
    tracker_image = Column(String(512), nullable=True)
    audio_reference = Column(String(512), nullable=True)
    audio_url = Column(String(512), nullable=True)
    transcript = Column(Text, nullable=True)
    language = Column(String(16), default="mr")
    grade = Column(String(32), default="Grade 3")
    captured_at = Column(DateTime, default=datetime.utcnow)
    processing_status = Column(String(32), default="completed")  # pending, processing, completed, failed
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    analyses = relationship("PracticeAnalysis", back_populates="evidence", cascade="all, delete-orphan")

class PracticeAnalysis(Base):
    __tablename__ = "practice_analyses"

    id = Column(String(64), primary_key=True, index=True)
    evidence_id = Column(String(64), ForeignKey("evidence.id"), nullable=False)
    overall_confidence = Column(Float, default=0.85)
    processing_time_sec = Column(Integer, default=12)
    rubric = Column(JSON, nullable=False, default=list)  # List of 5 rubric items
    created_at = Column(DateTime, default=datetime.utcnow)

    evidence = relationship("Evidence", back_populates="analyses")
    coaching = relationship("Coaching", back_populates="analysis", uselist=False, cascade="all, delete-orphan")

class Coaching(Base):
    __tablename__ = "coaching"

    id = Column(String(64), primary_key=True, index=True)
    analysis_id = Column(String(64), ForeignKey("practice_analyses.id"), nullable=False)
    one_next_step = Column(Text, nullable=False)
    why_this = Column(Text, nullable=False)
    recommended_activity = Column(JSON, nullable=True)
    marathi_audio_script = Column(Text, nullable=True)
    hindi_audio_script = Column(Text, nullable=True)
    language = Column(String(16), default="mr")
    created_at = Column(DateTime, default=datetime.utcnow)

    analysis = relationship("PracticeAnalysis", back_populates="coaching")

class Visit(Base):
    __tablename__ = "visits"

    id = Column(String(64), primary_key=True, index=True)
    school_id = Column(String(64), ForeignKey("schools.id"), nullable=False)
    mentor_id = Column(String(64), nullable=True)
    scheduled_date = Column(String(32), nullable=True)
    priority = Column(String(32), default="MEDIUM")
    reason = Column(Text, nullable=True)
    status = Column(String(64), default="Scheduled")  # Scheduled, Completed, Cancelled
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Observation(Base):
    __tablename__ = "observations"

    id = Column(String(64), primary_key=True, index=True)
    visit_id = Column(String(64), nullable=True)
    school_id = Column(String(64), nullable=False)
    mentor_id = Column(String(64), nullable=True)
    teacher_name = Column(String(128), default="Sunita Rao")
    grade = Column(String(32), default="Grade 3")
    transcript = Column(Text, nullable=True)
    structured_note = Column(Text, nullable=False)
    suggested_action = Column(Text, nullable=True)
    rubric_feedback = Column(JSON, default=dict)
    whatsapp_draft = Column(Text, nullable=True)
    verification_status = Column(String(32), default="Verified")
    created_at = Column(DateTime, default=datetime.utcnow)

class Action(Base):
    __tablename__ = "actions"

    id = Column(String(64), primary_key=True, index=True)
    action = Column(Text, nullable=False)
    owner = Column(String(128), nullable=False)
    target_teacher = Column(String(128), nullable=True)
    school = Column(String(256), nullable=False)
    school_id = Column(String(64), nullable=True)
    created_date = Column(String(32), nullable=True)
    due_date = Column(String(32), nullable=True)
    status = Column(String(32), default="Open")  # Open, In Progress, Verified, Closed
    priority = Column(String(32), default="Medium")  # High, Medium, Low
    evidence_required = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    verification_note = Column(Text, nullable=True)
    last_updated = Column(String(64), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class TrainingModule(Base):
    __tablename__ = "training_modules"

    id = Column(String(64), primary_key=True, index=True)
    title = Column(String(256), nullable=False)
    domain = Column(String(128), nullable=False)
    teachers_enrolled = Column(Integer, default=0)
    teachers_completed = Column(Integer, default=0)
    adoption_rate = Column(Integer, default=0)
    verified_shift_rate = Column(Integer, default=0)
    status = Column(String(64), default="Active")
    friction_point = Column(Text, nullable=True)
    system_action = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), nullable=True)
    type = Column(String(32), default="general")  # evidence, coaching, mentor, action, general
    title = Column(String(256), nullable=False)
    description = Column(Text, nullable=False)
    time = Column(String(64), default="Just now")
    unread = Column(Boolean, default=True)
    target_route = Column(String(64), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Activity(Base):
    __tablename__ = "activities"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(256), nullable=False)
    subject = Column(String(128), nullable=False)
    grade = Column(String(64), nullable=False)
    target_level = Column(String(64), nullable=False)
    duration = Column(String(32), default="10 min")
    materials = Column(Text, nullable=True)
    language = Column(String(128), default="Marathi / Hindi / English")
    practice_area = Column(String(128), nullable=False)
    description = Column(Text, nullable=False)
    steps = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)
