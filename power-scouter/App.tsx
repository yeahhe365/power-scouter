
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { analyzeImagePowerLevel } from './services/geminiService';
import type { ScouterData, ModelConfig } from './types';
import { defaultModel } from './config/models';
import ImageUploader from './components/ImageUploader';
import ScouterDisplay from './components/ScouterDisplay';
import ScouterIcon from './components/ScouterIcon';
import SettingsIcon from './components/SettingsIcon';
import SettingsModal from './components/SettingsModal';
import { useTranslation } from './hooks/useTranslation';

const DropZoneOverlay: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-green-900/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center pointer-events-none animate-fade-in">
      <div className="text-center border-4 border-dashed border-green-400 p-8 sm:p-12 rounded-lg bg-gray-900/30">
        <ScouterIcon className="w-20 h-20 sm:w-24 sm:h-24 text-green-400 mx-auto animate-pulse" />
        <p className="mt-4 text-2xl sm:text-3xl font-bold text-green-300 tracking-widest uppercase" style={{ textShadow: '0 0 5px #2fcc71' }}>
          {t('dropzone.title')}
        </p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [scouterData, setScouterData] = useState<ScouterData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelConfig>(defaultModel);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const { t, language } = useTranslation();
  const [isDraggingOverWindow, setIsDraggingOverWindow] = useState<boolean>(false);
  const dragCounter = useRef(0);

  const handleImageUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setScouterData(null);
    setImageFile(file);

    setImageUrl(prevUrl => {
      if (prevUrl) {
        URL.revokeObjectURL(prevUrl);
      }
      return URL.createObjectURL(file);
    });

    try {
      const data = await analyzeImagePowerLevel(file, selectedModel, language);
      setScouterData(data);
    } catch (err: any) {
      console.error(err);
      if (err.message === "API_KEY_MISSING") {
        setError(t('error.apiKeyMissing'));
      } else {
        setError(t('display.errorDefault'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedModel, t, language]);

  const handleReset = useCallback(() => {
    setImageFile(null);
    setImageUrl(prevUrl => {
      if (prevUrl) {
          URL.revokeObjectURL(prevUrl);
      }
      return null;
    });
    setScouterData(null);
    setIsLoading(false);
    setError(null);
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDraggingOverWindow(false);
    
    if (isLoading) return;

    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    }
  }, [handleImageUpload, isLoading]);

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (!isLoading) {
        setIsDraggingOverWindow(true);
    }
  }, [isLoading]);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
        setIsDraggingOverWindow(false);
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  useEffect(() => {
    window.addEventListener('drop', handleDrop);
    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);

    return () => {
        window.removeEventListener('drop', handleDrop);
        window.removeEventListener('dragenter', handleDragEnter);
        window.removeEventListener('dragleave', handleDragLeave);
        window.removeEventListener('dragover', handleDragOver);
    };
  }, [handleDrop, handleDragEnter, handleDragLeave, handleDragOver]);

  return (
    <>
      {isDraggingOverWindow && <DropZoneOverlay />}
      <div className="h-screen flex flex-col justify-center items-center p-2 sm:p-4 bg-gray-900 bg-opacity-80 backdrop-blur-sm overflow-y-auto">
        <div className="w-full max-w-2xl">
          <header className="flex items-center justify-between mb-4 md:mb-8 shrink-0">
            <div className="flex items-center space-x-4">
              <ScouterIcon className="w-12 h-12 sm:w-16 sm:h-16 text-green-400" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400 tracking-widest uppercase" style={{ textShadow: '0 0 5px #2fcc71, 0 0 10px #2fcc71' }}>
                {t('header.title')}
              </h1>
            </div>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="text-green-400 hover:text-green-300 transition-colors p-2 rounded-full hover:bg-green-500/20"
              aria-label={t('settings.button.label')}
            >
              <SettingsIcon className="w-8 h-8"/>
            </button>
          </header>

          <main className="bg-gray-800 border-2 border-green-500/50 rounded-lg p-4 sm:p-6 shadow-2xl shadow-green-500/10">
            {!imageUrl ? (
              <ImageUploader onImageUpload={handleImageUpload} disabled={isLoading} />
            ) : (
              <ScouterDisplay
                imageUrl={imageUrl}
                isLoading={isLoading}
                scouterData={scouterData}
                error={error}
                onReset={handleReset}
              />
            )}
          </main>
        </div>
      </div>
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />
    </>
  );
};

export default App;
