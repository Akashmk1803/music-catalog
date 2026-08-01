'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useAnalyticsOverview } from '@/features/analytics/hooks/useAnalyticsQueries';
import { useRouter } from 'next/navigation';
import { Mail, Calendar, Library } from 'lucide-react';

export default function ProfilePage() {
  const { logout } = useAuth();
  const router = useRouter();
  const { data: overview, isLoading } = useAnalyticsOverview();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const totalSongs = overview?.totalSongs ?? 0;

  return (
    <div className="pt-20 px-margin bg-transparent min-h-screen">
      <div className="flex flex-col w-full pb-xl">
        
        {/* Header Section / Editorial Profile Intro */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-end mb-xxl">
          <div className="col-span-12 md:col-span-4 lg:col-span-3 relative group">
            <div className="relative aspect-square overflow-hidden rounded-full border-[1px] border-primary/20 p-md bg-surface-container-low shadow-2xl flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-surface-container-high flex items-center justify-center">
                 <span className="material-symbols-outlined text-[100px] text-on-surface-variant/20 group-hover:scale-105 transition-transform duration-700">person</span>
                 <div className="absolute inset-0 ring-1 ring-inset ring-primary/30 rounded-full"></div>
              </div>
            </div>
            {/* Decorative Label */}
            <div className="absolute -right-4 bottom-12 [writing-mode:vertical-rl] flex items-center gap-sm hidden md:flex">
              <span className="h-12 w-px bg-outline-variant/30"></span>
              <span className="font-label-caps text-primary uppercase tracking-widest text-[10px]">Active Session</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 lg:col-span-7 lg:col-start-5 pb-md mt-lg md:mt-0">
            <span className="font-label-caps text-primary tracking-[0.2em] mb-md block">PRO MEMBER</span>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-sm">User Account</h1>
            <p className="font-body-lg text-on-surface-variant max-w-md">
              Managing digital catalog acquisitions and performance analytics securely.
            </p>
            <div className="mt-xl flex flex-wrap gap-md">
              <button 
                onClick={() => router.push('/settings')}
                className="bg-primary hover:bg-primary-container text-on-primary font-label-caps px-xl py-md transition-all duration-300 shadow-xl active:scale-[0.98] rounded-lg tracking-widest"
              >
                SETTINGS
              </button>
            </div>
          </div>
        </section>

        {/* Account Artifacts / Bento Data Grid */}
        <section className="grid grid-cols-12 gap-gutter mb-xxl">
          
          {/* Email Card */}
          <div className="col-span-12 md:col-span-4 bg-surface-container-low/40 backdrop-blur-xl p-xl relative border-t border-white/5 group overflow-hidden rounded-xl">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-30 transition-opacity">
              <Mail className="w-24 h-24" strokeWidth={1} />
            </div>
            <span className="font-label-caps text-on-surface-variant uppercase mb-lg block tracking-widest">Email Identity</span>
            <p className="font-data-lg text-data-lg text-on-surface">Email unavailable</p>
            <div className="mt-md flex items-center gap-xs">
              <span className="w-2 h-2 rounded-full bg-primary/60"></span>
              <span className="font-body-sm text-on-surface-variant italic">Primary Contact</span>
            </div>
          </div>

          {/* Membership History */}
          <div className="col-span-12 md:col-span-4 bg-surface-container-low/40 backdrop-blur-xl p-xl relative border-t border-white/5 group rounded-xl overflow-hidden">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-30 transition-opacity">
              <Calendar className="w-24 h-24" strokeWidth={1} />
            </div>
            <span className="font-label-caps text-on-surface-variant uppercase mb-lg block tracking-widest">Legacy Tenure</span>
            <p className="font-data-lg text-data-lg text-on-surface">Since Inception</p>
            <div className="mt-md">
              <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary/40 w-full rounded-full"></div>
              </div>
              <span className="font-body-sm text-on-surface-variant mt-sm block">Active Membership</span>
            </div>
          </div>

          {/* Stats Count */}
          <div className="col-span-12 md:col-span-4 bg-surface-container-low/40 backdrop-blur-xl p-xl relative border-t border-white/5 group rounded-xl overflow-hidden">
            <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-30 transition-opacity">
              <Library className="w-24 h-24" strokeWidth={1} />
            </div>
            <span className="font-label-caps text-on-surface-variant uppercase mb-lg block tracking-widest">Catalog Depth</span>
            <div className="flex items-baseline gap-sm">
              <p className="font-data-lg text-[40px] text-primary transition-all">
                {isLoading ? '...' : totalSongs.toLocaleString()}
              </p>
              <span className="font-label-caps text-on-surface-variant">Assets Tracked</span>
            </div>
            <div className="mt-md flex gap-xs">
              <div className="h-1 flex-1 bg-primary/20"></div>
              <div className="h-1 flex-1 bg-primary/40"></div>
              <div className="h-1 flex-1 bg-primary/60"></div>
              <div className="h-1 flex-1 bg-primary/10"></div>
            </div>
          </div>

        </section>

        {/* Secondary Actions */}
        <section className="grid grid-cols-12 gap-gutter">
          <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-9 flex flex-col justify-end">
            <div className="p-xl bg-surface-container-highest/20 rounded-xl border border-outline-variant/10 text-center">
              <p className="font-body-sm text-on-surface-variant mb-lg">End the current session securely to prevent unauthorized access.</p>
              <button 
                onClick={handleLogout}
                className="inline-block font-label-caps text-error hover:text-error-container tracking-[0.2em] transition-colors py-sm px-md group uppercase"
              >
                <span className="inline-block transition-transform group-hover:-translate-x-1 mr-2">←</span> 
                LOGOUT SESSION
              </button>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
}
