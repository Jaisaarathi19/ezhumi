'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './LanguageProvider';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export const TopHeader: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Debug logging
  console.log('TopHeader render - currentLanguage:', currentLanguage, 'i18n.language:', i18n.language);
  console.log('TopHeader - hero.title translation:', t('hero.title'));

  // Get user's name from metadata
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

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
          {/* Left side - Ezhumi Logo, Title, and Language Switcher */}
          <div className="flex items-center space-x-4">
            {/* Ezhumi Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/logos/ezhumi-logo.svg"
                alt="Ezhumi Logo"
                width={80}
                height={80}
                className="w-10 h-10 sm:w-10 sm:h-10 lg:w-11 lg:h-11"
              />
            </div>
            {/* Title */}
            <div className="logo">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wider font-grotesk">
                {t('hero.title', 'EZHUMI')}
              </h1>
            </div>
            {/* Language Switcher - Immediately after title */}
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

          {/* Center - Partner Logos */}
          {/* Mobile Scrolling Logos */}
          <div className="lg:hidden absolute left-[60%] transform -translate-x-1/2 w-24 overflow-hidden">
            <div className="flex animate-scroll-logos whitespace-nowrap">
              {/* First set of logos */}
              <div className="flex items-center space-x-6 flex-shrink-0">
                <Image
                  src="/logos/rec-logo.svg"
                  alt="REC - Rajalakshmi Engineering College"
                  width={40}
                  height={40}
                  className="w-20 h-12 sm:w-20 sm:h-12 flex-shrink-0"
                />
                <Image
                  src="/logos/riif_logo.svg"
                  alt="RIIF - Research and Innovation Incubation Foundation"
                  width={40}
                  height={40}
                  className="w-12 h-12 sm:w-12 sm:h-12 flex-shrink-0"
                />
                <Image
                  src="/logos/edc-logo.svg"
                  alt="EDC - Entrepreneurship Development Cell"
                  width={40}
                  height={40}
                  className="w-12 h-12 sm:w-12 sm:h-12 flex-shrink-0"
                />
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex items-center space-x-6 flex-shrink-0 ml-6">
                <Image
                  src="/logos/rec-logo.svg"
                  alt="REC - Rajalakshmi Engineering College"
                  width={40}
                  height={40}
                  className="w-20 h-12 sm:w-20 sm:h-12 flex-shrink-0"
                />
                <Image
                  src="/logos/riif_logo.svg"
                  alt="RIIF - Research and Innovation Incubation Foundation"
                  width={40}
                  height={40}
                  className="w-18 h-18 sm:w-18 sm:h-18 flex-shrink-0"
                />
                <Image
                  src="/logos/edc-logo.svg"
                  alt="EDC - Entrepreneurship Development Cell"
                  width={40}
                  height={40}
                  className="w-12 h-12 sm:w-12 sm:h-12 flex-shrink-0"
                />
              </div>
            </div>
          </div>

          {/* Desktop Static Logos */}
          <div className="hidden lg:flex items-center space-x-4 absolute left-1/2 transform -translate-x-1/2">
            <Image
              src="/logos/rec-logo.svg"
              alt="REC - Rajalakshmi Engineering College"
              width={60}
              height={60}
              className="w-14 h-14 xl:w-35 xl:h-16"
            />
            <Image
              src="/logos/riif_logo.svg"
              alt="RIIF - Research and Innovation Incubation Foundation"
              width={60}
              height={60}
              className="w-14 h-14 xl:w-30 xl:h-30"
            />
            <Image
              src="/logos/edc-logo.svg"
              alt="EDC - Entrepreneurship Development Cell"
              width={60}
              height={60}
              className="w-14 h-14 xl:w-18 xl:h-18"
            />
          </div>

          {/* Right side - Authentication Links and Hamburger Menu */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* Authentication Section (Desktop only) */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-white text-base lg:text-lg font-medium">
                    {t('nav.welcome')}, {userName}!
                  </span>
                  <button 
                    onClick={signOut}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    {t('nav.signOut')}
                  </button>
                </div>
              ) : (
                <>
                  <a href="/login" className="text-white hover:text-green-300 transition-colors text-sm font-medium">
                    {t('nav.login')}
                  </a>
                  <a href="/signup" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
                    {t('nav.signup')}
                  </a>
                </>
              )}
            </div>

            {/* Hamburger Menu */}
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
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gradient-to-br from-green-900/95 via-black/95 to-green-800/95 backdrop-blur-md overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-20">
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
                
                {/* Register link - only show if user is authenticated */}
                {user && (
                  <a href="/register" className="block text-2xl sm:text-3xl lg:text-4xl font-light text-white hover:text-green-300 transition-colors font-grotesk bg-green-600/30 backdrop-blur-sm border border-green-500/50 rounded-lg py-3 px-6 hover:bg-green-500/40 hover:border-green-400/70 shadow-lg" onClick={toggleMenu}>
                    {t('nav.register')}
                  </a>
                )}
                
                {/* Authentication Section - Only show if user is authenticated */}
                {user && (
                  <div className="pt-6 sm:pt-8 border-t border-white/20">
                    <div className="text-center space-y-4">
                      <div className="text-2xl sm:text-4xl lg:text-5xl font-light text-green-300 font-grotesk">
                        {t('nav.welcome')}, {userName}!
                      </div>
                      <button 
                        onClick={() => {
                          signOut();
                          toggleMenu();
                        }}
                        className="block mx-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
                      >
                        {t('nav.signOut')}
                      </button>
                    </div>
                  </div>
                )}
                
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
