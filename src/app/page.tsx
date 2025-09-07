'use client';

import React from 'react';
import Image from 'next/image';
import { Hero } from '@/components/Hero';
import { TopHeader } from '@/components/TopHeader';

export default function Home() {
  return (
    <main className="relative">
      {/* Top Header */}
      <TopHeader />

      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <section id="about" className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 text-green-900 flex items-center justify-center px-8 py-16">
        <div className="max-w-7xl w-full relative">
          {/* Background decorative elements */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-green-300/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-green-400/20 rounded-full blur-xl"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-green-300/30">
                <Image 
                  src="/media/poster.jpg" 
                  alt="Ezhumi Hackathon Poster" 
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
              </div>
              {/* Decorative elements around image */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-400 rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-green-500 rounded-full opacity-80"></div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-green-800 leading-tight">
                  About Ezhumi
                </h2>
                <div className="space-y-6 text-lg md:text-xl leading-relaxed text-green-700">
                  <p className="font-medium">
                    <span className="text-green-800 font-bold">Ezhumi isn&apos;t just a word. It&apos;s a wake-up call.</span> 
                    {" "}A call for students to rise, build, and make a difference.
                  </p>
                  <p>
                    The title represents the <strong>rise of innovation in agriculture</strong>, the empowerment of farmers, 
                    and the growth of sustainable solutions for society.
                  </p>
                  <p>
                    With an expected participation of <span className="font-semibold text-green-800">150+ teams</span> and{" "}
                    <span className="font-semibold text-green-800">150+ unique ideas</span>, it is aimed at empowering 
                    innovators, students, and future entrepreneurs to solve real-world agricultural challenges through 
                    technology and innovation.
                  </p>
                  <p className="bg-green-200/50 p-4 rounded-lg border-l-4 border-green-600">
                    The <strong>top 7 solutions</strong> will be incubated in our incubation cell, giving them the 
                    necessary mentorship and resources to create a tangible impact.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-green-300/50 shadow-lg">
                  <div className="text-2xl md:text-3xl font-bold mb-1 text-green-800">150+</div>
                  <div className="text-xs md:text-sm font-medium text-green-600">Teams Expected</div>
                </div>
                <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-green-300/50 shadow-lg">
                  <div className="text-2xl md:text-3xl font-bold mb-1 text-green-800">7</div>
                  <div className="text-xs md:text-sm font-medium text-green-600">Incubation Spots</div>
                </div>
                <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-green-300/50 shadow-lg col-span-2 md:col-span-1">
                  <div className="text-2xl md:text-3xl font-bold mb-1 text-green-800">24</div>
                  <div className="text-xs md:text-sm font-medium text-green-600">Hours to Innovate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <section id="themes" className="min-h-screen bg-gradient-to-br from-green-800 via-green-900 to-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl w-full relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 h-full">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="border-r border-green-400"></div>
              ))}
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 lg:mb-16 text-center relative z-10">Themes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative z-10">{[
              {
                title: "Smart Farming",
                description: "IoT solutions for precision agriculture and automated farming systems."
              },
              {
                title: "Sustainable Agriculture",
                description: "Eco-friendly practices and technologies for sustainable farming."
              },
              {
                title: "Supply Chain",
                description: "Blockchain and AI solutions for transparent and efficient supply chains."
              },
              {
                title: "Crop Monitoring",
                description: "Drone and satellite technologies for real-time crop health monitoring."
              },
              {
                title: "Market Access",
                description: "Digital platforms connecting farmers directly with consumers and markets."
              },
              {
                title: "Climate Resilience",
                description: "Solutions to help farmers adapt to climate change challenges."
              }
            ].map((theme, index) => (
              <div key={index} className="p-4 sm:p-6 rounded-lg bg-green-800/30 backdrop-blur-sm border border-green-400/30 hover:bg-green-700/40 hover:border-green-300/50 transition-all duration-300 shadow-lg">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-green-200">{theme.title}</h3>
                <p className="text-sm sm:text-base text-green-100/80 font-light leading-relaxed">{theme.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 text-green-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-6xl w-full relative">
          {/* Background decorative elements */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-green-300/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-green-400/20 rounded-full blur-xl"></div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 lg:mb-16 text-center relative z-10 text-green-800">Event Timeline</h2>
          
          <div className="relative z-10">
            {/* Timeline Line - Better mobile positioning */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-green-400 transform sm:-translate-x-1/2"></div>
            
            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  date: "December 15, 2024",
                  title: "Registration Opens",
                  description: "Team registration and idea submission begins. Form your teams and get ready!",
                  time: "9:00 AM"
                },
                {
                  date: "January 10, 2025",
                  title: "Registration Deadline",
                  description: "Last date for team registration and initial idea submission.",
                  time: "11:59 PM"
                },
                {
                  date: "January 15, 2025",
                  title: "Team Selection",
                  description: "Selected teams will be announced. Confirmation emails sent to participants.",
                  time: "6:00 PM"
                },
                {
                  date: "February 1-2, 2025",
                  title: "Hackathon Weekend",
                  description: "48-hour intensive hackathon begins. Build, innovate, and create solutions!",
                  time: "Day 1: 9:00 AM"
                },
                {
                  date: "February 2, 2025",
                  title: "Final Presentations",
                  description: "Teams present their solutions to judges. Winners announced and prizes awarded.",
                  time: "4:00 PM"
                },
                {
                  date: "February 15, 2025",
                  title: "Incubation Program",
                  description: "Top 7 solutions enter our incubation program with mentorship and resources.",
                  time: "Ongoing"
                }
              ].map((event, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot - Properly aligned with line */}
                  <div className="absolute left-5 sm:left-1/2 top-6 w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded-full border-2 sm:border-4 border-white shadow-lg transform sm:-translate-x-1/2 z-10"></div>
                  
                  {/* Mobile Layout: Clean single column */}
                  <div className="sm:hidden">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-green-200 shadow-md hover:shadow-lg transition-all duration-300 relative ml-10 hover:scale-[1.01] hover:bg-white/90">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-bold text-green-800 leading-tight flex-1">{event.title}</h3>
                          <span className="text-xs text-green-600 font-semibold bg-green-100 px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0">
                            {event.time}
                          </span>
                        </div>
                        <p className="text-sm text-green-700 font-semibold">{event.date}</p>
                        <p className="text-sm text-green-600 leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop Layout: Alternating sides */}
                  <div className={`hidden sm:block sm:w-1/2 ${index % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8'}`}>
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-green-200 shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-xl font-semibold text-green-800 mb-2 sm:mb-0">{event.title}</h3>
                        <span className="text-sm text-green-600 font-medium bg-green-100 px-3 py-1.5 rounded-full self-start sm:self-center">
                          {event.time}
                        </span>
                      </div>
                      <p className="text-base text-green-700 font-medium mb-3">{event.date}</p>
                      <p className="text-base text-green-600 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 text-green-900 flex items-center justify-center px-8 py-16">
        <div className="max-w-4xl w-full relative">
          {/* Background decorative elements */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-green-300/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-green-400/20 rounded-full blur-xl"></div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center text-green-800 relative z-10">FAQ&apos;s</h2>
          
          <div className="space-y-6 relative z-10">
            {[
              {
                question: "What is the Ezhumi Hackathon about?",
                answer: "Ezhumi is a 48-hour agriculture-focused hackathon where participants develop innovative solutions for farming challenges using technology, AI, IoT, and sustainable practices."
              },
              {
                question: "Who can participate in the hackathon?",
                answer: "The hackathon is open to students, professionals, farmers, tech enthusiasts, and anyone passionate about agricultural innovation. Teams can be formed with members from diverse backgrounds."
              },
              {
                question: "What are the main themes for the hackathon?",
                answer: "Our main themes include Smart Farming, Supply Chain Management, Crop Monitoring, Market Access, and Climate Resilience solutions for modern agriculture."
              },
              {
                question: "What is the prize pool and how are winners selected?",
                answer: "We have a total prize pool of ₹1L+ with multiple categories. Winners are selected based on innovation, feasibility, impact on agriculture, and presentation quality by our expert jury panel."
              },
              {
                question: "Do I need to bring my own hardware or software?",
                answer: "We provide basic infrastructure, WiFi, and development environments. However, participants are encouraged to bring their own laptops and any specialized hardware they might need for their projects."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-lg border border-green-200 shadow-md hover:shadow-lg transition-all duration-300">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-green-800 pr-4">{faq.question}</h3>
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600 transform group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-green-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
          
          {/* Additional FAQ CTA */}
          <div className="text-center mt-12 relative z-10">
            <p className="text-green-600 mb-4">Have more questions?</p>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl w-full relative">
          {/* Background decorative elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-green-400/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-green-500/10 rounded-full blur-xl"></div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 lg:mb-16 text-center relative z-10">Contact Us</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 relative z-10">
            {/* Left Side - Contact Form */}
            <div className="bg-green-800/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 border border-green-400/30 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-green-200">Send us a Message</h3>
              <form className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-green-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-green-900/30 border border-green-400/30 rounded-lg text-white placeholder-green-400/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-green-300 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-green-900/30 border border-green-400/30 rounded-lg text-white placeholder-green-400/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-green-300 mb-2">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-green-900/30 border border-green-400/30 rounded-lg text-white placeholder-green-400/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-green-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-green-900/30 border border-green-400/30 rounded-lg text-white placeholder-green-400/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 resize-vertical text-sm sm:text-base"
                    placeholder="Tell us about your interest in the hackathon or any questions you have..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 rounded-lg text-white font-medium shadow-lg hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Side - Get in Touch & Follow Us */}
            <div className="space-y-6 sm:space-y-8">
              {/* Get in Touch */}
              <div className="bg-green-800/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 border border-green-400/30 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-green-200">Get in Touch</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-3 text-green-100 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="break-all">hello@ezhumi.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-100 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>Tamil Nadu, India</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-100 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-100 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Follow Us */}
              <div className="bg-green-800/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 border border-green-400/30 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-green-200">Follow Us</h3>
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <a href="#" className="flex flex-col items-center p-3 sm:p-4 bg-green-600/30 rounded-lg hover:bg-green-500/50 transition-colors border border-green-400/30 group">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-300 group-hover:text-white mb-1 sm:mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    <span className="text-xs text-green-200 group-hover:text-white text-center">Twitter</span>
                  </a>
                  <a href="#" className="flex flex-col items-center p-3 sm:p-4 bg-green-600/30 rounded-lg hover:bg-green-500/50 transition-colors border border-green-400/30 group">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-300 group-hover:text-white mb-1 sm:mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="text-xs text-green-200 group-hover:text-white text-center">LinkedIn</span>
                  </a>
                  <a href="#" className="flex flex-col items-center p-3 sm:p-4 bg-green-600/30 rounded-lg hover:bg-green-500/50 transition-colors border border-green-400/30 group">
                    <svg className="w-6 h-6 text-green-300 group-hover:text-white mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="text-xs text-green-200 group-hover:text-white">Instagram</span>
                  </a>
                </div>
                
                {/* Newsletter Signup */}
                <div className="mt-6 pt-6 border-t border-green-400/30">
                  <h4 className="text-lg font-medium mb-3 text-green-200">Stay Updated</h4>
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-3 py-2 bg-green-900/30 border border-green-400/30 rounded text-white placeholder-green-400/60 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                    />
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white text-sm font-medium transition-colors duration-300">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Registration CTA */}
          <div className="text-center mt-16 relative z-10">
            <button className="px-12 py-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 border border-green-400 text-white font-medium shadow-lg hover:shadow-xl hover:shadow-green-500/30 transition-all duration-500 text-lg transform hover:-translate-y-1">
              Register for Hackathon
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.05)_0%,transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Logo & Description */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold text-white mb-4 tracking-wider">EZHUMI</h2>
              <p className="text-green-200/80 text-sm leading-relaxed mb-6 max-w-md">
                Empowering agricultural innovation through technology. Join us in creating sustainable solutions for tomorrow&apos;s farming challenges.
              </p>
              <div className="flex space-x-4">
                <a href="mailto:contact@ezhumi.com" className="w-10 h-10 bg-green-800/50 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-300 group">
                  <svg className="w-5 h-5 text-green-300 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-green-800/50 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-300 group">
                  <svg className="w-5 h-5 text-green-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-green-800/50 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-300 group">
                  <svg className="w-5 h-5 text-green-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#home" className="text-green-200/70 hover:text-green-200 transition-colors duration-300 text-sm">Home</a></li>
                <li><a href="#about" className="text-green-200/70 hover:text-green-200 transition-colors duration-300 text-sm">About</a></li>
                <li><a href="#themes" className="text-green-200/70 hover:text-green-200 transition-colors duration-300 text-sm">Themes</a></li>
                <li><a href="#timeline" className="text-green-200/70 hover:text-green-200 transition-colors duration-300 text-sm">Timeline</a></li>
                <li><a href="#faqs" className="text-green-200/70 hover:text-green-200 transition-colors duration-300 text-sm">FAQ&apos;s</a></li>
                <li><a href="#contact" className="text-green-200/70 hover:text-green-200 transition-colors duration-300 text-sm">Contact</a></li>
              </ul>
            </div>

            {/* Hackathon Info */}
            <div>
              <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Hackathon</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-green-200/70 hover:text-green-200 transition-colors duration-300 text-sm">Register Now</a></li>
                <li><a href="#" className="text-green-200/70 hover:text-green-200 transition-colors duration-300 text-sm">Event Timeline</a></li>
                <li><a href="#" className="text-green-200/70 hover:text-green-200 transition-colors duration-300 text-sm">Prizes</a></li>
                <li><a href="#" className="text-green-200/70 hover:text-green-200 transition-colors duration-300 text-sm">Rules</a></li>
                <li><a href="#" className="text-green-200/70 hover:text-green-200 transition-colors duration-300 text-sm">Sponsors</a></li>
              </ul>
            </div>
          </div>

          {/* Divider Line */}
          <div className="border-t border-green-800/50"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-green-200/60 text-xs">
                © 2025 Ezhumi Hackathon. All rights reserved.
              </p>
              <p className="text-green-200/50 text-xs mt-1">
                Organized by Entrepreneurship Development Cell, Rajalakshmi Engineering College
              </p>
            </div>
            
            <div className="flex space-x-6 text-xs">
              <a href="#" className="text-green-200/60 hover:text-green-200 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-green-200/60 hover:text-green-200 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-green-200/60 hover:text-green-200 transition-colors duration-300">Code of Conduct</a>
            </div>
          </div>

          {/* College Info */}
          <div className="mt-8 pt-6 border-t border-green-800/30">
            <div className="text-center">
              <p className="text-green-200/70 text-sm font-medium">Rajalakshmi Engineering College</p>
              <p className="text-green-200/50 text-xs mt-1">
                Vellore - Chennai Rd, Rajalakshmi Nagar, Thandalam, Meyalurkuppam, Tamil Nadu 602105
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
      </footer>
    </main>
  );
}
