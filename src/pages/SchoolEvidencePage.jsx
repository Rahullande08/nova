import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { audioService } from '../services/audioService';
import { TutorialButton } from '../components/TutorialButton';

export function SchoolEvidencePage() {
  const { schools, selectedSchoolId, setSelectedSchoolId, setCurrentRoute, showToast, t, language } = useApp();
  const [activeTab, setActiveTab] = useState('evidence'); // 'evidence' | 'cohort' | 'actions'
  const [playingClipId, setPlayingClipId] = useState(null);

  const school = schools.find((s) => s.id === selectedSchoolId) || schools[0];

  const handlePlayClip = async (clipId) => {
    if (playingClipId === clipId) {
      audioService.stopSpeech();
      setPlayingClipId(null);
    } else {
      setPlayingClipId(clipId);
      const langCode = language === 'MR' ? 'mr-IN' : 'en-US';
      await audioService.speak(
        language === 'MR'
          ? 'आज वर्गात शब्द स्तरावरील मुलांचा सराव चांगला झाला.'
          : 'Today in class the word level students practiced well.',
        langCode
      );
      setPlayingClipId(null);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto pb-8">
      {/* Header with School Selector and Tutorial */}
      <div className="bg-surface-container-lowest p-4 md:p-5 rounded-xl shadow-sm border border-outline-variant/20 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  school.priority === 'HIGH'
                    ? 'bg-error-container text-on-error-container'
                    : school.priority === 'MEDIUM'
                    ? 'bg-secondary-fixed text-on-secondary-fixed'
                    : 'bg-tertiary-fixed text-on-tertiary-fixed'
                }`}
              >
                {school.priority === 'HIGH' ? t('highPriority', 'HIGH PRIORITY') : school.priority === 'MEDIUM' ? t('mediumPriority', 'MEDIUM PRIORITY') : t('onTrack', 'ON TRACK')}
              </span>
              <span className="font-label-sm text-xs text-on-surface-variant">
                Block {school.block}
              </span>
            </div>
            <h1 className="font-headline-xl-mobile md:font-headline-xl text-xl md:text-2xl text-on-surface font-bold">
              {school.name}
            </h1>
            <p className="font-body-sm text-xs text-on-surface-variant">
              {school.teachersCount} {t('flnTeachers', 'FLN Teachers')} • {school.studentsCount} {t('studentsEnrolled', 'Students Enrolled')} • {t('lastVisitDaysAgo', { count: school.daysSinceVisit }, `Last Visit ${school.daysSinceVisit}d ago`)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={school.id}
              onChange={(e) => setSelectedSchoolId(e.target.value)}
              className="p-2 rounded-lg bg-surface-container-low border border-outline-variant text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
            >
              {schools.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.priority})
                </option>
              ))}
            </select>
            <TutorialButton pageKey="school-evidence-feed" variant="icon" />
            <button
              onClick={() => setCurrentRoute('mentor-visit-workflow')}
              className="px-3 py-2 bg-secondary text-on-secondary rounded-lg text-xs font-bold shadow-sm hover:bg-secondary/90 flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">navigation</span>
              <span>{t('conductVisit', 'Conduct Visit')}</span>
            </button>
          </div>
        </div>

        {/* School Tabs */}
        <div className="flex items-center gap-2 border-b border-surface-container pt-2">
          {[
            { id: 'evidence', label: t('teacherEvidenceFeed', 'Teacher Evidence Feed'), icon: 'photo_camera' },
            { id: 'cohort', label: t('studentCohortLevels', 'Student Cohort Levels'), icon: 'bar_chart' },
            { id: 'actions', label: t('openActionsSla', 'Open Actions & SLA'), icon: 'checklist' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 px-2 text-xs font-bold flex items-center gap-1.5 transition-all border-b-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Evidence Feed */}
      {activeTab === 'evidence' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-sm font-bold text-on-surface">
              {t('recentClassroomObservations', 'Recent Classroom Observations')}
            </h2>
            <span className="font-label-sm text-xs text-on-surface-variant">
              {t('liveFieldAudioUploads', 'Live Field Audio & Tracker Uploads')}
            </span>
          </div>

          <div className="space-y-3">
            {school.recentEvidence.map((ev) => (
              <div
                key={ev.id}
                className="p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                      <span className="material-symbols-outlined text-[18px]">person</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                        {ev.teacher}
                      </h3>
                      <p className="font-label-sm text-[11px] text-on-surface-variant">
                        {ev.grade} • {ev.time}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-surface-container-highest text-secondary">
                    {ev.type}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between text-xs border border-outline-variant/20">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      campaign
                    </span>
                    <span className="font-medium text-on-surface">
                      {t('pedagogicalSignalColon', 'Pedagogical Signal:')} <strong>{ev.signal}</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => handlePlayClip(ev.id)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-surface-container-lowest rounded shadow-xs font-bold text-secondary hover:bg-surface-container cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {playingClipId === ev.id ? 'pause' : 'play_arrow'}
                    </span>
                    <span>{playingClipId === ev.id ? t('pause', 'Pause') : t('audioOneFortyEight', 'Audio (1:48)')}</span>
                  </button>
                </div>

                <div className="flex justify-end gap-2 pt-1 border-t border-surface-container">
                  <button
                    onClick={() => setCurrentRoute('ai-coach-chat')}
                    className="text-xs font-bold text-secondary hover:underline cursor-pointer"
                  >
                    {t('inspectRubricCoach', 'Inspect 5-Point Rubric & AI Coaching →')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Cohort Levels */}
      {activeTab === 'cohort' && (
        <div className="bg-surface-container-lowest p-4 md:p-5 rounded-xl shadow-sm border border-outline-variant/20 space-y-4">
          <div>
            <h2 className="font-headline-sm text-sm md:text-base font-bold text-on-surface">
              {t('tarlLevelBreakdown', 'TaRL Learning Level Breakdown')}
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              {t('distributionOfLearners', { count: school.studentsCount }, `Distribution of ${school.studentsCount} assessed foundational learners.`)}
            </p>
          </div>

          <div className="space-y-3">
            {[
              { level: t('beginnerTier', 'Beginner (आरंभी)'), count: school.levelsDistribution.beginner, color: 'bg-error', target: '20%' },
              { level: t('letterTier', 'Letter (अक्षर)'), count: school.levelsDistribution.letter, color: 'bg-surface-container-highest', target: '25%' },
              { level: t('wordTier', 'Word (शब्द)'), count: school.levelsDistribution.word, color: 'bg-secondary-fixed', target: '35%' },
              { level: t('paragraphTier', 'Story / Paragraph (परिच्छेद)'), count: school.levelsDistribution.story, color: 'bg-secondary', target: '20%' }
            ].map((row) => (
              <div key={row.level} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-on-surface">{row.level}</span>
                  <span className="text-secondary font-numeric">{row.count} {t('studentsCountWord', 'students')} ({Math.round((row.count / (school.studentsCount || 100)) * 100)}%)</span>
                </div>
                <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`${row.color} h-full rounded-full`}
                    style={{ width: `${Math.min(100, Math.max(10, (row.count / school.studentsCount) * 100))}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Actions */}
      {activeTab === 'actions' && (
        <div className="bg-surface-container-lowest p-4 md:p-5 rounded-xl shadow-sm border border-outline-variant/20 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-sm font-bold text-on-surface">
              {t('activeInstitutionalCommitments', 'Active Institutional Commitments')}
            </h2>
            <button
              onClick={() => setCurrentRoute('action-ledger')}
              className="text-xs text-secondary font-bold hover:underline cursor-pointer"
            >
              {t('openFullLedger', 'Open Full Ledger →')}
            </button>
          </div>

          <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/20 flex items-start justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-error-container text-on-error-container">
                {t('highSla', 'HIGH SLA')}
              </span>
              <p className="font-headline-sm text-xs font-bold text-on-surface mt-1">
                {t('demoFourCornerActionText', 'Demonstrate 4-corner level grouping during morning FLN block')}
              </p>
              <p className="font-body-sm text-[11px] text-on-surface-variant">
                {t('assignedToAnand', 'Assigned to Anand Patil (CRP) • Target: Sunita Rao • Due in 3 days')}
              </p>
            </div>
            <span className="px-2 py-1 bg-surface-container-highest rounded text-xs font-bold text-secondary">
              {t('open', 'Open')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
