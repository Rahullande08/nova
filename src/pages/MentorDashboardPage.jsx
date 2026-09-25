import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { audioService } from '../services/audioService';
import { TutorialButton } from '../components/TutorialButton';

export function MentorDashboardPage() {
  const { setCurrentRoute, setSelectedSchoolId, showToast, t } = useApp();

  const [selectedChips, setSelectedChips] = useState({
    grouping: true,
    taskLevel: false,
    checkingUnderstanding: true,
    learnerParticipation: false,
    adaptation: false
  });

  const [isRecordingObservation, setIsRecordingObservation] = useState(false);
  const [expandedSchools, setExpandedSchools] = useState({ 'sch-1': true });
  const [whatsappDraftEnabled, setWhatsappDraftEnabled] = useState(true);

  const toggleChip = (chipKey) => {
    setSelectedChips((prev) => ({ ...prev, [chipKey]: !prev[chipKey] }));
  };

  const toggleExpandSchool = (schoolId) => {
    setExpandedSchools((prev) => ({ ...prev, [schoolId]: !prev[schoolId] }));
  };

  const handleToggleRecording = async () => {
    if (isRecordingObservation) {
      setIsRecordingObservation(false);
      audioService.stopRecording();
      showToast('Mentor observation transcribed and structured into Rubric!');
    } else {
      setIsRecordingObservation(true);
      await audioService.startRecording();
    }
  };

  const handleStartVisitWorkflow = (schoolId) => {
    setSelectedSchoolId(schoolId);
    setCurrentRoute('mentor-visit-workflow');
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto pb-8">
      {/* Header with Tutorial */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant w-fit">
            <span className="material-symbols-outlined text-[14px] text-secondary">verified_user</span>
            <span className="font-label-sm text-[11px] uppercase tracking-wider font-bold">
              Cluster Resource Person (CRP) Portal
            </span>
          </div>
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-xl md:text-2xl text-on-surface font-bold tracking-tight">
            {t('mentorDashboard', 'Mentor Dashboard')}
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
            Know where your support can make the biggest difference.
          </p>
        </div>
        <TutorialButton pageKey="crp-mentor-dashboard" variant="outline" className="shrink-0" />
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {/* Metric 1 */}
        <div className="bg-surface-container-lowest p-3.5 md:p-4 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-on-surface-variant">Schools to Visit</span>
            <span className="material-symbols-outlined text-secondary text-[20px]">corporate_fare</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-headline-xl text-2xl md:text-3xl text-on-surface font-bold font-numeric">
              8
            </span>
            <span className="font-label-sm text-[11px] text-on-surface-variant">in cluster</span>
          </div>
          <div className="mt-2 w-full bg-surface-container h-1 rounded-full overflow-hidden">
            <div className="bg-secondary h-full w-3/5 rounded-full"></div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-lowest p-3.5 md:p-4 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-on-surface-variant">High Priority</span>
            <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-headline-xl text-2xl md:text-3xl text-error font-bold font-numeric">
              3
            </span>
            <span className="font-label-sm text-[10px] text-on-error-container bg-error-container px-1.5 py-0.5 rounded-full font-bold">
              Immediate
            </span>
          </div>
          <span className="font-label-sm text-[11px] text-on-surface-variant mt-1.5">
            &gt;14 days unvisited
          </span>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-lowest p-3.5 md:p-4 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-on-surface-variant">Actions Due</span>
            <span className="material-symbols-outlined text-on-surface text-[20px]">checklist</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-headline-xl text-2xl md:text-3xl text-on-surface font-bold font-numeric">
              12
            </span>
            <span className="font-label-sm text-[11px] text-secondary font-bold">4 overdue</span>
          </div>
          <span className="font-label-sm text-[11px] text-on-surface-variant mt-1.5">
            Post-demonstration
          </span>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-container-lowest p-3.5 md:p-4 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-on-surface-variant">Follow-ups</span>
            <span className="material-symbols-outlined text-secondary text-[20px]">sync</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-headline-xl text-2xl md:text-3xl text-on-surface font-bold font-numeric">
              5
            </span>
            <span className="font-label-sm text-[11px] text-on-surface-variant">this block</span>
          </div>
          <span className="font-label-sm text-[11px] text-on-tertiary-container font-bold mt-1.5">
            2 completed
          </span>
        </div>
      </div>

      {/* In-Visit Fast Capture Card */}
      <div className="bg-surface-container-low p-4 md:p-5 rounded-xl shadow-sm border border-outline-variant/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-secondary text-on-secondary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
                In-Visit Fast Capture
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Structured diagnostic entry during classroom observation
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full font-label-sm text-[11px] bg-surface-container-highest text-secondary font-bold">
            Active Session
          </span>
        </div>

        {/* Quick Observation Taps */}
        <div className="space-y-1.5 pt-1">
          <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
            Quick Observation Rubric Taps
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[
              { key: 'grouping', label: 'Grouping', icon: 'groups' },
              { key: 'taskLevel', label: 'Task Level', icon: 'layers' },
              { key: 'checkingUnderstanding', label: 'Checking Understanding', icon: 'fact_check' },
              { key: 'learnerParticipation', label: 'Learner Participation', icon: 'record_voice_over' },
              { key: 'adaptation', label: 'Adaptation', icon: 'auto_fix_high' }
            ].map((chip) => {
              const isSelected = selectedChips[chip.key];
              return (
                <button
                  key={chip.key}
                  onClick={() => toggleChip(chip.key)}
                  className={`px-3 py-1.5 rounded-full font-label-sm text-xs flex items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-secondary text-on-secondary font-bold shadow-xs'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">{chip.icon}</span>
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Record Voice Observation Button */}
        <div className="pt-1">
          <button
            onClick={handleToggleRecording}
            className={`w-full h-12 rounded-xl font-headline-sm text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 ${
              isRecordingObservation
                ? 'bg-error text-on-error animate-pulse'
                : 'bg-primary text-on-primary hover:opacity-90'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isRecordingObservation ? 'radio_button_checked' : 'mic'}
            </span>
            <span>
              {isRecordingObservation
                ? 'Listening & Transcribing Observation... (Tap to Finish)'
                : 'Record Visit Voice Observation'}
            </span>
          </button>
          <p className="font-body-sm text-[11px] text-on-surface-variant text-center mt-1">
            Transcribes live in Marathi/Hindi & maps against FLN rubrics
          </p>
        </div>

        {/* Pre-draft Toggle */}
        <div className="bg-surface-container-lowest p-3 rounded-lg flex items-center justify-between border border-outline-variant/20 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">smart_toy</span>
            <div>
              <span className="font-label-md text-xs text-on-surface font-bold block">
                Pre-draft Teacher WhatsApp Action Note
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant">
                Review before AI dispatches to teacher
              </span>
            </div>
          </div>
          <button
            onClick={() => setWhatsappDraftEnabled(!whatsappDraftEnabled)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
              whatsappDraftEnabled ? 'bg-secondary justify-end' : 'bg-surface-container justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-surface-container-lowest shadow-sm"></div>
          </button>
        </div>
      </div>

      {/* Recommended Visit Plan Queue */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-md text-base md:text-lg text-on-surface font-bold">
              Recommended Visit Plan
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Automated daily priority queue for field travel
            </p>
          </div>
          <span className="font-label-sm text-xs font-bold bg-surface-container-high px-2.5 py-0.5 rounded-full text-on-surface">
            Haveli Cluster
          </span>
        </div>

        {/* Deterministic Governance Metric Banner */}
        <div className="bg-surface-container-low p-3.5 rounded-xl flex items-start gap-2.5 border border-outline-variant/20">
          <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">policy</span>
          <div className="space-y-0.5">
            <span className="font-label-sm text-xs font-bold uppercase text-secondary tracking-wider block">
              Deterministic Governance Metric
            </span>
            <p className="font-body-sm text-xs text-on-surface leading-snug">
              Priority ranking is deterministic based on: <strong>(1) Repeated practice signal</strong>,{' '}
              <strong>(2) Days since mentor visit (&gt;14d)</strong>, and{' '}
              <strong>(3) Direct teacher assistance request</strong>. Non-black-box governance standard.
            </p>
          </div>
        </div>

        {/* Schools List */}
        <div className="space-y-3">
          {/* School 1: HIGH PRIORITY (Wadgaon) */}
          <div className="bg-surface-container-lowest p-4 md:p-5 rounded-xl shadow-sm border border-outline-variant/20 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full font-label-sm text-[10px] bg-error-container text-on-error-container font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                    HIGH PRIORITY
                  </span>
                  <span className="font-label-sm text-xs text-on-surface-variant">Cycle 4</span>
                </div>
                <h3 className="font-headline-sm text-sm md:text-base text-on-surface font-bold mt-1">
                  ZP Primary School Wadgaon
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Block Haveli • 4 FLN Teachers • 118 Students
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-headline-sm text-base md:text-lg text-error font-bold font-numeric">
                  16d
                </span>
                <p className="font-label-sm text-[10px] text-on-surface-variant">since visit</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-surface-container-low space-y-0.5 border border-outline-variant/20">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-error">warning</span>
                <span className="font-label-sm text-[10px] font-bold uppercase">
                  Flagged Pedagogical Signal
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface font-semibold">
                Level-based grouping inconsistent (3 evidence submissions)
              </p>
            </div>

            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">school</span>
              <div>
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Suggested Demonstration
                </span>
                <p className="font-body-md text-xs md:text-sm text-on-surface font-bold">
                  Demonstrate 4-corner level grouping
                </p>
              </div>
            </div>

            <div className="pt-1 flex flex-col gap-2">
              <button
                onClick={() => handleStartVisitWorkflow('sch-1')}
                className="w-full h-11 rounded-lg bg-secondary text-on-secondary font-label-md text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-secondary/90 transition-all active:scale-98"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">navigation</span>
                <span>Start Visit Workflow</span>
              </button>

              <div>
                <button
                  onClick={() => toggleExpandSchool('sch-1')}
                  className="w-full py-1.5 flex items-center justify-center gap-1 text-secondary font-label-sm text-xs font-bold hover:bg-surface-container rounded-lg transition-colors"
                  type="button"
                >
                  <span>Why this school? (Deterministic breakdown)</span>
                  <span
                    className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                      expandedSchools['sch-1'] ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {expandedSchools['sch-1'] && (
                  <div className="mt-2 p-3 rounded-lg bg-surface-container space-y-2 text-xs border border-outline-variant/30 animate-in fade-in duration-150">
                    <div className="flex items-center gap-2 text-on-surface">
                      <span className="material-symbols-outlined text-error text-[16px]">
                        record_voice_over
                      </span>
                      <span>
                        <strong>2 flagged audio notes</strong> from Teacher Sunita indicating confusion on letter vs. word grouping.
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface">
                      <span className="material-symbols-outlined text-secondary text-[16px]">
                        event_busy
                      </span>
                      <span>
                        <strong>0 visits this cycle</strong> (Exceeded target SLA interval by +2 days).
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface">
                      <span className="material-symbols-outlined text-on-tertiary-container text-[16px]">
                        handshake
                      </span>
                      <span>
                        <strong>Direct teacher request:</strong> Requested mentor modeling 48 hours ago via Practice Log.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* School 2: MEDIUM PRIORITY (Khed Shivapur) */}
          <div className="bg-surface-container-lowest p-4 md:p-5 rounded-xl shadow-sm border border-outline-variant/20 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full font-label-sm text-[10px] bg-secondary-fixed text-on-secondary-fixed font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    MEDIUM PRIORITY
                  </span>
                  <span className="font-label-sm text-xs text-on-surface-variant">Cycle 4</span>
                </div>
                <h3 className="font-headline-sm text-sm md:text-base text-on-surface font-bold mt-1">
                  ZP School Khed Shivapur
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Block Haveli • 3 FLN Teachers • 84 Students
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-headline-sm text-base md:text-lg text-on-surface font-bold font-numeric">
                  8d
                </span>
                <p className="font-label-sm text-[10px] text-on-surface-variant">since visit</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-surface-container-low space-y-0.5 border border-outline-variant/20">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-secondary">insights</span>
                <span className="font-label-sm text-[10px] font-bold uppercase">
                  Practice Metric Alert
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface font-semibold">
                Low learner practice time during phonics (&lt;10 min observed)
              </p>
            </div>

            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">school</span>
              <div>
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Suggested Demonstration
                </span>
                <p className="font-body-md text-xs md:text-sm text-on-surface font-bold">
                  Model peer-paired reading
                </p>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={() => setCurrentRoute('visit-plan')}
                className="w-full h-11 rounded-lg bg-surface-container text-on-surface font-label-md text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">event</span>
                <span>Scheduled for Thursday (10:30 AM)</span>
              </button>
            </div>
          </div>

          {/* School 3: ON TRACK (Saswad) */}
          <div className="bg-surface-container-lowest p-4 md:p-5 rounded-xl shadow-sm border border-outline-variant/20 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full font-label-sm text-[10px] bg-tertiary-fixed text-on-tertiary-fixed font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
                    ON TRACK
                  </span>
                  <span className="font-label-sm text-xs text-on-surface-variant">Exemplar Hub</span>
                </div>
                <h3 className="font-headline-sm text-sm md:text-base text-on-surface font-bold mt-1">
                  ZP School Saswad
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Block Haveli • 6 FLN Teachers • 190 Students
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-headline-sm text-base md:text-lg text-on-tertiary-container font-bold font-numeric">
                  3d
                </span>
                <p className="font-label-sm text-[10px] text-on-surface-variant">since visit</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-surface-container-low space-y-0.5 border border-outline-variant/20">
              <div className="flex items-center gap-1.5 text-on-tertiary-container">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span className="font-label-sm text-[10px] font-bold uppercase">
                  Rubric Milestone
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface font-semibold">
                All 5 rubric practices observed & verified by block monitor
              </p>
            </div>

            <div className="pt-1">
              <button
                onClick={() => {
                  setSelectedSchoolId('sch-3');
                  setCurrentRoute('school-evidence-feed');
                }}
                className="w-full h-11 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-xs font-bold flex items-center justify-center gap-2 shadow-xs hover:bg-surface-container transition-colors border border-outline-variant/30"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-secondary">visibility</span>
                <span>View School Portfolio</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cluster Cohort Diagnostic Status Bar */}
      <div className="bg-surface-container-lowest p-4 md:p-5 rounded-xl shadow-sm border border-outline-variant/20 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Cluster Cohort Diagnostic Status
          </span>
          <span className="font-label-sm text-xs text-secondary font-bold">
            412 Students Assessed
          </span>
        </div>

        <div className="flex h-3.5 w-full rounded-full overflow-hidden bg-surface-container gap-0.5">
          <div className="bg-error h-full" style={{ width: '18%' }} title="Beginner (18%)"></div>
          <div className="bg-surface-container-highest h-full" style={{ width: '24%' }} title="Letter Level (24%)"></div>
          <div className="bg-secondary-fixed h-full" style={{ width: '32%' }} title="Word Level (32%)"></div>
          <div className="bg-secondary h-full" style={{ width: '26%' }} title="Paragraph / Story (26%)"></div>
        </div>

        <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-error"></span>
            <span>Beginner (18%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-surface-container-highest border border-outline-variant/40"></span>
            <span>Letter (24%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
            <span>Word (32%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span>Story (26%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
