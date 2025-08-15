
import React, { createContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'zh';
type Translations = Record<string, string>;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translations;
}

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
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTranslations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/locales/${language}.json`);
        if (!response.ok) {
          throw new Error(`Could not load ${language} translations`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error(error);
        // Fallback to English if translations fail to load
        try {
          const fallbackResponse = await fetch('/locales/en.json');
          const data = await fallbackResponse.json();
          setTranslations(data);
        } catch (fallbackError) {
          console.error("Failed to load fallback English translations:", fallbackError);
          setTranslations({}); // No translations available
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTranslations();
  }, [language]);

  if (isLoading) {
    return null; // Don't render the app until translations are loaded
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
