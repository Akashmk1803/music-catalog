'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const TRENDING_SEARCHES = ['Acoustic Soul', 'Late Night Jazz', 'Analog Synthesis'];

interface SearchInputProps {
  onSearchChange: (query: string) => void;
}

export function SearchInput({ onSearchChange }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialQuery = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(initialQuery);
  const debouncedValue = useDebounce(inputValue, 300);

  // Sync URL and notify parent when debounced value changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedValue.trim()) {
      params.set('q', debouncedValue);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    onSearchChange(debouncedValue.trim());
  }, [debouncedValue, pathname, router, searchParams, onSearchChange]);

  const handleTrendingClick = useCallback((term: string) => {
    setInputValue(term);
  }, []);

  return (
    <section className="relative w-full py-xxl flex flex-col items-center">
      {/* Decorative Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      {/* Centered Large Glass Search Bar */}
      <div className="relative w-full max-w-4xl z-10 px-margin">
        <div className="group relative flex items-center bg-surface-container-low/40 backdrop-blur-xxl border-t border-white/10 rounded-xl transition-all duration-500 hover:bg-surface-container-high/60 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-4 focus-within:ring-offset-background shadow-2xl">
          <Search className="ml-lg text-primary" size={32} />
          <input
            id="mainSearchInput"
            type="text"
            className="w-full bg-transparent border-none py-xl px-lg font-headline-md text-headline-md text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none"
            placeholder="Search the catalog..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="mr-lg flex items-center gap-sm">
            <span className="text-label-caps text-on-surface-variant opacity-40">Press</span>
            <kbd className="bg-surface-container-highest px-sm py-[2px] rounded font-data-md text-primary">Enter</kbd>
          </div>
        </div>

        {/* Quick Actions / Trending */}
        <div className="mt-xl flex flex-wrap justify-center gap-md">
          <span className="text-label-caps text-on-surface-variant self-center mr-sm">Trending Searches:</span>
          {TRENDING_SEARCHES.map((term) => (
            <button
              key={term}
              onClick={() => handleTrendingClick(term)}
              className="px-md py-xs bg-surface-container/40 backdrop-blur-md border-t border-white/5 rounded-full text-body-sm text-on-surface hover:text-primary hover:bg-surface-container-high/60 transition-all"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
