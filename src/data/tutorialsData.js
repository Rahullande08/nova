// Centralized Tutorial Specifications for Practice Layer Major Pages
// Multi-language support: English (EN), Marathi (MR), Hindi (HI)

export const TUTORIALS_DATA = {
  EN: {
    'overview-dashboard': {
      title: 'Dashboard Tutorial',
      badge: 'System Overview',
      summary: 'Monitor teacher practice velocity and identify priority signals across all cluster schools in real time.',
      steps: [
        {
          title: '1. Review Practice Health Index',
          description: 'See the composite health score based on group work fidelity, tracker recency, and activity adoption.'
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
  },
  MR: {
    'overview-dashboard': {
      title: 'डॅशबोर्ड ट्यूटोरियल',
      badge: 'प्रणाली अवलोकन',
      summary: 'सर्व केंद्र शाळांमधील शिक्षक सराव गती आणि प्राधान्य निर्देशकांचे थेट निरीक्षण करा.',
      steps: [
        {
          title: '१. सराव आरोग्य निर्देशांक तपासा',
          description: 'गटकार्य अचूकता, ट्रॅकर अद्ययावतता आणि उपक्रम अवलंबनावर आधारित एकूण स्कोअर पहा.'
        },
        {
          title: '२. प्राधान्य शाळा व इशारा सूचना',
          description: 'कमी गटकार्य गुणवत्ता किंवा भेट मुदत संपत असलेल्या शाळा लाल/पिवळ्या रंगात दिसतात.'
        },
        {
          title: '३. सराव चक्र गती',
          description: 'साप्ताहिक वर्ग निरीक्षणे, शिक्षक पुरावे आणि पडताळणी केलेल्या कृतींची तुलना करा.'
        },
        {
          title: '४. भूमिका बदल',
          description: 'वर उजव्या कोपऱ्यातील प्रोफाइलमधून शिक्षक, मेंटर किंवा व्यवस्थापक दृश्य निवडा.'
        }
      ],
      proTip: 'थेट भेट नियोजनात जाण्यासाठी कोणत्याही प्राधान्य शाळा कार्डवर क्लिक करा.'
    },
    'capture-evidence': {
      title: 'पुरावा नोंदणी ट्यूटोरियल',
      badge: 'शिक्षक कार्यप्रवाह',
      summary: 'ऑफलाइन समर्थनासह ६० सेकंदांत वर्गातील पुरावा सादर करा.',
      steps: [
        {
          title: '१. ट्रॅकर फोटो जोडा',
          description: 'आपली स्तर नोंदणी शीट अपलोड करा किंवा सॅम्पल शीट वापरा.'
        },
        {
          title: '२. व्हॉइस संदेश रेकॉर्ड करा',
          description: 'गटकार्य आव्हाने आणि अनुभवांबद्दल मराठीत किंवा इंग्रजीत बोला.'
        },
        {
          title: '३. ऐका व तपासा',
          description: 'सादर करण्यापूर्वी रेकॉर्डिंग तपासा किंवा पुन्हा रेकॉर्ड करा.'
        },
        {
          title: '४. एआय विश्लेषणासाठी सादर करा',
          description: 'त्वरित ५-सूत्रीय अभिप्राय, रडार गुण आणि पुढील कृती उपक्रम मिळवा.'
        }
      ],
      proTip: 'मायक्रोफोनद्वारे प्रत्यक्ष आवाज रेकॉर्ड करा किंवा तात्काळ चाचणी घ्या.'
    },
    'ai-coach-chat': {
      title: 'एआय सराव मार्गदर्शक ट्यूटोरियल',
      badge: 'अध्यापन मार्गदर्शन',
      summary: 'शिक्षकांवर ताण न येता एका वेळी एकच अचूक कृती मार्गदर्शन मिळवा.',
      steps: [
        {
          title: '१. "तुमचे पुढील पाऊल" समजून घ्या',
          description: 'एआय अचूक एकच सोपे शैक्षणिक पाऊल सुचवते (उदा. १५ मिनिटे अक्षर वाचन सराव).'
        },
        {
          title: '२. बहुआयामी रूब्रिक विश्लेषण',
          description: 'गटकार्य अचूकता, वेळ व्यवस्थापन आणि समज तपासणी स्कोअर तपासा.'
        },
        {
          title: '३. ऑडिओ मार्गदर्शन ऐका',
          description: '"मार्गदर्शन ऐका" वर क्लिक करून मराठीत मार्गदर्शन ऐका.'
        },
        {
          title: '४. प्रश्न विचारा',
          description: 'वर्ग व्यवस्थापन किंवा विद्यार्थ्यांच्या अडचणींबाबत एआयशी संवाद साधा.'
        }
      ],
      proTip: 'एआयची प्रत्येक शिफारस थेट उपक्रम लायब्ररीमधील उपक्रमाशी जोडलेली असते.'
    },
    'my-practice-log': {
      title: 'माझा सराव इतिहास ट्यूटोरियल',
      badge: 'शिक्षक पोर्टफोलिओ',
      summary: 'पूर्वीचे वर्ग सादरीकरण, प्रगती आलेख आणि मेंटर अभिप्राय तपासा.',
      steps: [
        {
          title: '१. प्रगती टाइमलाइन',
          description: 'गटकार्य व अध्यापन गतीमधील सुधारणांचा कालक्रमानुसार आढावा घ्या.'
        },
        {
          title: '२. पडताळलेले पुरावे',
          description: 'मागील फोटो, ट्रान्सक्रिप्ट आणि रूब्रिक स्कोअर तपासा.'
        },
        {
          title: '३. कृती बाबींची स्थिती',
          description: 'मेंटर भेटीत ठरवलेल्या सरावांच्या पूर्ततेची स्थिती पहा.'
        }
      ],
      proTip: 'मासिक केंद्र बैठकीत विद्यार्थ्यांच्या प्रगतीसाठी हा इतिहास वापरा.'
    },
    'activity-library': {
      title: 'उपक्रम ग्रंथालय ट्यूटोरियल',
      badge: 'TaRL अध्यापन बँक',
      summary: 'पायाभूत अध्ययन तासासाठी १०-१५ मिनिटांचे वर्ग-चाचणी झालेले उपक्रम शोधा.',
      steps: [
        {
          title: '१. स्तर व विषयानुसार फिल्टर',
          description: 'प्रारंभिक, अक्षर, शब्द किंवा परिच्छेद स्तर आणि भाषानुसार निवडा.'
        },
        {
          title: '२. उपक्रम रूपरेषा पहा',
          description: 'पायऱ्या, अल्पखर्चिक साहित्य आणि सर्वसामान्य अडचणींची माहिती घ्या.'
        },
        {
          title: '३. अध्यापन योजनेत जोडा',
          description: 'उपक्रम आपल्या साप्ताहिक वेळापत्रकात किंवा मेंटर नोंदीत जोडा.'
        }
      ],
      proTip: 'शोध बॉक्समध्ये "ध्वनी" किंवा "ग्रीड" शोधून त्वरित सराव मिळवा.'
    },
    'crp-mentor-dashboard': {
      title: 'मेंटर डॅशबोर्ड ट्यूटोरियल',
      badge: 'केंद्र साधन व्यक्ती',
      summary: 'अंदाज लावण्याऐवजी अचूक विश्लेषणावर आधारित शाळा भेटींचे प्राधान्य ठरवा.',
      steps: [
        {
          title: '१. प्राधान्य शाळा क्रमवारी',
          description: 'जोखीम गुणांक आणि शेवटच्या भेटीच्या अंतरानुसार शाळांची यादी पहा.'
        },
        {
          title: '२. केंद्र सराव आरोग्य',
          description: 'भेट पूर्णता दर, खुल्या कृती बाबी आणि मार्गदर्शन गुणवत्ता तपासा.'
        },
        {
          title: '३. जलद भेट सुरू करा',
          description: '४-चरणीय वर्ग निरीक्षण सुरू करण्यासाठी कोणत्याही शाळा कार्डवर क्लिक करा.'
        }
      ],
      proTip: '२० दिवसांपेक्षा जास्त काळ भेट न झालेल्या शाळांना आपोआप इशारा दिला जातो.'
    },
    'visit-plan': {
      title: 'भेट नियोजन ट्यूटोरियल',
      badge: 'मार्ग व वेळापत्रक',
      summary: 'शिक्षकांच्या पूर्व-माहितीसह साप्ताहिक केंद्र शाळा भेटींचे नियोजन करा.',
      steps: [
        {
          title: '१. नियोजित वेळापत्रक',
          description: 'शाळेच्या गरजेनुसार तयार केलेले इष्टतम भेट वेळापत्रक पहा.'
        },
        {
          title: '२. भेट-पूर्व माहिती',
          description: 'शाळेत जाण्यापूर्वी मागील निरीक्षण नोंदी व प्रलंबित कृती तपासा.'
        },
        {
          title: '३. एक-क्लिक आगमन व नोंदणी',
          description: 'आगमन नोंदवून थेट इन-व्हिजिट निरीक्षण विझार्ड सुरू करा.'
        }
      ],
      proTip: 'वर्ग निरीक्षणापूर्वी नेहमी "प्रलंबित कृती बाबी" तपासा.'
    },
    'school-evidence-feed': {
      title: 'शाळा पुरावा फीड ट्यूटोरियल',
      badge: 'केंद्र टेलीमेट्री',
      summary: 'केंद्रातील सर्व वर्गांमधील मूळ व विश्लेषित पुरावे तपासा.',
      steps: [
        {
          title: '१. पुरावा प्रवाह',
          description: 'शिक्षकांनी पाठवलेले ट्रॅकर फोटो, व्हॉइस नोट्स व एआय स्कोअर पहा.'
        },
        {
          title: '२. निकषानुसार फिल्टर',
          description: '"गट जोखीम", "जुना ट्रॅकर" किंवा "उत्कृष्ट प्रगती" नुसार वर्गीकरण करा.'
        },
        {
          title: '३. मेंटर पडताळणी',
          description: 'फीडमधूनच थेट मेंटर शेरा जोडा किंवा गुण सुधारा.'
        }
      ],
      proTip: 'तपशीलवार ओसीआर आणि ट्रान्सक्रिप्ट पाहण्यासाठी कोणत्याही कार्डवर क्लिक करा.'
    },
    'mentor-visit-workflow': {
      title: 'जलद वर्ग निरीक्षण ट्यूटोरियल',
      badge: '४-चरणीय विझार्ड',
      summary: 'आवाज नोंदणीसह १५ मिनिटांचे जलद वर्ग निरीक्षण आणि कृती करार करा.',
      steps: [
        {
          title: 'पायरी १: शाळा व वर्ग संदर्भ',
          description: 'शाळा, शिक्षक, इयत्ता व विषय निवडा.'
        },
        {
          title: 'पायरी २: रूब्रिक मूल्यमापन',
          description: 'गटकार्य, वेळ वाटप, साहित्य व समज तपासणीचे गुण नोंदवा.'
        },
        {
          title: 'पायरी ३: आवाज / मजकूर नोंदी',
          description: 'मायक्रोफोनने निरीक्षण शेरा रेकॉर्ड करा किंवा टाइप करा.'
        },
        {
          title: 'पायरी ४: संयुक्त कृती करार',
          description: 'शिक्षकांसाठी मुदतीसह एक ठोस कृती ठरवा आणि लेजरमध्ये जतन करा.'
        }
      ],
      proTip: 'सारांश जनरेटर शिक्षकांसाठी त्वरित WhatsApp-योग्य संदेश तयार करतो.'
    },
    'action-ledger': {
      title: 'कृती लेजर ट्यूटोरियल',
      badge: 'उत्तरदायित्व चक्र',
      summary: 'शिक्षक व मेंटर्समधील सर्व शैक्षणिक कृतींची नोंद व पडताळणी करा.',
      steps: [
        {
          title: '१. स्थिती चक्र',
          description: 'प्रलंबित → प्रगतीपथावर → पडताळलेले → पूर्ण.'
        },
        {
          title: '२. मुदत व एसएलए ट्रॅकिंग',
          description: 'मुदत संपलेल्या किंवा त्वरित पडताळणी आवश्यक असलेल्या बाबी ओळखा.'
        },
        {
          title: '३. शोध व फिल्टर',
          description: 'स्थितीनुसार किंवा शिक्षकांच्या नावाने शोधा.'
        },
        {
          title: '४. CSV डाउनलोड',
          description: 'तालुका बैठकीसाठी अधिकृत अहवाल CSV स्वरूपात डाउनलोड करा.'
        }
      ],
      proTip: 'तपशील पाहण्यासाठी आणि शेरा जोडण्यासाठी कोणत्याही ओळीवर क्लिक करा.'
    },
    'training-to-practice': {
      title: 'प्रशिक्षण ते सराव विश्लेषण ट्यूटोरियल',
      badge: 'प्रभाव विश्लेषण',
      summary: 'कार्यशाळा प्रशिक्षण वर्गातील प्रत्यक्ष सरावात कसे रूपांतरित होते याचे विश्लेषण करा.',
      steps: [
        {
          title: '१. प्रशिक्षण मॉड्युल आढावा',
          description: 'शिक्षकांचे मॉड्युल पूर्णता दर तपासा.'
        },
        {
          title: '२. वर्ग अवलंबन निर्देशांक',
          description: 'प्रशिक्षित शिक्षकांपैकी कितीजण प्रत्यक्ष वर्गात पद्धती वापरत आहेत ते मोजा.'
        },
        {
          title: '३. सराव घट ओळख',
          description: 'प्रशिक्षणानंतर ज्या शाळांमध्ये सराव कमी झाला आहे तिथे डेमो भेटीचे नियोजन करा.'
        }
      ],
      proTip: 'अंमलबजावणीतील त्रुटी ओळखण्यासाठी पूर्णता दर आणि वर्ग स्कोअरची तुलना करा.'
    },
    'reports-insights': {
      title: 'अहवाल व निष्कर्ष ट्यूटोरियल',
      badge: 'प्रशासकीय विश्लेषण',
      summary: 'केंद्र कल, तालुका तुलना आणि सराव विश्लेषण अहवाल तयार करा.',
      steps: [
        {
          title: '१. केंद्र कल',
          description: '६ महिन्यांचा गटकार्य आणि सहभाग आलेख पहा.'
        },
        {
          title: '२. सराव गती हीटमॅप',
          description: 'उत्कृष्ट शाळा आणि अतिरिक्त मदतीची गरज असलेल्या शाळा ओळखा.'
        },
        {
          title: '३. निर्यातयोग्य सारांश',
          description: 'DIET आणि अधिकाऱ्यांच्या बैठकांसाठी अहवाल तयार करा.'
        }
      ],
      proTip: 'प्रशिक्षणापूर्वीचा आणि नंतरचा बदल तपासण्यासाठी तारीख फिल्टर वापरा.'
    },
    'system-notifications': {
      title: 'सूचना ट्यूटोरियल',
      badge: 'सूचना केंद्र',
      summary: 'महत्त्वाच्या सूचना, पुरावा प्रक्रिया आणि भेट आठवणींबाबत माहिती मिळवा.',
      steps: [
        {
          title: '१. न वाचलेल्या सूचना',
          description: 'लाल बॅज मुदत संपलेल्या किंवा महत्त्वाच्या बाबी दर्शवतो.'
        },
        {
          title: '२. थेट नेव्हिगेशन',
          description: 'सूचनेवर क्लिक करून थेट संबंधित कृती किंवा शाळेवर जा.'
        },
        {
          title: '३. वाचल्याचे चिन्हांकित करा',
          description: 'सूचना वाचल्या म्हणून चिन्हांकित करून सूची स्वच्छ ठेवा.'
        }
      ],
      proTip: 'कृती मुदतीच्या ३ दिवस आधी सूचना पाठवली जाते.'
    },
    'system-settings': {
      title: 'सेटिंग्ज व प्राधान्ये ट्यूटोरियल',
      badge: 'कॉन्फिगरेशन',
      summary: 'भाषा, भूमिका, एआय पारदर्शकता आणि डेटाबेस पर्याय नियंत्रित करा.',
      steps: [
        {
          title: '१. भाषा निवड',
          description: 'संपूर्ण ॲप आणि आवाजासाठी English किंवा मराठी निवडा.'
        },
        {
          title: '२. भूमिका निवड',
          description: 'शिक्षक, केंद्र साधन व्यक्ती किंवा व्यवस्थापक भूमिका तपासा.'
        },
        {
          title: '३. एआय विश्वास व सुरक्षा',
          description: 'अचूक गुणांक आणि गोपनीयता सुनिश्चित करणाऱ्या नियमांची माहिती घ्या.'
        },
        {
          title: '४. डेमो डेटा रिसेट',
          description: 'आवश्यकतेनुसार सुरुवातीचा डेमो डेटा पुन्हा स्थापित करा.'
        }
      ],
      proTip: 'सर्व प्राधान्ये ब्राउझरमध्ये सुरक्षित ठेवली जातात.'
    }
  }
};

export const ONBOARDING_TOUR_STEPS = {
  EN: [
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
  ],
  MR: [
    {
      targetRoute: 'overview-dashboard',
      title: 'प्रॅक्टिस लेयरमध्ये आपले स्वागत आहे',
      badge: 'पायरी १/५',
      description: 'प्रॅक्टिस लेयर बहुआयामी एआय आणि जलद मेंटर कार्यप्रवाहाद्वारे प्रशिक्षण आणि प्रत्यक्ष वर्ग सरावाचा सेतू बांधते.',
      actionLabel: 'डॅशबोर्ड पहा'
    },
    {
      targetRoute: 'capture-evidence',
      title: 'वर्ग पुरावा नोंदवा',
      badge: 'पायरी २/५',
      description: 'शिक्षक स्तर नोंदणी फोटो अपलोड करतात आणि प्रादेशिक भाषेत ६० सेकंदांचा व्हॉइस संदेश रेकॉर्ड करतात.',
      actionLabel: 'पुरावा नोंदणीकडे जा'
    },
    {
      targetRoute: 'ai-coach-chat',
      title: 'एआय सराव मार्गदर्शक',
      badge: 'पायरी ३/५',
      description: 'अचूक विश्लेषण वर्ग गटकार्याचे निदान करते आणि एका वेळी एकच सोपे पुढील पाऊल सुचवते.',
      actionLabel: 'एआय मार्गदर्शक पहा'
    },
    {
      targetRoute: 'mentor-visit-workflow',
      title: 'जलद इन-व्हिजिट मेंटर निरीक्षण',
      badge: 'पायरी ४/५',
      description: 'केंद्र साधन व्यक्ती ४-चरणीय जलद वर्ग निरीक्षण करतात आणि कृती करारावर स्वाक्षरी करतात.',
      actionLabel: 'मेंटर प्रवाह पहा'
    },
    {
      targetRoute: 'action-ledger',
      title: 'कृती लेजर व उत्तरदायित्व',
      badge: 'पायरी ५/५',
      description: 'प्रत्येक शाळेतील सराव चक्र पूर्ण करण्यासाठी सर्व कृतींची पडताळणीपर्यंत नोंद ठेवली जाते.',
      actionLabel: 'मार्गदर्शन पूर्ण'
    }
  ]
};

const ROUTE_ALIASES = {
  dashboard: 'overview-dashboard',
  'overview-dashboard': 'overview-dashboard',
  capture: 'capture-evidence',
  'capture-evidence': 'capture-evidence',
  coach: 'ai-coach-chat',
  'ai-coach': 'ai-coach-chat',
  'ai-coach-chat': 'ai-coach-chat',
  practice: 'my-practice-log',
  'my-practice': 'my-practice-log',
  'my-practice-log': 'my-practice-log',
  activities: 'activity-library',
  activity: 'activity-library',
  'activity-library': 'activity-library',
  mentor: 'crp-mentor-dashboard',
  crp: 'crp-mentor-dashboard',
  'crp-mentor-dashboard': 'crp-mentor-dashboard',
  visits: 'visit-plan',
  'visit-plan': 'visit-plan',
  schools: 'school-evidence-feed',
  evidence: 'school-evidence-feed',
  'evidence-feed': 'school-evidence-feed',
  'school-evidence-feed': 'school-evidence-feed',
  'mentor-visit': 'mentor-visit-workflow',
  'mentor-visit-workflow': 'mentor-visit-workflow',
  actions: 'action-ledger',
  'action-ledger': 'action-ledger',
  training: 'training-to-practice',
  'training-to-practice': 'training-to-practice',
  reports: 'reports-insights',
  'reports-insights': 'reports-insights',
  notifications: 'system-notifications',
  'system-notifications': 'system-notifications',
  settings: 'system-settings',
  'system-settings': 'system-settings'
};

export function getTutorialData(pageKey, lang = 'EN') {
  const normLang = (lang || 'EN').toUpperCase();
  const dict = TUTORIALS_DATA[normLang] || TUTORIALS_DATA.EN;
  const canonicalKey = ROUTE_ALIASES[pageKey] || pageKey || 'overview-dashboard';
  return dict[canonicalKey] || dict['overview-dashboard'] || TUTORIALS_DATA.EN['overview-dashboard'];
}

export function getTourSteps(lang = 'EN') {
  const normLang = (lang || 'EN').toUpperCase();
  return ONBOARDING_TOUR_STEPS[normLang] || ONBOARDING_TOUR_STEPS.EN;
}
