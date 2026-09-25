import React, { useState, useEffect, useRef } from 'react';
import { cameraService } from '../services/cameraService';

export function LiveCameraViewfinder({ onPhotoCaptured, onClose, showToast }) {
  const videoRef = useRef(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');

  // Initialize camera on mount
  useEffect(() => {
    let isMounted = true;

    async function initCamera() {
      setIsInitializing(true);
      setCameraError(null);

      if (!videoRef.current) return;

      const result = await cameraService.startCamera(videoRef.current, facingMode);
      if (!isMounted) {
        cameraService.stopCamera();
        return;
      }

      setIsInitializing(false);

      if (!result.success) {
        setCameraError(result.error);
        if (showToast) showToast('Camera access could not be initialized.', 4000);
      }
    }

    initCamera();

    return () => {
      isMounted = false;
      cameraService.stopCamera();
    };
  }, [facingMode]);

  const handleCapture = async () => {
    if (!videoRef.current || isCapturing) return;

    setIsCapturing(true);
    try {
      const result = await cameraService.captureFrame(videoRef.current);
      if (result.success) {
        cameraService.stopCamera();
        onPhotoCaptured({
          blob: result.blob,
          file: result.file,
          url: result.url,
          width: result.width,
          height: result.height
        });
      } else {
        setCameraError(result.error || 'Failed to capture photo frame.');
        setIsCapturing(false);
      }
    } catch (err) {
      console.error('[LiveCameraViewfinder] Capture error:', err);
      setCameraError('An unexpected error occurred while capturing the photo.');
      setIsCapturing(false);
    }
  };

  const handleToggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const handleRetry = async () => {
    setIsInitializing(true);
    setCameraError(null);
    if (videoRef.current) {
      const result = await cameraService.startCamera(videoRef.current, facingMode);
      setIsInitializing(false);
      if (!result.success) {
        setCameraError(result.error);
      }
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-outline-variant/30 shadow-xl flex flex-col items-center justify-between min-h-[360px] sm:min-h-[420px] animate-in fade-in">
      {/* Top Controls Overlay */}
      <div className="absolute top-0 inset-x-0 z-20 p-3 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-label-sm text-xs">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span className="font-semibold">Live Camera Viewfinder</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Flip camera on mobile */}
          <button
            type="button"
            onClick={handleToggleFacingMode}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 flex items-center justify-center transition-colors"
            title="Switch Camera (Front / Rear)"
          >
            <span className="material-symbols-outlined text-[20px]">flip_camera_ios</span>
          </button>

          {/* Close viewfinder button */}
          <button
            type="button"
            onClick={() => {
              cameraService.stopCamera();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 flex items-center justify-center transition-colors"
            aria-label="Close Camera"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      {/* Live Video Element & Alignment Guidelines */}
      <div className="relative w-full flex-1 flex items-center justify-center bg-black overflow-hidden aspect-[4/3] sm:aspect-[16/9]">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />

        {/* Framing Grid Overlay for Tracker Sheets */}
        {!isInitializing && !cameraError && (
          <div className="absolute inset-4 pointer-events-none border border-white/25 rounded-xl flex flex-col justify-between p-3">
            <div className="flex justify-between text-[10px] text-white/70 font-mono">
              <span>┌ Align Register / Blackboard</span>
              <span>┐</span>
            </div>
            <div className="flex justify-center">
              <span className="px-2 py-0.5 rounded bg-black/40 text-white/80 text-[10px] backdrop-blur-xs font-medium">
                Keep student level tallies inside frame
              </span>
            </div>
            <div className="flex justify-between text-[10px] text-white/70 font-mono">
              <span>└</span>
              <span>┘</span>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {isInitializing && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center gap-2 text-white z-10">
            <span className="material-symbols-outlined text-4xl animate-spin text-secondary">
              progress_activity
            </span>
            <p className="text-xs font-semibold">Requesting Camera Permission...</p>
            <p className="text-[11px] text-slate-400">Please click "Allow" in your browser prompt</p>
          </div>
        )}

        {/* Error State Overlay */}
        {cameraError && (
          <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center gap-3 text-white z-10 animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">videocam_off</span>
            </div>
            <div className="max-w-sm space-y-1">
              <h3 className="font-bold text-sm text-red-300">Camera Access Error</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{cameraError}</p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleRetry}
                className="px-4 py-2 rounded-xl bg-secondary text-on-secondary text-xs font-bold shadow-sm hover:bg-secondary/90 transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                <span>Try Again</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 transition-colors"
              >
                Use File Upload Instead
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Shutter Action Bar */}
      {!cameraError && (
        <div className="w-full p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-center gap-6 z-20">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/10"
          >
            Cancel
          </button>

          {/* Big Shutter Button */}
          <button
            type="button"
            onClick={handleCapture}
            disabled={isInitializing || isCapturing}
            className="w-16 h-16 rounded-full border-4 border-white bg-secondary flex items-center justify-center shadow-2xl active:scale-90 hover:scale-105 transition-all disabled:opacity-50 cursor-pointer"
            aria-label="Capture Photo"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-2xl font-bold">photo_camera</span>
            </div>
          </button>

          <div className="w-12"></div>
        </div>
      )}
    </div>
  );
}
