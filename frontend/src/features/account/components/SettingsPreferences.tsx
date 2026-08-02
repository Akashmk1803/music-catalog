'use client';

import { toast } from 'sonner';
import { ChevronDown, KeyRound, EyeOff } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function SettingsPreferences() {
  const handleFeatureNotImplemented = () => {
    toast.info('This feature is ready for backend integration and will become available in a future update.');
  };

  return (
    <>
      {/* Preferences Section */}
      <Card id="preferences">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Interface Theme */}
          <div className="flex items-center justify-between pb-8 border-b border-white/5">
            <div>
              <p className="font-body-md text-[14px] text-on-surface mb-1">Visual Mode</p>
              <p className="font-body-sm text-[12px] text-on-surface-variant/80">Editorial Noir theme is the default and only active mode.</p>
            </div>
            <div className="flex bg-surface-container-highest/30 p-1 rounded-full gap-1">
              <Badge variant="outline" className="text-primary border-primary/20 bg-primary/20 px-4 py-1.5 rounded-full cursor-default">
                OBSIDIAN
              </Badge>
            </div>
          </div>

          {/* Language Selection */}
          <div className="flex items-center justify-between pb-8 border-b border-white/5">
            <div>
              <p className="font-body-md text-[14px] text-on-surface mb-1">System Language</p>
              <p className="font-body-sm text-[12px] text-on-surface-variant/80">The primary language for data visualizations and reports.</p>
            </div>
            <div className="relative group cursor-pointer" onClick={handleFeatureNotImplemented}>
              <div className="flex items-center gap-4 px-6 py-2 bg-surface-container-low/50 border border-white/5 rounded-lg hover:bg-surface-container-high/50 transition-colors">
                <span className="font-body-sm text-[14px] text-on-surface">English (US)</span>
                <ChevronDown className="text-on-surface-variant" size={16} />
              </div>
            </div>
          </div>

          {/* Currency */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body-md text-[14px] text-on-surface mb-1">Reporting Currency</p>
              <p className="font-body-sm text-[12px] text-on-surface-variant/80">Default currency for all revenue and expenditure insights.</p>
            </div>
            <div className="flex items-center gap-4 px-6 py-2 bg-surface-container-low/50 border border-white/5 rounded-lg cursor-pointer hover:bg-surface-container-high/50 transition-colors" onClick={handleFeatureNotImplemented}>
              <span className="font-body-sm text-[14px] text-on-surface">USD ($)</span>
              <ChevronDown className="text-on-surface-variant" size={16} />
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Security & Privacy Section */}
      <Card id="privacy">
        <CardHeader>
          <CardTitle>Security & Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="flex items-center justify-between p-6 bg-surface-container-high/20 rounded-xl border border-white/5">
            <div className="flex gap-6 items-start">
              <KeyRound className="text-primary mt-1" size={20} strokeWidth={1.5} />
              <div>
                <p className="font-body-md text-[14px] text-on-surface mb-1">Two-Factor Authentication</p>
                <p className="font-body-sm text-[12px] text-on-surface-variant/80">Add an extra layer of security to your Catalog account.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => { e.preventDefault(); handleFeatureNotImplemented(); }}>
              <input type="checkbox" className="sr-only peer" />
              <div className="w-9 h-5 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-6 bg-surface-container-high/20 rounded-xl border border-white/5">
            <div className="flex gap-6 items-start">
              <EyeOff className="text-primary mt-1" size={20} strokeWidth={1.5} />
              <div>
                <p className="font-body-md text-[14px] text-on-surface mb-1">Incognito Analysis</p>
                <p className="font-body-sm text-[12px] text-on-surface-variant/80">Do not log query history or training data for AI models.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => { e.preventDefault(); handleFeatureNotImplemented(); }}>
              <input type="checkbox" className="sr-only peer" />
              <div className="w-9 h-5 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
            </label>
          </div>

        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card id="notifications">
        <CardHeader>
          <CardTitle>Notification Streams</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 font-label-caps text-[9px] text-on-surface-variant tracking-[0.2em] uppercase">Event Type</th>
                <th className="py-4 font-label-caps text-[9px] text-on-surface-variant tracking-[0.2em] uppercase text-center">Push</th>
                <th className="py-4 font-label-caps text-[9px] text-on-surface-variant tracking-[0.2em] uppercase text-center">Email</th>
                <th className="py-4 font-label-caps text-[9px] text-on-surface-variant tracking-[0.2em] uppercase text-center">Slack</th>
              </tr>
            </thead>
            <tbody className="text-body-md text-[14px] text-on-surface">
              
              <tr className="border-b border-white/5">
                <td className="py-6">
                  <p className="mb-1">New Revenue Milestones</p>
                  <p className="text-body-sm text-[12px] text-on-surface-variant/80">When a track exceeds a threshold.</p>
                </td>
                <td className="text-center"><input type="checkbox" className="accent-primary/60 w-3.5 h-3.5 cursor-pointer" onClick={(e) => { e.preventDefault(); handleFeatureNotImplemented(); }} /></td>
                <td className="text-center"><input type="checkbox" className="accent-primary/60 w-3.5 h-3.5 cursor-pointer" onClick={(e) => { e.preventDefault(); handleFeatureNotImplemented(); }} /></td>
                <td className="text-center"><input type="checkbox" className="accent-primary/60 w-3.5 h-3.5 cursor-pointer" onClick={(e) => { e.preventDefault(); handleFeatureNotImplemented(); }} /></td>
              </tr>

              <tr className="border-b border-white/5">
                <td className="py-6">
                  <p className="mb-1">AI Insights Report</p>
                  <p className="text-body-sm text-[12px] text-on-surface-variant/80">Weekly summaries generated by core intelligence.</p>
                </td>
                <td className="text-center"><input type="checkbox" className="accent-primary/60 w-3.5 h-3.5 cursor-pointer" onClick={(e) => { e.preventDefault(); handleFeatureNotImplemented(); }} /></td>
                <td className="text-center"><input type="checkbox" className="accent-primary/60 w-3.5 h-3.5 cursor-pointer" onClick={(e) => { e.preventDefault(); handleFeatureNotImplemented(); }} /></td>
                <td className="text-center"><input type="checkbox" className="accent-primary/60 w-3.5 h-3.5 cursor-pointer" onClick={(e) => { e.preventDefault(); handleFeatureNotImplemented(); }} /></td>
              </tr>

            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <section className="mt-12 p-8 bg-error/5 border border-error/10 rounded-xl">
        <h2 className="font-headline-md text-[20px] text-error mb-2">Sensitive Operations</h2>
        <p className="text-body-md text-[14px] text-error/60 mb-8">Deleting your account or purging data is irreversible. Please proceed with utmost caution.</p>
        <div className="flex flex-wrap gap-4">
          <Button onClick={handleFeatureNotImplemented} variant="outline" className="text-error border-error/20 hover:bg-error/10">Clear All Cache</Button>
          <Button onClick={handleFeatureNotImplemented} variant="danger" className="bg-error/10 text-error hover:bg-error/20">Deactivate Account</Button>
        </div>
      </section>
    </>
  );
}
