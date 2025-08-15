
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export const useTranslation = () => {
  const { language, translations } = useContext(LanguageContext);

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return { t, language };
};
