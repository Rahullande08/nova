from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field

# --- AUTH SCHEMAS ---
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]

class UserLogin(BaseModel):
    user_id: Optional[str] = "teacher-1"
    role: Optional[str] = "teacher"
    password: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    name: str
    role: str
    role_label: Optional[str] = None
    school_id: Optional[str] = None
    school_name: Optional[str] = None
    cluster: Optional[str] = None
    avatar: Optional[str] = "person"
    language: Optional[str] = "MR"

    class Config:
        from_attributes = True

# --- SCHOOL & VISIT SCHEMAS ---
class SchoolEvidenceItem(BaseModel):
    id: str
    teacher: str
    grade: str
    time: str
    type: str
    signal: str

class SchoolResponse(BaseModel):
    id: str
    name: str
    block: str
    cluster: Optional[str] = "Haveli Cluster"
    teachers_count: int
    students_count: int
    priority: str
    priority_score: int
    days_since_visit: int
    flagged_signal: Optional[str] = None
    suggested_demo: Optional[str] = None
    status: str
    last_evidence: Optional[str] = None
    reasons: List[str] = []
    levels_distribution: Dict[str, int] = {}
    recent_evidence: List[Dict[str, Any]] = []

    class Config:
        from_attributes = True

class SchoolVisitUpdate(BaseModel):
    teacher: Optional[str] = "Sunita Rao"
    grade: Optional[str] = "Grade 3"
    observation_note: Optional[str] = "Demonstration and practice check conducted"

# --- ACTION LEDGER SCHEMAS ---
class ActionCreate(BaseModel):
    action: str
    owner: str
    target_teacher: Optional[str] = None
    school: str
    school_id: Optional[str] = None
    due_date: Optional[str] = None
    priority: Optional[str] = "Medium"
    evidence_required: Optional[str] = "Classroom practice check / tracker update"
    notes: Optional[str] = "Logged via Practice Layer system."

class ActionStatusUpdate(BaseModel):
    status: str
    verification_note: Optional[str] = None

class ActionResponse(BaseModel):
    id: str
    action: str
    owner: str
    targetTeacher: Optional[str] = Field(None, alias="target_teacher")
    school: str
    schoolId: Optional[str] = Field(None, alias="school_id")
    createdDate: Optional[str] = Field(None, alias="created_date")
    dueDate: Optional[str] = Field(None, alias="due_date")
    status: str
    priority: str
    evidenceRequired: Optional[str] = Field(None, alias="evidence_required")
    notes: Optional[str] = None
    verificationNote: Optional[str] = Field(None, alias="verification_note")
    lastUpdated: Optional[str] = Field(None, alias="last_updated")

    class Config:
        from_attributes = True
        populate_by_name = True

# --- RUBRIC & AI ANALYSIS SCHEMAS ---
class PracticeRubricItem(BaseModel):
    id: int
    title: str
    status: str  # Observed, Partly observed, Not observed in submitted evidence
    statusType: str  # observed, partly_observed, not_observed
    evidence: str
    tag: str
    confidence: str

class RecommendedActivity(BaseModel):
    id: str
    name: str
    duration: str
    grade: str
    targetLevel: str
    materials: str
    summary: str

class CoachingRecommendation(BaseModel):
    oneNextStep: str
    whyThis: str
    recommendedActivity: Optional[RecommendedActivity] = None
    marathiAudioScript: Optional[str] = None
    hindiAudioScript: Optional[str] = None

class PracticeAnalysisResponse(BaseModel):
    analysisId: str
    processingTimeSec: int = 12
    overallConfidence: float = 0.87
    rubric: List[PracticeRubricItem]
    coachingRecommendation: CoachingRecommendation

class AudioTranscriptionResponse(BaseModel):
    transcript: str
    detectedLanguage: str
    confidence: float = 0.94
    durationSeconds: int = 48

class MentorObservationRequest(BaseModel):
    mentorVoiceNote: str
    schoolId: Optional[str] = "sch-1"

class MentorObservationResponse(BaseModel):
    structuredNote: str
    suggestedAction: str
    rubricFeedback: Dict[str, bool]
    whatsappDraft: str

# --- ACTIVITY & TRAINING SCHEMAS ---
class ActivityResponse(BaseModel):
    id: str
    name: str
    subject: str
    grade: str
    targetLevel: str = Field(alias="target_level")
    duration: str
    materials: Optional[str] = None
    language: str
    practiceArea: str = Field(alias="practice_area")
    description: str
    steps: List[str] = []

    class Config:
        from_attributes = True
        populate_by_name = True

class TrainingModuleResponse(BaseModel):
    id: str
    title: str
    domain: str
    teachersEnrolled: int = Field(alias="teachers_enrolled")
    teachersCompleted: int = Field(alias="teachers_completed")
    adoptionRate: int = Field(alias="adoption_rate")
    verifiedShiftRate: int = Field(alias="verified_shift_rate")
    status: str
    frictionPoint: Optional[str] = Field(None, alias="friction_point")
    systemAction: Optional[str] = Field(None, alias="system_action")

    class Config:
        from_attributes = True
        populate_by_name = True

# --- NOTIFICATION SCHEMAS ---
class NotificationResponse(BaseModel):
    id: str
    type: str
    title: str
    description: str
    time: str
    unread: bool
    targetRoute: Optional[str] = Field(None, alias="target_route")

    class Config:
        from_attributes = True
        populate_by_name = True

# --- DASHBOARD & REPORTS SCHEMAS ---
class DashboardMetricsResponse(BaseModel):
    schools_covered: int
    total_schools: int
    teachers_active: int
    practice_signals: int
    actions_closed: int
    practice_health_score: int
    priority_schools: List[Dict[str, Any]]
    recent_activity: List[Dict[str, Any]]
    practice_rubric_summary: List[Dict[str, Any]]

class ReportMetricsResponse(BaseModel):
    practice_adoption_rate: int = 78
    visit_coverage_pct: float = 87.5
    demonstration_hours: int = 42
    training_to_shift_ratio: int = 60
    action_sla_days: float = 4.2
    active_teachers_pct: int = 91
