'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface AiErrorStateProps {
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export function AiErrorState({ message = 'Gemini was unable to generate insights at this time.', onRetry, isRetrying }: AiErrorStateProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-8 text-center bg-surface-container-low/40 rounded-xl border border-white/5 shadow-lg min-h-[300px]">
      <AlertCircle className="text-error/60 w-12 h-12 mb-6" strokeWidth={1.5} />
      <p className="text-body-md text-on-surface-variant max-w-md mx-auto mb-8">
        {message}
      </p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          disabled={isRetrying}
          className="flex items-center gap-2 px-6 py-2.5 bg-surface-container-high/40 text-on-surface/80 hover:text-primary hover:bg-surface-container-highest transition-colors font-label-caps rounded-lg uppercase tracking-[0.2em] text-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw size={14} className={isRetrying ? "animate-spin" : ""} />
          <span>{isRetrying ? 'Retrying...' : 'Try Again'}</span>
        </button>
      )}
    </div>
  );
}
