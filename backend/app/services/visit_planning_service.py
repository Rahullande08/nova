from typing import List, Dict, Any
from sqlalchemy.orm import Session
from backend.app.models.entities import School, Action

class VisitPlanningService:
    """
    Computes transparent, deterministic school visit prioritization.
    Prioritization factors:
    1. Days since last visit (target SLA interval: 14 days)
    2. Number of open/unresolved pedagogical actions
    3. Flagged practice signals from teacher evidence submissions
    4. Direct teacher demonstration requests
    """

    def calculate_priority(self, school: School, open_actions_count: int = 0) -> Dict[str, Any]:
        score = 0
        reasons = []

        # 1. Days since visit (max 40 pts)
        if school.days_since_visit > 14:
            days_over = school.days_since_visit - 14
            score += min(40, 25 + (days_over * 5))
            reasons.append(f"Exceeded 14-day SLA visit window (+{days_over} days overdue).")
        elif school.days_since_visit > 7:
            score += 15

        # 2. Open actions (max 30 pts)
        if open_actions_count > 0:
            score += min(30, open_actions_count * 15)
            reasons.append(f"{open_actions_count} unresolved pedagogical action items requiring verification.")

        # 3. Flagged signals (max 30 pts)
        if school.flagged_signal and "inconsistent" in school.flagged_signal.lower():
            score += 25
            reasons.append(f"Flagged practice signal: {school.flagged_signal}")
        elif school.flagged_signal:
            score += 15
            reasons.append(f"Practice alert: {school.flagged_signal}")

        # Classification
        if score >= 75:
            priority = "HIGH"
            status = "Needs Visit"
        elif score >= 50:
            priority = "MEDIUM"
            status = "Visit Scheduled"
        elif score >= 30:
            priority = "LOW"
            status = "Action Sent"
        else:
            priority = "ON_TRACK"
            status = "Exemplar Hub"

        return {
            "priority": priority,
            "priority_score": score,
            "status": status,
            "reasons": reasons
        }

visit_planning_service = VisitPlanningService()
