'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background text-on-surface">
      <h2 className="font-display-lg text-display-lg text-primary mb-md">Something went wrong!</h2>
      <p className="font-body-md text-on-surface-variant mb-xl">{error.message || 'An unexpected error occurred.'}</p>
      <div className="flex gap-md">
        <button
          onClick={() => reset()}
          className="bg-primary text-on-primary font-label-caps px-xl py-sm rounded-md uppercase tracking-widest hover:brightness-110 transition-all cursor-pointer"
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-surface-container-low text-on-surface font-label-caps px-xl py-sm rounded-md uppercase tracking-widest border border-outline-variant/30 hover:border-primary/50 transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
