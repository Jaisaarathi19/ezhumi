'use client';

import { useEffect, useRef } from 'react';

export const useGsapAnimations = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current || typeof window === 'undefined') return;
    isInitialized.current = true;

    // Dynamic import for GSAP to avoid SSR issues
    const initGSAP = async () => {
      try {
        const gsapModule = await import('gsap');
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
          // Only apply simple fades for accessibility
          gsap.set(['.hero-headline', '.hero-subheadline', '.hero-cta'], {
            opacity: 1,
          });
          return;
        }

        // Set initial visibility for all elements
        gsap.set(['.hero-headline-word', '.hero-cta'], {
          opacity: 1,
          visibility: 'visible'
        });

        // Timeline for initial page load animations
        const tl = gsap.timeline({ delay: 0.5 });

        // Hero headline animation with stagger - slide in from left
        tl.fromTo('.hero-headline-word', 
          { 
            opacity: 0, 
            x: -100 
          },
          { 
            opacity: 1, 
            x: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out'
          }
        );

        // CTA buttons fade in from bottom
        tl.fromTo('.hero-cta', 
          { 
            opacity: 0, 
            y: 50 
          },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
          }, '-=0.3'
        );

        // Infinite bounce animation for scroll indicator
        gsap.to('.scroll-indicator', {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut'
        });

        // Parallax effects with ScrollTrigger
        
        // Video background parallax
        ScrollTrigger.create({
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const y = self.progress * 50;
            gsap.set('.hero-video', { 
              transform: `translate3d(0, ${y}%, 0)` 
            });
          }
        });

        // Headline parallax on scroll
        ScrollTrigger.create({
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Each headline word moves at different speeds and directions
            gsap.set('.hero-headline-word:nth-child(1)', {
              x: progress * -30,
              scale: 1 + progress * 0.1
            });
            
            gsap.set('.hero-headline-word:nth-child(2)', {
              x: progress * 20,
              scale: 1 + progress * 0.05
            });
            
            gsap.set('.hero-headline-word:nth-child(3)', {
              x: progress * -15,
              scale: 1 + progress * 0.08
            });
          }
        });

        // Active section tracking for navigation
        const sections = ['#home', '#about', '#themes', '#faqs', '#contact'];
        
        sections.forEach((section, index) => {
          const element = document.querySelector(section);
          if (element) {
            ScrollTrigger.create({
              trigger: element,
              start: 'top center',
              end: 'bottom center',
              onToggle: (self) => {
                if (self.isActive) {
                  // Update active navigation item
                  document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                  });
                  
                  const activeLink = document.querySelector(`.nav-link[href="${section}"]`);
                  if (activeLink) {
                    activeLink.classList.add('active');
                  }
                }
              }
            });
          }
        });

      } catch (error) {
        console.log('GSAP loading failed, continuing without animations:', error);
      }
    };

    initGSAP();

    // Cleanup function
    return () => {
      const ScrollTrigger = (window as any).ScrollTrigger;
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, []);

  // Animation helpers
  const animateMenuOpen = async (element: HTMLElement) => {
    try {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;
      
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(element, { x: 0, opacity: 1 });
        return;
      }
      
      gsap.fromTo(element, 
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    } catch (error) {
      console.log('GSAP not available for menu animation');
    }
  };

  const animateMenuClose = async (element: HTMLElement, onComplete?: () => void) => {
    try {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;
      
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(element, { x: '100%', opacity: 0 });
        onComplete?.();
        return;
      }
      
      gsap.to(element, {
        x: '100%',
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
        onComplete
      });
    } catch (error) {
      console.log('GSAP not available for menu animation');
      onComplete?.();
    }
  };

  const animateMenuButtonHover = async (element: HTMLElement, isHovering: boolean) => {
    try {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;
      
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      
      gsap.to(element, {
        scale: isHovering ? 1.05 : 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    } catch (error) {
      console.log('GSAP not available for button animation');
    }
  };

  return {
    animateMenuOpen,
    animateMenuClose,
    animateMenuButtonHover
  };
};
