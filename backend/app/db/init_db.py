from datetime import datetime
from sqlalchemy.orm import Session
from backend.app.db.session import engine, Base, SessionLocal
from backend.app.models.entities import (
    User,
    School,
    Activity,
    Action,
    TrainingModule,
    Notification
)

SEED_USERS = [
    {
        "id": "teacher-1",
        "name": "Sunita Rao",
        "role": "teacher",
        "role_label": "Teacher (Grade 3-4 FLN)",
        "school_id": "sch-1",
        "school_name": "ZP Primary School Wadgaon",
        "cluster": "Haveli Cluster • Pune",
        "avatar": "person",
        "language": "MR"
    },
    {
        "id": "mentor-1",
        "name": "Anand Patil",
        "role": "mentor",
        "role_label": "CRP / Instructional Mentor",
        "school_id": "sch-1",
        "school_name": "Haveli Resource Center",
        "cluster": "Haveli Cluster • 8 Schools",
        "avatar": "supervisor_account",
        "language": "MR"
    },
    {
        "id": "lead-1",
        "name": "Dr. Rajesh Deshmukh",
        "role": "lead",
        "role_label": "Program Officer / State Lead",
        "school_id": None,
        "school_name": "State Education Mission",
        "cluster": "Maharashtra State FLN Mission",
        "avatar": "admin_panel_settings",
        "language": "EN"
    }
]

SEED_SCHOOLS = [
    {
        "id": "sch-1",
        "name": "ZP Primary School Wadgaon",
        "block": "Haveli",
        "cluster": "Haveli Cluster",
        "teachers_count": 4,
        "students_count": 118,
        "priority": "HIGH",
        "priority_score": 92,
        "days_since_visit": 16,
        "flagged_signal": "Level-based grouping inconsistent (3 evidence submissions)",
        "suggested_demo": "Demonstrate 4-corner level grouping",
        "status": "Needs Visit",
        "last_evidence": "2h ago by Sunita Rao",
        "reasons": [
            "2 flagged audio notes from Teacher Sunita indicating confusion on letter vs. word grouping.",
            "0 visits this cycle (Exceeded target SLA interval by +2 days).",
            "Direct teacher request: Requested mentor modeling 48 hours ago via Practice Log."
        ],
        "levels_distribution": {"beginner": 22, "letter": 28, "word": 36, "story": 14},
        "recent_evidence": [
            {"id": "ev-101", "teacher": "Sunita Rao", "grade": "Grade 3", "time": "11:42 AM Today", "type": "Tracker + Voice", "signal": "Grouping inconsistent"},
            {"id": "ev-102", "teacher": "Pravin Gaikwad", "grade": "Grade 4", "time": "Yesterday", "type": "Voice Note", "signal": "Peer check omitted"}
        ]
    },
    {
        "id": "sch-2",
        "name": "ZP School Khed Shivapur",
        "block": "Haveli",
        "cluster": "Haveli Cluster",
        "teachers_count": 3,
        "students_count": 84,
        "priority": "MEDIUM",
        "priority_score": 68,
        "days_since_visit": 8,
        "flagged_signal": "Low learner practice time during phonics (<10 min observed)",
        "suggested_demo": "Model peer-paired reading",
        "status": "Visit Scheduled (Thursday 10:30 AM)",
        "last_evidence": "4d ago by Ramesh K",
        "reasons": [
            "Learners actively practiced observed in only 1 of 3 recent sessions.",
            "CRP scheduled routine mid-cycle demonstration visit.",
            "Exit ticket verification pending for Grade 2 batch."
        ],
        "levels_distribution": {"beginner": 14, "letter": 24, "word": 42, "story": 20},
        "recent_evidence": [
            {"id": "ev-103", "teacher": "Ramesh K", "grade": "Grade 2", "time": "4d ago", "type": "Tracker Photo", "signal": "Low practice duration"}
        ]
    },
    {
        "id": "sch-3",
        "name": "ZP School Saswad",
        "block": "Haveli",
        "cluster": "Haveli Cluster",
        "teachers_count": 6,
        "students_count": 190,
        "priority": "ON_TRACK",
        "priority_score": 24,
        "days_since_visit": 3,
        "flagged_signal": "All 5 rubric practices observed & verified by block monitor",
        "suggested_demo": "Celebrate progress & document peer exemplar",
        "status": "Exemplar Hub",
        "last_evidence": "Yesterday by Pooja Sharma",
        "reasons": [
            "Demonstrated 100% adherence to 15-minute level grouping rotation.",
            "Active peer coaching observed between Grade 3 and Grade 4 teachers.",
            "Regular submission of verified TaRL OCR tracker tallies."
        ],
        "levels_distribution": {"beginner": 8, "letter": 18, "word": 44, "story": 30},
        "recent_evidence": [
            {"id": "ev-104", "teacher": "Pooja Sharma", "grade": "Grade 3", "time": "Yesterday", "type": "Full Packet", "signal": "Exemplar pacing"}
        ]
    },
    {
        "id": "sch-4",
        "name": "ZP School Donje",
        "block": "Haveli",
        "cluster": "Haveli Cluster",
        "teachers_count": 3,
        "students_count": 96,
        "priority": "LOW",
        "priority_score": 38,
        "days_since_visit": 5,
        "flagged_signal": "Formative assessment check omitted during word reading",
        "suggested_demo": "Share 3-min exit ticket template",
        "status": "Action Sent",
        "last_evidence": "5d ago by Anjali P",
        "reasons": [
            "Single occurrence of omitted checking understanding metric.",
            "Teacher acknowledged and loaded 3-min flashcard check into plan."
        ],
        "levels_distribution": {"beginner": 12, "letter": 22, "word": 40, "story": 26},
        "recent_evidence": [
            {"id": "ev-105", "teacher": "Anjali P", "grade": "Grade 4", "time": "5d ago", "type": "Voice Note", "signal": "Check omitted"}
        ]
    }
]

SEED_ACTIVITIES = [
    {
        "id": "act-1",
        "name": "Number Line Challenge (संख्या रेषा आव्हान)",
        "subject": "Foundational Numeracy",
        "grade": "Grade 3–5",
        "target_level": "Beginner / Letter",
        "duration": "10 min",
        "materials": "Chalk + number cards 1-50",
        "language": "Marathi / Hindi / English",
        "practice_area": "Checking Understanding & Paced Adaptation",
        "description": "Draw a tactile floor ladder. Students place cards sequentially while speaking aloud to let you quickly assess grouping mastery in under 3 minutes.",
        "steps": [
            "Draw 0-20 chalk increments on the classroom floor.",
            "Distribute 3 cards to each student in the beginner circle.",
            "Call out a number and ask children to step on the correct position.",
            "Use peer check: adjacent student confirms with a thumbs up."
        ]
    },
    {
        "id": "act-2",
        "name": "4-Corner Word Sort (शब्द वर्गीकरण)",
        "subject": "Foundational Literacy",
        "grade": "Grade 2–4",
        "target_level": "Word Level",
        "duration": "15 min",
        "materials": "Word cards with 2-syllable and 3-syllable Marathi words",
        "language": "Marathi / Hindi",
        "practice_area": "Level-Based Grouping",
        "description": "Designate 4 room corners for matra types. Children read their card in pairs and move to the corresponding corner, followed by immediate choral verification.",
        "steps": [
            "Label 4 corners: काना (A), पहिली वेलांटी (I), दुसरी वेलांटी (EE), उकार (U).",
            "Give each pair 2 vocabulary cards.",
            "Allow 90 seconds of pair reading before moving to the corner.",
            "Teacher spends 2 minutes rotating across corners to verify pronunciation."
        ]
    },
    {
        "id": "act-3",
        "name": "Pair Flashcard Relay (जोडी वाचन रिले)",
        "subject": "Foundational Literacy",
        "grade": "Grade 1–3",
        "target_level": "Letter / Word",
        "duration": "12 min",
        "materials": "Letter flashcards + sand tray",
        "language": "Marathi / Hindi / English",
        "practice_area": "Learner Active Practice",
        "description": "Pairs take turns drawing a card, sounding the phoneme, and tracing it in sand while the partner reads the corresponding keyword aloud.",
        "steps": [
            "Place sand plates in the center of each small circle of 4.",
            "Partner A draws the card and sounds the letter.",
            "Partner B traces the letter in sand and says two rhyming words.",
            "Switch roles after 5 letters."
        ]
    },
    {
        "id": "act-4",
        "name": "3-Minute Exit Ticket Pulse (द्रुत पडताळणी)",
        "subject": "Foundational Literacy & Math",
        "grade": "Grade 2–5",
        "target_level": "All Levels",
        "duration": "3 min",
        "materials": "Mini slate / chalk or scrap slips",
        "language": "All Languages",
        "practice_area": "Checking Understanding",
        "description": "Rapid diagnostic checkpoint before transitioning activities. Students write one target word or solve one single-digit addition to signal readiness.",
        "steps": [
            "Display 2 level-specific questions on the blackboard.",
            "Give students 120 seconds of silence to write their response on slate.",
            "Show-and-Tell: All students raise slates on the count of 3.",
            "Quick glance lets teacher identify anyone needing immediate regrouping."
        ]
    }
]

SEED_ACTIONS = [
    {
        "id": "act-101",
        "action": "Demonstrate 4-corner level grouping during morning FLN block",
        "owner": "Anand Patil (CRP)",
        "target_teacher": "Sunita Rao",
        "school": "ZP Primary School Wadgaon",
        "school_id": "sch-1",
        "created_date": "2026-09-23",
        "due_date": "2026-09-28",
        "status": "Open",
        "priority": "High",
        "evidence_required": "CRP visit observation note + audio transcript",
        "notes": "Sunita reported that word-level learners are finishing early while beginner group is stagnant."
    },
    {
        "id": "act-102",
        "action": "Implement 3-minute exit tickets for Grade 3 reading corner",
        "owner": "Sunita Rao (Teacher)",
        "target_teacher": "Sunita Rao",
        "school": "ZP Primary School Wadgaon",
        "school_id": "sch-1",
        "created_date": "2026-09-24",
        "due_date": "2026-09-27",
        "status": "In Progress",
        "priority": "Medium",
        "evidence_required": "Photo of slates / Tracker update",
        "notes": "Suggested by AI Coach following 11:42 AM practice submission."
    },
    {
        "id": "act-103",
        "action": "Deploy peer reading flashcards for Grade 2 phonics",
        "owner": "Ramesh K (Teacher)",
        "target_teacher": "Ramesh K",
        "school": "ZP School Khed Shivapur",
        "school_id": "sch-2",
        "created_date": "2026-09-20",
        "due_date": "2026-09-25",
        "status": "Verified",
        "priority": "Medium",
        "evidence_required": "CRP observation in cycle 4 visit",
        "notes": "Demonstrated by CRP Anand Patil on Sept 22. Verified active student participation."
    },
    {
        "id": "act-104",
        "action": "Update TaRL student level matrix baseline records",
        "owner": "Pooja Sharma (Teacher)",
        "target_teacher": "Pooja Sharma",
        "school": "ZP School Saswad",
        "school_id": "sch-3",
        "created_date": "2026-09-18",
        "due_date": "2026-09-22",
        "status": "Closed",
        "priority": "Low",
        "evidence_required": "OCR tracker upload completed",
        "notes": "All 31 students successfully mapped to beginner, letter, word, and story tiers."
    }
]

SEED_TRAINING_MODULES = [
    {
        "id": "tr-1",
        "title": "TaRL Level-Based Grouping 2.0",
        "domain": "Instructional Management",
        "teachers_enrolled": 48,
        "teachers_completed": 44,
        "adoption_rate": 78,
        "verified_shift_rate": 64,
        "status": "High Impact",
        "friction_point": "Difficulty transitioning groups in multi-grade classrooms",
        "system_action": "Deploy physical group divider mats & CRP demonstration"
    },
    {
        "id": "tr-2",
        "title": "3-Minute Formative Exit Checks",
        "domain": "Assessment for Learning",
        "teachers_enrolled": 42,
        "teachers_completed": 39,
        "adoption_rate": 52,
        "verified_shift_rate": 41,
        "status": "Needs Support",
        "friction_point": "Teachers run out of time at the end of the 45-min period",
        "system_action": "Embed timer prompts into daily lesson flashcards"
    },
    {
        "id": "tr-3",
        "title": "Phonics Multi-Sensory Blends",
        "domain": "Foundational Literacy",
        "teachers_enrolled": 45,
        "teachers_completed": 45,
        "adoption_rate": 84,
        "verified_shift_rate": 76,
        "status": "High Impact",
        "friction_point": "Minor confusion on complex joint letters (जोडाक्षर)",
        "system_action": "Distribute joint-letter tactile flashcard kits"
    }
]

SEED_NOTIFICATIONS = [
    {
        "id": "notif-1",
        "type": "evidence",
        "title": "New Evidence Submitted",
        "description": "Pooja Sharma uploaded 2 audio clips & tracker photo for ZP School A.",
        "time": "22m ago",
        "unread": True,
        "target_route": "school-evidence-feed"
    },
    {
        "id": "notif-2",
        "type": "coaching",
        "title": "AI Coaching Generated",
        "description": "Single Next Step prepared for Sunita Rao: \"3-minute formative pulse check\".",
        "time": "1h ago",
        "unread": True,
        "target_route": "ai-coach-chat"
    },
    {
        "id": "notif-3",
        "type": "mentor",
        "title": "Visit Priority Alert",
        "description": "ZP Primary School Wadgaon has exceeded 14-day visit window (+2 days).",
        "time": "2h ago",
        "unread": True,
        "target_route": "crp-mentor-dashboard"
    },
    {
        "id": "notif-4",
        "type": "action",
        "title": "Action Item Verified",
        "description": "Anand Patil verified level-based grouping in ZP School Saswad.",
        "time": "5h ago",
        "unread": False,
        "target_route": "action-ledger"
    }
]

def init_db(db: Session = None, force_reset: bool = False):
    Base.metadata.create_all(bind=engine)
    
    close_session = False
    if db is None:
        db = SessionLocal()
        close_session = True
        
    try:
        if force_reset:
            db.query(Action).delete()
            db.query(School).delete()
            db.query(Activity).delete()
            db.query(TrainingModule).delete()
            db.query(Notification).delete()
            db.query(User).delete()
            db.commit()

        # Seed Users
        if db.query(User).count() == 0:
            for u in SEED_USERS:
                db.add(User(**u))
                
        # Seed Schools
        if db.query(School).count() == 0:
            for s in SEED_SCHOOLS:
                db.add(School(**s))

        # Seed Activities
        if db.query(Activity).count() == 0:
            for a in SEED_ACTIVITIES:
                db.add(Activity(**a))

        # Seed Actions
        if db.query(Action).count() == 0:
            for act in SEED_ACTIONS:
                db.add(Action(**act))

        # Seed Training Modules
        if db.query(TrainingModule).count() == 0:
            for tm in SEED_TRAINING_MODULES:
                db.add(TrainingModule(**tm))

        # Seed Notifications
        if db.query(Notification).count() == 0:
            for n in SEED_NOTIFICATIONS:
                db.add(Notification(**n))

        db.commit()
    finally:
        if close_session:
            db.close()
