'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

interface RegistrationData {
  registrationId: string;
  teamName: string;
  teamLeadName: string;
  teamLeadEmail: string;
  teamLeadPhone: string;
  collegeName: string;
  participantCount: number;
  participants: Array<{
    name: string;
    email: string;
    contact: string;
    year: string;
    department: string;
  }>;
  registrationDate: string;
}

export default function RegistrationSuccess() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);

  useEffect(() => {
    // Get registration data from sessionStorage
    const storedData = sessionStorage.getItem('registrationData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setRegistrationData(data);
      } catch (error) {
        console.error('Failed to parse registration data:', error);
      }
    } else {
      // If no data found, redirect back to registration
      router.push('/register');
    }
  }, [router]);



  if (!registrationData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-black">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p>Loading registration details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-green-600/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-green-300/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-2xl w-full space-y-8 relative z-10">
        <div>
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-500/20 backdrop-blur-sm border-2 border-green-400/50 mb-6">
            <svg 
              className="h-12 w-12 text-green-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {t('registerSuccess.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-green-300">
            {t('registerSuccess.subtitle')}
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border border-gray-700/50">
          {/* Success Message */}
          <div className="rounded-md bg-green-50/10 backdrop-blur-sm p-4 border border-green-500/30">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg 
                  className="h-5 w-5 text-green-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-300">
                  {t('registerSuccess.successTitle')}
                </h3>
                <div className="mt-2 text-sm text-green-200/80">
                  <p>{t('registerSuccess.successMessage')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Details */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white border-b border-green-600/50 pb-2">
              📋 Registration Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-green-300">Registration ID:</span>
                    <p className="text-white font-mono bg-gray-900/50 px-2 py-1 rounded mt-1 text-sm">
                      {registrationData.registrationId}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-green-300">Team Name:</span>
                    <p className="text-white font-medium mt-1">{registrationData.teamName}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-green-300">Team Lead:</span>
                    <p className="text-white mt-1">{registrationData.teamLeadName}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-green-300">College:</span>
                    <p className="text-white mt-1">{registrationData.collegeName}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-green-300">{t('registerSuccess.contactEmail')}:</span>
                    <p className="text-white mt-1">{registrationData.teamLeadEmail}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-green-300">{t('registerSuccess.contactPhone')}:</span>
                    <p className="text-white mt-1">{registrationData.teamLeadPhone}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-green-300">Total Members:</span>
                    <p className="text-white font-medium mt-1">{registrationData.participantCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-white border-b border-green-600/50 pb-2">
              👥 Team Members
            </h3>
            
            <div className="space-y-3">
              {registrationData.participants.map((participant, index) => (
                <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-white font-medium">{participant.name}</h4>
                      <p className="text-green-300 text-sm">{participant.email}</p>
                      <p className="text-blue-300 text-sm">{participant.contact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Notice */}
          <div className="bg-yellow-500/10 backdrop-blur-sm rounded-lg p-4 border border-yellow-400/30">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg 
                  className="h-5 w-5 text-yellow-400" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-yellow-300">
                  Please Verify Your Information
                </h4>
                <p className="mt-1 text-sm text-yellow-200/80">
                  Please review all the details above carefully. If you notice any errors, please contact us immediately at the email below.
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-white border-b border-green-600/50 pb-2">
              {t('registerSuccess.nextSteps')}
            </h3>
            
            <ul className="space-y-2 text-sm text-green-200/80">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Keep this registration ID safe: <span className="font-mono text-white">{registrationData.registrationId}</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Watch your email for event updates and announcements
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Start brainstorming innovative agriculture solutions
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Prepare your development environment and tools
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/')}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            {t('registerSuccess.backToHome')}
          </button>
        </div>

        {/* Support Info */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Need help or found an error in your registration?
          </p>
          <a 
            href="mailto:hello@ezhumi.com" 
            className="text-sm text-green-400 hover:text-green-300 underline"
          >
            Contact us: hello@ezhumi.com
          </a>
        </div>
      </div>
    </div>
  );
}