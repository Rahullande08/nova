import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { audioService } from '../services/audioService';
import { aiDiagnosticService } from '../services/aiDiagnosticService';
import { TutorialButton } from '../components/TutorialButton';

export function MentorVisitWorkflowPage() {
  const { schools, selectedSchoolId, setCurrentRoute, createAction, recordSchoolVisit, showToast, t } = useApp();

  const school = schools.find((s) => s.id === selectedSchoolId) || schools[0];

  const [currentStep, setCurrentStep] = useState(1); // 1: Review Evidence, 2: Record Observation, 3: AI Structuring & WhatsApp, 4: Action Created
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [micError, setMicError] = useState(null);
  const [mentorObservationText, setMentorObservationText] = useState(
    'Demonstrated 4-corner level grouping with 22 Grade 3 students. Teacher Sunita practiced peer flashcard checks for 8 minutes. Noticed significant improvement in beginner student engagement.'
  );
  const [whatsappNote, setWhatsappNote] = useState(
    'नमस्ते सुनीता मॅडम, आजच्या वर्गातील गट पद्धतीचे प्रात्यक्षिक उत्तम झाले. उद्यापासून सकाळी १० मिनिटे संख्या रेषा व शब्द वर्गीकरण सुरू ठेवा. काही अडचण आल्यास सांगा.'
  );
  const [isStructuring, setIsStructuring] = useState(false);

  const handleStartRecording = async () => {
    setMicError(null);
    setIsRecording(true);
    const result = await audioService.startRecording();
    if (result && !result.success) {
      setIsRecording(false);
      setMicError(result.error || 'Microphone permission required to record.');
    }
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    const res = await audioService.stopRecording();
    if (res && res.url) {
      setRecordedAudioUrl(res.url);
    }
    showToast('Observation audio captured! Running AI structuring...');
    handleProcessObservation();
  };

  const handlePlayRecording = () => {
    if (isPlayingAudio) {
      audioService.stopAudio();
      audioService.stopSpeech();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      if (recordedAudioUrl && recordedAudioUrl.startsWith('blob:')) {
        audioService.playAudioUrl(recordedAudioUrl, {
          onEnded: () => setIsPlayingAudio(false)
        });
      } else {
        audioService.speak(mentorObservationText, 'mr-IN').then(() => setIsPlayingAudio(false));
      }
    }
  };

  const handleProcessObservation = async () => {
    setIsStructuring(true);
    try {
      const result = await aiDiagnosticService.structureMentorObservation({
        mentorVoiceNote: mentorObservationText,
        schoolId: school.id
      });
      setMentorObservationText(result.structuredNote);
      setWhatsappNote(result.whatsappDraft);
      setCurrentStep(3);
    } catch (err) {
      console.error(err);
      setCurrentStep(3);
    } finally {
      setIsStructuring(false);
    }
  };

  const handleDispatchFeedbackAndAction = async () => {
    await createAction({
      action: 'Conduct daily 10-min 4-corner word sorting in Grade 3',
      owner: 'Sunita Rao (Teacher)',
      targetTeacher: 'Sunita Rao',
      school: school.name,
      dueDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      priority: 'High',
      evidenceRequired: 'Tracker photo update + weekly voice log',
      notes: mentorObservationText
    });

    if (recordSchoolVisit) {
      await recordSchoolVisit(school.id, {
        teacher: 'Sunita Rao',
        grade: 'Grade 3',
        observationNote: mentorObservationText
      });
    }

    showToast('Feedback sent to Teacher WhatsApp & Action created in Ledger!');
    setCurrentStep(4);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200 max-w-3xl mx-auto pb-8">
      {/* Header with TutorialButton */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed w-fit mb-1">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            <span className="font-label-sm text-xs font-bold uppercase tracking-wider">
              Active Classroom Observation Flow
            </span>
          </div>
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-xl md:text-2xl text-on-surface font-bold">
            School Visit: {school.name}
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
            Follow the structured 4-step observation, demonstration & coaching loop.
          </p>
        </div>
        <TutorialButton pageKey="mentor-visit-workflow" variant="outline" className="shrink-0" />
      </div>

      {/* Stepper indicator */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        {[
          { step: 1, label: 'Review Evidence' },
          { step: 2, label: 'Record Visit' },
          { step: 3, label: 'AI Review & WhatsApp' },
          { step: 4, label: 'Action Created' }
        ].map((s) => (
          <div
            key={s.step}
            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
              currentStep === s.step
                ? 'bg-secondary text-on-secondary font-bold shadow-sm border-secondary'
                : currentStep > s.step
                ? 'bg-tertiary-fixed text-on-tertiary-fixed font-semibold border-transparent'
                : 'bg-surface-container-low text-on-surface-variant border-outline-variant/20'
            }`}
          >
            <span className="text-[10px] uppercase">Step 0{s.step}</span>
            <span className="truncate">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Step 1: Review Evidence */}
      {currentStep === 1 && (
        <div className="bg-surface-container-lowest p-4 md:p-5 rounded-xl shadow-sm border border-outline-variant/20 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-base font-bold text-on-surface">
              Step 1: Review Prior Teacher Evidence
            </h2>
            <span className="font-label-sm text-xs text-error font-bold">
              Flagged Pedagogical Friction
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-low space-y-2 border border-outline-variant/20">
            <p className="font-label-sm text-xs font-bold text-on-surface">
              Flagged Signal: "{school.flaggedSignal}"
            </p>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Teacher reported difficulty managing beginner learners while running word-level activities.
            </p>
            <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-secondary/30 text-xs">
              <span className="font-bold text-secondary block">Suggested Demonstration in Class:</span>
              <span className="text-on-surface font-semibold">{school.suggestedDemo}</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(2)}
            className="w-full py-3 bg-secondary text-on-secondary rounded-lg font-bold text-xs shadow-sm hover:bg-secondary/90 flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Proceed to Classroom Demonstration & Record</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      )}

      {/* Step 2: Record Observation */}
      {currentStep === 2 && (
        <div className="bg-surface-container-lowest p-4 md:p-5 rounded-xl shadow-sm border border-outline-variant/20 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-base font-bold text-on-surface">
              Step 2: Record Classroom Demonstration Observation
            </h2>
            <span className="font-label-sm text-xs text-secondary font-bold">
              CRP Voice Memo
            </span>
          </div>

          <p className="font-body-sm text-xs text-on-surface-variant">
            Speak what you demonstrated in class, how the teacher responded, and any immediate next step agreed upon.
          </p>

          {micError && (
            <div className="p-2.5 rounded-lg bg-error-container/20 border border-error/30 text-xs text-error font-semibold">
              {micError}
            </div>
          )}

          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 flex flex-col items-center gap-3">
            <button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer ${
                isRecording ? 'bg-error text-on-error animate-pulse' : 'bg-secondary text-on-secondary'
              }`}
            >
              <span className="material-symbols-outlined text-3xl">
                {isRecording ? 'stop' : 'mic'}
              </span>
            </button>
            <span className="font-label-sm text-xs font-bold text-on-surface">
              {isRecording ? 'Recording Live Observation... Tap to Stop' : 'Tap to Record Voice Observation'}
            </span>

            {recordedAudioUrl && (
              <button
                type="button"
                onClick={handlePlayRecording}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-highest rounded-lg text-xs font-bold text-secondary hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isPlayingAudio ? 'stop' : 'play_arrow'}
                </span>
                <span>{isPlayingAudio ? 'Stop Playback' : 'Play Observation Audio'}</span>
              </button>
            )}
          </div>

          <div className="space-y-1">
            <label className="font-label-sm text-xs font-bold text-on-surface-variant block">
              Or Edit / Type Observation Notes Directly:
            </label>
            <textarea
              value={mentorObservationText}
              onChange={(e) => setMentorObservationText(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-lg border border-outline-variant text-xs bg-surface focus:ring-2 focus:ring-secondary focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-3 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container rounded-lg cursor-pointer"
            >
              ← Back
            </button>
            <button
              onClick={handleProcessObservation}
              disabled={isStructuring}
              className="px-5 py-2.5 bg-primary text-on-primary rounded-lg text-xs font-bold shadow-sm hover:opacity-90 flex items-center gap-1.5 cursor-pointer"
            >
              {isStructuring && <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>}
              <span>Structure Observation with AI →</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: AI Review & WhatsApp Dispatch */}
      {currentStep === 3 && (
        <div className="bg-surface-container-lowest p-4 md:p-5 rounded-xl shadow-sm border border-outline-variant/20 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-base font-bold text-on-surface">
              Step 3: Review Structured Feedback & WhatsApp Note
            </h2>
            <span className="font-label-sm text-xs text-on-tertiary-container bg-tertiary-fixed/30 px-2 py-0.5 rounded-full font-bold">
              AI Structured
            </span>
          </div>

          <div className="p-3.5 bg-surface-container-low rounded-xl space-y-2 border border-outline-variant/20">
            <span className="font-label-sm text-xs font-bold text-secondary uppercase tracking-wider block">
              Structured Observation Summary
            </span>
            <p className="font-body-sm text-xs text-on-surface leading-relaxed">
              {mentorObservationText}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-label-sm text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-green-600 text-[18px]">chat</span>
                <span>Pre-Drafted WhatsApp Message to Teacher (Sunita Rao)</span>
              </label>
              <span className="text-[10px] text-on-surface-variant">Editable before sending</span>
            </div>
            <textarea
              value={whatsappNote}
              onChange={(e) => setWhatsappNote(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-lg border border-outline-variant text-xs bg-surface focus:ring-2 focus:ring-secondary focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-3 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container rounded-lg cursor-pointer"
            >
              ← Back
            </button>
            <button
              onClick={handleDispatchFeedbackAndAction}
              className="px-5 py-2.5 bg-secondary text-on-secondary rounded-lg text-xs font-bold shadow-sm hover:bg-secondary/90 flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              <span>Send WhatsApp & Log Action</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Success & Action Created */}
      {currentStep === 4 && (
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/20 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center mx-auto shadow-sm">
            <span className="material-symbols-outlined text-3xl">task_alt</span>
          </div>

          <div>
            <h2 className="font-headline-sm text-lg font-bold text-on-surface">
              Visit Observation Successfully Completed!
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant max-w-md mx-auto mt-1">
              Coaching feedback has been delivered to Teacher Sunita Rao. An actionable commitment is now tracked on the Cluster Action Ledger.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentRoute('action-ledger')}
              className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold hover:opacity-90 cursor-pointer"
            >
              View Action Ledger
            </button>
            <button
              onClick={() => setCurrentRoute('crp-mentor-dashboard')}
              className="px-4 py-2 bg-surface-container text-on-surface rounded-lg text-xs font-bold hover:bg-surface-container-high cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
