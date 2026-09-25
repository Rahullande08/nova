// Centralized Tutorial Specifications for Practice Layer Major Pages
// Contains clean, actionable, step-by-step guidance matching Stitch design system

export const TUTORIALS_DATA = {
  'overview-dashboard': {
    title: 'Dashboard Tutorial',
    badge: 'System Overview',
    summary: 'Monitor teacher practice velocity and identify priority signals across all cluster schools in real time.',
    steps: [
      {
        title: '1. Review Practice Health Index',
        description: 'See the composite health score (82%) based on group work fidelity, tracker recency, and activity adoption.'
      },
      {
        title: '2. Check Priority Schools & SLA Alerts',
        description: 'Schools flagged with red/amber badges indicate low grouping fidelity or impending mentor visit deadlines.'
      },
      {
        title: '3. Track Practice Loop Velocity',
        description: 'Compare weekly classroom observations, teacher evidence submissions, and verified actions.'
      },
      {
        title: '4. Switch Perspectives',
        description: 'Use the top-right profile selector to simulate Teacher, CRP Mentor, or Program Manager views.'
      }
    ],
    proTip: 'Click on any priority school card to jump directly into the CRP Visit Planning workflow.'
  },

  'capture-evidence': {
    title: 'Capture Evidence Tutorial',
    badge: 'Teacher Flow',
    summary: 'Submit multi-modal classroom evidence in under 60 seconds with offline-first support.',
    steps: [
      {
        title: '1. Attach Class Tracker Photo',
        description: 'Upload your TaRL level tally sheet or click "Use Sample Tracker Sheet" for quick OCR parsing.'
      },
      {
        title: '2. Record Voice Reflection',
        description: 'Tap "Start Recording" to speak naturally in Marathi, Hindi, or English about grouping dynamics and challenges.'
      },
      {
        title: '3. Playback & Review',
        description: 'Listen back to your recording or re-record before submitting. Speech is processed with dialect-tolerant models.'
      },
      {
        title: '4. Submit for AI Diagnostic',
        description: 'Submit to receive immediate rubric-aligned feedback, radar scoring, and a targeted micro-activity.'
      }
    ],
    proTip: 'You can test voice recording directly with your device microphone or test dialect switching seamlessly.'
  },

  'ai-coach-chat': {
    title: 'AI Practice Coach Tutorial',
    badge: 'Pedagogical Coaching',
    summary: 'Receive deterministic, single-action coaching to prevent teacher overwhelm.',
    steps: [
      {
        title: '1. Understand "Your Next Step"',
        description: 'The AI prescribes exactly ONE manageable pedagogical action (e.g. 15-minute letter sound speed drill).'
      },
      {
        title: '2. Multi-Dimensional Rubric Diagnostic',
        description: 'Inspect radar ratings across Grouping Fidelity, Time on Task, Check for Understanding, and Tracker Accuracy.'
      },
      {
        title: '3. Listen to Spoken Coaching',
        description: 'Click "Listen to Spoken Coaching" to hear the advice narrated in Marathi, Hindi, or English.'
      },
      {
        title: '4. Ask Contextual Questions',
        description: 'Use the interactive chat to ask about classroom management, multi-grade activities, or low-performing students.'
      }
    ],
    proTip: 'The AI never gives vague general praise — every recommendation links directly to an actionable activity in the library.'
  },

  'my-practice-log': {
    title: 'My Practice History Tutorial',
    badge: 'Teacher Portfolio',
    summary: 'Review your historical classroom submissions, growth trajectories, and mentor feedback.',
    steps: [
      {
        title: '1. Inspect Growth Timeline',
        description: 'View chronological milestones showing how your grouping fidelity and pacing improved over the term.'
      },
      {
        title: '2. Access Verified Evidence',
        description: 'Filter past photo submissions, transcribed voice reflections, and rubric scores.'
      },
      {
        title: '3. Action Item Status',
        description: 'Check pending practice commitments agreed upon during mentor demonstration visits.'
      }
    ],
    proTip: 'Use your practice history during cluster monthly review meetings to showcase student learning gains.'
  },

  'activity-library': {
    title: 'Activity Library Tutorial',
    badge: 'TaRL Pedagogical Bank',
    summary: 'Explore classroom-tested, 10–15 minute activities curated specifically for the foundational learning hour.',
    steps: [
      {
        title: '1. Filter by Level & Subject',
        description: 'Filter activities by Target Level (Beginner, Letter, Word, Paragraph) and Subject (Language, Math).'
      },
      {
        title: '2. View Activity Blueprints',
        description: 'Click any activity to view step-by-step instructions, low-cost materials, and common student misconceptions.'
      },
      {
        title: '3. Add to Teaching Plan',
        description: 'Pin activities directly to your weekly classroom plan or CRP mentor visit notes.'
      }
    ],
    proTip: 'Search for "Phonics" or "Grid" in the search box to find high-velocity speed drills.'
  },

  'crp-mentor-dashboard': {
    title: 'Mentor Dashboard Tutorial',
    badge: 'Cluster Resource Person',
    summary: 'Prioritize your school visits based on objective algorithmic signals rather than guesswork.',
    steps: [
      {
        title: '1. Triage Priority Schools',
        description: 'Schools are ranked by risk score, days since last visit, and tracker staleness.'
      },
      {
        title: '2. Check Cluster Practice Health',
        description: 'Review overall cluster metrics: visit completion rates, open action items, and coaching fidelity.'
      },
      {
        title: '3. Launch Fast Visit Workflow',
        description: 'Click "Start Observation Visit" on any school card to begin a structured 4-step classroom observation.'
      }
    ],
    proTip: 'Schools with >20 days since last visit are automatically flagged with SLA warnings.'
  },

  'visit-plan': {
    title: 'CRP Visit Plan Tutorial',
    badge: 'Route & Schedule',
    summary: 'Plan and execute your weekly cluster school visits with pre-loaded teacher context and prior commitments.',
    steps: [
      {
        title: '1. Review Scheduled Itinerary',
        description: 'See the optimized visiting schedule for the current week based on school urgency.'
      },
      {
        title: '2. Pre-Visit Briefings',
        description: 'Inspect previous observation notes, teacher tracker submissions, and unresolved action items before entering the school.'
      },
      {
        title: '3. One-Click Navigation & Check-In',
        description: 'Mark your arrival and launch the in-visit observation wizard.'
      }
    ],
    proTip: 'Always check the "Pending Action Commitments" before your classroom observation.'
  },

  'school-evidence-feed': {
    title: 'School Evidence Feed Tutorial',
    badge: 'Cluster Telemetry',
    summary: 'Browse raw and analyzed evidence streams across all classrooms in your assigned cluster.',
    steps: [
      {
        title: '1. Evidence Stream',
        description: 'Inspect recent tracker uploads, voice notes, and AI diagnostic scores submitted by teachers.'
      },
      {
        title: '2. Filter by Signal',
        description: 'Filter by "Grouping Risk", "Level Drift", "Stale Tracker", or "High Progress".'
      },
      {
        title: '3. Mentor Verification',
        description: 'Add mentor confirmation notes or adjust rubric ratings directly from the feed.'
      }
    ],
    proTip: 'Hover over or click any evidence item to inspect the OCR bounding box and transcript excerpts.'
  },

  'mentor-visit-workflow': {
    title: 'In-Visit Fast Capture Tutorial',
    badge: '4-Step Field Wizard',
    summary: 'Conduct rapid, structured 15-minute classroom observations with voice recording and instant action generation.',
    steps: [
      {
        title: 'Step 1: School & Class Context',
        description: 'Select the school, teacher, grade, and subject being observed.'
      },
      {
        title: 'Step 2: Rubric Evaluation',
        description: 'Score 4 core dimensions: Level Grouping, Time Allocation, Material Usage, and Checking Understanding.'
      },
      {
        title: 'Step 3: Voice / Text Notes',
        description: 'Record observation reflections using the microphone or type specific feedback.'
      },
      {
        title: 'Step 4: Joint Action Agreement',
        description: 'Formulate ONE concrete teacher commitment with a clear due date and sync to the Action Ledger.'
      }
    ],
    proTip: 'The summary generator instantly formats your notes into an SMS/WhatsApp-ready summary for the teacher.'
  },

  'action-ledger': {
    title: 'Action Ledger Tutorial',
    badge: 'Accountability Loop',
    summary: 'Track, manage, and verify all pedagogical action commitments across teachers and mentors.',
    steps: [
      {
        title: '1. Status Lifecycle',
        description: 'Track items through Open → In Progress → Verified → Closed.'
      },
      {
        title: '2. SLA & Due Date Tracking',
        description: 'Identify overdue commitments or items requiring imminent verification visits.'
      },
      {
        title: '3. Multi-Filter & Search',
        description: 'Filter by status (Open, In Progress, Verified, Closed) or search by teacher name / school.'
      },
      {
        title: '4. CSV Export',
        description: 'Click "Export CSV" to download an official accountability report for block reviews.'
      }
    ],
    proTip: 'Click on any row to open the Action Detail Drawer and update verification notes.'
  },

  'training-to-practice': {
    title: 'Training → Practice Analytics Tutorial',
    badge: 'Impact Analysis',
    summary: 'Analyze how workshop training translates into actual classroom practice changes over time.',
    steps: [
      {
        title: '1. Training Module Overview',
        description: 'Review teacher completion rates across foundational modules (TaRL Leveling, Word Recognition, Speed Drills).'
      },
      {
        title: '2. Classroom Adoption Index',
        description: 'Measure the percentage of trained teachers actively demonstrating the techniques in live classrooms.'
      },
      {
        title: '3. Practice Decay Detection',
        description: 'Identify post-training drop-offs where refresher demonstration visits are required.'
      }
    ],
    proTip: 'Compare the "Training Completion Rate" against the "Classroom Practice Score" to spot implementation gaps.'
  },

  'reports-insights': {
    title: 'Reports & Insights Tutorial',
    badge: 'Executive Analytics',
    summary: 'Generate high-level cluster trends, district benchmarking, and systemic practice diagnostics.',
    steps: [
      {
        title: '1. Cluster-Level Trends',
        description: 'View 6-month longitudinal trends in grouping fidelity, teacher participation, and student transitions.'
      },
      {
        title: '2. Practice Velocity Heatmap',
        description: 'Identify top-performing schools and clusters requiring additional CRP support.'
      },
      {
        title: '3. Exportable Data Summaries',
        description: 'Generate PDF/CSV executive reports for review meetings with DIET and State officials.'
      }
    ],
    proTip: 'Use the date range selector to analyze practice change before and after training workshops.'
  },

  'system-notifications': {
    title: 'Notifications Tutorial',
    badge: 'Alert Center',
    summary: 'Stay informed about critical SLA alerts, evidence processing updates, and mentor visit reminders.',
    steps: [
      {
        title: '1. Unread Notification Badging',
        description: 'Red badges indicate critical items like overdue action items or low-fidelity practice alerts.'
      },
      {
        title: '2. Direct Navigation',
        description: 'Clicking any notification takes you directly to the relevant action item or school evidence page.'
      },
      {
        title: '3. Mark as Read & Dismiss',
        description: 'Keep your alert feed clean by marking individual items or all notifications as read.'
      }
    ],
    proTip: 'Action SLA alerts trigger 3 days prior to the agreed resolution date.'
  },

  'system-settings': {
    title: 'Settings & Preferences Tutorial',
    badge: 'Configuration',
    summary: 'Configure language, user role simulation, AI transparency guardrails, and data cache.',
    steps: [
      {
        title: '1. Language Selector',
        description: 'Toggle between English (EN), हिन्दी (HI), and मराठी (MR) for full UI and speech synthesis.'
      },
      {
        title: '2. Role Simulation',
        description: 'Switch between Teacher, CRP Mentor, and Program Manager to test role-specific workflows.'
      },
      {
        title: '3. AI Trust & Privacy',
        description: 'Inspect the guardrails preventing hallucinated scores and ensuring data privacy.'
      },
      {
        title: '4. Reset Demo Dataset',
        description: 'Restore the system to its initial baseline demo state at any time.'
      }
    ],
    proTip: 'All settings are stored in local browser storage and persist across page reloads.'
  }
};

export const ONBOARDING_TOUR_STEPS = [
  {
    targetRoute: 'overview-dashboard',
    title: 'Welcome to Practice Layer',
    badge: 'Step 1 of 5',
    description: 'Practice Layer bridges training and actual classroom adoption using multi-modal AI and fast mentor workflows.',
    actionLabel: 'Explore Dashboard'
  },
  {
    targetRoute: 'capture-evidence',
    title: 'Capture Multi-Modal Evidence',
    badge: 'Step 2 of 5',
    description: 'Teachers snap tracker tally sheets and record 60-second voice reflections in their regional dialect.',
    actionLabel: 'Go to Capture'
  },
  {
    targetRoute: 'ai-coach-chat',
    title: 'AI Practice Coach',
    badge: 'Step 3 of 5',
    description: 'Deterministic feedback diagnoses classroom grouping and recommends ONE concrete, bite-sized next step.',
    actionLabel: 'Try AI Coach'
  },
  {
    targetRoute: 'mentor-visit-workflow',
    title: 'Fast In-Visit Mentor Capture',
    badge: 'Step 4 of 5',
    description: 'CRP Mentors execute rapid 4-step classroom observations and agree on actionable commitments.',
    actionLabel: 'See Mentor Flow'
  },
  {
    targetRoute: 'action-ledger',
    title: 'Action Ledger & SLA Accountability',
    badge: 'Step 5 of 5',
    description: 'All commitments are tracked through to verification, closing the feedback loop for every school.',
    actionLabel: 'Finish Tour'
  }
];
