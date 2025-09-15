'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// Admin email addresses - you can modify this list
const ADMIN_EMAILS = [
  'office.edc@rajalakshmi.edu.in',
  '221801019@rajalakshmi.edu.in',
  '221801001@rajalakshmi.edu.in',
  '221801021@rajalakshmi.edu.in',
  '230801093@rajalakshmi.edu.in'
];

export function useAdminAuth() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userEmail = user.email?.toLowerCase();
      setIsAdmin(userEmail ? ADMIN_EMAILS.includes(userEmail) : false);
    } else {
      setIsAdmin(false);
    }
    setIsLoading(false);
  }, [user]);

  return { isAdmin, isLoading, user };
}