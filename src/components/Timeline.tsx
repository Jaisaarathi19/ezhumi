'use client';

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  time: string;
  icon: string;
  status: 'upcoming' | 'featured' | 'future';
}

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, index }) => {
  const { elementRef, isVisible } = useScrollAnimation(0.2);

  return (
    <div
      ref={elementRef}
      className={`relative group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Enhanced Timeline dot with icon */}
      <div className={`absolute left-4 sm:left-1/2 top-8 w-8 h-8 sm:w-12 sm:h-12 rounded-full border-4 border-white shadow-xl transform sm:-translate-x-1/2 z-20 flex items-center justify-center text-lg sm:text-xl transition-all duration-500 ${
        isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
      } group-hover:scale-110 ${
        event.status === 'featured' 
          ? 'bg-gradient-to-br from-green-400 to-green-600 animate-pulse' 
          : event.status === 'future'
          ? 'bg-gradient-to-br from-green-300 to-green-500'
          : 'bg-gradient-to-br from-green-500 to-green-700'
      }`}>
        <span className="text-white text-sm sm:text-base">{event.icon}</span>
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
              <span className={`text-xs font-bold px-3 py-2 rounded-full whitespace-nowrap flex-shrink-0 ${
                event.status === 'featured'
                  ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md'
                  : 'bg-green-100 text-green-700 border border-green-200'
              }`}>
                {event.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-semibold text-green-700">{event.date}</p>
            </div>
            <p className="text-sm text-green-600 leading-relaxed">{event.description}</p>
            {event.status === 'featured' && (
              <div className="mt-3 p-3 bg-gradient-to-r from-green-100 to-green-50 rounded-lg border-l-4 border-green-500">
                <p className="text-xs font-semibold text-green-700">🌟 Main Event</p>
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
              <span className={`text-sm font-bold px-4 py-2 rounded-full self-start ${
                event.status === 'featured'
                  ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg'
                  : 'bg-green-100 text-green-700 border border-green-200'
              }`}>
                {event.time}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-lg font-semibold text-green-700">{event.date}</p>
            </div>
            <p className="text-base text-green-600 leading-relaxed">{event.description}</p>
            {event.status === 'featured' && (
              <div className="mt-4 p-4 bg-gradient-to-r from-green-100 to-green-50 rounded-xl border-l-4 border-green-500">
                <p className="text-sm font-semibold text-green-700 flex items-center gap-2">
                  <span>🌟</span> Main Event - Don't miss this!
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
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation(0.3);
  const { elementRef: lineRef, isVisible: lineVisible } = useScrollAnimation(0.1);

  const events: TimelineEvent[] = [
    {
      date: "December 15, 2024",
      title: "Registration Opens",
      description: "Team registration and idea submission begins. Form your teams and get ready to innovate!",
      time: "9:00 AM",
      icon: "🚀",
      status: "upcoming"
    },
    {
      date: "January 10, 2025",
      title: "Registration Deadline",
      description: "Last date for team registration and initial idea submission. Don't miss out!",
      time: "11:59 PM",
      icon: "⏰",
      status: "upcoming"
    },
    {
      date: "January 15, 2025",
      title: "Team Selection",
      description: "Selected teams will be announced. Confirmation emails sent to all participants.",
      time: "6:00 PM",
      icon: "✅",
      status: "upcoming"
    },
    {
      date: "February 1-2, 2025",
      title: "Hackathon Weekend",
      description: "48-hour intensive hackathon begins. Build, innovate, and create groundbreaking solutions!",
      time: "Day 1: 9:00 AM",
      icon: "💻",
      status: "featured"
    },
    {
      date: "February 2, 2025",
      title: "Final Presentations",
      description: "Teams present their solutions to expert judges. Winners announced and prizes awarded.",
      time: "4:00 PM",
      icon: "🏆",
      status: "featured"
    },
    {
      date: "February 15, 2025",
      title: "Incubation Program",
      description: "Top 7 solutions enter our incubation program with mentorship and resources.",
      time: "Ongoing",
      icon: "🌱",
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
            Event Timeline
          </h2>
          <div className={`w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full transition-all duration-1000 delay-300 ${
            titleVisible ? 'scale-x-100' : 'scale-x-0'
          }`}></div>
          <p className={`text-lg sm:text-xl text-green-600 mt-4 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Your journey from registration to innovation starts here
          </p>
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
              <TimelineItem key={index} event={event} index={index} />
            ))}
          </div>
          
          {/* Timeline completion indicator */}
          <div className="mt-12 sm:mt-16 text-center relative z-10">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 border border-green-200 shadow-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700">Your innovation journey continues...</span>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
