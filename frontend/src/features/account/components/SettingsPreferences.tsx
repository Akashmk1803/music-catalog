'use client';

import { toast } from 'sonner';
import { ChevronDown, KeyRound, EyeOff } from 'lucide-react';

export function SettingsPreferences() {
  const handleFeatureNotImplemented = () => {
    toast.info('This feature is ready for backend integration and will become available in a future update.');
  };

  return (
    <>
      {/* Preferences Section */}
      <section className="bg-surface-container-low/45 backdrop-blur-xxl p-xl rounded-xl shadow-xl border-t border-white/5" id="preferences">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-lg">Preferences</h2>
        <div className="space-y-lg">
          
          {/* Interface Theme */}
          <div className="flex items-center justify-between pb-lg border-b border-outline-variant/10">
            <div>
              <p className="font-body-md text-on-surface">Visual Mode</p>
              <p className="font-body-sm text-on-surface-variant">Editorial Noir theme is the default and only active mode.</p>
            </div>
            <div className="flex bg-surface-container-highest/30 p-1 rounded-full gap-1">
              <button className="px-md py-1.5 bg-primary text-on-primary rounded-full font-label-caps text-[10px] transition-all cursor-default">OBSIDIAN</button>
            </div>
          </div>

          {/* Language Selection */}
          <div className="flex items-center justify-between pb-lg border-b border-outline-variant/10">
            <div>
              <p className="font-body-md text-on-surface">System Language</p>
              <p className="font-body-sm text-on-surface-variant">The primary language for data visualizations and reports.</p>
            </div>
            <div className="relative group cursor-pointer" onClick={handleFeatureNotImplemented}>
              <div className="flex items-center gap-md px-lg py-sm bg-surface-container/50 border border-outline-variant/20 rounded-lg">
                <span className="font-data-md text-on-surface">English (US)</span>
                <ChevronDown className="text-on-surface-variant" size={18} />
              </div>
            </div>
          </div>

          {/* Currency */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body-md text-on-surface">Reporting Currency</p>
              <p className="font-body-sm text-on-surface-variant">Default currency for all revenue and expenditure insights.</p>
            </div>
            <div className="flex items-center gap-md px-lg py-sm bg-surface-container/50 border border-outline-variant/20 rounded-lg cursor-pointer" onClick={handleFeatureNotImplemented}>
              <span className="font-data-md text-on-surface">USD ($)</span>
              <ChevronDown className="text-on-surface-variant" size={18} />
            </div>
          </div>

        </div>
      </section>

      {/* Security & Privacy Section */}
      <section className="bg-surface-container-low/45 backdrop-blur-xxl p-xl rounded-xl shadow-xl border-t border-white/5" id="privacy">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-lg">Security & Privacy</h2>
        <div className="space-y-lg">
          
          <div className="flex items-center justify-between p-lg bg-surface-container-highest/20 rounded-xl">
            <div className="flex gap-lg items-start">
              <KeyRound className="text-primary mt-1" size={24} />
              <div>
                <p className="font-body-md text-on-surface">Two-Factor Authentication</p>
                <p className="font-body-sm text-on-surface-variant">Add an extra layer of security to your Catalog account.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => { e.preventDefault(); handleFeatureNotImplemented(); }}>
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-lg bg-surface-container-highest/20 rounded-xl">
            <div className="flex gap-lg items-start">
              <EyeOff className="text-primary mt-1" size={24} />
              <div>
                <p className="font-body-md text-on-surface">Incognito Analysis</p>
                <p className="font-body-sm text-on-surface-variant">Do not log query history or training data for AI models.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => { e.preventDefault(); handleFeatureNotImplemented(); }}>
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

        </div>
      </section>

      {/* Notifications Section */}
      <section className="bg-surface-container-low/45 backdrop-blur-xxl p-xl rounded-xl shadow-xl border-t border-white/5" id="notifications">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-lg">Notification Streams</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-outline-variant/10">
              <th className="py-md font-label-caps text-[10px] text-on-surface-variant tracking-widest">EVENT TYPE</th>
              <th className="py-md font-label-caps text-[10px] text-on-surface-variant tracking-widest text-center">PUSH</th>
              <th className="py-md font-label-caps text-[10px] text-on-surface-variant tracking-widest text-center">EMAIL</th>
              <th className="py-md font-label-caps text-[10px] text-on-surface-variant tracking-widest text-center">SLACK</th>
            </tr>
          </thead>
          <tbody className="text-body-md text-on-surface">
            
            <tr className="border-b border-outline-variant/5">
              <td className="py-lg">
                <p>New Revenue Milestones</p>
                <p className="text-body-sm text-on-surface-variant">When a track exceeds a threshold.</p>
              </td>
              <td className="text-center"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer" onClick={(e) => { e.preventDefault(); handleFeatureNotImplemented(); }} /></td>
              <td className="text-center"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer" onClick={(e) => { e.preventDefault(); handleFeatureNotImplemented(); }} /></td>
              <td className="text-center"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer" onClick={(e) => { e.preventDefault(); handleFeatureNotImplemented(); }} /></td>
            </tr>

            <tr className="border-b border-outline-variant/5">
              <td className="py-lg">
                <p>AI Insights Report</p>
                <p className="text-body-sm text-on-surface-variant">Weekly summaries generated by core intelligence.</p>
              </td>
              <td className="text-center"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer" onClick={(e) => { e.preventDefault(); handleFeatureNotImplemented(); }} /></td>
              <td className="text-center"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer" onClick={(e) => { e.preventDefault(); handleFeatureNotImplemented(); }} /></td>
              <td className="text-center"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer" onClick={(e) => { e.preventDefault(); handleFeatureNotImplemented(); }} /></td>
            </tr>

          </tbody>
        </table>
      </section>

      {/* Danger Zone */}
      <section className="mt-xl p-xl bg-error/5 border border-error/20 rounded-xl">
        <h2 className="font-headline-md text-headline-md text-error mb-sm">Sensitive Operations</h2>
        <p className="text-body-md text-on-surface-variant mb-lg">Deleting your account or purging data is irreversible. Please proceed with utmost caution.</p>
        <div className="flex gap-md">
          <button onClick={handleFeatureNotImplemented} className="px-lg py-sm border border-error/40 text-error hover:bg-error/10 font-label-caps rounded transition-all tracking-widest uppercase">Clear All Cache</button>
          <button onClick={handleFeatureNotImplemented} className="px-lg py-sm bg-error text-on-error hover:opacity-90 font-label-caps rounded transition-all tracking-widest uppercase">Deactivate Account</button>
        </div>
      </section>
    </>
  );
}
