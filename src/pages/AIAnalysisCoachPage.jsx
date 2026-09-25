import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { audioService } from '../services/audioService';
import { TutorialButton } from '../components/TutorialButton';

export function AIAnalysisCoachPage() {
  const {
    setCurrentRoute,
    practiceRubric,
    setSelectedActivity,
    activities,
    showToast,
    t,
    language
  } = useApp();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingCoachVoice, setIsPlayingCoachVoice] = useState(false);
  const [isAddedToPlan, setIsAddedToPlan] = useState(false);
  const [expandedRubricId, setExpandedRubricId] = useState(null);

  const toggleExpandRubric = (id) => {
    setExpandedRubricId(expandedRubricId === id ? null : id);
  };

  const handleVoiceExcerptPlayback = async () => {
    if (isPlayingAudio) {
      audioService.stopSpeech();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      showToast('Playing teacher audio clip...');
      const langCode = language === 'HI' ? 'hi-IN' : language === 'MR' ? 'mr-IN' : 'en-US';
      await audioService.speak(
        'आज मी वर्गात वाचन गट केले होते, पण शब्द स्तरावरील मुलांना जास्तीचा वेळ लागला.',
        langCode
      );
      setIsPlayingAudio(false);
    }
  };

  const handleCoachVoicePlayback = async () => {
    if (isPlayingCoachVoice) {
      audioService.stopSpeech();
      setIsPlayingCoachVoice(false);
    } else {
      setIsPlayingCoachVoice(true);
      showToast(`Playing AI Coach voice guidance (${language})...`);
      const langCode = language === 'HI' ? 'hi-IN' : language === 'MR' ? 'mr-IN' : 'en-US';
      const speechPrompt = language === 'HI'
        ? 'कल कक्षा में समूह बनाने के बाद, प्रत्येक समूह को उनकी स्तरानुसार एक गतिविधि दें और तीन मिनट में जाँचें कि सभी बच्चे सही अभ्यास कर रहे हैं।'
        : language === 'MR'
        ? 'उद्या वर्गात गट केल्यानंतर, प्रत्येक गटाला त्यांच्या स्तरानुसार एक कृती द्या आणि तीन मिनिटांत प्रत्येक मूल योग्य काम करत आहे का ते तपासा.'
        : 'Tomorrow after level grouping, assign each group their specific speed drill and spend exactly 3 minutes verifying that all beginner learners are on task.';
      
      await audioService.speak(speechPrompt, langCode);
      setIsPlayingCoachVoice(false);
    }
  };

  const handleSendToPlan = () => {
    setIsAddedToPlan(true);
    showToast('Added to Tomorrow’s Schedule ✓ (Synced with Mentor Ledger)');
    setTimeout(() => {
      setIsAddedToPlan(false);
    }, 3000);
  };

  const handleViewActivityGuide = () => {
    const activity = activities.find((a) => a.id === 'act-1') || activities[0];
    setSelectedActivity(activity);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200 max-w-3xl mx-auto pb-8">
      {/* Top Progress & Diagnostic State Bar with Tutorial */}
      <div className="flex items-center justify-between bg-surface-container-lowest p-3.5 rounded-xl shadow-sm border border-outline-variant/20 gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 text-secondary">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <div className="truncate">
            <h1 className="font-headline-sm text-sm md:text-base text-on-surface font-bold truncate">
              {t('aiCoach', 'Practice Analysis & Coach')}
            </h1>
            <p className="font-label-sm text-xs text-on-surface-variant flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
              Completed in 12s
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TutorialButton pageKey="ai-coach-chat" variant="outline" className="hidden sm:inline-flex" />
          <div className="text-right shrink-0 bg-surface-container-low px-2.5 py-1 rounded-lg border border-outline-variant/20">
            <p className="font-label-sm text-xs text-secondary font-bold">87% Confidence</p>
            <p className="font-label-sm text-[10px] text-on-surface-variant">Human verifiable</p>
          </div>
        </div>
      </div>

      {/* Snapshot & Transcription Evidence Card */}
      <div className="bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-sm border border-outline-variant/20 space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">
              assignment_turned_in
            </span>
            <h2 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
              Submitted Practice Packet
            </h2>
          </div>
          <span className="font-label-sm text-xs px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant">
            Today, 11:42 AM
          </span>
        </div>

        {/* Visual Artifacts & Snapshot Row */}
        <div className="grid grid-cols-3 gap-2">
          {/* Tracker Visual */}
          <div className="relative col-span-1 rounded-lg overflow-hidden bg-surface-container-high aspect-[4/3] border border-outline-variant/30 flex flex-col justify-end p-1.5 bg-gradient-to-t from-slate-900/70 to-slate-800/10">
            <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined text-3xl">description</span>
            </div>
            <div className="relative px-1.5 py-0.5 rounded bg-inverse-surface/90 text-inverse-on-surface font-label-sm text-[10px] flex items-center gap-1 w-fit">
              <span className="material-symbols-outlined text-[12px]">photo_camera</span>
              <span>Tracker</span>
            </div>
          </div>

          {/* Group Circle Visual */}
          <div className="relative col-span-1 rounded-lg overflow-hidden bg-surface-container-high aspect-[4/3] border border-outline-variant/30 flex flex-col justify-end p-1.5 bg-gradient-to-t from-slate-900/70 to-slate-800/10">
            <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined text-3xl">groups</span>
            </div>
            <div className="relative px-1.5 py-0.5 rounded bg-inverse-surface/90 text-inverse-on-surface font-label-sm text-[10px] flex items-center gap-1 w-fit">
              <span className="material-symbols-outlined text-[12px]">group</span>
              <span>Clusters</span>
            </div>
          </div>

          {/* Duration Card */}
          <div className="col-span-1 rounded-lg bg-surface-container-low p-2.5 flex flex-col justify-between border border-outline-variant/20">
            <div>
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider block font-bold">
                Duration
              </span>
              <span className="font-headline-sm text-sm md:text-base font-bold text-on-surface font-numeric">
                32 mins
              </span>
            </div>
            <div className="flex items-center gap-1 text-on-tertiary-container">
              <span className="material-symbols-outlined text-[14px]">graphic_eq</span>
              <span className="font-label-sm text-[11px] font-bold">1:48 audio</span>
            </div>
          </div>
        </div>

        {/* Transcription Excerpt Box */}
        <div className="bg-surface-container-low p-3 rounded-lg space-y-1.5 border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[16px]">record_voice_over</span>
              <span className="font-label-sm text-xs font-bold text-on-surface">
                Voice Reflection Excerpt (Marathi / Dialect)
              </span>
            </div>
            <button
              onClick={handleVoiceExcerptPlayback}
              type="button"
              className="px-2.5 py-1 rounded bg-surface-container-highest text-secondary text-xs font-bold hover:bg-surface-container flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">
                {isPlayingAudio ? 'stop' : 'play_arrow'}
              </span>
              <span>{isPlayingAudio ? 'Stop' : 'Listen Excerpt'}</span>
            </button>
          </div>
          <p className="font-body-sm text-xs text-on-surface italic leading-relaxed">
            “आज मी वाचन गट केले होते, पण शब्द स्तरावरील मुलांना जास्तीचा वेळ लागला. मात्रा ओळखताना काही मुले अडखळत होती...”
          </p>
        </div>
      </div>

      {/* CORE HIGHLIGHT: The Single Action "Your Next Step" */}
      <section className="bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-sm border-2 border-secondary/40 space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-28 h-28 bg-secondary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
            <span className="font-label-sm text-xs uppercase font-bold text-secondary tracking-wider">
              {t('yourNextStep', 'Your Next Single Practice Action')}
            </span>
          </div>
          <button
            onClick={handleCoachVoicePlayback}
            type="button"
            className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-xs font-bold flex items-center gap-1 hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[14px]">
              {isPlayingCoachVoice ? 'stop' : 'volume_up'}
            </span>
            <span>{isPlayingCoachVoice ? 'Stop Audio' : t('listenToCoaching', 'Listen Coaching')}</span>
          </button>
        </div>

        <div className="space-y-1">
          <h2 className="font-headline-sm text-base md:text-lg text-on-surface font-bold">
            Spend 15 mins with Word Group on Flashcard Speed Drills
          </h2>
          <p className="font-body-sm text-xs md:text-sm text-on-surface-variant leading-relaxed">
            Observation signals show that 12 children in your Word group are taking &gt;4 seconds per matra. Running a 15-minute 2-letter rapid blend drill before paragraph reading will bridge this gap.
          </p>
        </div>

        {/* Action Button Strip */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
          <button
            onClick={handleSendToPlan}
            className="w-full sm:flex-1 h-10 rounded-lg bg-secondary text-on-secondary font-label-md text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-secondary/90 active:scale-98 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isAddedToPlan ? 'check' : 'add_task'}
            </span>
            <span>{isAddedToPlan ? 'Added to Tomorrow’s Schedule' : 'Add to Tomorrow’s Plan'}</span>
          </button>

          <button
            onClick={handleViewActivityGuide}
            className="w-full sm:w-auto px-4 h-10 rounded-lg bg-surface-container text-on-surface font-label-md text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-surface-container-high transition-colors border border-outline-variant/30"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span>View Activity Guide</span>
          </button>
        </div>
      </section>

      {/* 5-Dimensional Rubric Diagnostic Breakdown */}
      <section className="bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-sm border border-outline-variant/20 space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <h2 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
            {t('practiceRadar', 'Practice Rubric Assessment (5 Dimensions)')}
          </h2>
          <span className="font-label-sm text-xs text-on-surface-variant font-medium">
            Clinical Diagnostic
          </span>
        </div>

        <div className="space-y-2">
          {practiceRubric.map((item) => {
            const isExpanded = expandedRubricId === item.id;
            return (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2 transition-all"
              >
                <div
                  onClick={() => toggleExpandRubric(item.id)}
                  className="flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      item.level >= 4 ? 'bg-on-tertiary-container' : item.level === 3 ? 'bg-secondary' : 'bg-error'
                    }`}></span>
                    <span className="font-label-md text-xs md:text-sm font-bold text-on-surface">
                      {item.dimension}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-xs font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface">
                      Level {item.level} / {item.maxLevel}
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                      {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="pt-2 border-t border-surface-container space-y-2 text-xs animate-in fade-in">
                    <div className="p-2 rounded bg-surface-container-lowest text-on-surface-variant leading-relaxed">
                      <span className="font-bold text-on-surface block mb-0.5">Observed Signal:</span>
                      {item.signalObserved}
                    </div>
                    <div className="p-2 rounded bg-secondary/10 text-on-surface">
                      <span className="font-bold text-secondary block mb-0.5">Target Action:</span>
                      {item.targetNext}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommended Activity Card */}
      <section className="bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-sm border border-outline-variant/20 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-xs uppercase font-bold text-on-surface-variant tracking-wider">
            {t('recommendedActivity', 'Recommended Pedagogical Activity')}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
            15 mins • Zero Cost
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-container-low flex items-start gap-3 border border-outline-variant/20">
          <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[24px]">grid_view</span>
          </div>
          <div className="min-w-0 space-y-1">
            <h3 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
              Akshar-Matra Grid Challenge (अक्षर-मात्रा ग्रिड)
            </h3>
            <p className="font-body-sm text-xs text-on-surface-variant leading-normal">
              Students pair up to tap and blend consonants with vowel matras in a 3x3 chalk grid drawn on the floor.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-on-surface-variant font-medium">
              <span>Target: Word Level</span>
              <span>•</span>
              <span>Subject: Marathi Language</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setCurrentRoute('activity-library')}
          className="w-full py-2.5 rounded-lg border border-outline-variant text-xs font-bold text-on-surface hover:bg-surface-container flex items-center justify-center gap-1.5 transition-colors"
          type="button"
        >
          <span>Explore All 24 TaRL Activities in Library</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </section>
    </div>
  );
}
