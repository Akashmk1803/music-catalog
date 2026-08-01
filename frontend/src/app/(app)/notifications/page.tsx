'use client';

import { BellOff } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="pt-20 px-margin min-h-screen bg-transparent">
      <div className="flex flex-col w-full max-w-5xl mx-auto py-xl h-full">
        
        {/* Header Section */}
        <div className="flex items-end justify-between mb-xxl relative z-10">
          <div className="flex flex-col gap-sm">
            <span className="font-label-caps text-label-caps text-primary tracking-[0.2em] uppercase">Activity Stream</span>
            <h2 className="font-display-lg text-display-lg text-on-surface">Intelligence Center</h2>
          </div>
        </div>

        {/* Empty State */}
        <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center py-[120px] text-center bg-surface-container-low/40 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl">
          <div className="relative mb-xl">
            <BellOff className="text-on-surface-variant/20 w-24 h-24" strokeWidth={1} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
            </div>
          </div>
          <h3 className="font-headline-lg text-headline-lg text-on-surface mb-md">No Notifications Available</h3>
          <p className="text-body-lg text-on-surface-variant max-w-lg mx-auto leading-relaxed">
            The notification center is currently awaiting backend integration. Intelligent alerts, growth milestones, and AI insights will appear here in a future update.
          </p>
        </div>

      </div>
    </div>
  );
}
