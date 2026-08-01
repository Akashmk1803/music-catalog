import { LoginForm } from '@/features/auth/components/LoginForm';

import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Login - Catalog Music Insights',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-background">
      
      {/* Brand Hero (Left side - visible on lg screens) */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-16 relative border-r border-outline-variant/10 overflow-hidden bg-surface-container-low/20">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen opacity-50 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-4 group">
            <img 
              alt="Catalog Logo" 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiSiW1AIKVorii8BTmbd4GMOfSk1wv2_OiT23OOBY4RS99XjUxQlbw_ajg62nhvlrTEXtc3ATi50pRTjrSiUBwfOIFHm_r7mRhzGV4_0xoBT79jMnds1cbtXj841oZrTR9BBDRtIg-T7ZOZn6bqYaf73mgmRItGJULTNepiVczYIuP0bxnD4AVPaxQIPS0kKeizZNiJCUY70D3w_8UZWCCzXO0T6BUGb9hPleZv2uzySyhCYRik88"
            />
            <span className="font-headline-md text-headline-md text-on-surface tracking-tight group-hover:text-primary transition-colors">Catalog</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-6 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-outline-variant/20 bg-surface-container-highest/20 w-fit backdrop-blur-md">
            <Sparkles size={12} className="text-primary" />
            <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Intelligence Center</span>
          </div>
          <h1 className="font-display-lg text-[42px] leading-[1.2] text-on-surface font-light tracking-tight">
            Elevate your <span className="text-primary italic">auditory</span> portfolio.
          </h1>
          <p className="font-body-md text-on-surface-variant/80 leading-relaxed max-w-sm">
            Access intelligent curation, advanced metrics, and predictive insights tailored for modern music executives.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-6 opacity-40">
          <span className="font-data-md text-[10px] uppercase tracking-widest">System v4.2.0</span>
          <span className="w-1 h-1 rounded-full bg-outline-variant/50"></span>
          <span className="font-data-md text-[10px] uppercase tracking-widest">Encrypted</span>
        </div>
      </div>

      {/* Form Area (Right side) */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 sm:p-10 lg:p-16 relative">
        <div className="w-full max-w-lg lg:max-w-md xl:max-w-lg">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
