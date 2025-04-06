'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { locales } from '../../middleware';

interface LanguageSwitcherProps {
  locale?: string;
}

export default function LanguageSwitcher({ locale = 'en' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  
  // Get the current path on the client side
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  
  const getLocalizedHref = (targetLocale: string) => {
    if (!currentPath) return `/${targetLocale}`;
    
    const segments = currentPath.split('/');
    
    // If we already have a locale in the URL, replace it
    if (locales.includes(segments[1] as any)) {
      segments[1] = targetLocale;
      return segments.join('/');
    }
    
    // Otherwise add the locale
    return `/${targetLocale}${currentPath}`;
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && !(event.target as Element).closest('.language-switcher')) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left language-switcher">
      <div>
        <button
          type="button"
          className="flex items-center gap-1 text-sm text-gray-300 hover:text-white rounded-md py-1 px-2 hover:bg-gray-800 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Globe size={16} />
          <span className="uppercase">{locale}</span>
          <svg className="-mr-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.94l3.71-3.73a.75.75 0 111.06 1.06l-4.24 4.26a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-gray-900 border border-gray-800 shadow-lg">
          <div className="p-1">
            {locales.map((l) => (
              <Link
                key={l}
                href={getLocalizedHref(l)}
                onClick={() => setIsOpen(false)}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  locale === l 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="uppercase">{l}</span>
                {l === 'en' && <span>English</span>}
                {l === 'es' && <span>Español</span>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 