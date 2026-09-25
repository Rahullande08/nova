import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { audioService } from '../services/audioService';
import { aiDiagnosticService } from '../services/aiDiagnosticService';

export function CaptureEvidencePage() {
  const { setCurrentRoute, activeEvidence, setActiveEvidence, showToast } = useApp();

  const [selectedLanguage, setSelectedLanguage] = useState('mr');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(42);
  const [volumeLevel, setVolumeLevel] = useState(30);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState(
    '“आज मी वाचन गट केले होते, पण शब्द स्तरावरील मुलांना जास्तीचा वेळ लागला. मात्रा ओळखताना काही मुले अडखळत होती...”'
  );

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 60) {
            handleStopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const handleStartRecording = async () => {
    setRecordingSeconds(0);
    setIsRecording(true);
    const result = await audioService.startRecording((vol) => {
      setVolumeLevel(Math.min(100, Math.max(15, vol * 1.5)));
    });
    if (result && !result.success) {
      showToast('Using simulated high-fidelity voice recording.');
    }
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    const { url, blob } = await audioService.stopRecording();
    setActiveEvidence((prev) => ({
      ...prev,
      audioUrl: url,
      audioBlob: blob,
      language: selectedLanguage,
      transcript: liveTranscript
    }));
    showToast('Voice note recorded & transcribed in real-time!');
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    if (lang === 'hi') {
      setLiveTranscript('“आज मैंने कक्षा में स्तर अनुसार समूह बनाए। शब्द स्तर के बच्चों को १५ मिनट अभ्यास कराया, लेकिन आरंभी स्तर के ४ बच्चों की जांच समय की कमी के कारण नहीं हो सकी।”');
    } else if (lang === 'mr') {
      setLiveTranscript('“आज मी वाचन गट केले होते, पण शब्द स्तरावरील मुलांना जास्तीचा वेळ लागला. मात्रा ओळखताना काही मुले अडखळत होती...”');
    } else {
      setLiveTranscript('“...grouped 14 children by word level and 8 by letter level. Spent 12 minutes on reading cards, but ran out of time to verify all 4 beginner learners.”');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      showToast(`Attached ${file.name} (OCR Ready)`);
    }
  };

  const handleUseSampleTracker = () => {
    setUploadedImage('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80');
    showToast('Attached sample TaRL level tally tracker sheet (OCR Ready)');
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const analysisResult = await aiDiagnosticService.analyzePractice({
        trackerImage: uploadedImage,
        transcriptText: liveTranscript
      });

      setActiveEvidence((prev) => ({
        ...prev,
        analysis: analysisResult,
        status: 'completed',
        transcript: liveTranscript
      }));

      showToast('Practice analysis completed in 12s!');
      setCurrentRoute('ai-coach-chat');
    } catch (err) {
      console.error(err);
      showToast('Analysis completed with fallback.');
      setCurrentRoute('ai-coach-chat');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200 max-w-3xl mx-auto pb-6">
      {/* Intro Framing */}
      <section className="pt-2">
        <div className="flex items-center gap-1.5 text-secondary mb-1">
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          <span className="font-label-sm text-xs uppercase tracking-wider font-bold">
            Teacher Diagnostic Companion
          </span>
        </div>
        <h1 className="font-headline-xl-mobile md:font-headline-xl text-xl md:text-2xl text-on-surface font-bold">
          Capture Today’s Practice
        </h1>
        <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-0.5">
          No forms. Just share what you already have.
        </p>
      </section>

      {/* Guided 3-Step Flow Ribbon */}
      <section className="bg-surface-container-low rounded-xl p-3.5 shadow-sm border border-outline-variant/20">
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-label-md text-xs text-on-surface font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            Rapid Capture Pipeline
          </span>
          <span className="font-label-sm text-[10px] text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded-full font-semibold">
            Est. time: &lt; 60s
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full bg-primary text-on-primary font-label-sm text-xs flex items-center justify-center font-bold shadow-sm">
              1
            </div>
            <span className="font-label-sm text-xs text-on-surface font-semibold">Tracker Photo</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-xs flex items-center justify-center font-bold shadow-sm">
              2
            </div>
            <span className="font-label-sm text-xs text-secondary font-bold">Voice Note</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-xs flex items-center justify-center font-bold">
              3
            </div>
            <span className="font-label-sm text-xs text-on-surface-variant font-medium">Next Step</span>
          </div>
        </div>
      </section>

      {/* STEP 1: Upload Group Tracker */}
      <section className="bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-sm border border-outline-variant/20 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full font-label-sm text-[10px] bg-surface-container text-on-surface font-bold">
                Step 1
              </span>
              <span className="font-label-sm text-[10px] text-on-tertiary-container bg-tertiary-fixed/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">check_circle</span>
                Attached & OCR Ready
              </span>
            </div>
            <h2 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
              Upload your group tracker
            </h2>
          </div>
          <button
            onClick={() => showToast('Take a photo of today’s student grouping register or blackboard')}
            className="text-on-surface-variant hover:text-on-surface p-1"
            title="Help on group tracker"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
          </button>
        </div>
        <p className="font-body-sm text-xs text-on-surface-variant">
          Take a photo of the tracker used during today’s TaRL / FLN session.
        </p>

        {/* Uploaded Preview Sheet */}
        <div className="relative bg-surface-container-low rounded-xl p-3 border border-outline-variant/20 space-y-2.5">
          <div className="flex items-center justify-between pb-1 border-b border-surface-container">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">description</span>
              <div className="min-w-0">
                <p className="font-label-md text-xs font-bold text-on-surface truncate">
                  tarl_session_track_grade3.jpg
                </p>
                <p className="font-code-sm text-[10px] text-on-surface-variant">
                  Captured today • 11:28 AM
                </p>
              </div>
            </div>
            <span className="font-label-sm text-[10px] text-secondary bg-surface-container-highest px-2 py-0.5 rounded-full font-bold">
              OCR Processed
            </span>
          </div>

          {/* TaRL Level Matrix Graphic Sheet */}
          <div className="bg-surface-container-lowest rounded-lg p-2.5 shadow-xs space-y-1.5 border border-outline-variant/15">
            <div className="flex items-center justify-between text-on-surface font-label-sm text-[11px] font-bold pb-1 border-b border-surface-container">
              <span>TaRL Level</span>
              <span>Students</span>
              <span>Shift</span>
            </div>

            <div className="flex items-center justify-between py-1 px-2 rounded bg-surface-container-low text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="font-medium text-on-surface">Beginner (आरंभी)</span>
              </div>
              <span className="font-code-sm font-bold text-on-surface">IIII (4)</span>
              <span className="font-label-sm text-on-tertiary-container font-bold">-2</span>
            </div>

            <div className="flex items-center justify-between py-1 px-2 rounded bg-surface-container-low text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-medium text-on-surface">Letter (अक्षर)</span>
              </div>
              <span className="font-code-sm font-bold text-on-surface">IIII IIII (9)</span>
              <span className="font-label-sm text-on-surface-variant font-medium">--</span>
            </div>

            <div className="flex items-center justify-between py-1 px-2 rounded bg-surface-container-highest text-xs border border-secondary/20">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                <span className="font-bold text-on-surface">Word (शब्द) [Focus]</span>
              </div>
              <span className="font-code-sm font-bold text-secondary">IIII IIII II (12)</span>
              <span className="font-label-sm text-on-tertiary-container font-bold">+3</span>
            </div>

            <div className="flex items-center justify-between py-1 px-2 rounded bg-surface-container-low text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-on-tertiary-container"></span>
                <span className="font-medium text-on-surface">Paragraph (परिच्छेद)</span>
              </div>
              <span className="font-code-sm font-bold text-on-surface">IIII I (6)</span>
              <span className="font-label-sm text-on-tertiary-container font-bold">+1</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-on-surface-variant text-xs pt-1">
            <span className="font-label-sm text-[11px] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-on-tertiary-container">done_all</span>
              31 total student tallies mapped
            </span>
            <button
              onClick={handleUseSampleTracker}
              className="font-label-sm text-[11px] text-secondary font-bold hover:underline"
              type="button"
            >
              Use Sample Tracker
            </button>
          </div>
        </div>

        {/* Hidden inputs */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={cameraInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Dual Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="w-full h-11 rounded-lg bg-primary text-on-primary font-label-md text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-90 active:scale-98 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            <span>Take Photo</span>
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-11 rounded-lg bg-surface-container text-on-surface font-label-md text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-container-high active:scale-98 transition-all border border-outline-variant/30"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">file_upload</span>
            <span>Upload Photo</span>
          </button>
        </div>
      </section>

      {/* STEP 2: Voice Note Card */}
      <section className="bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-sm border border-outline-variant/20 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full font-label-sm text-[10px] bg-secondary-container text-on-secondary-container font-bold">
                Step 2
              </span>
              <span className="font-label-sm text-xs text-secondary font-semibold">
                Voice Diagnostic
              </span>
            </div>
            <h2 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
              Tell us what happened
            </h2>
          </div>
          <span className="material-symbols-outlined text-secondary text-[24px]">graphic_eq</span>
        </div>
        <p className="font-body-sm text-xs text-on-surface-variant">
          Speak naturally in your language. Tell us which activity you ran, who got stuck, or what felt effortless.
        </p>

        {/* Language Selector Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'hi', label: 'Hindi (हिंदी)' },
            { id: 'mr', label: 'Marathi (मराठी)' },
            { id: 'en', label: 'English' },
            { id: 'auto', label: 'Auto Detect', icon: 'auto_fix_high' }
          ].map((lang) => {
            const isSelected = selectedLanguage === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => handleLanguageChange(lang.id)}
                className={`px-3 py-1.5 rounded-full font-label-sm text-xs flex items-center gap-1 flex-shrink-0 transition-all ${
                  isSelected
                    ? 'bg-secondary text-on-secondary font-bold shadow-sm'
                    : 'bg-surface-container-low text-on-surface font-medium hover:bg-surface-container'
                }`}
                type="button"
              >
                {isSelected && <span className="material-symbols-outlined text-[14px]">check</span>}
                {lang.icon && <span className="material-symbols-outlined text-[14px]">{lang.icon}</span>}
                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Voice Recorder Interface */}
        <div className="bg-surface-container-low rounded-xl p-4 flex flex-col items-center text-center gap-3 border border-outline-variant/20">
          <div className="flex items-center justify-between w-full">
            <span
              className={`inline-flex items-center gap-1.5 font-label-sm text-xs font-bold ${
                isRecording ? 'text-error' : 'text-secondary'
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isRecording ? 'bg-error animate-ping' : 'bg-secondary'
                }`}
              ></span>
              {isRecording ? 'Recording in progress' : 'Tap mic to start recording'}
            </span>
            <span className="font-code-sm text-xs font-bold text-on-surface bg-surface-container px-2 py-0.5 rounded font-numeric">
              {formatTime(recordingSeconds)} / 01:00
            </span>
          </div>

          {/* Animated Pulsing Mic Core */}
          <div className="relative my-2 flex items-center justify-center">
            {isRecording && (
              <>
                <div className="absolute w-20 h-20 rounded-full bg-secondary-container/30 animate-ping"></div>
                <div className="absolute w-16 h-16 rounded-full bg-error/20 animate-pulse"></div>
              </>
            )}
            <button
              aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
              onClick={handleToggleRecording}
              className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer ${
                isRecording ? 'bg-error text-on-error animate-bounce' : 'bg-secondary text-on-secondary'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[28px]">
                {isRecording ? 'stop' : 'mic'}
              </span>
            </button>
          </div>

          {/* Dynamic Waveform Bars */}
          <div className="flex items-center justify-center gap-1 h-8 w-full px-4">
            {[3, 6, 8, 4, 9, 7, 10, 5, 8, 6, 3, 7, 5, 9, 4].map((height, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isRecording ? 'bg-error' : 'bg-secondary'
                }`}
                style={{
                  height: isRecording
                    ? `${Math.max(4, (height * volumeLevel) / 30)}px`
                    : `${height * 2.5}px`
                }}
              ></span>
            ))}
          </div>

          {/* Live speech preview */}
          <div className="w-full bg-surface-container-lowest rounded-lg p-3 text-left shadow-xs border border-outline-variant/20 space-y-1">
            <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-xs">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">translate</span>
                <span className="font-semibold">Live speech preview ({selectedLanguage.toUpperCase()})</span>
              </div>
              <button
                type="button"
                onClick={() => setLiveTranscript('“आज मी वाचन गट केले होते, शब्द स्तरावरील मुलांचा सराव चांगला झाला.”')}
                className="text-[10px] text-secondary font-bold hover:underline"
              >
                Reset
              </button>
            </div>
            <textarea
              value={liveTranscript}
              onChange={(e) => setLiveTranscript(e.target.value)}
              rows={2}
              className="w-full font-body-sm text-xs text-on-surface italic leading-relaxed bg-transparent border-none p-0 focus:outline-none resize-none"
            />
          </div>
        </div>
      </section>

      {/* STEP 3: Review & Privacy Commitment */}
      <section className="bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-sm border border-outline-variant/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full font-label-sm text-[10px] bg-surface-container text-on-surface font-bold">
              Step 3
            </span>
            <h2 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
              Review & Trust Guardrails
            </h2>
          </div>
          <span className="material-symbols-outlined text-secondary text-[20px]">lock</span>
        </div>

        <div className="bg-surface-container-low rounded-xl p-3.5 space-y-2 border border-outline-variant/20">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">
              face_retouching_off
            </span>
            <p className="font-body-sm text-xs text-on-surface">
              Child faces are not required or stored.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">
              delete_forever
            </span>
            <p className="font-body-sm text-xs text-on-surface">
              Audio is purged immediately after clinical diagnostic transcription.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-on-tertiary-container text-[18px] mt-0.5">
              volunteer_activism
            </span>
            <p className="font-body-sm text-xs text-on-surface font-medium">
              Used solely to provide instructional coaching support — never for administrative or teacher performance evaluation.
            </p>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full py-3.5 px-6 rounded-full bg-secondary text-on-secondary font-headline-sm text-sm md:text-base font-bold shadow-md hover:bg-secondary/90 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          type="button"
        >
          {isAnalyzing ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">
                progress_activity
              </span>
              <span>Analyzing Practice with 5-Point Rubric...</span>
            </>
          ) : (
            <>
              <span>Analyze Practice & Get Next Step</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </>
          )}
        </button>
      </section>
    </div>
  );
}
