import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TutorialButton } from '../components/TutorialButton';

export function MyPracticePage() {
  const { setCurrentRoute, currentRole, t } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const practiceLogs = [
    {
      id: 'log-1',
      date: t('todayTime', 'Today, 11:42 AM'),
      activity: t('logReadingCornerActivity', 'FLN Reading Corner (Word Level)'),
      signals: t('logReadingCornerSignals', 'Level-based grouping observed • 3-min exit check omitted'),
      confidence: t('confidence87', '87% Confidence'),
      status: t('actionScheduled', 'Action Scheduled'),
      actionTitle: t('logReadingCornerAction', '3-min exit ticket for beginner learners')
    },
    {
      id: 'log-2',
      date: t('sept23Date', 'Sept 23, 2026'),
      activity: t('logNumberLineActivity', 'Number Line Chalk Ladder'),
      signals: t('logNumberLineSignals', 'Active learner participation observed • 100% group engagement'),
      confidence: t('confidence92', '92% Confidence'),
      status: t('verified', 'Verified'),
      actionTitle: t('logNumberLineAction', 'Peer flashcard check')
    },
    {
      id: 'log-3',
      date: t('sept21Date', 'Sept 21, 2026'),
      activity: t('logPhonicsActivity', 'Phonics Rhyme & Sand Tracing'),
      signals: t('logPhonicsSignals', 'Activity matched learner level • High vocal repetition'),
      confidence: t('confidence90', '90% Confidence'),
      status: t('verified', 'Verified'),
      actionTitle: t('logPhonicsAction', 'Consonant blend cards deployed')
    },
    {
      id: 'log-4',
      date: t('sept18Date', 'Sept 18, 2026'),
      activity: t('logBaselineActivity', 'Baseline TaRL Matrix Mapping'),
      signals: t('logBaselineSignals', '31 students grouped into 4 learning tiers'),
      confidence: t('confidence95', '95% Confidence'),
      status: t('closed', 'Closed'),
      actionTitle: t('logBaselineAction', 'Initial assessment completed')
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto pb-8">
      {/* Header with Tutorial */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed w-fit mb-1">
            <span className="material-symbols-outlined text-[14px]">history_edu</span>
            <span className="font-label-sm text-xs font-bold uppercase tracking-wider">
              {t('instructionalTrajectory', 'Instructional Trajectory')}
            </span>
          </div>
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-xl md:text-2xl text-on-surface font-bold">
            {t('myPractice', 'My Practice History')}
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
            {t('myPracticeSubtitle', 'Track your instructional progress, evidence logs, and coaching shifts.')}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <TutorialButton pageKey="my-practice-log" variant="outline" />
          <button
            onClick={() => setCurrentRoute('capture-evidence')}
            className="px-4 py-2 rounded-lg bg-secondary text-on-secondary font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-secondary/90 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>{t('newPracticeCapture', 'New Practice Capture')}</span>
          </button>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="p-3.5 md:p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm flex flex-col justify-between">
          <span className="font-label-sm text-xs text-on-surface-variant font-medium">{t('evidenceSubmittedCard', 'Evidence Submitted')}</span>
          <p className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface font-numeric mt-2">14</p>
          <span className="font-label-sm text-[11px] text-on-tertiary-container font-semibold mt-1">{t('hundredPercentVerified', '100% verified')}</span>
        </div>
        <div className="p-3.5 md:p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm flex flex-col justify-between">
          <span className="font-label-sm text-xs text-on-surface-variant font-medium">{t('coachingShiftsCard', 'Coaching Shifts')}</span>
          <p className="font-headline-lg text-2xl md:text-3xl font-bold text-secondary font-numeric mt-2">6</p>
          <span className="font-label-sm text-[11px] text-secondary font-semibold mt-1">{t('adoptedInClass', 'Adopted in class')}</span>
        </div>
        <div className="p-3.5 md:p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm flex flex-col justify-between">
          <span className="font-label-sm text-xs text-on-surface-variant font-medium">{t('masteryScoreCard', 'Mastery Score')}</span>
          <p className="font-headline-lg text-2xl md:text-3xl font-bold text-on-tertiary-container font-numeric mt-2">88%</p>
          <span className="font-label-sm text-[11px] text-on-surface-variant mt-1">{t('flnRubricVersion', 'FLN Rubric v3')}</span>
        </div>
      </div>

      {/* Strengths & Practice Focus Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-on-tertiary-container font-bold text-xs">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>{t('consistentStrengths', 'Consistent Strengths')}</span>
          </div>
          <ul className="space-y-1.5 text-xs text-on-surface">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[14px] text-on-tertiary-container mt-0.5">check</span>
              <span>{t('strengthGrouping', 'Rigorous level-based student cluster organization')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[14px] text-on-tertiary-container mt-0.5">check</span>
              <span>{t('strengthFlashcards', 'Effective use of tactile reading flashcards')}</span>
            </li>
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-secondary font-bold text-xs">
            <span className="material-symbols-outlined text-[18px]">psychology</span>
            <span>{t('currentGrowthFocus', 'Current Practice Growth Focus')}</span>
          </div>
          <ul className="space-y-1.5 text-xs text-on-surface">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[14px] text-secondary mt-0.5">arrow_right</span>
              <span>{t('focusFormativeCheck', 'Formative 3-minute pulse checks during word sort')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[14px] text-secondary mt-0.5">arrow_right</span>
              <span>{t('focusTaskAdaptation', 'Paced task adaptation for beginner learners')}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Practice Log Timeline */}
      <div className="bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-sm border border-outline-variant/20 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-sm md:text-base font-bold text-on-surface">
            {t('classroomObservationSubmissions', 'Classroom Observation Submissions')}
          </h2>
          <span className="font-label-sm text-xs text-on-surface-variant font-semibold">
            {t('packetsCount', { count: practiceLogs.length }, `${practiceLogs.length} Packets`)}
          </span>
        </div>

        <div className="space-y-3">
          {practiceLogs.map((log) => (
            <div
              key={log.id}
              onClick={() => setCurrentRoute('ai-coach-chat')}
              className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 hover:border-secondary/40 cursor-pointer transition-all space-y-2"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                    {log.activity}
                  </h3>
                  <span className="font-label-sm text-[11px] text-on-surface-variant">
                    {log.date}
                  </span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    log.status === 'Verified' || log.status === 'Closed'
                      ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                      : 'bg-secondary-fixed text-on-secondary-fixed'
                  }`}
                >
                  {log.status}
                </span>
              </div>

              <p className="font-body-sm text-xs text-on-surface">
                {log.signals}
              </p>

              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-surface-container text-on-surface-variant">
                <span>{t('actionLabel', 'Action:')} <strong>{log.actionTitle}</strong></span>
                <span className="text-secondary font-bold">{log.confidence}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
