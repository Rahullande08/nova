export const APP_ROLES = {
  TEACHER: {
    id: 'teacher',
    name: 'Sunita Rao',
    school: 'ZP Primary School Wadgaon',
    roleLabel: 'Teacher (Grade 3-4 FLN)',
    avatar: 'person',
    cluster: 'Haveli Cluster • Pune'
  },
  MENTOR: {
    id: 'mentor',
    name: 'Anand Patil',
    school: 'Haveli Resource Center',
    roleLabel: 'CRP / Instructional Mentor',
    avatar: 'supervisor_account',
    cluster: 'Haveli Cluster • 8 Schools'
  },
  PROGRAM_LEAD: {
    id: 'lead',
    name: 'Dr. Rajesh Deshmukh',
    school: 'State Education Mission',
    roleLabel: 'Program Officer / State Lead',
    avatar: 'admin_panel_settings',
    cluster: 'Maharashtra State FLN Mission'
  }
};

export const INITIAL_SCHOOLS = [
  {
    id: 'sch-1',
    name: 'ZP Primary School Wadgaon',
    block: 'Haveli',
    teachersCount: 4,
    studentsCount: 118,
    priority: 'HIGH',
    priorityScore: 92,
    daysSinceVisit: 16,
    flaggedSignal: 'Level-based grouping inconsistent (3 evidence submissions)',
    suggestedDemo: 'Demonstrate 4-corner level grouping',
    status: 'Needs Visit',
    lastEvidence: '2h ago by Sunita Rao',
    reasons: [
      '2 flagged audio notes from Teacher Sunita indicating confusion on letter vs. word grouping.',
      '0 visits this cycle (Exceeded target SLA interval by +2 days).',
      'Direct teacher request: Requested mentor modeling 48 hours ago via Practice Log.'
    ],
    levelsDistribution: { beginner: 22, letter: 28, word: 36, story: 14 },
    recentEvidence: [
      { id: 'ev-101', teacher: 'Sunita Rao', grade: 'Grade 3', time: '11:42 AM Today', type: 'Tracker + Voice', signal: 'Grouping inconsistent' },
      { id: 'ev-102', teacher: 'Pravin Gaikwad', grade: 'Grade 4', time: 'Yesterday', type: 'Voice Note', signal: 'Peer check omitted' }
    ]
  },
  {
    id: 'sch-2',
    name: 'ZP School Khed Shivapur',
    block: 'Haveli',
    teachersCount: 3,
    studentsCount: 84,
    priority: 'MEDIUM',
    priorityScore: 68,
    daysSinceVisit: 8,
    flaggedSignal: 'Low learner practice time during phonics (<10 min observed)',
    suggestedDemo: 'Model peer-paired reading',
    status: 'Visit Scheduled (Thursday 10:30 AM)',
    lastEvidence: '4d ago by Ramesh K',
    reasons: [
      'Learners actively practiced observed in only 1 of 3 recent sessions.',
      'CRP scheduled routine mid-cycle demonstration visit.',
      'Exit ticket verification pending for Grade 2 batch.'
    ],
    levelsDistribution: { beginner: 14, letter: 24, word: 42, story: 20 },
    recentEvidence: [
      { id: 'ev-103', teacher: 'Ramesh K', grade: 'Grade 2', time: '4d ago', type: 'Tracker Photo', signal: 'Low practice duration' }
    ]
  },
  {
    id: 'sch-3',
    name: 'ZP School Saswad',
    block: 'Haveli',
    teachersCount: 6,
    studentsCount: 190,
    priority: 'ON_TRACK',
    priorityScore: 24,
    daysSinceVisit: 3,
    flaggedSignal: 'All 5 rubric practices observed & verified by block monitor',
    suggestedDemo: 'Celebrate progress & document peer exemplar',
    status: 'Exemplar Hub',
    lastEvidence: 'Yesterday by Pooja Sharma',
    reasons: [
      'Demonstrated 100% adherence to 15-minute level grouping rotation.',
      'Active peer coaching observed between Grade 3 and Grade 4 teachers.',
      'Regular submission of verified TaRL OCR tracker tallies.'
    ],
    levelsDistribution: { beginner: 8, letter: 18, word: 44, story: 30 },
    recentEvidence: [
      { id: 'ev-104', teacher: 'Pooja Sharma', grade: 'Grade 3', time: 'Yesterday', type: 'Full Packet', signal: 'Exemplar pacing' }
    ]
  },
  {
    id: 'sch-4',
    name: 'ZP School Donje',
    block: 'Haveli',
    teachersCount: 3,
    studentsCount: 96,
    priority: 'LOW',
    priorityScore: 38,
    daysSinceVisit: 5,
    flaggedSignal: 'Formative assessment check omitted during word reading',
    suggestedDemo: 'Share 3-min exit ticket template',
    status: 'Action Sent',
    lastEvidence: '5d ago by Anjali P',
    reasons: [
      'Single occurrence of omitted checking understanding metric.',
      'Teacher acknowledged and loaded 3-min flashcard check into plan.'
    ],
    levelsDistribution: { beginner: 12, letter: 22, word: 40, story: 26 },
    recentEvidence: [
      { id: 'ev-105', teacher: 'Anjali P', grade: 'Grade 4', time: '5d ago', type: 'Voice Note', signal: 'Check omitted' }
    ]
  }
];

export const INITIAL_PRACTICE_RUBRIC = [
  {
    id: 1,
    title: '1. Grouped children by learning level',
    status: 'Observed',
    statusType: 'observed',
    evidence: 'Tracker shows 3 distinct level clusters verified with student roll marks.',
    tag: 'Cluster accuracy confirmed',
    confidence: '94% Confidence'
  },
  {
    id: 2,
    title: '2. Activity matched to learner level',
    status: 'Observed',
    statusType: 'observed',
    evidence: 'Word-level flashcards used as recorded in transcript and visual materials.',
    tag: 'Targeted print materials',
    confidence: '89% Confidence'
  },
  {
    id: 3,
    title: '3. Teacher checked understanding',
    status: 'Partly observed',
    statusType: 'partly_observed',
    evidence: 'Teacher noted checking 3 students, but no adjustment or check was described for beginner group.',
    tag: 'Formative sampling incomplete',
    confidence: '82% Confidence'
  },
  {
    id: 4,
    title: '4. Children practiced actively',
    status: 'Observed',
    statusType: 'observed',
    evidence: 'Peer reading routine implemented during 15-minute block with vocal repetition.',
    tag: 'High vocal engagement',
    confidence: '91% Confidence'
  },
  {
    id: 5,
    title: '5. Teacher adjusted instruction',
    status: 'Not observed in submitted evidence',
    statusType: 'not_observed',
    evidence: 'Time constraint prevented regrouping or paced shift for struggling learners in beginner tier.',
    tag: 'Evidence absent in voice log',
    confidence: '78% Confidence'
  }
];

export const ACTIVITY_LIBRARY = [
  {
    id: 'act-1',
    name: 'Number Line Challenge (संख्या रेषा आव्हान)',
    subject: 'Foundational Numeracy',
    grade: 'Grade 3–5',
    targetLevel: 'Beginner / Letter',
    duration: '10 min',
    materials: 'Chalk + number cards 1-50',
    language: 'Marathi / Hindi / English',
    practiceArea: 'Checking Understanding & Paced Adaptation',
    description: 'Draw a tactile floor ladder. Students place cards sequentially while speaking aloud to let you quickly assess grouping mastery in under 3 minutes.',
    steps: [
      'Draw 0-20 chalk increments on the classroom floor.',
      'Distribute 3 cards to each student in the beginner circle.',
      'Call out a number and ask children to step on the correct position.',
      'Use peer check: adjacent student confirms with a thumbs up.'
    ]
  },
  {
    id: 'act-2',
    name: '4-Corner Word Sort (शब्द वर्गीकरण)',
    subject: 'Foundational Literacy',
    grade: 'Grade 2–4',
    targetLevel: 'Word Level',
    duration: '15 min',
    materials: 'Word cards with 2-syllable and 3-syllable Marathi words',
    language: 'Marathi / Hindi',
    practiceArea: 'Level-Based Grouping',
    description: 'Designate 4 room corners for matra types. Children read their card in pairs and move to the corresponding corner, followed by immediate choral verification.',
    steps: [
      'Label 4 corners: काना (A), पहिली वेलांटी (I), दुसरी वेलांटी (EE), उकार (U).',
      'Give each pair 2 vocabulary cards.',
      'Allow 90 seconds of pair reading before moving to the corner.',
      'Teacher spends 2 minutes rotating across corners to verify pronunciation.'
    ]
  },
  {
    id: 'act-3',
    name: 'Pair Flashcard Relay (जोडी वाचन रिले)',
    subject: 'Foundational Literacy',
    grade: 'Grade 1–3',
    targetLevel: 'Letter / Word',
    duration: '12 min',
    materials: 'Letter flashcards + sand tray',
    language: 'Marathi / Hindi / English',
    practiceArea: 'Learner Active Practice',
    description: 'Pairs take turns drawing a card, sounding the phoneme, and tracing it in sand while the partner reads the corresponding keyword aloud.',
    steps: [
      'Place sand plates in the center of each small circle of 4.',
      'Partner A draws the card and sounds the letter.',
      'Partner B traces the letter in sand and says two rhyming words.',
      'Switch roles after 5 letters.'
    ]
  },
  {
    id: 'act-4',
    name: '3-Minute Exit Ticket Pulse (द्रुत पडताळणी)',
    subject: 'Foundational Literacy & Math',
    grade: 'Grade 2–5',
    targetLevel: 'All Levels',
    duration: '3 min',
    materials: 'Mini slate / chalk or scrap slips',
    language: 'All Languages',
    practiceArea: 'Checking Understanding',
    description: 'Rapid diagnostic checkpoint before transitioning activities. Students write one target word or solve one single-digit addition to signal readiness.',
    steps: [
      'Display 2 level-specific questions on the blackboard.',
      'Give students 120 seconds of silence to write their response on slate.',
      'Show-and-Tell: All students raise slates on the count of 3.',
      'Quick glance lets teacher identify anyone needing immediate regrouping.'
    ]
  }
];

export const ACTION_LEDGER_ITEMS = [
  {
    id: 'act-101',
    action: 'Demonstrate 4-corner level grouping during morning FLN block',
    owner: 'Anand Patil (CRP)',
    targetTeacher: 'Sunita Rao',
    school: 'ZP Primary School Wadgaon',
    createdDate: '2026-09-23',
    dueDate: '2026-09-28',
    status: 'Open',
    priority: 'High',
    evidenceRequired: 'CRP visit observation note + audio transcript',
    notes: 'Sunita reported that word-level learners are finishing early while beginner group is stagnant.'
  },
  {
    id: 'act-102',
    action: 'Implement 3-minute exit tickets for Grade 3 reading corner',
    owner: 'Sunita Rao (Teacher)',
    targetTeacher: 'Sunita Rao',
    school: 'ZP Primary School Wadgaon',
    createdDate: '2026-09-24',
    dueDate: '2026-09-27',
    status: 'In Progress',
    priority: 'Medium',
    evidenceRequired: 'Photo of slates / Tracker update',
    notes: 'Suggested by AI Coach following 11:42 AM practice submission.'
  },
  {
    id: 'act-103',
    action: 'Deploy peer reading flashcards for Grade 2 phonics',
    owner: 'Ramesh K (Teacher)',
    targetTeacher: 'Ramesh K',
    school: 'ZP School Khed Shivapur',
    createdDate: '2026-09-20',
    dueDate: '2026-09-25',
    status: 'Verified',
    priority: 'Medium',
    evidenceRequired: 'CRP observation in cycle 4 visit',
    notes: 'Demonstrated by CRP Anand Patil on Sept 22. Verified active student participation.'
  },
  {
    id: 'act-104',
    action: 'Update TaRL student level matrix baseline records',
    owner: 'Pooja Sharma (Teacher)',
    targetTeacher: 'Pooja Sharma',
    school: 'ZP School Saswad',
    createdDate: '2026-09-18',
    dueDate: '2026-09-22',
    status: 'Closed',
    priority: 'Low',
    evidenceRequired: 'OCR tracker upload completed',
    notes: 'All 31 students successfully mapped to beginner, letter, word, and story tiers.'
  }
];

export const TRAINING_MODULES = [
  {
    id: 'tr-1',
    title: 'TaRL Level-Based Grouping 2.0',
    domain: 'Instructional Management',
    teachersEnrolled: 48,
    teachersCompleted: 44,
    adoptionRate: 78,
    verifiedShiftRate: 64,
    status: 'High Impact',
    frictionPoint: 'Difficulty transitioning groups in multi-grade classrooms',
    systemAction: 'Deploy physical group divider mats & CRP demonstration'
  },
  {
    id: 'tr-2',
    title: '3-Minute Formative Exit Checks',
    domain: 'Assessment for Learning',
    teachersEnrolled: 42,
    teachersCompleted: 39,
    adoptionRate: 52,
    verifiedShiftRate: 41,
    status: 'Needs Support',
    frictionPoint: 'Teachers run out of time at the end of the 45-min period',
    systemAction: 'Embed timer prompts into daily lesson flashcards'
  },
  {
    id: 'tr-3',
    title: 'Phonics Multi-Sensory Blends',
    domain: 'Foundational Literacy',
    teachersEnrolled: 45,
    teachersCompleted: 45,
    adoptionRate: 84,
    verifiedShiftRate: 76,
    status: 'High Impact',
    frictionPoint: 'Minor confusion on complex joint letters (जोडाक्षर)',
    systemAction: 'Distribute joint-letter tactile flashcard kits'
  }
];

export const NOTIFICATIONS_DATA = [
  {
    id: 'notif-1',
    type: 'evidence',
    title: 'New Evidence Submitted',
    description: 'Pooja Sharma uploaded 2 audio clips & tracker photo for ZP School A.',
    time: '22m ago',
    unread: true,
    targetRoute: 'school-evidence'
  },
  {
    id: 'notif-2',
    type: 'coaching',
    title: 'AI Coaching Generated',
    description: 'Single Next Step prepared for Sunita Rao: "3-minute formative pulse check".',
    time: '1h ago',
    unread: true,
    targetRoute: 'ai-coach-chat'
  },
  {
    id: 'notif-3',
    type: 'mentor',
    title: 'Visit Priority Alert',
    description: 'ZP Primary School Wadgaon has exceeded 14-day visit window (+2 days).',
    time: '2h ago',
    unread: true,
    targetRoute: 'crp-mentor-dashboard'
  },
  {
    id: 'notif-4',
    type: 'action',
    title: 'Action Item Verified',
    description: 'Anand Patil verified level-based grouping in ZP School Saswad.',
    time: '5h ago',
    unread: false,
    targetRoute: 'action-ledger'
  }
];
