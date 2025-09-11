'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lng: string) => void;
  languages: Array<{ code: string; label: string; nativeLabel: string }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const languages = [
    { code: 'en', label: 'English', nativeLabel: 'English' },
    { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  ];

  const changeLanguage = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    
    // Store in localStorage for persistence
    localStorage.setItem('i18nextLng', lng);
    
    // Update document attributes for better accessibility and styling
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr'; // For future RTL language support
  }, [i18n]);

  useEffect(() => {
    // Initialize language from localStorage or browser preference
    const storedLanguage = localStorage.getItem('i18nextLng');
    if (storedLanguage && languages.some(lang => lang.code === storedLanguage)) {
      if (storedLanguage !== currentLanguage) {
        changeLanguage(storedLanguage);
      }
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      const supportedLang = languages.find(lang => lang.code === browserLang);
      if (supportedLang && supportedLang.code !== currentLanguage) {
        changeLanguage(supportedLang.code);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount to avoid infinite loops

  const contextValue: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    languages,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
