
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
    "uploader.or": "OR",
    "uploader.useCamera": "Use Camera",
    "display.powerLevelLabel": "POWER LEVEL",
    "display.analysisLabel": "Scouter Analysis:",
    "display.imageAlt": "Subject being analyzed",
    "display.errorTitle": "Analysis Error!",
    "display.errorDefault": "Failed to analyze. The power level might be too high to measure, or an API error occurred.",
    "display.resetButton.loading": "Analyzing...",
    "display.resetButton.default": "Scan Next",
    "display.copyButton.default": "Copy Image",
    "display.copyButton.copied": "Copied!",
    "display.downloadButton": "Download Image",
    "loader.message": "Analyzing...",
    "settings.title": "Settings",
    "settings.modelLabel": "Select Analysis Model",
    "settings.modelDescription": "Different models can affect response speed and analysis quality.",
    "settings.languageLabel": "Language",
    "settings.apiKeyLabel": "Gemini API Key",
    "settings.apiKeyDescription": "Your key is stored only in your browser.",
    "settings.apiKeyPlaceholder": "Paste your API key here",
    "settings.closeButton": "Close",
    "model.gemini-2.5-flash.name": "Gemini 2.5 Flash (Standard)",
    "model.gemini-2.5-pro.name": "Gemini 2.5 Pro (Advanced)",
    "dropzone.title": "Drop Anywhere to Analyze",
    "error.apiKeyMissing": "API key not set or provided. Please add your key in the settings.",
    "camera.capture": "Capture",
    "camera.cancel": "Cancel",
    "camera.error.title": "Camera Error",
    "camera.error.permission": "Camera permission was denied. Please enable it in your browser settings to use this feature.",
    "camera.error.noDevice": "No camera device found. Please check if your camera is connected.",
    "camera.error.generic": "An unexpected error occurred while accessing the camera.",
    "settings.githubLink": "View Source on GitHub"
  },
  zh: {
    "header.title": "Power Scouter",
    "settings.button.label": "打开设置",
    "uploader.title": "点击上传、拖放或粘贴",
    "uploader.subtitle": "支持 PNG, JPG, 或 WEBP 格式",
    "uploader.or": "或",
    "uploader.useCamera": "使用摄像头",
    "display.powerLevelLabel": "战斗力",
    "display.analysisLabel": "侦测器分析：",
    "display.imageAlt": "被分析的对象",
    "display.errorTitle": "分析错误！",
    "display.errorDefault": "分析失败。战斗力可能过高无法测量，或发生API错误。",
    "display.resetButton.loading": "分析中...",
    "display.resetButton.default": "清空",
    "display.copyButton.default": "复制图片",
    "display.copyButton.copied": "已复制！",
    "display.downloadButton": "下载图片",
    "loader.message": "分析中...",
    "settings.title": "设置",
    "settings.modelLabel": "选择分析模型",
    "settings.modelDescription": "不同的模型会影响响应速度和分析质量。",
    "settings.languageLabel": "语言",
    "settings.apiKeyLabel": "Gemini API 密钥",
    "settings.apiKeyDescription": "您的密钥只会存储在您的浏览器中。",
    "settings.apiKeyPlaceholder": "在此处粘贴您的 API 密钥",
    "settings.closeButton": "关闭",
    "model.gemini-2.5-flash.name": "Gemini 2.5 Flash (标准)",
    "model.gemini-2.5-pro.name": "Gemini 2.5 Pro (高级)",
    "dropzone.title": "拖放到任何地方进行分析",
    "error.apiKeyMissing": "未设置或提供 API 密钥。请在设置中添加您的密钥。",
    "camera.capture": "拍照",
    "camera.cancel": "取消",
    "camera.error.title": "摄像头错误",
    "camera.error.permission": "摄像头权限被拒绝。请在浏览器设置中启用以使用此功能。",
    "camera.error.noDevice": "未找到摄像头设备。请检查您的摄像头是否已连接。",
    "camera.error.generic": "访问摄像头时发生意外错误。",
    "settings.githubLink": "在 GitHub 上查看源代码"
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