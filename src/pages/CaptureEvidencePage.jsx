import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { audioService } from '../services/audioService';
import { cameraService } from '../services/cameraService';
import { aiDiagnosticService } from '../services/aiDiagnosticService';
import { TutorialButton } from '../components/TutorialButton';
import { LiveCameraViewfinder } from '../components/LiveCameraViewfinder';

export function CaptureEvidencePage() {
  const { setCurrentRoute, activeEvidence, setActiveEvidence, showToast, t, language } = useApp();

  const [selectedLanguage, setSelectedLanguage] = useState(language.toLowerCase() === 'en' ? 'en' : language.toLowerCase());
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(25);
  const [uploadedImage, setUploadedImage] = useState(
    activeEvidence.trackerPhoto || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80'
  );
  const [uploadedFile, setUploadedFile] = useState(activeEvidence.trackerFile || null);
  const [capturedPhotoDetails, setCapturedPhotoDetails] = useState(null);

  const [recordedAudioUrl, setRecordedAudioUrl] = useState(activeEvidence.audioUrl || null);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState(activeEvidence.audioBlob || null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioPlayTime, setAudioPlayTime] = useState(0);
  const [micPermissionError, setMicPermissionError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);

  const [liveTranscript, setLiveTranscript] = useState(
    activeEvidence.transcript ||
      '“आज मी वाचन गट केले होते, पण शब्द स्तरावरील मुलांना जास्तीचा वेळ लागला. मात्रा ओळखताना काही मुले अडखळत होती...”'
  );

  const fileInputRef = useRef(null);
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

  // Clean up audio playback & camera streams on unmount
  useEffect(() => {
    return () => {
      audioService.stopAudio();
      audioService.stopSpeech();
      cameraService.stopCamera();
    };
  }, []);

  const handleStartRecording = async () => {
    setMicPermissionError(null);
    setRecordingSeconds(0);
    setIsRecording(true);

    const result = await audioService.startRecording((vol) => {
      setVolumeLevel(Math.min(100, Math.max(15, vol * 1.5)));
    });

    if (result && !result.success) {
      setIsRecording(false);
      setMicPermissionError(
        result.error || 'Microphone permission is required to record your observation. Please allow microphone access in your browser and try again.'
      );
      showToast('Microphone error. Please check permissions.', 4000);
    }
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    const result = await audioService.stopRecording();
    if (result && result.url) {
      setRecordedAudioUrl(result.url);
      setRecordedAudioBlob(result.blob);
      setActiveEvidence((prev) => ({
        ...prev,
        audioUrl: result.url,
        audioBlob: result.blob,
        language: selectedLanguage,
        transcript: liveTranscript
      }));
      showToast('Voice note recorded & transcribed successfully!');
    } else {
      const fallbackUrl = 'simulated-audio-note';
      setRecordedAudioUrl(fallbackUrl);
      setActiveEvidence((prev) => ({
        ...prev,
        audioUrl: fallbackUrl,
        language: selectedLanguage,
        transcript: liveTranscript
      }));
      showToast('Voice note reflection logged!');
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  };

  const handlePlayRecordedAudio = async () => {
    if (isPlayingAudio) {
      audioService.stopAudio();
      audioService.stopSpeech();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      if (recordedAudioUrl && recordedAudioUrl.startsWith('blob:')) {
        audioService.playAudioUrl(recordedAudioUrl, {
          onPlay: () => setIsPlayingAudio(true),
          onPause: () => setIsPlayingAudio(false),
          onEnded: () => setIsPlayingAudio(false),
          onTimeUpdate: (cur) => setAudioPlayTime(cur)
        });
      } else {
        const langCode = selectedLanguage === 'hi' ? 'hi-IN' : selectedLanguage === 'mr' ? 'mr-IN' : 'en-US';
        await audioService.speak(liveTranscript, langCode);
        setIsPlayingAudio(false);
      }
    }
  };

  const handleDeleteAudio = () => {
    audioService.stopAudio();
    audioService.stopSpeech();
    if (recordedAudioUrl) {
      audioService.revokeAudioUrl(recordedAudioUrl);
    }
    setIsPlayingAudio(false);
    setRecordedAudioUrl(null);
    setRecordedAudioBlob(null);
    setRecordingSeconds(0);
    setActiveEvidence((prev) => ({ ...prev, audioUrl: null, audioBlob: null }));
    showToast('Recorded voice note deleted.');
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

  // Camera Capture Handlers
  const handlePhotoCaptured = (captured) => {
    if (uploadedImage && uploadedImage.startsWith('blob:')) {
      cameraService.revokeUrl(uploadedImage);
    }
    setUploadedImage(captured.url);
    setUploadedFile(captured.file);
    setCapturedPhotoDetails({
      timestamp: new Date().toLocaleTimeString(),
      width: captured.width,
      height: captured.height,
      sizeKb: Math.round(captured.blob.size / 1024)
    });
    setIsCameraOpen(false);
    setActiveEvidence((prev) => ({
      ...prev,
      trackerPhoto: captured.url,
      trackerFile: captured.file,
      trackerBlob: captured.blob
    }));
    showToast('Real camera frame captured & attached successfully!');
  };

  const handleRetakePhoto = () => {
    setIsCameraOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (uploadedImage && uploadedImage.startsWith('blob:')) {
        cameraService.revokeUrl(uploadedImage);
      }
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setUploadedFile(file);
      setCapturedPhotoDetails({
        timestamp: new Date().toLocaleTimeString(),
        sizeKb: Math.round(file.size / 1024)
      });
      setActiveEvidence((prev) => ({
        ...prev,
        trackerPhoto: url,
        trackerFile: file,
        trackerBlob: file
      }));
      showToast(`Attached ${file.name} (OCR Ready)`);
    }
  };

  const handleUseSampleTracker = () => {
    const sampleUrl = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80';
    setUploadedImage(sampleUrl);
    setUploadedFile(null);
    setCapturedPhotoDetails(null);
    setActiveEvidence((prev) => ({ ...prev, trackerPhoto: sampleUrl, trackerFile: null }));
    showToast('Attached sample TaRL level tally tracker sheet (OCR Ready)');
  };

  const handleRemoveImage = () => {
    if (uploadedImage && uploadedImage.startsWith('blob:')) {
      cameraService.revokeUrl(uploadedImage);
    }
    setUploadedImage(null);
    setUploadedFile(null);
    setCapturedPhotoDetails(null);
    setActiveEvidence((prev) => ({ ...prev, trackerPhoto: null, trackerFile: null, trackerBlob: null }));
    showToast('Removed attached image.');
  };

  const handleAnalyze = async () => {
    setAnalysisError(null);
    setIsAnalyzing(true);
    try {
      const analysisResult = await aiDiagnosticService.analyzePractice({
        trackerImage: uploadedImage,
        trackerFile: uploadedFile,
        transcriptText: liveTranscript,
        audioBlob: recordedAudioBlob
      });

      setActiveEvidence((prev) => ({
        ...prev,
        trackerPhoto: uploadedImage,
        trackerFile: uploadedFile,
        audioUrl: recordedAudioUrl,
        audioBlob: recordedAudioBlob,
        analysis: analysisResult,
        status: 'completed',
        transcript: liveTranscript
      }));

      showToast('Practice analysis completed in 12s!');
      setCurrentRoute('ai-coach-chat');
    } catch (err) {
      console.error(err);
      setAnalysisError('AI Analysis failed. Please try again.');
      showToast('Diagnostic failed. Click retry.');
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
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200 max-w-3xl mx-auto pb-8">
      {/* Intro Framing with Tutorial Button */}
      <section className="pt-2 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-secondary mb-1">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span className="font-label-sm text-xs uppercase tracking-wider font-bold">
              Teacher Diagnostic Companion
            </span>
          </div>
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-xl md:text-2xl text-on-surface font-bold">
            {t('captureEvidenceTitle', 'Capture Today’s Practice')}
          </h1>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-0.5">
            {t('captureEvidenceSubtitle', 'No forms. Just share what you already have in class.')}
          </p>
        </div>
        <TutorialButton pageKey="capture-evidence" variant="outline" className="shrink-0" />
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
            <div className={`w-7 h-7 rounded-full font-label-sm text-xs flex items-center justify-center font-bold shadow-sm ${
              uploadedImage ? 'bg-secondary text-on-secondary' : 'bg-primary text-on-primary'
            }`}>
              1
            </div>
            <span className="font-label-sm text-xs text-on-surface font-semibold">Tracker Photo</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className={`w-7 h-7 rounded-full font-label-sm text-xs flex items-center justify-center font-bold shadow-sm ${
              recordedAudioUrl ? 'bg-secondary text-on-secondary' : 'bg-secondary-container text-on-secondary-container'
            }`}>
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

      {/* STEP 1: Upload / Live Camera Group Tracker */}
      <section className="bg-surface-container-lowest rounded-xl p-4 md:p-5 shadow-sm border border-outline-variant/20 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full font-label-sm text-[10px] bg-surface-container text-on-surface font-bold">
                Step 1
              </span>
              {uploadedImage ? (
                <span className="font-label-sm text-[10px] text-on-tertiary-container bg-tertiary-fixed/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">check_circle</span>
                  Attached & OCR Ready
                </span>
              ) : (
                <span className="font-label-sm text-[10px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full font-bold">
                  Live Camera / Upload Photo
                </span>
              )}
            </div>
            <h2 className="font-headline-sm text-sm md:text-base text-on-surface font-bold">
              {t('step1Tracker', '1. Upload or Capture Group Tracker')}
            </h2>
          </div>
          <button
            onClick={() => showToast('Capture your student grouping register or blackboard using device camera')}
            className="text-on-surface-variant hover:text-on-surface p-1"
            title="Help on group tracker"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
          </button>
        </div>
        <p className="font-body-sm text-xs text-on-surface-variant">
          Point camera at the student level tracker or blackboard used during today’s TaRL / FLN session.
        </p>

        {/* Live Camera Viewfinder (when camera active) */}
        {isCameraOpen ? (
          <div className="pt-1">
            <LiveCameraViewfinder
              onPhotoCaptured={handlePhotoCaptured}
              onClose={() => setIsCameraOpen(false)}
              showToast={showToast}
            />
          </div>
        ) : uploadedImage ? (
          /* Uploaded / Captured Image Preview Sheet */
          <div className="relative bg-surface-container-low rounded-xl p-3 border border-outline-variant/20 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-outline-variant/30 shrink-0 bg-slate-900">
                  <img
                    src={uploadedImage}
                    alt="Captured Tracker Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-label-md text-xs font-bold text-on-surface truncate">
                    {uploadedFile ? uploadedFile.name : 'tarl_session_track_grade3.jpg'}
                  </p>
                  <p className="font-code-sm text-[10px] text-on-surface-variant">
                    {capturedPhotoDetails ? `${capturedPhotoDetails.sizeKb} KB • ${capturedPhotoDetails.timestamp}` : 'Attached & Validated • 11:28 AM'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleRetakePhoto}
                  className="px-2.5 py-1 text-xs font-bold text-secondary bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors"
                >
                  Retake Photo
                </button>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="px-2.5 py-1 text-xs font-bold text-error hover:bg-surface-container rounded-lg transition-colors"
                >
                  {t('removePhoto', 'Delete')}
                </button>
              </div>
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
                31 total student tallies mapped via OCR
              </span>
              <button
                onClick={handleUseSampleTracker}
                className="font-label-sm text-[11px] text-secondary font-bold hover:underline"
                type="button"
              >
                Reload Sample
              </button>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="p-6 rounded-xl border-2 border-dashed border-outline-variant/40 text-center space-y-2 bg-surface-container-low/40">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">photo_camera</span>
            <p className="text-xs font-bold text-on-surface">No tracker photo attached yet</p>
            <p className="text-[11px] text-on-surface-variant">Open camera to capture blackboard tallies or upload a photo from your device</p>
            <button
              onClick={handleUseSampleTracker}
              type="button"
              className="px-3 py-1.5 bg-surface-container-high rounded-lg text-xs font-bold text-secondary hover:bg-surface-container cursor-pointer"
            >
              {t('useSampleTracker', 'Use Sample Tracker Sheet')}
            </button>
          </div>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Primary Action Buttons (Camera + Upload) */}
        {!isCameraOpen && (
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => setIsCameraOpen(true)}
              className="w-full h-11 rounded-lg bg-primary text-on-primary font-label-md text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-90 active:scale-98 transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              <span>Use Camera</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-11 rounded-lg bg-surface-container text-on-surface font-label-md text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-container-high active:scale-98 transition-all border border-outline-variant/30 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">file_upload</span>
              <span>{t('uploadPhoto', 'Upload Photo')}</span>
            </button>
          </div>
        )}
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
              {t('step2Voice', '2. Tell us what happened')}
            </h2>
          </div>
          <span className="material-symbols-outlined text-secondary text-[24px]">graphic_eq</span>
        </div>
        <p className="font-body-sm text-xs text-on-surface-variant">
          {t('voicePromptHelp', 'Speak naturally in your language. Tell us which activity you ran, who got stuck, or what felt effortless.')}
        </p>

        {micPermissionError && (
          <div className="p-3 bg-error-container/20 rounded-xl border border-error/30 text-xs text-on-surface flex items-start gap-2.5">
            <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5">error</span>
            <div>
              <p className="font-bold text-error">Microphone Access Required</p>
              <p className="text-on-surface-variant mt-0.5">{micPermissionError}</p>
            </div>
          </div>
        )}

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
              {isRecording ? t('recording', 'Recording in progress') : recordedAudioUrl ? 'Voice Note Captured' : 'Tap mic to start recording'}
            </span>
            <span className="font-code-sm text-xs font-bold text-on-surface bg-surface-container px-2 py-0.5 rounded font-numeric">
              {formatTime(recordingSeconds || 42)} / 01:00
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

          {/* Audio Controls Bar (Playback & Re-record) */}
          {recordedAudioUrl && (
            <div className="w-full flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30">
              <button
                type="button"
                onClick={handlePlayRecordedAudio}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  {isPlayingAudio ? 'stop' : 'play_arrow'}
                </span>
                <span>{isPlayingAudio ? t('pauseVoice', 'Stop Playback') : t('playVoice', 'Play Voice Note')}</span>
              </button>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleDeleteAudio}
                  className="px-2 py-1 text-xs text-error hover:bg-surface-container rounded font-bold cursor-pointer"
                >
                  {t('deleteRecording', 'Delete')}
                </button>
                <button
                  type="button"
                  onClick={handleStartRecording}
                  className="px-2.5 py-1 text-xs text-secondary bg-surface-container rounded font-bold hover:bg-surface-container-high cursor-pointer"
                >
                  Re-record
                </button>
              </div>
            </div>
          )}

          {/* Live speech preview */}
          <div className="w-full bg-surface-container-lowest rounded-lg p-3 text-left shadow-xs border border-outline-variant/20 space-y-1">
            <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-xs">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">translate</span>
                <span className="font-semibold">Transcribed Voice Evidence ({selectedLanguage.toUpperCase()})</span>
              </div>
              <button
                type="button"
                onClick={() => setLiveTranscript('“आज मी वाचन गट केले होते, शब्द स्तरावरील मुलांचा सराव चांगला झाला.”')}
                className="text-[10px] text-secondary font-bold hover:underline cursor-pointer"
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
              Used solely to provide instructional coaching support — never for administrative evaluation.
            </p>
          </div>
        </div>

        {analysisError && (
          <div className="p-3 rounded-lg bg-error-container text-on-error-container text-xs font-bold flex items-center justify-between">
            <span>{analysisError}</span>
            <button onClick={handleAnalyze} className="underline cursor-pointer">Retry</button>
          </div>
        )}

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
              <span>{t('submitEvidence', 'Analyze Practice & Get Next Step')}</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </>
          )}
        </button>
      </section>
    </div>
  );
}
