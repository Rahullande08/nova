// Real Browser Camera Service for Practice Layer
// Manages MediaStream lifecycle, device constraints, frame capture via Canvas, and resource cleanup

class CameraService {
  constructor() {
    this.activeStream = null;
    this.facingMode = 'environment'; // default to rear camera on mobile
  }

  // Check if browser environment supports mediaDevices and camera
  isSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  // Request camera permission and start video stream
  async startCamera(videoElement, preferredFacingMode = 'environment') {
    this.stopCamera();
    this.facingMode = preferredFacingMode;

    if (!this.isSupported()) {
      return {
        success: false,
        error: 'Camera capture is not supported in this browser. Please use the Upload Photo option.'
      };
    }

    try {
      let stream;
      try {
        // Try with optimal constraints first (rear camera on mobile, 720p/1080p resolution)
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: this.facingMode },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
      } catch (constraintErr) {
        console.warn('[CameraService] Constrained getUserMedia failed, attempting fallback to basic video:', constraintErr);
        // Fallback to basic video constraint if ideal constraints fail
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
      }

      this.activeStream = stream;

      if (videoElement) {
        videoElement.srcObject = stream;
        // Ensure play is called and resolved
        await videoElement.play().catch((playErr) => {
          console.warn('[CameraService] Video play error (non-fatal):', playErr);
        });
      }

      return {
        success: true,
        stream: this.activeStream
      };
    } catch (err) {
      console.warn('[CameraService] Camera access error:', err);
      let message = 'Camera permission is required to capture evidence. Please allow camera access in your browser and try again.';

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        message = 'Camera permission was denied. Please allow camera access in your browser settings and try again.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        message = 'No camera device was detected on your system.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        message = 'Camera is currently in use by another application. Please close other camera apps and try again.';
      } else if (err.name === 'OverconstrainedError') {
        message = 'Camera does not satisfy the required resolution constraints.';
      }

      return {
        success: false,
        error: message,
        errorName: err.name
      };
    }
  }

  // Capture current video frame to high-resolution JPEG Blob via Offscreen/HTML5 Canvas
  captureFrame(videoElement) {
    if (!videoElement || !this.activeStream) {
      return { success: false, error: 'No active camera stream available for capture.' };
    }

    const width = videoElement.videoWidth || 1280;
    const height = videoElement.videoHeight || 720;

    if (width === 0 || height === 0) {
      return { success: false, error: 'Video stream metadata not loaded yet. Please wait a moment.' };
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return { success: false, error: 'Canvas 2D context unavailable.' };
    }

    // Draw full video frame onto canvas
    ctx.drawImage(videoElement, 0, 0, width, height);

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve({ success: false, error: 'Failed to generate image blob from video frame.' });
            return;
          }

          const file = new File([blob], `tarl_tracker_capture_${Date.now()}.jpg`, { type: 'image/jpeg' });
          const url = URL.createObjectURL(blob);

          resolve({
            success: true,
            blob,
            file,
            url,
            width,
            height
          });
        },
        'image/jpeg',
        0.92
      );
    });
  }

  // Stop all camera hardware tracks and release device indicator
  stopCamera() {
    if (this.activeStream) {
      this.activeStream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {
          console.warn('[CameraService] Track stop error:', e);
        }
      });
      this.activeStream = null;
    }
  }

  // Revoke object URLs to prevent memory leaks
  revokeUrl(url) {
    if (url && typeof url === 'string' && url.startsWith('blob:')) {
      try {
        URL.revokeObjectURL(url);
      } catch (e) {
        console.warn('[CameraService] Revoke error:', e);
      }
    }
  }
}

export const cameraService = new CameraService();
