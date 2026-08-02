'use client';

import { RefreshCw } from 'lucide-react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface AnalyticsErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function AnalyticsErrorState({ message = 'Failed to load analytics data.', onRetry }: AnalyticsErrorStateProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-12 px-8 text-center bg-surface-container-low/40 rounded-xl border border-white/5 shadow-lg">
      <AlertTriangle className="text-error/60 w-12 h-12 mb-6" strokeWidth={1.5} />
      <p className="text-body-md text-on-surface-variant max-w-md mx-auto mb-8">
        {message}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-2.5 bg-surface-container-high/40 text-on-surface/80 hover:text-primary hover:bg-surface-container-highest transition-colors font-label-caps rounded-lg uppercase tracking-[0.2em] text-[10px]"
        >
          <RefreshCcw size={14} />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
}
