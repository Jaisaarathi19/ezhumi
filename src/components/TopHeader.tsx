'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './LanguageProvider';

export const TopHeader: React.FC = () => {
  const { t } = useTranslation('common');
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[9999] px-4 sm:px-6 lg:px-8 py-4 sm:py-6 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-green-500/30 shadow-xl' 
          : 'bg-black/30 backdrop-blur-sm border-b border-white/20'
      }`}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left side - Logo and Language Switcher */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* Logo */}
            <div className="logo">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wider font-grotesk">
                EZHUMI
              </h1>
            </div>

            {/* Language Switcher - Hidden on mobile, visible from md screens */}
            <div className="language-switcher hidden md:flex items-center space-x-2 text-sm font-light text-white/80 font-grotesk">
              {languages.map((lang, index) => (
                <div key={lang.code} className="flex items-center">
                  <button
                    onClick={() => changeLanguage(lang.code)}
                    className={`transition-colors duration-300 px-2 lg:px-3 py-1.5 rounded text-xs lg:text-sm ${
                      currentLanguage === lang.code
                        ? 'text-white border border-green-500 bg-green-600 shadow-md'
                        : 'hover:text-white hover:border-green-400 hover:bg-green-600'
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                  {index < languages.length - 1 && (
                    <span className="text-white/50 mx-1 lg:mx-2">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="hamburger-menu relative w-6 h-6 sm:w-8 sm:h-8 flex flex-col justify-center items-center group z-50"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 sm:w-6 bg-white transition-all duration-300 absolute ${isMenuOpen ? 'rotate-45' : 'translate-y-1'}`}></span>
            <span className={`block h-0.5 w-5 sm:w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-5 sm:w-6 bg-white transition-all duration-300 absolute ${isMenuOpen ? '-rotate-45' : '-translate-y-1'}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gradient-to-br from-green-900/95 via-black/95 to-green-800/95 backdrop-blur-md">
          <div className="flex items-center justify-center min-h-screen px-4">
            <nav className="text-center w-full max-w-lg">
              <div className="space-y-6 sm:space-y-8">
                <a href="#home" className="block text-2xl sm:text-3xl lg:text-4xl font-light text-white hover:text-green-300 transition-colors font-grotesk" onClick={toggleMenu}>
                  {t('nav.home')}
                </a>
                <a href="#about" className="block text-2xl sm:text-3xl lg:text-4xl font-light text-white hover:text-green-300 transition-colors font-grotesk" onClick={toggleMenu}>
                  {t('nav.about')}
                </a>
                <a href="#themes" className="block text-2xl sm:text-3xl lg:text-4xl font-light text-white hover:text-green-300 transition-colors font-grotesk" onClick={toggleMenu}>
                  {t('nav.themes')}
                </a>
                <a href="#timeline" className="block text-2xl sm:text-3xl lg:text-4xl font-light text-white hover:text-green-300 transition-colors font-grotesk" onClick={toggleMenu}>
                  {t('nav.timeline')}
                </a>
                <a href="#faqs" className="block text-2xl sm:text-3xl lg:text-4xl font-light text-white hover:text-green-300 transition-colors font-grotesk" onClick={toggleMenu}>
                  {t('nav.faqs')}
                </a>
                <a href="#contact" className="block text-2xl sm:text-3xl lg:text-4xl font-light text-white hover:text-green-300 transition-colors font-grotesk" onClick={toggleMenu}>
                  {t('nav.contact')}
                </a>
                
                {/* Language Switcher - Mobile only */}
                <div className="pt-6 sm:pt-8 border-t border-white/20 md:hidden">
                  <div className="text-sm text-white/70 mb-3 sm:mb-4 font-grotesk">{t('nav.language')}</div>
                  <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                    {languages.map((lang, index) => (
                      <div key={lang.code} className="flex items-center">
                        <button
                          onClick={() => {
                            changeLanguage(lang.code);
                            toggleMenu();
                          }}
                          className={`transition-colors duration-300 px-3 sm:px-4 py-2 rounded-lg text-base sm:text-lg font-medium ${
                            currentLanguage === lang.code
                              ? 'text-white border-2 border-green-500 bg-green-600 shadow-md'
                              : 'text-white/70 border-2 border-white/30 hover:text-white hover:border-green-400 hover:bg-green-600/20'
                          }`}
                        >
                          {lang.nativeLabel}
                        </button>
                        {index < languages.length - 1 && (
                          <span className="text-white/50 mx-1 sm:mx-2">|</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
