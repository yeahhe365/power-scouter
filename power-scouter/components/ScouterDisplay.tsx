
import React from 'react';
import type { ScouterData } from '../types';
import Loader from './Loader';
import { useTranslation } from '../hooks/useTranslation';

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

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-lg border-2 border-green-500/50 max-h-[60vh]">
        <img src={imageUrl} alt={t('display.imageAlt')} className="w-full h-full object-contain" />
        
        {isLoading && <Loader />}
        
        {scouterData && (
          <div 
            className="absolute top-4 left-4 bg-black/70 p-3 rounded-md border border-green-400 text-green-300"
            style={{ textShadow: '0 0 8px #2fcc71' }}
          >
            <p className="text-sm uppercase tracking-wider">{t('display.powerLevelLabel')}</p>
            <p className="text-4xl font-bold">{formattedPowerLevel}</p>
          </div>
        )}
      </div>

      {scouterData && (
        <div className="w-full p-4 bg-gray-900/50 rounded-md border border-gray-700 text-center animate-fade-in">
          <p className="font-bold text-green-400 mb-2">{t('display.analysisLabel')}</p>
          <p className="text-green-200 italic">"{scouterData.reasoning}"</p>
        </div>
      )}

      {error && (
        <div className="w-full p-4 bg-red-900/50 rounded-md border border-red-500 text-center text-red-300">
          <p className="font-bold">{t('display.errorTitle')}</p>
          <p>{error}</p>
        </div>
      )}

      <button
        onClick={onReset}
        className="px-6 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? t('display.resetButton.loading') : t('display.resetButton.default')}
      </button>
    </div>
  );
};

export default ScouterDisplay;