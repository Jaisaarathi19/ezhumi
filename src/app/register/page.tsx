'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';

interface Participant {
  name: string;
  contact: string;
  email: string;
}

export default function Register() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeadName: '',
    teamLeadPhone: '',
    teamLeadEmail: '',
    collegeName: '',
    participantCount: 1,
    participants: [{ name: '', contact: '', email: '' }] as Participant[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Authentication check
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signup');
    }
  }, [user, authLoading, router]);

  // Show loading screen while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-green-500 border-t-transparent"></div>
          <p className="text-white text-lg">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render the form if user is not authenticated
  if (!user) {
    return null; // Will redirect to signup page via useEffect
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'participantCount' ? parseInt(value) : value
    }));
  };

  const handleParticipantCountChange = (count: number) => {
    const newParticipants = [...formData.participants];
    
    // Adjust participants array based on count (excluding team lead)
    if (count > newParticipants.length) {
      // Add more participants
      for (let i = newParticipants.length; i < count; i++) {
        newParticipants.push({ name: '', contact: '', email: '' });
      }
    } else if (count < newParticipants.length) {
      // Remove participants
      newParticipants.splice(count);
    }

    setFormData(prev => ({
      ...prev,
      participantCount: count,
      participants: newParticipants
    }));
  };

  const handleParticipantChange = (index: number, field: keyof Participant, value: string) => {
    const newParticipants = [...formData.participants];
    newParticipants[index] = {
      ...newParticipants[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      participants: newParticipants
    }));
  };

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOtp = async (email: string, phone: string) => {
    try {
      const otpCode = generateOtp();
      setGeneratedOtp(otpCode);
      
      // Here you would normally send OTP via SMS/Email
      // For demo purposes, we'll just show it in console and alert
      console.log(`OTP sent to ${email} and ${phone}: ${otpCode}`);
      alert(`OTP sent! For demo: ${otpCode}`); // Remove this in production
      
      // In production, you would call an API to send OTP
      // await supabase.functions.invoke('send-otp', {
      //   body: { email, phone, otp: otpCode }
      // });
      
      setOtpSent(true);
      setShowOtpField(true);
      setError(null);
      return true;
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP. Please try again.');
      return false;
    }
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      return true;
    } else {
      setError('Invalid OTP. Please check and try again.');
      return false;
    }
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.teamName || !formData.teamLeadName || !formData.teamLeadPhone || 
        !formData.teamLeadEmail || !formData.collegeName) {
      setError(t('register.errors.allFieldsRequired'));
      return false;
    }

    // Validate team lead email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.teamLeadEmail)) {
      setError(t('register.errors.invalidEmail'));
      return false;
    }

    // Validate team lead phone
    const phoneRegex = /^[+]?[\d\s()-]{10,}$/;
    if (!phoneRegex.test(formData.teamLeadPhone)) {
      setError(t('register.errors.invalidPhone'));
      return false;
    }

    // Validate participants
    for (let i = 0; i < formData.participantCount; i++) {
      const participant = formData.participants[i];
      if (!participant.name || !participant.contact || !participant.email) {
        setError(t('register.errors.participantFieldsRequired', { number: i + 1 }));
        return false;
      }
      if (!emailRegex.test(participant.email)) {
        setError(t('register.errors.participantInvalidEmail', { number: i + 1 }));
        return false;
      }
      if (!phoneRegex.test(participant.contact)) {
        setError(t('register.errors.participantInvalidPhone', { number: i + 1 }));
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      // If OTP hasn't been sent yet, send it first
      if (!otpSent) {
        const otpSentSuccessfully = await sendOtp(formData.teamLeadEmail, formData.teamLeadPhone);
        setLoading(false);
        if (!otpSentSuccessfully) return;
        return; // Stop here, wait for OTP input
      }

      // If OTP is sent but not verified, verify it
      if (otpSent && !verifyOtp()) {
        setLoading(false);
        return;
      }

      // Proceed with registration after OTP verification
      // Check environment variables
      console.log('Environment check:');
      console.log('SUPABASE_URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log('SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
      console.log('SUPABASE_URL starts with https:', process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith('https://'));

      // Test Supabase connection first
      console.log('Testing Supabase connection...');
      const { data: connectionTest, error: connectionError } = await supabase
        .from('team_registrations')
        .select('count')
        .limit(1);
      
      console.log('Connection test result:', { connectionTest, connectionError });
      
      if (connectionError) {
        console.error('Supabase connection failed:', connectionError);
        setError('Database connection failed. Please check your internet connection and try again.');
        setLoading(false);
        return;
      }

      // First, check if the team lead email is already registered
      console.log('Checking for existing registration with email:', formData.teamLeadEmail);
      
      const { data: existingRegistration, error: checkError } = await supabase
        .from('team_registrations')
        .select('id, team_lead_email')
        .eq('team_lead_email', formData.teamLeadEmail)
        .single();

      console.log('Existing registration check result:', { existingRegistration, checkError });

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is expected
        console.error('Error checking existing registration:', checkError);
        setError(t('register.errors.checkError'));
        setLoading(false);
        return;
      }

      if (existingRegistration) {
        console.log('Registration already exists for this email');
        setError(t('register.errors.alreadyRegistered'));
        setLoading(false);
        return;
      }

      console.log('No existing registration found, proceeding with new registration');

      // Insert registration data into Supabase
      const registrationData = {
        team_name: formData.teamName,
        team_lead_name: formData.teamLeadName,
        team_lead_phone: formData.teamLeadPhone,
        team_lead_email: formData.teamLeadEmail,
        college_name: formData.collegeName,
        participant_count: formData.participantCount + 1, // +1 for team lead
        participants: JSON.stringify(formData.participants.slice(0, formData.participantCount)),
        created_at: new Date().toISOString(),
      };

      console.log('Attempting to insert registration data:', registrationData);

      const { data, error: dbError } = await supabase
        .from('team_registrations')
        .insert([registrationData])
        .select();

      console.log('Database insertion result:', { data, dbError });

      if (dbError) {
        console.error('Database error details:', dbError);
        console.error('Error code:', dbError.code);
        console.error('Error message:', dbError.message);
        console.error('Error details:', dbError.details);
        console.error('Error hint:', dbError.hint);
        
        // Provide more specific error messages
        if (dbError.code === '23505') {
          if (dbError.message && dbError.message.includes('unique_team_name')) {
            setError(t('register.errors.teamNameExists'));
          } else if (dbError.message && dbError.message.includes('unique_team_lead_email')) {
            setError(t('register.errors.teamLeadEmailExists'));
          } else {
            setError(t('register.errors.duplicateEntry'));
          }
        } else if (dbError.code === '42501') {
          setError(t('register.errors.permissionDenied'));
        } else if (dbError.code === '42P01') {
          setError('Table does not exist. Please contact support.');
        } else if (!dbError.code && !dbError.message) {
          setError('Network error or configuration issue. Please check your connection and try again.');
        } else {
          setError(`${t('register.errors.databaseError')} (${dbError.code || 'Unknown'}: ${dbError.message || 'Unknown error'})`);
        }
        return;
      }

      if (!data || data.length === 0) {
        console.error('No data returned from successful insertion');
        setError('Registration may have failed. Please contact support.');
        return;
      }

      console.log('Registration successful:', data);
      
      // Store registration data in sessionStorage for success page
      const successData = {
        registrationId: data[0]?.id,
        teamName: formData.teamName,
        teamLeadName: formData.teamLeadName,
        teamLeadEmail: formData.teamLeadEmail,
        teamLeadPhone: formData.teamLeadPhone,
        collegeName: formData.collegeName,
        participantCount: formData.participantCount + 1,
        participants: formData.participants.slice(0, formData.participantCount),
        registrationDate: new Date().toISOString()
      };
      
      sessionStorage.setItem('registrationData', JSON.stringify(successData));
      
      // Redirect to success page
      router.push('/register/success');
    } catch (error) {
      console.error('Registration error:', error);
      setError(t('register.errors.genericError'));
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {t('register.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-green-300">
            {t('register.subtitle')}
          </p>
          <div className="mt-4 text-center">
            <div className="inline-flex items-center px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-green-300 text-sm">Authenticated user: {user?.email}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {t('register.error')}
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Team Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white border-b border-green-600 pb-2">
                {t('register.teamInfo.title')}
              </h3>
              
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="teamName" className="block text-sm font-medium text-green-300 mb-1">
                    {t('register.teamInfo.teamName')} *
                  </label>
                  <input
                    id="teamName"
                    name="teamName"
                    type="text"
                    required
                    value={formData.teamName}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-400 text-white bg-gray-800/50 backdrop-blur-sm rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder={t('register.teamInfo.teamNamePlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="collegeName" className="block text-sm font-medium text-green-300 mb-1">
                    {t('register.teamInfo.collegeName')} *
                  </label>
                  <input
                    id="collegeName"
                    name="collegeName"
                    type="text"
                    required
                    value={formData.collegeName}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-400 text-white bg-gray-800/50 backdrop-blur-sm rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder={t('register.teamInfo.collegeNamePlaceholder')}
                  />
                </div>
              </div>
            </div>

            {/* Team Lead Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white border-b border-green-600 pb-2">
                {t('register.teamLead.title')}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="teamLeadName" className="block text-sm font-medium text-green-300 mb-1">
                    {t('register.teamLead.name')} *
                  </label>
                  <input
                    id="teamLeadName"
                    name="teamLeadName"
                    type="text"
                    required
                    value={formData.teamLeadName}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-400 text-white bg-gray-800/50 backdrop-blur-sm rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder={t('register.teamLead.namePlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="teamLeadPhone" className="block text-sm font-medium text-green-300 mb-1">
                    {t('register.teamLead.phone')} *
                  </label>
                  <input
                    id="teamLeadPhone"
                    name="teamLeadPhone"
                    type="tel"
                    required
                    value={formData.teamLeadPhone}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-400 text-white bg-gray-800/50 backdrop-blur-sm rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder={t('register.teamLead.phonePlaceholder')}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="teamLeadEmail" className="block text-sm font-medium text-green-300 mb-1">
                    {t('register.teamLead.email')} *
                  </label>
                  <input
                    id="teamLeadEmail"
                    name="teamLeadEmail"
                    type="email"
                    required
                    value={formData.teamLeadEmail}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-400 text-white bg-gray-800/50 backdrop-blur-sm rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder={t('register.teamLead.emailPlaceholder')}
                  />
                </div>
              </div>
            </div>

            {/* Participants Count Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white border-b border-green-600 pb-2">
                {t('register.participants.title')}
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-green-300 mb-3">
                  {t('register.participants.count')} (1-3 {t('register.participants.additional')})
                </label>
                <div className="flex space-x-4">
                  {[1, 2, 3].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => handleParticipantCountChange(count)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        formData.participantCount === count
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {count + 1} {t('register.participants.members')} {/* +1 for team lead */}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Participants Information */}
            {formData.participantCount > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">
                  {t('register.participants.details')}
                </h3>
                
                {formData.participants.slice(0, formData.participantCount).map((participant, index) => (
                  <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 space-y-4">
                    <h4 className="text-md font-medium text-green-300">
                      {t('register.participants.participant')} {index + 1}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-green-300 mb-1">
                          {t('register.participants.name')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={participant.name}
                          onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                          className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white bg-gray-800/50 backdrop-blur-sm rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                          placeholder={t('register.participants.namePlaceholder')}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-green-300 mb-1">
                          {t('register.participants.contact')} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={participant.contact}
                          onChange={(e) => handleParticipantChange(index, 'contact', e.target.value)}
                          className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white bg-gray-800/50 backdrop-blur-sm rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                          placeholder={t('register.participants.contactPlaceholder')}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-green-300 mb-1">
                          {t('register.participants.email')} *
                        </label>
                        <input
                          type="email"
                          required
                          value={participant.email}
                          onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                          className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white bg-gray-800/50 backdrop-blur-sm rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                          placeholder={t('register.participants.emailPlaceholder')}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* OTP Verification Section */}
            {showOtpField && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white border-b border-green-600 pb-2">
                  {t('register.otp.title')}
                </h3>
                
                <div className="bg-green-900/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-green-300 text-sm mb-4">
                    {t('register.otp.sentMessage', { 
                      email: formData.teamLeadEmail,
                      phone: formData.teamLeadPhone 
                    })}
                  </p>
                  
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-green-300 mb-1">
                      {t('register.otp.enterCode')} *
                    </label>
                    <div className="flex space-x-2">
                      <input
                        id="otp"
                        name="otp"
                        type="text"
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        className="appearance-none relative block w-32 px-3 py-3 border border-gray-700 placeholder-gray-400 text-white bg-gray-800/50 backdrop-blur-sm rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm text-center tracking-widest"
                        placeholder="000000"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setShowOtpField(false);
                          setOtp('');
                          setGeneratedOtp('');
                        }}
                        className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors duration-200"
                      >
                        {t('register.otp.resendButton')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading 
                  ? t('register.registering') 
                  : !otpSent 
                  ? t('register.sendOtpButton')
                  : t('register.verifyAndRegisterButton')
                }
              </button>
            </div>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="text-sm text-green-300 hover:text-green-200 underline mr-4"
              >
                {t('register.backToHome')}
              </button>
              <span className="text-gray-500">|</span>
              <button
                type="button"
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push('/');
                }}
                className="text-sm text-red-300 hover:text-red-200 underline ml-4"
              >
                Logout
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}