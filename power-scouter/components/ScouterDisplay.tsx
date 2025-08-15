
import React, { useRef, useState, useCallback } from 'react';
import * as htmlToImage from 'html-to-image';
import type { ScouterData } from '../types';
import Loader from './Loader';
import { useTranslation } from '../hooks/useTranslation';
import CopyIcon from './CopyIcon';
import DownloadIcon from './DownloadIcon';
import RefreshIcon from './RefreshIcon';

interface ScouterDisplayProps {
  imageUrl: string;
  isLoading: boolean;
  scouterData: ScouterData | null;
  error: string | null;
  onReset: () => void;
}

const ScouterDisplay: React.FC<ScouterDisplayProps> = ({ imageUrl, isLoading, scouterData, error, onReset }) => {
  const { t } = useTranslation();
  const formattedPowerLevel = scouterData?.powerLevel ? new Intl.NumberFormat().format(scouterData.powerLevel) : null;
  const captureAreaRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const captureOptions = {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#1f2937', // Matches bg-gray-800 for a clean screenshot background
  };

  const handleDownload = useCallback(() => {
    if (!captureAreaRef.current) return;

    htmlToImage.toPng(captureAreaRef.current, captureOptions)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'power-scouter-analysis.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Failed to generate image for download:', err);
      });
  }, []);

  const handleCopy = useCallback(() => {
    if (!captureAreaRef.current || isCopied) return;

    htmlToImage.toBlob(captureAreaRef.current, captureOptions)
      .then((blob) => {
        if (blob && navigator.clipboard?.write) {
          navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          }).catch(err => {
            console.error('Failed to copy image to clipboard, falling back to download:', err);
            handleDownload(); // Fallback to download
          });
        } else {
            handleDownload(); // Fallback for browsers without clipboard API support
        }
      })
      .catch((err) => {
        console.error('Failed to generate image for copy:', err);
      });
  }, [isCopied, handleDownload]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* This ref now wraps the image and analysis text to capture both as a single UI card */}
      <div ref={captureAreaRef} className="w-full max-w-md overflow-hidden rounded-lg border-2 border-green-500/50 bg-gray-800">
        <div className="relative w-full bg-black max-h-[60vh]">
            <img src={imageUrl} alt={t('display.imageAlt')} className="w-full h-full object-contain" />
            
            {isLoading && <Loader />}
            
            {scouterData && (
            <div 
                className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/70 p-2 sm:p-3 rounded-md border border-green-400 text-green-300"
                style={{ textShadow: '0 0 8px #2fcc71' }}
            >
                <p className="text-xs sm:text-sm uppercase tracking-wider">{t('display.powerLevelLabel')}</p>
                <p className="text-3xl sm:text-4xl font-bold">{formattedPowerLevel}</p>
            </div>
            )}
        </div>
        
        {scouterData && (
            <div className="w-full p-4 bg-gray-900/50 text-center animate-fade-in border-t-2 border-green-500/50">
            <p className="font-bold text-green-400 mb-2">{t('display.analysisLabel')}</p>
            <p className="text-green-200 italic">"{scouterData.reasoning}"</p>
            </div>
        )}
      </div>

      {error && (
        <div className="w-full max-w-md p-4 bg-red-900/50 rounded-md border border-red-500 text-center text-red-300">
          <p className="font-bold">{t('display.errorTitle')}</p>
          <p>{error}</p>
        </div>
      )}

      <div className="w-full flex flex-wrap items-center justify-center gap-3">
        {scouterData && !isLoading && (
          <>
            <button
              onClick={handleCopy}
              disabled={isCopied}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-green-300 font-bold rounded-md hover:bg-gray-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              aria-label={t('display.copyButton.default')}
            >
              <CopyIcon className="w-5 h-5" />
              <span>{isCopied ? t('display.copyButton.copied') : t('display.copyButton.default')}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-green-300 font-bold rounded-md hover:bg-gray-600 transition-colors duration-300"
              aria-label={t('display.downloadButton')}
            >
              <DownloadIcon className="w-5 h-5" />
              <span>{t('display.downloadButton')}</span>
            </button>
          </>
        )}
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? t('display.resetButton.loading') : (
            <>
              <RefreshIcon className="w-5 h-5" />
              <span>{t('display.resetButton.default')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ScouterDisplay;
