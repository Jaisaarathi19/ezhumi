'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { Hero } from '@/components/Hero';
import { TopHeader } from '@/components/TopHeader';
import { Timeline } from '@/components/Timeline';

export default function Home() {
  const { t } = useTranslation('common');
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('2S-vChDTYaoMkzIT5');
  }, []);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    contact: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  // Handle contact form input changes
  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    // Basic validation
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.contact.trim() || !contactForm.message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all fields.' });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address.' });
      setIsSubmitting(false);
      return;
    }

    try {
      // EmailJS configuration with detailed logging
      const templateParams = {
        from_name: contactForm.name,
        from_email: contactForm.email,
        phone: contactForm.contact,
        message: contactForm.message,
        to_email: 'office.edc@rajalakshmi.edu.in'
      };

      console.log('Attempting to send email with:', {
        serviceId: 'service_123456789',
        templateId: 'template_yad9z3d',
        params: templateParams
      });

      // Send email using EmailJS
      const result = await emailjs.send(
        'service_123456789', // Your actual service ID
        'template_yad9z3d', // Template ID
        templateParams
      );

      console.log('Email sent successfully:', result);
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you for your message! We have received it and will get back to you soon.' 
      });
      
      // Reset form
      setContactForm({
        name: '',
        contact: '',
        email: '',
        message: ''
      });
    } catch (error: unknown) {
      console.error('EmailJS Error Details:', error);
      
      // More specific error messages
      let errorMessage = 'Failed to send message. ';
      const emailError = error as { status?: number; text?: string; message?: string };
      
      console.log('Error status:', emailError?.status);
      console.log('Error text:', emailError?.text);
      console.log('Error message:', emailError?.message);
      
      if (emailError?.status === 400) {
        errorMessage += 'Configuration issue with EmailJS service or template. Please contact us directly at office.edc@rajalakshmi.edu.in';
      } else if (emailError?.status === 402) {
        errorMessage += 'Email service quota exceeded. Please contact us directly.';
      } else if (emailError?.text?.includes('template')) {
        errorMessage += 'Email template not found. Please contact us directly.';
      } else if (emailError?.text?.includes('service')) {
        errorMessage += 'Email service not configured. Please contact us directly.';
      } else if (emailError?.message?.includes('network')) {
        errorMessage += 'Please check your internet connection and try again.';
      } else {
        errorMessage += `Please contact us directly at office.edc@rajalakshmi.edu.in or call +91-9876543210`;
      }
      
      setSubmitStatus({ 
        type: 'error', 
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative">
      {/* Top Header */}
      <TopHeader />

      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <section id="about" className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 text-green-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl w-full relative">
          {/* Background decorative elements */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-green-300/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-green-400/20 rounded-full blur-xl"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-green-300/30 max-w-md mx-auto lg:max-w-none">
                <Image 
                  src="/media/poster.jpg" 
                  alt="Ezhumi Hackathon Poster" 
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
              </div>
              {/* Decorative elements around image */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-400 rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-green-500 rounded-full opacity-80"></div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-6 lg:space-y-8 order-1 lg:order-2">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 text-green-800 leading-tight text-center lg:text-left">
                  {t('about.title')}
                </h2>
                <div className="space-y-4 lg:space-y-6 text-base sm:text-lg lg:text-xl leading-relaxed text-green-700">
                  <p className="font-medium">
                    <span className="text-green-800 font-bold">{t('about.wakeUpCall')}</span> 
                    {" "}{t('about.callToAction')}
                  </p>
                  <p>
                    {t('about.description1')}
                  </p>
                  <p>
                    {t('about.description2')}
                  </p>
                  <p className="bg-green-200/50 p-3 lg:p-4 rounded-lg border-l-4 border-green-600">
                    {t('about.incubationInfo')}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
                <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-green-300/50 shadow-lg">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 text-green-800">150+</div>
                  <div className="text-xs sm:text-sm font-medium text-green-600">{t('about.stats.teams')}</div>
                </div>
                <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-green-300/50 shadow-lg">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 text-green-800">7</div>
                  <div className="text-xs sm:text-sm font-medium text-green-600">{t('about.stats.incubation')}</div>
                </div>
                <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-green-300/50 shadow-lg col-span-2 md:col-span-1">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 text-green-800">24</div>
                  <div className="text-xs sm:text-sm font-medium text-green-600">{t('about.stats.hours')}</div>
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
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 lg:mb-16 text-center relative z-10">{t('themes.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative z-10">{[
              {
                titleKey: "themes.smartFarming.title",
                descriptionKey: "themes.smartFarming.description"
              },
              {
                titleKey: "themes.sustainableAgriculture.title",
                descriptionKey: "themes.sustainableAgriculture.description"
              },
              {
                titleKey: "themes.supplyChain.title",
                descriptionKey: "themes.supplyChain.description"
              },
              {
                titleKey: "themes.cropMonitoring.title",
                descriptionKey: "themes.cropMonitoring.description"
              },
              {
                titleKey: "themes.marketAccess.title",
                descriptionKey: "themes.marketAccess.description"
              },
              {
                titleKey: "themes.climateResilience.title",
                descriptionKey: "themes.climateResilience.description"
              }
            ].map((theme, index) => (
              <div key={index} className="p-4 sm:p-6 rounded-lg bg-green-800/30 backdrop-blur-sm border border-green-400/30 hover:bg-green-700/40 hover:border-green-300/50 transition-all duration-300 shadow-lg">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-green-200">{t(theme.titleKey)}</h3>
                <p className="text-sm sm:text-base text-green-100/80 font-light leading-relaxed">{t(theme.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <Timeline />

      {/* FAQ Section */}
      <section id="faqs" className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 text-green-900 flex items-center justify-center px-8 py-16">
        <div className="max-w-4xl w-full relative">
          {/* Background decorative elements */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-green-300/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-green-400/20 rounded-full blur-xl"></div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center text-green-800 relative z-10">{t('faqs.title')}</h2>
          
          <div className="space-y-6 relative z-10">
            {[
              {
                questionKey: 'faqs.questions.whatIs.question',
                answerKey: 'faqs.questions.whatIs.answer'
              },
              {
                questionKey: 'faqs.questions.whoCanParticipate.question',
                answerKey: 'faqs.questions.whoCanParticipate.answer'
              },
              {
                questionKey: 'faqs.questions.mainThemes.question',
                answerKey: 'faqs.questions.mainThemes.answer'
              },
              {
                questionKey: 'faqs.questions.prizes.question',
                answerKey: 'faqs.questions.prizes.answer'
              },
              {
                questionKey: 'faqs.questions.hardware.question',
                answerKey: 'faqs.questions.hardware.answer'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-lg border border-green-200 shadow-md hover:shadow-lg transition-all duration-300">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-green-800 pr-4">{t(faq.questionKey)}</h3>
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600 transform group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-green-700 leading-relaxed">{t(faq.answerKey)}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
          
          {/* Additional FAQ CTA */}
          <div className="text-center mt-12 relative z-10">
            <p className="text-green-600 mb-4">{t('contact.cta.hasQuestions')}</p>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium">
              {t('contact.cta.contactSupport')}
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
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 lg:mb-16 text-center relative z-10">{t('contact.title')}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 relative z-10">
            {/* Left Side - Contact Form */}
            <div className="bg-green-800/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 border border-green-400/30 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-green-200">{t('contact.form.title')}</h3>
              
              {/* Status Messages */}
              {submitStatus.type && (
                <div className={`mb-4 p-3 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-600/30 border border-green-400/50 text-green-200' 
                    : 'bg-red-600/30 border border-red-400/50 text-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-green-300 mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-green-900/30 border border-green-400/30 rounded-lg text-white placeholder-green-400/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                </div>
                
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-green-300 mb-2">
                    {t('contact.form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={contactForm.contact}
                    onChange={handleContactInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-green-900/30 border border-green-400/30 rounded-lg text-white placeholder-green-400/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={t('contact.form.phonePlaceholder')}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-green-300 mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-green-900/30 border border-green-400/30 rounded-lg text-white placeholder-green-400/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-green-300 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={contactForm.message}
                    onChange={handleContactInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-green-900/30 border border-green-400/30 rounded-lg text-white placeholder-green-400/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 resize-vertical text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={t('contact.form.messagePlaceholder')}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 rounded-lg text-white font-medium shadow-lg hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    t('contact.form.submitButton')
                  )}
                </button>
              </form>
            </div>

            {/* Right Side - Get in Touch & Follow Us */}
            <div className="space-y-6 sm:space-y-8">
              {/* Get in Touch */}
              <div className="bg-green-800/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 border border-green-400/30 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-green-200">{t('contact.info.title')}</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-3 text-green-100 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="break-all">{t('contact.info.email')}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-100 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{t('contact.info.location')}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-100 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>{t('contact.info.phone')}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-100 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>{t('contact.info.hours')}</span>
                  </div>
                </div>
              </div>

              {/* Follow Us */}
              <div className="bg-green-800/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 border border-green-400/30 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-green-200">{t('contact.social.title')}</h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <a href="https://www.instagram.com/eidc_rec?igsh=cG8weW5mbTU5c3hz" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-3 sm:p-4 bg-green-600/30 rounded-lg hover:bg-green-500/50 transition-colors border border-green-400/30 group">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-300 group-hover:text-white mb-1 sm:mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="text-xs text-green-200 group-hover:text-white text-center">{t('contact.social.instagram')}</span>
                  </a>
                  <a href="https://wa.me/+919876543210" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-3 sm:p-4 bg-green-600/30 rounded-lg hover:bg-green-500/50 transition-colors border border-green-400/30 group">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-300 group-hover:text-white mb-1 sm:mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span className="text-xs text-green-200 group-hover:text-white text-center">WhatsApp</span>
                  </a>
                </div>
                
              </div>
            </div>
          </div>
          
          {/* Registration CTA */}
          <div className="text-center mt-16 relative z-10">
            <a href="/register">
              <button className="px-12 py-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 border border-green-400 text-white font-medium shadow-lg hover:shadow-xl hover:shadow-green-500/30 transition-all duration-500 text-lg transform hover:-translate-y-1">
                {t('contact.cta.registerButton')}
              </button>
            </a>
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
              <h2 className="text-4xl font-bold text-white mb-4 tracking-wider">{t('hero.title', 'EZHUMI')}</h2>
              <p className="text-green-200/80 text-sm leading-relaxed mb-6 max-w-md">
                Empowering agricultural innovation through technology. Join us in creating sustainable solutions for tomorrow&apos;s farming challenges.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/e-cell-rec/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-800/50 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-300 group">
                  <svg className="w-5 h-5 text-green-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/eidc_rec?igsh=cG8weW5mbTU5c3hz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-800/50 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-300 group">
                  <svg className="w-5 h-5 text-green-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://wa.me/+919488505516" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-800/50 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-300 group">
                  <svg className="w-5 h-5 text-green-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
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
                <li><a href="/register" className="text-green-200/70 hover:text-green-200 transition-colors duration-300 text-sm">Register Now</a></li>
                <li><a href="#timeline" className="text-green-200/70 hover:text-green-200 transition-colors duration-300 text-sm">Event Timeline</a></li>
                <li><a href="#themes" className="text-green-200/70 hover:text-green-200 transition-colors duration-300 text-sm">Themes</a></li>
                <li><a href="#faqs" className="text-green-200/70 hover:text-green-200 transition-colors duration-300 text-sm">Rules & FAQ</a></li>
                <li><a href="#contact" className="text-green-200/70 hover:text-green-200 transition-colors duration-300 text-sm">Contact</a></li>
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
