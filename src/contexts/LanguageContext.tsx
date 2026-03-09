import { createContext, useContext, useState, type ReactNode } from 'react';
import { i18n, type Lang, type I18nStrings } from '@/lib/i18n';
import { it as itLocale, enUS } from 'date-fns/locale';
import type { Locale } from 'date-fns';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: I18nStrings;
  dateLocale: Locale;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = 'app-language';

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'it') return stored;
  } catch {
    // ignore
  }
  return 'it';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: i18n[lang], dateLocale: lang === 'it' ? itLocale : enUS }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
