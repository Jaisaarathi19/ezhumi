'use client';

import { useState, useEffect } from 'react';

export const TopHeader: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('En');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const languages = [
    { code: 'En', label: 'English' },
    { code: 'Ta', label: 'Tamil' },
    { code: 'Hi', label: 'Hindi' }
  ];

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
      <header className={`fixed top-0 left-0 right-0 z-[9999] px-8 py-6 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-green-500/30 shadow-xl' 
          : 'bg-black/30 backdrop-blur-sm border-b border-white/20'
      }`}>
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Language Switcher */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <div className="logo">
              <h1 className="text-2xl font-bold text-white tracking-wider font-grotesk">
                EZHUMI
              </h1>
            </div>

            {/* Language Switcher */}
            <div className="language-switcher flex items-center space-x-2 text-sm font-light text-white/80 font-grotesk">
              {languages.map((lang, index) => (
                <div key={lang.code} className="flex items-center">
                  <button
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={`transition-colors duration-300 px-3 py-1.5 rounded ${
                      selectedLanguage === lang.code
                        ? 'text-white border border-green-500 bg-green-600 shadow-md'
                        : 'hover:text-white hover:border-green-400 hover:bg-green-600'
                    }`}
                  >
                    {lang.code}
                  </button>
                  {index < languages.length - 1 && (
                    <span className="text-white/50 mx-2">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="hamburger-menu relative w-8 h-8 flex flex-col justify-center items-center group z-50"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 absolute ${isMenuOpen ? 'rotate-45' : 'translate-y-1'}`}></span>
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 absolute ${isMenuOpen ? '-rotate-45' : '-translate-y-1'}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gradient-to-br from-green-900/90 via-black/90 to-green-800/90 backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <nav className="text-center">
              <div className="space-y-8">
                <a href="#home" className="block text-4xl font-light text-white hover:text-green-300 transition-colors font-grotesk" onClick={toggleMenu}>
                  Home
                </a>
                <a href="#about" className="block text-4xl font-light text-white hover:text-green-300 transition-colors font-grotesk" onClick={toggleMenu}>
                  About
                </a>
                <a href="#themes" className="block text-4xl font-light text-white hover:text-green-300 transition-colors font-grotesk" onClick={toggleMenu}>
                  Themes
                </a>
                <a href="#timeline" className="block text-4xl font-light text-white hover:text-green-300 transition-colors font-grotesk" onClick={toggleMenu}>
                  Timeline
                </a>
                <a href="#faqs" className="block text-4xl font-light text-white hover:text-green-300 transition-colors font-grotesk" onClick={toggleMenu}>
                  FAQ's
                </a>
                <a href="#contact" className="block text-4xl font-light text-white hover:text-green-300 transition-colors font-grotesk" onClick={toggleMenu}>
                  Contact
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
