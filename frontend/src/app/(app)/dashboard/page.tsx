'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-xl">
      <div className="flex flex-col gap-sm">
        <h1 className="font-display-lg text-[48px] text-primary">Dashboard Overview</h1>
        <p className="font-body-md text-on-surface-variant">
          Phase 3 completed. Dashboard implementation is pending Phase 4.
        </p>
      </div>
      
      <button
        onClick={() => {
          logout();
          router.push('/login');
        }}
        className="bg-surface-container-low text-on-surface font-label-caps px-xl py-sm rounded-md uppercase tracking-widest border border-outline-variant/30 hover:border-primary/50 transition-all"
      >
        Sign Out (Test Logout Flow)
      </button>
    </div>
  );
}
