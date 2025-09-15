'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useGsapAnimations } from '@/hooks/useGsapAnimations';

export const Hero: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  
  // Initialize GSAP animations
  useGsapAnimations();

  const handleRegisterClick = () => {
    router.push('/register');
  };

  const handleExploreThemeClick = () => {
    const themesSection = document.querySelector('#themes');
    themesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section relative h-screen overflow-hidden">
      {/* Background Video - No overlay, clear video */}
      <video
        className="hero-video absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        onError={(e) => {
          // Hide video if it fails to load and show fallback
          e.currentTarget.style.display = 'none';
        }}
      >
        <source src="/media/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback gradient only if video fails */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-black to-green-800 video-fallback" style={{display: 'none'}}></div>

      {/* Hero Content - Left Aligned */}
      <div className="relative z-20 h-full flex flex-col justify-center px-16 lg:px-24">
        {/* Main Headline - Left Aligned */}
        <div className="hero-headline mb-12 max-w-4xl">
          <div className="hero-headline-word text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none tracking-tight font-grotesk mb-2 drop-shadow-2xl opacity-0">
            {t('hero.headline1')}
          </div>
          <div className="hero-headline-word text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none tracking-tight font-grotesk mb-2 drop-shadow-2xl opacity-0">
            {t('hero.headline2')}
          </div>
          <div className="hero-headline-word text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none tracking-tight font-grotesk drop-shadow-2xl opacity-0">
            {t('hero.headline3')}
          </div>
        </div>

        {/* CTA Buttons - Left Aligned */}
        <div className="flex flex-col sm:flex-row gap-4 hero-cta max-w-md opacity-0">
          {/* Register Now - Green Background */}
          <button
            onClick={handleRegisterClick}
            className="px-8 py-4 bg-green-600 text-white font-medium border-2 border-green-600 hover:bg-green-700 hover:border-green-700 transition-all duration-300 uppercase tracking-wide text-sm font-grotesk rounded-lg"
          >
            {t('hero.registerButton')}
          </button>
          
          {/* Explore Theme - White Background */}
          <button
            onClick={handleExploreThemeClick}
            className="px-8 py-4 bg-white text-black font-medium border-2 border-white hover:bg-gray-100 hover:border-gray-100 transition-all duration-300 uppercase tracking-wide text-sm font-grotesk rounded-lg"
          >
            {t('hero.exploreButton')}
          </button>
        </div>
      </div>
    </section>
  );
};
