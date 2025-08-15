import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface CameraViewProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err: any) {
        console.error("Camera access error:", err);
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setCameraError(t('camera.error.permission'));
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
           setCameraError(t('camera.error.noDevice'));
        } else {
           setCameraError(t('camera.error.generic'));
        }
      }
    };

    startCamera();

    return () => {
      // Cleanup: stop the stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [t]);

  const handleCapture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'capture.png', { type: 'image/png' });
            onCapture(file);
          }
        }, 'image/png');
      }
    }
  }, [onCapture]);

  return (
    <div className="relative w-full flex flex-col items-center space-y-4">
        <div className="relative w-full max-w-md overflow-hidden rounded-lg border-2 border-green-500/50 aspect-video bg-black">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                aria-label="Live camera feed"
            />
            {cameraError && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-4">
                    <p className="font-bold text-red-400 mb-2">{t('camera.error.title')}</p>
                    <p className="text-red-300 text-sm">{cameraError}</p>
                </div>
            )}
        </div>
        <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

        <div className="flex items-center justify-center gap-4 w-full">
            <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-500 transition-colors duration-300"
                aria-label={t('camera.cancel')}
            >
                {t('camera.cancel')}
            </button>
            <button
                onClick={handleCapture}
                disabled={!!cameraError}
                className="px-6 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={t('camera.capture')}
            >
                 {t('camera.capture')}
            </button>
        </div>
    </div>
  );
};

export default CameraView;
