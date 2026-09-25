// Real Audio & Voice Capture Service for Practice Layer
// Compliant with Web Audio API, MediaRecorder API, HTML5 Audio, and Web Speech Synthesis

class AudioService {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;
    this.source = null;
    this.stream = null;
    this.activeAudioElement = null;
    this.selectedMimeType = '';
  }

  // Detect supported audio mime types across Chrome, Safari, Firefox, Edge, iOS & Android
  getSupportedMimeType() {
    if (typeof MediaRecorder === 'undefined') {
      return '';
    }
    const candidateTypes = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/ogg;codecs=opus',
      'audio/ogg',
      'audio/aac',
      'audio/wav'
    ];
    for (const type of candidateTypes) {
      if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return '';
  }

  // Real Microphone Recording Start
  async startRecording(onVolumeChange) {
    this.audioChunks = [];
    this.selectedMimeType = this.getSupportedMimeType();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return {
        success: false,
        fallback: true,
        error: 'Microphone recording is not supported in this browser environment.'
      };
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      const options = this.selectedMimeType ? { mimeType: this.selectedMimeType } : undefined;
      this.mediaRecorder = options ? new MediaRecorder(this.stream, options) : new MediaRecorder(this.stream);

      // Web Audio setup for live visualizer
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        try {
          this.audioContext = new AudioCtx();
          this.analyser = this.audioContext.createAnalyser();
          this.analyser.fftSize = 64;
          this.source = this.audioContext.createMediaStreamSource(this.stream);
          this.source.connect(this.analyser);

          const bufferLength = this.analyser.frequencyBinCount;
          this.dataArray = new Uint8Array(bufferLength);

          const checkVolume = () => {
            if (!this.mediaRecorder || this.mediaRecorder.state !== 'recording') return;
            this.analyser.getByteFrequencyData(this.dataArray);
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              sum += this.dataArray[i];
            }
            const average = sum / bufferLength;
            if (onVolumeChange) onVolumeChange(average);
            requestAnimationFrame(checkVolume);
          };
          requestAnimationFrame(checkVolume);
        } catch (ctxErr) {
          console.warn('[AudioService] Web Audio Context failed for visualizer:', ctxErr);
        }
      }

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      // Collect data chunks every 250ms for responsive streaming
      this.mediaRecorder.start(250);

      return {
        success: true,
        mimeType: this.selectedMimeType || 'audio/webm'
      };
    } catch (err) {
      console.warn('[AudioService] Microphone access error:', err);
      let userFriendlyMessage = 'Microphone permission is required to record your observation. Please allow microphone access in your browser and try again.';
      if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        userFriendlyMessage = 'No microphone device was detected on your system.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        userFriendlyMessage = 'Microphone is currently in use by another application.';
      }
      return {
        success: false,
        fallback: true,
        error: userFriendlyMessage
      };
    }
  }

  // Real Microphone Recording Stop
  stopRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        this._cleanupStream();
        resolve({
          success: false,
          url: null,
          blob: null,
          duration: 0
        });
        return;
      }

      this.mediaRecorder.onstop = () => {
        const mime = this.selectedMimeType || 'audio/webm';
        const audioBlob = new Blob(this.audioChunks, { type: mime });
        const audioUrl = URL.createObjectURL(audioBlob);

        this._cleanupStream();

        resolve({
          success: true,
          url: audioUrl,
          blob: audioBlob,
          mimeType: mime,
          sizeBytes: audioBlob.size
        });
      };

      try {
        this.mediaRecorder.stop();
      } catch (e) {
        console.warn('[AudioService] MediaRecorder stop error:', e);
        this._cleanupStream();
        resolve({ success: false, url: null, blob: null });
      }
    });
  }

  _cleanupStream() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {
          console.warn(e);
        }
      });
      this.stream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch (e) {
        console.warn(e);
      }
      this.audioContext = null;
    }
  }

  // Playback of Recorded Audio Object URL / File
  playAudioUrl(url, { onPlay, onPause, onEnded, onTimeUpdate } = {}) {
    if (this.activeAudioElement) {
      this.activeAudioElement.pause();
      this.activeAudioElement = null;
    }

    if (!url) return null;

    const audio = new Audio(url);
    this.activeAudioElement = audio;

    if (onPlay) audio.onplay = onPlay;
    if (onPause) audio.onpause = onPause;
    if (onEnded) audio.onended = () => {
      if (onEnded) onEnded();
      this.activeAudioElement = null;
    };
    if (onTimeUpdate) audio.ontimeupdate = () => onTimeUpdate(audio.currentTime, audio.duration);

    audio.play().catch((err) => {
      console.warn('[AudioService] Playback failed:', err);
      if (onEnded) onEnded();
    });

    return audio;
  }

  pauseAudio() {
    if (this.activeAudioElement) {
      this.activeAudioElement.pause();
    }
  }

  resumeAudio() {
    if (this.activeAudioElement) {
      this.activeAudioElement.play().catch((e) => console.warn(e));
    }
  }

  stopAudio() {
    if (this.activeAudioElement) {
      this.activeAudioElement.pause();
      this.activeAudioElement.currentTime = 0;
      this.activeAudioElement = null;
    }
  }

  revokeAudioUrl(url) {
    if (url && typeof url === 'string' && url.startsWith('blob:')) {
      try {
        URL.revokeObjectURL(url);
      } catch (e) {
        console.warn('[AudioService] Revoke error:', e);
      }
    }
  }

  // Web Speech Synthesis (for AI Coach Voice Notes & Dialect Audio)
  speak(text, lang = 'mr-IN') {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported in this browser.');
        resolve();
        return;
      }

      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_#"`]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = lang;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const prefix = lang.split('-')[0].toLowerCase();
      const targetVoice = voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
      if (targetVoice) {
        utterance.voice = targetVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    });
  }

  stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.stopAudio();
  }
}

export const audioService = new AudioService();
