'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useAnalyticsOverview } from '@/features/analytics/hooks/useAnalyticsQueries';
import { useRouter } from 'next/navigation';
import { Mail, Calendar, Library } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

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
    <div className="flex flex-col w-full h-full gap-12">
        
        {/* Header Section / Editorial Profile Intro */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
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
            <div className="mt-8 flex flex-wrap gap-4">
              <Button 
                onClick={() => router.push('/settings')}
                variant="secondary"
              >
                Settings
              </Button>
            </div>
          </div>
        </section>

        {/* Account Artifacts / Bento Data Grid */}
        <section className="grid grid-cols-12 gap-8">
          
          {/* Email Card */}
          <Card className="col-span-12 md:col-span-4 relative group overflow-hidden">
            <CardContent className="h-full flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
                <Mail className="w-24 h-24" strokeWidth={1} />
              </div>
              <div>
                <span className="font-label-caps text-[10px] text-on-surface-variant uppercase mb-6 block tracking-[0.2em]">Email Identity</span>
                <p className="font-display-lg text-[24px] text-on-surface">Email unavailable</p>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary/60"></span>
                <span className="font-body-sm text-[12px] text-on-surface-variant italic">Primary Contact</span>
              </div>
            </CardContent>
          </Card>

          {/* Membership History */}
          <Card className="col-span-12 md:col-span-4 relative group overflow-hidden">
            <CardContent className="h-full flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
                <Calendar className="w-24 h-24" strokeWidth={1} />
              </div>
              <div>
                <span className="font-label-caps text-[10px] text-on-surface-variant uppercase mb-6 block tracking-[0.2em]">Legacy Tenure</span>
                <p className="font-display-lg text-[24px] text-on-surface">Since Inception</p>
              </div>
              <div className="mt-6">
                <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary/40 w-full rounded-full"></div>
                </div>
                <span className="font-body-sm text-[12px] text-on-surface-variant mt-2 block">Active Membership</span>
              </div>
            </CardContent>
          </Card>

          {/* Stats Count */}
          <Card className="col-span-12 md:col-span-4 relative group overflow-hidden">
            <CardContent className="h-full flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
                <Library className="w-24 h-24" strokeWidth={1} />
              </div>
              <div>
                <span className="font-label-caps text-[10px] text-on-surface-variant uppercase mb-6 block tracking-[0.2em]">Catalog Depth</span>
                <div className="flex items-baseline gap-2">
                  <p className="font-display-lg text-[40px] leading-none text-primary transition-colors group-hover:text-primary/80">
                    {isLoading ? '...' : totalSongs.toLocaleString()}
                  </p>
                  <span className="font-body-sm text-[14px] text-on-surface-variant/40">Assets</span>
                </div>
              </div>
              <div className="mt-6 flex gap-1">
                <div className="h-1 flex-1 bg-primary/20"></div>
                <div className="h-1 flex-1 bg-primary/40"></div>
                <div className="h-1 flex-1 bg-primary/60"></div>
                <div className="h-1 flex-1 bg-primary/10"></div>
              </div>
            </CardContent>
          </Card>

        </section>

        {/* Secondary Actions */}
        <section className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-9 flex flex-col justify-end">
            <Card className="bg-surface-container-highest/20 text-center">
              <CardContent className="p-8">
                <p className="font-body-sm text-[12px] text-on-surface-variant mb-6">End the current session securely to prevent unauthorized access.</p>
                <button 
                  onClick={handleLogout}
                  className="inline-block font-label-caps text-[10px] text-error/80 hover:text-error tracking-[0.2em] transition-colors py-2 px-4 group uppercase"
                >
                  <span className="inline-block transition-transform group-hover:-translate-x-1 mr-2">←</span> 
                  Logout Session
                </button>
              </CardContent>
            </Card>
          </div>
        </section>
        
    </div>
  );
}
