'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { Library, Activity, Star, Clock } from 'lucide-react';

export default function DashboardPage() {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <div className="flex flex-col w-full pb-20 gap-12">
      <header className="flex flex-col gap-2">
        <h1 className="font-display-lg text-[40px] text-on-surface tracking-tight">Dashboard</h1>
        <p className="font-body-lg text-on-surface-variant">Here is an overview of your music catalog.</p>
      </header>

      <section className="flex flex-col gap-6">
        <h2 className="font-headline-md text-on-surface tracking-wide">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface-container-low/40 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/5 flex flex-col gap-6 hover:bg-surface-container-high/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <Library className="text-primary/60 group-hover:text-primary transition-colors" size={24} />
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Total Songs</span>
              <span className="font-display-lg text-headline-lg text-on-surface">1,248</span>
            </div>
          </div>

          <div className="bg-surface-container-low/40 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/5 flex flex-col gap-6 hover:bg-surface-container-high/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <Star className="text-primary/60 group-hover:text-primary transition-colors" size={24} />
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Avg Rating</span>
              <span className="font-display-lg text-headline-lg text-on-surface">4.8</span>
            </div>
          </div>

          <div className="bg-surface-container-low/40 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/5 flex flex-col gap-6 hover:bg-surface-container-high/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <Activity className="text-primary/60 group-hover:text-primary transition-colors" size={24} />
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Completed</span>
              <span className="font-display-lg text-headline-lg text-on-surface">892</span>
            </div>
          </div>

          <div className="bg-surface-container-low/40 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/5 flex flex-col gap-6 hover:bg-surface-container-high/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <Clock className="text-primary/60 group-hover:text-primary transition-colors" size={24} />
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Listening Time</span>
              <span className="font-display-lg text-headline-lg text-on-surface">420h</span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-4">
        <h2 className="font-headline-md text-on-surface tracking-wide">Recent Activity</h2>
        <div className="bg-surface-container-low/40 backdrop-blur-md rounded-xl border border-white/5 overflow-hidden">
          <div className="p-8 flex items-center justify-center text-center h-[200px]">
            <p className="font-body-md text-on-surface-variant/60">No recent activity to display.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
