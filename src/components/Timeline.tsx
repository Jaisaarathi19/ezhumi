'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: 'upcoming' | 'featured' | 'future';
}

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
  t: (key: string) => string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, index, t }) => {
  const { elementRef, isVisible } = useScrollAnimation(0.2);

  return (
    <div
      ref={elementRef}
      className={`relative group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Enhanced Timeline dot */}
      <div className={`absolute left-4 sm:left-1/2 top-8 w-8 h-8 sm:w-12 sm:h-12 rounded-full border-4 border-white shadow-xl transform sm:-translate-x-1/2 z-20 transition-all duration-500 ${
        isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
      } group-hover:scale-110 ${
        event.status === 'featured' 
          ? 'bg-gradient-to-br from-green-400 to-green-600 animate-pulse' 
          : event.status === 'future'
          ? 'bg-gradient-to-br from-green-300 to-green-500'
          : 'bg-gradient-to-br from-green-500 to-green-700'
      }`}>
      </div>
      
      {/* Mobile Layout: Enhanced cards */}
      <div className="sm:hidden">
        <div className={`bg-white/90 backdrop-blur-md rounded-2xl p-6 border-2 shadow-xl hover:shadow-2xl transition-all duration-500 relative ml-16 group-hover:scale-[1.02] group-hover:-translate-y-1 ${
          event.status === 'featured' 
            ? 'border-green-400 bg-gradient-to-br from-green-50 to-white ring-2 ring-green-300/50' 
            : 'border-green-200 hover:border-green-300'
        }`}>
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-bold text-green-800 leading-tight flex-1 group-hover:text-green-700 transition-colors">
                {event.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-semibold text-green-700">{event.date}</p>
            </div>
            <p className="text-sm text-green-600 leading-relaxed">{event.description}</p>
            {event.status === 'featured' && (
              <div className="mt-3 p-3 bg-gradient-to-r from-green-100 to-green-50 rounded-lg border-l-4 border-green-500">
                <p className="text-xs font-semibold text-green-700">🌟 {t('timeline.mainEvent')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Desktop Layout: Enhanced alternating design */}
      <div className={`hidden sm:block ${index % 2 === 0 ? 'sm:w-5/12' : 'sm:w-5/12 sm:ml-auto'}`}>
        <div className={`bg-white/90 backdrop-blur-md rounded-2xl p-8 border-2 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2 ${
          event.status === 'featured' 
            ? 'border-green-400 bg-gradient-to-br from-green-50 to-white ring-2 ring-green-300/50' 
            : 'border-green-200 hover:border-green-300'
        } ${index % 2 === 0 ? 'sm:mr-8' : 'sm:ml-8'}`}>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <h3 className="text-2xl font-bold text-green-800 group-hover:text-green-700 transition-colors">
                {event.title}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-lg font-semibold text-green-700">{event.date}</p>
            </div>
            <p className="text-base text-green-600 leading-relaxed">{event.description}</p>
            {event.status === 'featured' && (
              <div className="mt-4 p-4 bg-gradient-to-r from-green-100 to-green-50 rounded-xl border-l-4 border-green-500">
                <p className="text-sm font-semibold text-green-700 flex items-center gap-2">
                  <span>🌟</span> {t('timeline.mainEvent')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Timeline: React.FC = () => {
  const { t } = useTranslation('common');
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation(0.3);
  const { elementRef: lineRef, isVisible: lineVisible } = useScrollAnimation(0.1);

  const events: TimelineEvent[] = [
    {
      date: "September 17, 2025",
      title: "Registrations Open",
      description: "Online registration for EZHUMI hackathon begins. Students can sign up and form teams.",
      status: "upcoming"
    },
    {
      date: "October 1, 2025",
      title: "Registration Deadline",
      description: "Last date to register for the hackathon. Make sure to complete your registration before time runs out.",
      status: "upcoming"
    },
    {
      date: "October 4, 2025",
      title: "Shortlisted Participants Announcement",
      description: "List of selected participants will be announced. Check your email for confirmation.",
      status: "upcoming"
    },
    {
      date: "October 6, 2025",
      title: "Inauguration & Bootcamp",
      description: "Official inauguration of EZHUMI followed by intensive bootcamp sessions for participants.",
      status: "upcoming"
    },
    {
      date: "October 7, 2025",
      title: "Industrial Visit",
      description: "Educational visit to partner industries to understand real-world applications and technologies.",
      status: "upcoming"
    },
    {
      date: "October 13, 2025 *",
      title: "24-Hour Hackathon",
      description: "The main event! 24 hours of continuous coding, innovation, and problem-solving. *Tentative date - subject to change.",
      status: "featured"
    },
    {
      date: "October 14, 2025 *", 
      title: "Final Pitch (Project Exhibition)",
      description: "Shortlisted teams present their solutions to the jury panel for final evaluation and project exhibition. *Tentative date - subject to change.",
      status: "featured"
    },
    {
      date: "October 16, 2025 *",
      title: "Valedictory Programme", 
      description: "Closing ceremony with prize distribution and recognition of outstanding participants. *Tentative date - subject to change.",
      status: "future"
    }
  ];

  return (
    <section id="timeline" className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 text-green-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl w-full relative">
        {/* Enhanced Background decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-green-300/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-green-400/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-200/10 rounded-full blur-xl animate-bounce delay-500"></div>
        
        {/* Enhanced Title */}
        <div 
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 lg:mb-20 relative z-10 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-4">
            {t('timeline.title')}
          </h2>
          <div className={`w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full transition-all duration-1000 delay-300 ${
            titleVisible ? 'scale-x-100' : 'scale-x-0'
          }`}></div>
          <p className={`text-lg sm:text-xl text-green-600 mt-4 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {t('timeline.subtitle')}
          </p>
          
          {/* Enhanced Disclaimer */}
          <div className={`mt-6 mx-auto max-w-3xl transition-all duration-1000 delay-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-4 shadow-md">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-amber-800 mb-1">Important Notice</h4>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    <strong>Please note:</strong> The dates for <strong>24-Hour Hackathon (October 13, 2025)</strong>, <strong>Final Pitch & Project Exhibition (October 14, 2025)</strong>, and <strong>Valedictory Programme (October 16, 2025)</strong> are <em>tentative</em> and subject to change. 
                    Participants will be notified of any updates via email and official announcements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10">
          {/* Enhanced Timeline Line with gradient */}
          <div 
            ref={lineRef}
            className={`absolute left-6 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-300 via-green-500 to-green-700 transform sm:-translate-x-1/2 rounded-full shadow-lg transition-all duration-1500 ${
              lineVisible ? 'scale-y-100' : 'scale-y-0'
            }`}
            style={{ transformOrigin: 'top' }}
          ></div>
          
          <div className="space-y-8 sm:space-y-16">
            {events.map((event, index) => (
              <TimelineItem key={index} event={event} index={index} t={t} />
            ))}
          </div>
          
          {/* Timeline completion indicator */}
          <div className="mt-12 sm:mt-16 text-center relative z-10">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 border border-green-200 shadow-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700">{t('timeline.continueJourney')}</span>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
