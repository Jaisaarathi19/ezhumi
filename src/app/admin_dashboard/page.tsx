'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useRouter } from 'next/navigation';

interface TeamRegistration {
  id: string;
  team_name: string;
  team_lead_name: string;
  team_lead_email: string;
  team_lead_phone: string;
  college_name: string;
  selected_theme: string;
  participants: {
    name: string;
    email: string;
    phone: string;
  }[];
  created_at: string;
}

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<TeamRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState<TeamRegistration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Numeric filters
  const [minTeamSize, setMinTeamSize] = useState<number | ''>('');
  const [maxTeamSize, setMaxTeamSize] = useState<number | ''>('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  
  const { isAdmin, isLoading: authLoading, user } = useAdminAuth();
  const router = useRouter();

  // Admin authentication check
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
        return;
      }
      
      if (!isAdmin) {
        router.push('/');
        return;
      }
      
      fetchRegistrations();
    }
  }, [isAdmin, authLoading, user, router]);

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('team_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Parse participants field properly
      const formattedData = data.map(reg => {
        let participants = reg.participants;
        
        // Handle different participants data formats
        if (typeof participants === 'string') {
          try {
            participants = JSON.parse(participants);
          } catch (e) {
            console.warn('Failed to parse participants for team:', reg.team_name, e);
            participants = [];
          }
        } else if (!Array.isArray(participants)) {
          // If participants is an object, convert to array
          if (participants && typeof participants === 'object') {
            participants = Object.values(participants);
          } else {
            participants = [];
          }
        }

        return {
          ...reg,
          participants: Array.isArray(participants) ? participants : []
        };
      });

      console.log('Fetched and formatted registrations:', formattedData);
      setRegistrations(formattedData);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  // Filter registrations based on search term and filters
  const filteredRegistrations = registrations.filter(registration => {
    const matchesSearch = !searchTerm || 
      registration.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.team_lead_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.college_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCollege = !selectedCollege || 
      registration.college_name.toLowerCase().includes(selectedCollege.toLowerCase());
    
    const teamSize = (Array.isArray(registration.participants) ? registration.participants.length : 0) + 1;
    const matchesMinSize = minTeamSize === '' || teamSize >= minTeamSize;
    const matchesMaxSize = maxTeamSize === '' || teamSize <= maxTeamSize;
    
    const matchesDateRange = (!dateFrom || new Date(registration.created_at) >= new Date(dateFrom)) &&
                           (!dateTo || new Date(registration.created_at) <= new Date(dateTo));
    
    return matchesSearch && matchesCollege && matchesMinSize && matchesMaxSize && matchesDateRange;
  });

  // Get unique colleges for filter dropdown
  const uniqueColleges = [...new Set(registrations.map(reg => reg.college_name))];

  // Statistics
  const totalRegistrations = filteredRegistrations.length;
  const totalParticipants = filteredRegistrations.reduce((sum, reg) => 
    sum + (Array.isArray(reg.participants) ? reg.participants.length : 0) + 1, 0);
  const averageTeamSize = totalRegistrations > 0 ? 
    Math.round(totalParticipants / totalRegistrations * 10) / 10 : 0;
  const todayRegistrations = filteredRegistrations.filter(reg => 
    new Date(reg.created_at).toDateString() === new Date().toDateString()).length;

  const openDetailsModal = (registration: TeamRegistration) => {
    console.log('=== OPENING MODAL DEBUG ===');
    console.log('Registration object:', registration);
    console.log('Team Name:', registration.team_name);
    console.log('Team Lead Name:', registration.team_lead_name);
    console.log('Team Lead Email:', registration.team_lead_email);
    console.log('Team Lead Phone:', registration.team_lead_phone);
    console.log('College Name:', registration.college_name);
    console.log('Selected Theme:', registration.selected_theme);
    console.log('Created At:', registration.created_at);
    console.log('Registration ID:', registration.id);
    console.log('Participants (raw):', registration.participants);
    console.log('Participants type:', typeof registration.participants);
    console.log('Participants is array:', Array.isArray(registration.participants));
    
    if (registration.participants && Array.isArray(registration.participants)) {
      console.log('Participants array length:', registration.participants.length);
      registration.participants.forEach((p, idx) => {
        console.log(`Participant ${idx + 1}:`, p);
      });
    }
    
    console.log('=== END MODAL DEBUG ===');
    
    setSelectedRegistration(registration);
    setIsModalOpen(true);
    console.log('Modal state set to true, selected registration set');
  };

  const closeModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
    setSelectedRegistration(null);
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Team Name', 'Team Lead', 'Email', 'Phone', 'College', 'Theme', 'Team Size', 'Registration Date', 'Participants'],
      ...filteredRegistrations.map(reg => [
        reg.team_name,
        reg.team_lead_name,
        reg.team_lead_email,
        reg.team_lead_phone,
        reg.college_name,
        reg.selected_theme,
        (Array.isArray(reg.participants) ? reg.participants.length : 0) + 1,
        new Date(reg.created_at).toLocaleString(),
        Array.isArray(reg.participants) ? reg.participants.map(p => `${p.name} (${p.email})`).join('; ') : ''
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ezhumi-hackathon-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinTeamSize('');
    setMaxTeamSize('');
    setDateFrom('');
    setDateTo('');
    setSelectedCollege('');
  };

  const hasActiveFilters = searchTerm || selectedCollege || minTeamSize !== '' || maxTeamSize !== '' || dateFrom || dateTo;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent"></div>
          <span className="text-white text-lg">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 max-w-md">
          <div className="flex items-center space-x-3 mb-3">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-red-400">Error Loading Dashboard</h2>
          </div>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchRegistrations}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Please log in to access the admin dashboard</div>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Access Denied</div>
          <div className="text-gray-400 mb-6">You don&apos;t have permission to access this admin dashboard.</div>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 mt-1">Hackathon Registration Management System</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">Dashboard</span>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-green-400 font-medium">Team Registrations</span>
          </nav>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Teams</p>
                <p className="text-2xl font-bold text-white mt-2">{totalRegistrations}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 616 0zm6 3a2 2 0 11-4 0 2 2 0 414 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Participants</p>
                <p className="text-2xl font-bold text-white mt-2">{totalParticipants}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Average Team Size</p>
                <p className="text-2xl font-bold text-white mt-2">{averageTeamSize}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Today&apos;s Registrations</p>
                <p className="text-2xl font-bold text-white mt-2">{todayRegistrations}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
              <span>Filters & Search</span>
            </h3>
            <div className="flex items-center space-x-3">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 rounded-lg transition-all duration-200"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={fetchRegistrations}
                className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-gray-500/25"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
              </button>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-green-500/25"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search Teams</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by team name, lead, or college..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* College Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Filter by College</label>
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Colleges</option>
                {uniqueColleges.map(college => (
                  <option key={college} value={college}>{college}</option>
                ))}
              </select>
            </div>

            {/* Team Size Range */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Team Size Range</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={minTeamSize}
                  onChange={(e) => setMinTeamSize(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Min"
                  min="1"
                  className="w-1/2 px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="number"
                  value={maxTeamSize}
                  onChange={(e) => setMaxTeamSize(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Max"
                  min="1"
                  className="w-1/2 px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Date From */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Registration From</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Date To */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Registration To</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Quick Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Quick Filters</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setMinTeamSize(1); setMaxTeamSize(1); }}
                  className="px-3 py-2 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 rounded-lg transition-all duration-200"
                >
                  Solo Teams
                </button>
                <button
                  onClick={() => { setMinTeamSize(2); setMaxTeamSize(4); }}
                  className="px-3 py-2 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 rounded-lg transition-all duration-200"
                >
                  Small Teams (2-4)
                </button>
                <button
                  onClick={() => { setDateFrom(new Date().toISOString().split('T')[0]); setDateTo(''); }}
                  className="px-3 py-2 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 rounded-lg transition-all duration-200"
                >
                  Today Only
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-gray-400 mb-4 flex items-center justify-between">
          <span>Showing {filteredRegistrations.length} of {registrations.length} registrations</span>
          <div className="text-sm text-gray-500">
            {filteredRegistrations.length !== registrations.length && 'Filtered results'}
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 616 0zm6 3a2 2 0 11-4 0 2 2 0 414 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Team Information</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Team Leader</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>Institution</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                      <span>Members</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Registration</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 616 0z" />
                      </svg>
                      <span>Actions</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredRegistrations.map((registration, index) => (
                  <tr key={registration.id} className="hover:bg-gray-800/50 transition-all duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20">
                          <span className="text-green-400 font-semibold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {registration.team_name}
                          </div>
                          <div className="text-sm text-gray-500 font-mono">
                            #{registration.id.slice(0, 8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-white">{registration.team_lead_name}</div>
                        <div className="text-xs text-gray-400 flex items-center space-x-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{registration.team_lead_email}</span>
                        </div>
                        <div className="text-xs text-gray-400 flex items-center space-x-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{registration.team_lead_phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{registration.college_name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-2 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
                            {(Array.isArray(registration.participants) ? registration.participants.length : 0) + 1} Total
                          </span>
                        </div>
                        {Array.isArray(registration.participants) && registration.participants.length > 0 && (
                          <div className="space-y-1 max-w-xs">
                            {registration.participants.slice(0, 2).map((p, idx) => (
                              <div key={idx} className="text-xs text-gray-400 bg-gray-800 rounded px-2 py-1 border border-gray-700">
                                <div className="font-medium text-gray-300">{p?.name || 'N/A'}</div>
                              </div>
                            ))}
                            {registration.participants.length > 2 && (
                              <div className="text-xs text-gray-500 italic">
                                +{registration.participants.length - 2} more
                              </div>
                            )}
                          </div>
                        )}
                        {(!Array.isArray(registration.participants) || registration.participants.length === 0) && (
                          <div className="text-xs text-gray-500 italic">Solo team</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-white">
                          {new Date(registration.created_at).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(registration.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          console.log('Button clicked for:', registration.team_name);
                          openDetailsModal(registration);
                        }}
                        className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 616 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredRegistrations.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gray-800 rounded-full">
                  <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
              </div>
              <div className="text-xl font-medium mb-2 text-white">
                {searchTerm ? 'No registrations match your search' : 'No registrations found'}
              </div>
              <div className="text-sm text-gray-500">
                {searchTerm ? 'Try adjusting your search criteria or filters' : 'Registrations will appear here once teams start signing up'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {isModalOpen && selectedRegistration && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto" style={{ zIndex: 9999 }}>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 transition-opacity bg-black bg-opacity-75"
              onClick={closeModal}
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
            ></div>

            {/* Modal content */}
            <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-900 shadow-2xl rounded-xl border border-gray-800 relative z-10">
              {/* Modal header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 616 0zm6 3a2 2 0 11-4 0 2 2 0 414 0zM7 10a2 2 0 11-4 0 2 2 0 414 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Team Registration Details</h3>
                    <p className="text-sm text-gray-400 mt-1">Complete information for registered team</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal body */}
              <div className="space-y-8">
                {/* Team Information */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-green-400 mb-6 flex items-center space-x-3">
                    <div className="p-1 bg-green-500/10 rounded border border-green-500/20">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 616 0zm6 3a2 2 0 11-4 0 2 2 0 414 0zM7 10a2 2 0 11-4 0 2 2 0 414 0z" />
                      </svg>
                    </div>
                    <span>Team Information</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-400 block mb-2">Team Name</label>
                      <div className="text-white text-lg font-semibold">{selectedRegistration.team_name || 'N/A'}</div>
                      {!selectedRegistration.team_name && <div className="text-xs text-red-400 mt-1">⚠️ Missing team name</div>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400 block mb-2">Registration ID</label>
                      <div className="text-white font-mono text-sm bg-gray-900 px-3 py-2 rounded-lg border border-gray-700">{selectedRegistration.id || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400 block mb-2">College/Institution</label>
                      <div className="text-white text-lg">{selectedRegistration.college_name || 'N/A'}</div>
                      {!selectedRegistration.college_name && <div className="text-xs text-red-400 mt-1">⚠️ Missing college name</div>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-400 block mb-2">Registration Date</label>
                      <div className="text-white text-lg">
                        {selectedRegistration.created_at ? new Date(selectedRegistration.created_at).toLocaleString() : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Lead Information */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-green-400 mb-6 flex items-center space-x-3">
                    <div className="p-1 bg-green-500/10 rounded border border-green-500/20">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span>Team Lead Details</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-400 block mb-2">Full Name</label>
                      <div className="text-white text-lg font-semibold">{selectedRegistration.team_lead_name || 'N/A'}</div>
                      {!selectedRegistration.team_lead_name && <div className="text-xs text-red-400 mt-1">⚠️ Missing team lead name</div>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400 block mb-2">Email Address</label>
                      <div className="text-white bg-gray-900 px-3 py-2 rounded-lg border border-gray-700 break-all">
                        {selectedRegistration.team_lead_email || 'N/A'}
                      </div>
                      {!selectedRegistration.team_lead_email && <div className="text-xs text-red-400 mt-1">⚠️ Missing email</div>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400 block mb-2">Phone Number</label>
                      <div className="text-white bg-gray-900 px-3 py-2 rounded-lg border border-gray-700">
                        {selectedRegistration.team_lead_phone || 'N/A'}
                      </div>
                      {!selectedRegistration.team_lead_phone && <div className="text-xs text-red-400 mt-1">⚠️ Missing phone</div>}
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-green-400 mb-6 flex items-center space-x-3">
                    <div className="p-1 bg-green-500/10 rounded border border-green-500/20">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </div>
                    <span>Team Members</span>
                  </h4>

                  {(() => {
                    const participants = selectedRegistration.participants;
                    console.log('=== PARTICIPANTS DEBUG ===');
                    console.log('Raw participants:', participants);
                    console.log('Type:', typeof participants);
                    console.log('Is Array:', Array.isArray(participants));
                    
                    // Handle different data formats
                    let participantList: unknown[] = [];
                    
                    if (typeof participants === 'string') {
                      try {
                        participantList = JSON.parse(participants);
                        console.log('Parsed from JSON string:', participantList);
                      } catch (e) {
                        console.error('Failed to parse participants string:', e);
                        // Try to handle as comma-separated or other formats
                        participantList = [];
                      }
                    } else if (Array.isArray(participants)) {
                      participantList = participants;
                      console.log('Using as array:', participantList);
                    } else if (participants && typeof participants === 'object') {
                      // If it's an object, convert to array
                      participantList = Object.values(participants);
                      console.log('Converted object to array:', participantList);
                    } else {
                      participantList = [];
                      console.log('No participants or invalid format');
                    }

                    console.log('ParticipantList before filtering:', participantList);
                    
                    // Show first item structure if available
                    if (participantList.length > 0) {
                      const firstParticipant = participantList[0] as Record<string, unknown>;
                      console.log('First participant structure:');
                      console.log('  name:', firstParticipant.name);
                      console.log('  email:', firstParticipant.email);
                      console.log('  contact:', firstParticipant.contact);
                      console.log('  phone:', firstParticipant.phone);
                      console.log('  All keys:', Object.keys(firstParticipant));
                    }

                    // Filter out invalid entries and normalize data
                    const validParticipants = participantList.filter((p: unknown) => {
                      if (!p || typeof p !== 'object') return false;
                      const participant = p as Record<string, unknown>;
                      
                      // Check if participant has at least name, email, or contact/phone
                      const hasName = participant.name || participant.participant_name || participant.memberName;
                      const hasEmail = participant.email || participant.participant_email || participant.memberEmail;  
                      const hasPhone = participant.phone || participant.participant_phone || participant.memberPhone || participant.contact; // Add 'contact' field
                      
                      return hasName || hasEmail || hasPhone;
                    }).map((p: unknown) => {
                      const participant = p as Record<string, unknown>;
                      return {
                        name: String(participant.name || participant.participant_name || participant.memberName || 'N/A'),
                        email: String(participant.email || participant.participant_email || participant.memberEmail || 'N/A'),
                        phone: String(participant.phone || participant.participant_phone || participant.memberPhone || participant.contact || 'N/A') // Map contact to phone
                      };
                    });

                    console.log('Final valid participants:', validParticipants);
                    console.log('=== END DEBUG ===');

                    return validParticipants.length > 0 ? (
                      <div className="space-y-4">
                        <div className="text-sm text-green-400 font-medium mb-4 bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/20">
                          ✓ Found {validParticipants.length} team member{validParticipants.length !== 1 ? 's' : ''}
                        </div>
                        {validParticipants.map((participant: { name: string; email: string; phone: string }, idx: number) => (
                          <div key={idx} className="border border-gray-700 rounded-lg p-4 bg-gray-900 hover:bg-gray-800 transition-colors">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="text-xs font-medium text-gray-400 block mb-1">
                                  <span className="inline-flex items-center space-x-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>Member {idx + 1} - Name</span>
                                  </span>
                                </label>
                                <div className="text-white font-medium bg-gray-800 px-3 py-2 rounded">
                                  {participant.name}
                                </div>
                              </div>
                              <div>
                                <label className="text-xs font-medium text-gray-400 block mb-1">
                                  <span className="inline-flex items-center space-x-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>Email</span>
                                  </span>
                                </label>
                                <div className="text-white break-all text-sm bg-gray-800 px-3 py-2 rounded">
                                  {participant.email}
                                </div>
                              </div>
                              <div>
                                <label className="text-xs font-medium text-gray-400 block mb-1">
                                  <span className="inline-flex items-center space-x-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>Phone</span>
                                  </span>
                                </label>
                                <div className="text-white bg-gray-800 px-3 py-2 rounded font-mono text-sm">
                                  {participant.phone}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-center py-12">
                        <div className="flex justify-center mb-4">
                          <div className="p-4 bg-gray-800 rounded-full border border-gray-700">
                            <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="text-xl font-medium text-white mb-3">Solo Team</div>
                        <div className="text-sm text-gray-500 max-w-sm mx-auto">
                          This team consists only of the team leader. No additional team members have been registered.
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Summary */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-green-400 mb-6 flex items-center space-x-3">
                    <div className="p-1 bg-green-500/10 rounded border border-green-500/20">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span>Team Summary</span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {(() => {
                      const participants = selectedRegistration.participants;
                      let participantCount = 0;
                      
                      // Calculate actual participant count using the same logic as team members display
                      let participantList: unknown[] = [];
                      
                      if (typeof participants === 'string') {
                        try {
                          participantList = JSON.parse(participants);
                        } catch {
                          participantList = [];
                        }
                      } else if (Array.isArray(participants)) {
                        participantList = participants;
                      } else if (participants && typeof participants === 'object') {
                        participantList = Object.values(participants);
                      }

                      // Count valid participants using same validation logic
                      participantCount = participantList.filter((p: unknown) => {
                        if (!p || typeof p !== 'object') return false;
                        const participant = p as Record<string, unknown>;
                        
                        const hasName = participant.name || participant.participant_name || participant.memberName;
                        const hasEmail = participant.email || participant.participant_email || participant.memberEmail;  
                        const hasPhone = participant.phone || participant.participant_phone || participant.memberPhone || participant.contact; // Add 'contact' field
                        
                        return hasName || hasEmail || hasPhone;
                      }).length;
                      
                      const totalMembers = participantCount + 1; // +1 for team lead
                      
                      return (
                        <>
                          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:bg-gray-800 transition-colors">
                            <div className="text-3xl font-bold text-green-400 mb-1">
                              {totalMembers}
                            </div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Total Members</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {totalMembers === 1 ? 'Solo team' : `${participantCount} + 1 lead`}
                            </div>
                          </div>
                          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:bg-gray-800 transition-colors">
                            <div className="text-3xl font-bold text-blue-400 mb-1">1</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Team Lead</div>
                            <div className="text-xs text-gray-500 mt-1">Primary contact</div>
                          </div>
                          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:bg-gray-800 transition-colors">
                            <div className="text-3xl font-bold text-purple-400 mb-1">
                              {participantCount}
                            </div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Team Members</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {participantCount === 0 ? 'No members' : `${participantCount} registered`}
                            </div>
                          </div>
                          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:bg-gray-800 transition-colors">
                            <div className="text-lg font-bold text-orange-400 mb-1">
                              {new Date(selectedRegistration.created_at).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Registered</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(selectedRegistration.created_at).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Modal footer */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-800">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 border border-gray-600"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Export single registration
                    const csvContent = [
                      ['Field', 'Value'],
                      ['Team Name', selectedRegistration.team_name],
                      ['Team Lead Name', selectedRegistration.team_lead_name],
                      ['Team Lead Email', selectedRegistration.team_lead_email],
                      ['Team Lead Phone', selectedRegistration.team_lead_phone],
                      ['College', selectedRegistration.college_name],
                      ['Theme', selectedRegistration.selected_theme],
                      ['Registration Date', new Date(selectedRegistration.created_at).toLocaleString()],
                      ['Registration ID', selectedRegistration.id],
                      ['', ''],
                      ['Team Members', ''],
                      ...((Array.isArray(selectedRegistration.participants) ? selectedRegistration.participants : []).map((p, idx) => [
                        `Member ${idx + 1}`,
                        `${p?.name || 'N/A'} (${p?.email || 'N/A'}) - ${p?.phone || 'N/A'}`
                      ]))
                    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `ezhumi-team-${selectedRegistration.team_name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-details.csv`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  }}
                  className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}