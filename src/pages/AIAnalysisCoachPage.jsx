import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { audioService } from '../services/audioService';

export function AIAnalysisCoachPage() {
  const {
    setCurrentRoute,
    practiceRubric,
    setSelectedActivity,
    activities,
    showToast
  } = useApp();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingCoachVoice, setIsPlayingCoachVoice] = useState(false);
  const [isAddedToPlan, setIsAddedToPlan] = useState(false);

  const handleVoiceExcerptPlayback = async () => {
    if (isPlayingAudio) {
      audioService.stopSpeech();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      await audioService.speak(
        'आज मी वर्गात वाचन गट केले होते, पण शब्द स्तरावरील मुलांना जास्तीचा वेळ लागला.',
        'mr-IN'
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
      await audioService.speak(
        'उद्या वर्गात गट केल्यानंतर, प्रत्येक गटाला त्यांच्या स्तरानुसार एक कृती द्या आणि तीन मिनिटांत प्रत्येक मूल योग्य काम करत आहे का ते तपासा.',
        'mr-IN'
      );
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
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200 max-w-3xl mx-auto pb-6">
      {/* Top Progress & Diagnostic State Bar */}
      <div className="flex items-center justify-between bg-surface-container-lowest p-3.5 rounded-xl shadow-sm border border-outline-variant/20">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 text-secondary">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <div className="truncate">
            <h1 className="font-headline-sm text-sm md:text-base text-on-surface font-bold truncate">
              Practice Analysis
            </h1>
            <p className="font-label-sm text-xs text-on-surface-variant flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
              Completed in 12s
            </p>
          </div>
        </div>
        <div className="text-right shrink-0 bg-surface-container-low px-2.5 py-1 rounded-lg border border-outline-variant/20">
          <p className="font-label-sm text-xs text-secondary font-bold">87% Confidence</p>
          <p className="font-label-sm text-[10px] text-on-surface-variant">Human verifiable</p>
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
              <span className="material-symbols-outlined text-secondary text-[16px]">mic</span>
              <span className="font-label-sm text-xs font-bold text-on-surface">
                Voice Note Excerpt (Marathi)
              </span>
            </div>
            <button
              onClick={handleVoiceExcerptPlayback}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-surface-container-lowest shadow-xs text-on-surface hover:text-secondary text-xs font-semibold transition-colors border border-outline-variant/20"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isPlayingAudio ? 'pause' : 'play_arrow'}
              </span>
              <span>{isPlayingAudio ? 'Pause' : 'Listen'}</span>
            </button>
          </div>
          <p className="font-body-sm text-xs text-on-surface italic leading-relaxed">
            “...grouped 14 children by word level and 8 by letter level. Spent 12 minutes on paragraph reading cards, but ran out of time to verify all 4 beginner learners.”
          </p>
        </div>
      </div>

      {/* Five-Point Non-Judgmental Diagnostic Observation Rubric */}
      <div className="bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-sm border border-outline-variant/20 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
              Diagnostic Observation Rubric
            </h2>
            <p className="font-label-sm text-xs text-on-surface-variant">
              Objective foundational literacy protocol (TaRL aligned)
            </p>
          </div>
          <span className="font-label-sm text-xs font-bold px-2 py-0.5 rounded bg-surface-container-high text-on-surface">
            5 Metrics
          </span>
        </div>

        {/* Rubric Items List */}
        <div className="space-y-2">
          {practiceRubric.map((item) => {
            const isObserved = item.statusType === 'observed';
            const isPartly = item.statusType === 'partly_observed';

            return (
              <div
                key={item.id}
                className="p-3 rounded-lg bg-surface-container-low/70 space-y-1 border border-outline-variant/20"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isObserved
                          ? 'text-on-tertiary-container'
                          : isPartly
                          ? 'text-secondary'
                          : 'text-outline'
                      }`}
                    >
                      {isObserved
                        ? 'check_circle'
                        : isPartly
                        ? 'timelapse'
                        : 'radio_button_unchecked'}
                    </span>
                    <span className="font-label-md text-xs md:text-sm font-bold text-on-surface">
                      {item.title}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] font-bold shrink-0 ${
                      isObserved
                        ? 'bg-surface-container-lowest text-on-tertiary-container border border-on-tertiary-container/30'
                        : isPartly
                        ? 'bg-surface-container-highest text-secondary border border-secondary/30'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant pl-7">
                  Evidence: {item.evidence}
                </p>
                <div className="pl-7 flex items-center justify-between text-[11px] text-on-surface-variant pt-0.5">
                  <span className="text-outline">{item.tag}</span>
                  <span className="font-semibold text-secondary">{item.confidence}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Human Verification Notice Banner */}
        <div className="p-3 rounded-lg bg-surface-container-high flex items-center gap-2.5 border border-outline-variant/20">
          <div className="w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center shrink-0 text-secondary">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
          </div>
          <div className="min-w-0">
            <p className="font-label-sm text-xs font-bold text-on-surface">
              Human verification recommended for uncertain signals.
            </p>
            <p className="font-label-sm text-[11px] text-on-surface-variant">
              CRP routine check-in scheduled for Thursday visit.
            </p>
          </div>
        </div>
      </div>

      {/* 'Your Next Step' Coaching Section */}
      <div className="bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-sm border border-outline-variant/20 space-y-3">
        {/* Mentor Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0">
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
                  AI Instructional Coach
                </h2>
                <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-surface-container text-on-surface-variant">
                  Mentor Mode
                </span>
              </div>
              <p className="font-label-sm text-xs text-on-surface-variant">
                Calibrated to Maharashtra Foundational Norms
              </p>
            </div>
          </div>
        </div>

        {/* Tomorrow Action Card */}
        <div className="p-4 rounded-xl bg-surface-container-low space-y-2 border border-outline-variant/20">
          <div className="flex items-center gap-1 text-secondary font-bold">
            <span className="material-symbols-outlined text-[18px]">lightbulb</span>
            <span className="font-label-sm text-xs uppercase tracking-wider">
              Tomorrow, try this:
            </span>
          </div>
          <p className="font-body-lg text-sm md:text-base text-on-surface font-bold leading-snug">
            “After grouping learners, give each group one task matched to its current level and spend 3 minutes checking whether the task is working.”
          </p>
          <div className="pt-1 border-t border-surface-container">
            <p className="font-label-sm text-xs font-bold text-on-surface">Why this recommendation?</p>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed mt-0.5">
              Today’s evidence suggests that level-based grouping was happening, but adaptation during the activity was less visible. A quick 3-minute pulse check gives you confidence to adjust on the fly.
            </p>
          </div>
        </div>

        {/* Recommended Activity Card */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs space-y-2 border border-outline-variant/30">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-sm text-[10px] text-secondary font-bold uppercase tracking-wide block">
                Targeted Activity Pick
              </span>
              <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                Number Line Challenge (संख्या रेषा आव्हान)
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full font-label-sm text-[11px] bg-surface-container-high text-on-surface font-semibold">
              10 min
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 text-[11px]">
            <span className="px-2 py-0.5 rounded font-label-sm bg-surface-container text-on-surface-variant">
              Grade 3–5
            </span>
            <span className="px-2 py-0.5 rounded font-label-sm bg-surface-container-highest text-secondary font-bold">
              Beginner Group
            </span>
            <span className="px-2 py-0.5 rounded font-label-sm bg-surface-container text-on-surface-variant">
              Chalk + number cards
            </span>
          </div>

          <p className="font-body-sm text-xs text-on-surface-variant pt-1">
            Draw a tactile floor ladder. Students place cards sequentially while speaking aloud to let you quickly assess grouping mastery in under 3 minutes.
          </p>
        </div>

        {/* Action Buttons Group */}
        <div className="space-y-2 pt-1">
          {/* Audio Coaching Button */}
          <button
            onClick={handleCoachVoicePlayback}
            className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-surface-container-high text-on-surface font-label-md text-xs font-bold hover:bg-surface-container transition-colors border border-outline-variant/20"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] text-secondary">
              {isPlayingCoachVoice ? 'pause_circle' : 'play_circle'}
            </span>
            <span>
              {isPlayingCoachVoice
                ? 'Playing Marathi Audio Note...'
                : 'Listen to Coaching (Marathi / Hindi)'}
            </span>
          </button>

          {/* View Activity Guide Button */}
          <button
            onClick={handleViewActivityGuide}
            className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-surface-container-lowest shadow-xs text-on-surface font-label-md text-xs font-bold hover:bg-surface-container-low transition-colors border border-outline-variant/30"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span>View Complete Activity Guide</span>
          </button>

          {/* Primary Action: Send to Plan */}
          <button
            onClick={handleSendToPlan}
            className={`w-full h-11 flex items-center justify-center gap-2 rounded-lg font-label-md text-xs font-bold shadow-sm transition-all ${
              isAddedToPlan
                ? 'bg-on-tertiary-container text-on-tertiary'
                : 'bg-primary text-on-primary hover:opacity-90 active:scale-98'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isAddedToPlan ? 'check_circle' : 'bookmark_add'}
            </span>
            <span>
              {isAddedToPlan
                ? 'Added to Tomorrow’s Schedule ✓'
                : 'Send to My Tomorrow Plan'}
            </span>
          </button>
        </div>
      </div>

      {/* Footer Governance Note */}
      <div className="p-3 rounded-lg bg-surface-container-low text-center border border-outline-variant/20">
        <p className="font-label-sm text-[11px] text-on-surface-variant">
          Feedback generated via Classroom Diagnostic Model v3.2 • Synced to School CRP Ledger
        </p>
      </div>
    </div>
  );
}
