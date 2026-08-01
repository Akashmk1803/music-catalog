'use client';

import { SettingsAccountForm } from '@/features/account/components/SettingsAccountForm';
import { SettingsPasswordForm } from '@/features/account/components/SettingsPasswordForm';
import { SettingsPreferences } from '@/features/account/components/SettingsPreferences';
import { User, SlidersHorizontal, Shield, Bell } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="pt-20 px-margin min-h-screen bg-transparent">
      <div className="flex flex-col w-full max-w-6xl mx-auto pb-xxl">
        
        {/* Header Section */}
        <div className="flex flex-col gap-sm mb-xxl">
          <div className="flex items-center gap-md">
            <span className="text-primary font-data-md text-label-caps tracking-[0.2em] uppercase">Control Center</span>
            <div className="h-px w-12 bg-primary/30"></div>
          </div>
          <h1 className="text-display-lg font-display-lg text-on-surface">Settings & Preferences</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
            Configure your digital artifact experience. These settings harmonize your workflow and ensure your music insights remain personal and precise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          
          {/* Navigation Sidebar (Internal) */}
          <div className="lg:col-span-3 flex flex-col gap-md mb-xl lg:mb-0">
            <nav className="flex flex-col space-y-1">
              <a href="#account" className="group flex items-center justify-between px-md py-sm bg-surface-container-high/40 rounded-lg text-primary transition-all">
                <span className="font-label-caps uppercase tracking-wider">Account</span>
                <User size={18} />
              </a>
              <a href="#security" className="group flex items-center justify-between px-md py-sm hover:bg-surface-container-high/20 rounded-lg text-on-surface-variant transition-all">
                <span className="font-label-caps uppercase tracking-wider">Security</span>
                <Shield size={18} />
              </a>
              <a href="#preferences" className="group flex items-center justify-between px-md py-sm hover:bg-surface-container-high/20 rounded-lg text-on-surface-variant transition-all">
                <span className="font-label-caps uppercase tracking-wider">Preferences</span>
                <SlidersHorizontal size={18} />
              </a>
              <a href="#notifications" className="group flex items-center justify-between px-md py-sm hover:bg-surface-container-high/20 rounded-lg text-on-surface-variant transition-all">
                <span className="font-label-caps uppercase tracking-wider">Notifications</span>
                <Bell size={18} />
              </a>
            </nav>

            <div className="mt-xl p-lg bg-primary-container/5 rounded-xl border border-outline-variant/10 hidden lg:block">
              <p className="text-body-sm text-on-surface-variant mb-md italic">&quot;Precision is the soul of luxury.&quot;</p>
              <div className="flex items-center gap-sm">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-[10px] font-label-caps text-primary uppercase">Systems Nominal</span>
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
    </div>
  );
}
