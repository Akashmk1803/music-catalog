'use client';

import { RefreshCw } from 'lucide-react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface AnalyticsErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function AnalyticsErrorState({ message = 'Failed to load analytics data.', onRetry }: AnalyticsErrorStateProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-xxl px-lg text-center bg-surface-container/20 rounded-xl border border-error/10">
      <AlertTriangle className="text-error/60 w-12 h-12 mb-md" strokeWidth={1.5} />
      <p className="text-body-md text-on-surface-variant max-w-md mx-auto mb-lg">
        {message}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="flex items-center gap-sm px-lg py-sm bg-surface-container-high text-on-surface hover:text-primary font-label-caps rounded-lg hover:bg-surface-container-highest transition-all uppercase tracking-widest"
        >
          <RefreshCcw size={16} />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
}
