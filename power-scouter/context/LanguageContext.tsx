import React, { createContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';
type Translations = Record<string, string>;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translations;
}

const translationsData: Record<Language, Translations> = {
  en: {
    "header.title": "Power Scouter",
    "settings.button.label": "Open Settings",
    "uploader.title": "Click to upload, drag and drop, or paste",
    "uploader.subtitle": "PNG, JPG, or WEBP supported",
    "display.powerLevelLabel": "POWER LEVEL",
    "display.analysisLabel": "Scouter Analysis:",
    "display.imageAlt": "Subject being analyzed",
    "display.errorTitle": "Analysis Error!",
    "display.errorDefault": "Failed to analyze. The power level might be too high to measure, or an API error occurred.",
    "display.resetButton.loading": "Analyzing...",
    "display.resetButton.default": "Scan Next",
    "loader.message": "Analyzing...",
    "settings.title": "Settings",
    "settings.modelLabel": "Select Analysis Model",
    "settings.modelDescription": "Different models can affect response speed and analysis quality.",
    "settings.languageLabel": "Language",
    "settings.closeButton": "Close",
    "model.gemini-2.5-flash.name": "Gemini 2.5 Flash (Standard)",
    "dropzone.title": "Drop Anywhere to Analyze",
    "error.apiKeyMissing": "Application not configured: API key is missing."
  },
  zh: {
    "header.title": "Power Scouter",
    "settings.button.label": "打开设置",
    "uploader.title": "点击上传、拖放或粘贴",
    "uploader.subtitle": "支持 PNG, JPG, 或 WEBP 格式",
    "display.powerLevelLabel": "战斗力",
    "display.analysisLabel": "侦测器分析：",
    "display.imageAlt": "被分析的对象",
    "display.errorTitle": "分析错误！",
    "display.errorDefault": "分析失败。战斗力可能过高无法测量，或发生API错误。",
    "display.resetButton.loading": "分析中...",
    "display.resetButton.default": "扫描下一个",
    "loader.message": "分析中...",
    "settings.title": "设置",
    "settings.modelLabel": "选择分析模型",
    "settings.modelDescription": "不同的模型会影响响应速度和分析质量。",
    "settings.languageLabel": "语言",
    "settings.closeButton": "关闭",
    "model.gemini-2.5-flash.name": "Gemini 2.5 Flash (标准)",
    "dropzone.title": "拖放到任何地方进行分析",
    "error.apiKeyMissing": "应用程序配置不正确：缺少 API 密钥。"
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  translations: {},
});

const getInitialLanguage = (): Language => {
    if (typeof navigator !== 'undefined') {
        const browserLang = navigator.language || (navigator as any).userLanguage;
        if (browserLang.toLowerCase().startsWith('zh')) {
            return 'zh';
        }
    }
    return 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const translations = translationsData[language] || translationsData.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
