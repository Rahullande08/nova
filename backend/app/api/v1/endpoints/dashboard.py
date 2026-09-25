from typing import Dict, Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.api.deps import get_db
from backend.app.models.entities import School, Action, Activity, Evidence

router = APIRouter()

@router.get("", response_model=Dict[str, Any])
def get_dashboard_data(db: Session = Depends(get_db)):
    schools = db.query(School).all()
    actions = db.query(Action).all()
    
    total_schools = len(schools)
    schools_covered = len([s for s in schools if s.days_since_visit <= 14])
    total_teachers = sum(s.teachers_count for s in schools)
    actions_closed = len([a for a in actions if a.status in ["Closed", "Verified"]])
    
    # Priority schools sorted by priority score descending
    priority_schools = sorted(
        [
            {
                "id": s.id,
                "name": s.name,
                "block": s.block,
                "teachersCount": s.teachers_count,
                "studentsCount": s.students_count,
                "priority": s.priority,
                "priorityScore": s.priority_score,
                "daysSinceVisit": s.days_since_visit,
                "flaggedSignal": s.flagged_signal,
                "suggestedDemo": s.suggested_demo,
                "status": s.status,
                "lastEvidence": s.last_evidence,
                "reasons": s.reasons,
                "levelsDistribution": s.levels_distribution,
                "recentEvidence": s.recent_evidence
            }
            for s in schools
        ],
        key=lambda x: x["priorityScore"],
        reverse=True
    )

    recent_activity = [
        {
            "id": "act-feed-1",
            "time": "11:42 AM",
            "school": "ZP Primary School Wadgaon",
            "actor": "Sunita Rao (Teacher)",
            "action": "Submitted reading group tracker & voice reflection.",
            "type": "evidence",
            "signal": "Level-based grouping inconsistent"
        },
        {
            "id": "act-feed-2",
            "time": "Yesterday",
            "school": "ZP School Saswad",
            "actor": "Anand Patil (CRP)",
            "action": "Verified 4-corner word sorting in Grade 3.",
            "type": "verification",
            "signal": "Practice verified (Exemplar Hub)"
        },
        {
            "id": "act-feed-3",
            "time": "2 days ago",
            "school": "ZP School Khed Shivapur",
            "actor": "Ramesh K (Teacher)",
            "action": "Updated exit ticket response slates for phonics.",
            "type": "action",
            "signal": "Action in progress"
        }
    ]

    return {
        "schoolsCovered": schools_covered,
        "totalSchools": total_schools,
        "teachersActive": total_teachers,
        "practiceSignals": 24,
        "actionsClosed": actions_closed,
        "totalActions": len(actions),
        "practiceHealthScore": 84,
        "prioritySchools": priority_schools,
        "recentActivity": recent_activity
    }
