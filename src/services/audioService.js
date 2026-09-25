// Audio Service: Handles real microphone capture, waveform analysis, and Text-to-Speech coaching playback

class AudioService {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;
    this.source = null;
    this.stream = null;
  }

  async startRecording(onVolumeChange) {
    this.audioChunks = [];
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);

      // Web Audio setup for visualizer
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
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
      }

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(200);
      return { success: true };
    } catch (err) {
      console.warn('Microphone access unavailable or denied, falling back to simulated audio:', err);
      return { success: false, fallback: true, error: err.message };
    }
  }

  stopRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        if (this.stream) {
          this.stream.getTracks().forEach((track) => track.stop());
        }
        resolve({ url: null, duration: 42 });
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        if (this.stream) {
          this.stream.getTracks().forEach((track) => track.stop());
        }
        if (this.audioContext && this.audioContext.state !== 'closed') {
          this.audioContext.close();
        }
        resolve({ url: audioUrl, blob: audioBlob });
      };

      this.mediaRecorder.stop();
    });
  }

  speak(text, lang = 'mr-IN') {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported in this browser.');
        resolve();
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      // Look for preferred voices if available
      const voices = window.speechSynthesis.getVoices();
      const targetVoice = voices.find((v) => v.lang.startsWith(lang.slice(0, 2)));
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
  }
}

export const audioService = new AudioService();
