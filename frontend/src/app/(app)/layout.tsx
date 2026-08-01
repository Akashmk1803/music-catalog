'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';

export default function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Prevent rendering protected content if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
}
