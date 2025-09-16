'use client';

import { useEffect, useRef } from 'react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLButtonElement[]>([]);
  const numbersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const initGSAP = async () => {
      if (typeof window === 'undefined') return;
      
      try {
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default;

        if (isOpen) {
          // Reset elements
          gsap.set([overlayRef.current, drawerRef.current], { 
            display: 'block' 
          });

          // Master timeline
          const masterTL = gsap.timeline();

          // 1. Overlay and drawer entrance
          masterTL.fromTo(overlayRef.current, 
            { opacity: 0 },
            { 
              opacity: 1, 
              duration: 0.4,
              ease: 'power2.out'
            }
          )
          .fromTo(drawerRef.current,
            { 
              x: '100%',
              scale: 0.95
            },
            { 
              x: '0%',
              scale: 1,
              duration: 0.8,
              ease: 'power3.out'
            }, '-=0.2');

          // 2. Vertical line grows from center
          masterTL.fromTo('.vertical-line',
            {
              scaleY: 0,
              transformOrigin: 'center center'
            },
            {
              scaleY: 1,
              duration: 0.6,
              ease: 'power2.out'
            }, '-=0.4');

          // 3. Logo section animation (left side)
          masterTL.fromTo('.logo-main',
            {
              x: -100,
              opacity: 0,
              scale: 0.8
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: 'back.out(1.7)'
            }, '-=0.3')
          .fromTo('.logo-elements',
            {
              x: -60,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out'
            }, '-=0.4')
          .fromTo('.logo-description',
            {
              y: 30,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out'
            }, '-=0.3')
          .fromTo('.contact-info',
            {
              y: 20,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out'
            }, '-=0.2');

          // 4. Navigation section animation (right side)
          masterTL.fromTo('.nav-header',
            {
              x: 100,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out'
            }, '-=0.6')
          .fromTo('.nav-item-container',
            {
              x: 80,
              opacity: 0,
              rotationY: -30
            },
            {
              x: 0,
              opacity: 1,
              rotationY: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: 'back.out(1.7)'
            }, '-=0.4')
          .fromTo('.language-section',
            {
              x: 50,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out'
            }, '-=0.3')
          .fromTo('.nav-footer',
            {
              y: 20,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out'
            }, '-=0.2');

          // 5. Decorative elements
          masterTL.fromTo(['.decorative-square', '.decorative-circle'],
            {
              scale: 0,
              rotation: 180,
              opacity: 0
            },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'elastic.out(1, 0.5)'
            }, '-=0.4');

          // 6. Flowing dots animation (continuous)
          const flowDots = gsap.utils.toArray('.flow-dot') as Element[];
          flowDots.forEach((dot, index) => {
            gsap.set(dot, { 
              y: '20%',
              opacity: 0 
            });
            
            gsap.to(dot, {
              y: '1000%',
              opacity: 1,
              duration: 2,
              repeat: -1,
              delay: index * 0.3,
              ease: 'none',
              onRepeat: function() {
                gsap.set(dot, { y: '20%', opacity: 0 });
              }
            });
          });

          // 7. Logo line draw animation
          gsap.fromTo('.logo-line',
            {
              scaleX: 0,
              transformOrigin: 'left center'
            },
            {
              scaleX: 1,
              duration: 0.8,
              delay: 0.5,
              ease: 'power2.out'
            }
          );

          // 8. Logo square rotation
          gsap.fromTo('.logo-square',
            {
              rotation: 0,
              scale: 0
            },
            {
              rotation: 360,
              scale: 1,
              duration: 1,
              delay: 0.7,
              ease: 'back.out(1.7)'
            }
          );

        } else {
          // Close animations - reverse flow
          const closeTL = gsap.timeline({
            onComplete: () => {
              gsap.set([overlayRef.current, drawerRef.current], { 
                display: 'none' 
              });
            }
          });

          closeTL.to(['.nav-item-container', '.nav-header', '.language-section', '.nav-footer'], {
            x: 80,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.in'
          })
          .to(['.logo-main', '.logo-elements', '.logo-description', '.contact-info'], {
            x: -60,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.in'
          }, '-=0.2')
          .to('.vertical-line', {
            scaleY: 0,
            duration: 0.4,
            ease: 'power2.in'
          }, '-=0.2')
          .to(drawerRef.current, {
            x: '100%',
            scale: 0.95,
            duration: 0.5,
            ease: 'power2.in'
          }, '-=0.3')
          .to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in'
          }, '-=0.4');
        }
      } catch (error) {
        console.error('GSAP animation error:', error);
      }
    };

    initGSAP();
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Themes', href: '#themes' },
    { label: 'FAQ\'s', href: '#faqs' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (href: string) => {
    onClose();
    
    // Check if it's a page route (starts with '/') or an anchor link
    if (href.startsWith('/')) {
      // For page routes, navigate directly
      window.location.href = href;
    } else {
      // For anchor links, scroll to the element
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  const addToMenuRefs = (el: HTMLButtonElement | null, index: number) => {
    if (el) menuItemsRef.current[index] = el;
  };

  const addToNumberRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) numbersRef.current[index] = el;
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md hidden"
      onClick={handleBackdropClick}
    >
      <div 
        ref={drawerRef}
        className="fixed right-0 top-0 h-full w-full bg-gradient-to-br from-green-50 via-white to-green-100 shadow-2xl hidden overflow-y-auto overflow-x-hidden"
      >
        {/* Swiss Design Grid Background with green tint */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-green-600/20"></div>
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-b border-green-600/20"></div>
            ))}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="relative h-full flex min-h-screen">
          {/* Left Side - Logo */}
          <div className="w-1/2 flex flex-col justify-center items-start p-8 sm:p-12 lg:p-16 min-h-full">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 sm:top-8 sm:left-8 w-12 h-12 flex items-center justify-center border border-green-600/30 bg-green-50 hover:bg-green-600 hover:text-white transition-all duration-300 group shadow-lg z-10"
              aria-label="Close menu"
            >
              <div className="relative w-6 h-6">
                <span className="absolute top-1/2 left-0 w-full h-px bg-green-600 group-hover:bg-white transform rotate-45 -translate-y-1/2 transition-all duration-300"></span>
                <span className="absolute top-1/2 left-0 w-full h-px bg-green-600 group-hover:bg-white transform -rotate-45 -translate-y-1/2 transition-all duration-300"></span>
              </div>
            </button>

            {/* Logo Section */}
            <div className="logo-section space-y-4 sm:space-y-6 lg:space-y-8 flex-1 flex flex-col justify-center">
              {/* Main Logo */}
              <div className="logo-main opacity-0">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-green-800 font-grotesk tracking-tighter leading-none">
                  EZHUMI
                </h1>
                <div className="text-sm sm:text-base lg:text-lg font-light text-green-600 mt-1 sm:mt-2 font-grotesk tracking-wide">
                  HACKATHON 2025
                </div>
              </div>

              {/* Animated Logo Elements */}
              <div className="logo-elements space-y-2 sm:space-y-3 lg:space-y-4 opacity-0">
                <div className="w-12 sm:w-14 lg:w-16 h-px bg-green-600 logo-line"></div>
                <div className="text-xs sm:text-sm font-medium text-green-700 font-grotesk">
                  HACK • SEEK • CULTIVATE
                </div>
                <div className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 border-2 border-green-600 logo-square bg-green-50"></div>
              </div>

              {/* Logo Description */}
              <div className="logo-description opacity-0 max-w-xs">
                <p className="text-xs sm:text-sm text-green-700 font-grotesk leading-relaxed">
                  Join the revolution in agricultural innovation. Where technology meets tradition, 
                  and ideas bloom into solutions.
                </p>
              </div>

              {/* Contact Info */}
              <div className="contact-info opacity-0 space-y-1 sm:space-y-2">
                <div className="text-xs font-medium text-green-600 font-grotesk">CONTACT</div>
                <div className="text-xs sm:text-sm text-green-800 font-grotesk">info@ezhumi.com</div>
                <div className="text-xs sm:text-sm text-green-800 font-grotesk">+91 9876543210</div>
              </div>
            </div>
          </div>

          {/* Vertical Line in Middle */}
          <div className="vertical-line w-px bg-gradient-to-b from-green-400 via-green-600 to-green-800 relative shadow-lg flex-shrink-0">
            {/* Animated flowing dots */}
            <div className="flow-dot absolute w-2 h-2 bg-green-600 rounded-full left-1/2 -translate-x-1/2 opacity-0 shadow-md"></div>
            <div className="flow-dot absolute w-1.5 h-1.5 bg-green-500 rounded-full left-1/2 -translate-x-1/2 opacity-0 shadow-sm"></div>
            <div className="flow-dot absolute w-1 h-1 bg-green-400 rounded-full left-1/2 -translate-x-1/2 opacity-0"></div>
          </div>

          {/* Right Side - Navigation Links */}
          <div className="w-1/2 flex flex-col justify-center items-end p-8 sm:p-12 lg:p-16 min-h-full">
            <nav className="navigation-section w-full max-w-sm">
              {/* Navigation Header */}
              <div className="nav-header opacity-0 mb-8 sm:mb-10 lg:mb-12">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-800 font-grotesk tracking-tighter">
                  NAVIGATION
                </h2>
                <div className="w-full h-px bg-green-300 mt-2 sm:mt-3 lg:mt-4"></div>
              </div>

              {/* Menu Items */}
              <div className="nav-items space-y-0">
                {menuItems.map((item, index) => (
                  <div key={item.href} className="nav-item-container relative group border-b border-green-200 last:border-b-0 opacity-0">
                    {/* Number */}
                    <div 
                      ref={(el) => addToNumberRefs(el, index)}
                      className="number-indicator absolute right-0 top-1/2 -translate-y-1/2 w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 flex items-center justify-center text-xs font-bold text-green-600 border border-green-300 bg-green-50"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <button
                      ref={(el) => addToMenuRefs(el, index)}
                      onClick={() => handleLinkClick(item.href)}
                      className="nav-link w-full text-right py-4 sm:py-5 lg:py-6 pr-12 sm:pr-14 lg:pr-16 pl-4 sm:pl-6 lg:pl-8 text-lg sm:text-2xl lg:text-3xl font-light text-green-800 hover:text-green-600 transition-all duration-500 font-grotesk tracking-tight group-hover:bg-green-50"
                    >
                      <div className="flex items-center justify-end">
                        <div className="nav-arrow w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 mr-2 sm:mr-3 lg:mr-4">
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="sm:w-4 sm:h-4 lg:w-4 lg:h-4">
                            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="relative">
                          {item.label}
                          <div className="nav-underline absolute bottom-0 right-0 w-0 h-px bg-green-600 transition-all duration-500 group-hover:w-full"></div>
                        </span>
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              {/* Language Switcher */}
              <div className="language-section opacity-0 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-7 lg:pt-8 border-t border-green-200">
                <div className="flex items-center justify-end space-x-3 sm:space-x-4">
                  <span className="text-xs font-medium text-green-600 font-grotesk">LANGUAGE</span>
                  <div className="flex space-x-1">
                    {['EN', 'TA', 'HI'].map((lang, index) => (
                      <button
                        key={lang}
                        className={`language-btn px-2 sm:px-3 py-1 text-xs font-medium border transition-all duration-300 font-grotesk ${
                          index === 0 
                            ? 'bg-green-600 text-white border-green-600 shadow-md' 
                            : 'bg-green-50 text-green-700 border-green-300 hover:bg-green-600 hover:text-white hover:border-green-600'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="nav-footer opacity-0 text-right mt-6 sm:mt-7 lg:mt-8 pt-3 sm:pt-4 border-t border-green-200">
                <div className="text-xs text-green-500 font-grotesk">
                  © 2025 EZHUMI HACKATHON
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="decorative-square absolute top-16 left-1/2 -translate-x-1/2 w-4 h-4 border border-green-400 rotate-45 opacity-0 bg-green-50"></div>
        <div className="decorative-circle absolute bottom-16 left-1/2 -translate-x-1/2 w-6 h-6 border border-green-300 rounded-full opacity-0 bg-green-50"></div>
      </div>
    </div>
  );
};
