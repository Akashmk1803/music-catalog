'use client';

import { SettingsAccountForm } from '@/features/account/components/SettingsAccountForm';
import { SettingsPasswordForm } from '@/features/account/components/SettingsPasswordForm';
import { SettingsPreferences } from '@/features/account/components/SettingsPreferences';
import { User, SlidersHorizontal, Shield, Bell } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col w-full h-full">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 mb-16">
          <div className="flex items-center gap-4">
            <span className="text-primary font-label-caps text-[10px] tracking-[0.2em] uppercase">Control Center</span>
            <div className="h-px w-12 bg-primary/30"></div>
          </div>
          <h1 className="font-display-lg text-[40px] leading-tight text-on-surface">Settings & Preferences</h1>
          <p className="font-body-lg text-[16px] leading-relaxed text-on-surface-variant max-w-2xl">
            Configure your digital artifact experience. These settings harmonize your workflow and ensure your music insights remain personal and precise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          
          {/* Navigation Sidebar (Internal) */}
          <div className="lg:col-span-3 flex flex-col gap-8 mb-12 lg:mb-0">
            <nav className="flex flex-col space-y-2">
              <a href="#account" className="group flex items-center justify-between px-6 py-4 bg-surface-container-high/40 rounded-lg text-primary transition-colors border border-white/5 shadow-md">
                <span className="font-label-caps text-[10px] uppercase tracking-[0.2em]">Account</span>
                <User size={16} />
              </a>
              <a href="#security" className="group flex items-center justify-between px-6 py-4 hover:bg-surface-container-high/20 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors border border-transparent">
                <span className="font-label-caps text-[10px] uppercase tracking-[0.2em]">Security</span>
                <Shield size={16} />
              </a>
              <a href="#preferences" className="group flex items-center justify-between px-6 py-4 hover:bg-surface-container-high/20 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors border border-transparent">
                <span className="font-label-caps text-[10px] uppercase tracking-[0.2em]">Preferences</span>
                <SlidersHorizontal size={16} />
              </a>
              <a href="#notifications" className="group flex items-center justify-between px-6 py-4 hover:bg-surface-container-high/20 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors border border-transparent">
                <span className="font-label-caps text-[10px] uppercase tracking-[0.2em]">Notifications</span>
                <Bell size={16} />
              </a>
            </nav>

            <div className="mt-8 p-6 bg-surface-container-low/40 rounded-xl border border-white/5 shadow-lg hidden lg:block">
              <p className="font-body-sm text-[12px] text-on-surface-variant mb-6 italic">&quot;Precision is the soul of luxury.&quot;</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                <span className="text-[9px] font-label-caps text-primary uppercase tracking-[0.2em]">Systems Nominal</span>
              </div>
            </div>
          </div>

          {/* Main Settings Panels */}
          <div className="lg:col-span-9 flex flex-col gap-xl">
            <SettingsAccountForm />
            <SettingsPasswordForm />
            <SettingsPreferences />
          </div>

        </div>

    </div>
  );
}
