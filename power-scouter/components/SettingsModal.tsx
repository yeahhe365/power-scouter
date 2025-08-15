
import React, { useContext } from 'react';
import type { ModelConfig } from '../types';
import { availableModels } from '../config/models';
import { useTranslation } from '../hooks/useTranslation';
import { LanguageContext } from '../context/LanguageContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: ModelConfig;
  onModelChange: (model: ModelConfig) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, selectedModel, onModelChange, apiKey, onApiKeyChange }) => {
  const { t } = useTranslation();
  const { language, setLanguage } = useContext(LanguageContext);

  if (!isOpen) return null;

  const handleModelSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModelKey = e.target.value;
    const model = availableModels.find(m => m.nameKey === selectedModelKey);
    if (model) {
      onModelChange(model);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as 'en' | 'zh';
    setLanguage(lang);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div 
        className="bg-gray-800 border-2 border-green-500/50 rounded-lg p-6 shadow-2xl shadow-green-500/10 w-full max-w-md animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="settings-title" className="text-2xl font-bold text-green-400 mb-6">{t('settings.title')}</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="language-select" className="block mb-2 text-sm font-medium text-green-300">
              {t('settings.languageLabel')}
            </label>
            <select
              id="language-select"
              value={language}
              onChange={handleLanguageChange}
              className="bg-gray-900 border border-green-500/50 text-green-300 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            >
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
          </div>
          <div>
            <label htmlFor="api-key-input" className="block mb-2 text-sm font-medium text-green-300">
              {t('settings.apiKeyLabel')}
            </label>
            <input
              id="api-key-input"
              type="password"
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder={t('settings.apiKeyPlaceholder')}
              className="bg-gray-900 border border-green-500/50 text-green-300 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            <p className="mt-2 text-xs text-gray-400">
              {t('settings.apiKeyDescription')}
            </p>
          </div>
          {availableModels.length > 1 && (
            <div>
              <label htmlFor="model-select" className="block mb-2 text-sm font-medium text-green-300">
                {t('settings.modelLabel')}
              </label>
              <select 
                id="model-select"
                value={selectedModel.nameKey}
                onChange={handleModelSelect}
                className="bg-gray-900 border border-green-500/50 text-green-300 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              >
                {availableModels.map(model => (
                  <option key={model.nameKey} value={model.nameKey}>{t(model.nameKey)}</option>
                ))}
              </select>
              <p className="mt-2 text-xs text-gray-400">
                {t('settings.modelDescription')}
              </p>
            </div>
          )}
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-500 transition-colors duration-300"
          >
            {t('settings.closeButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;