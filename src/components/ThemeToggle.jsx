import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark'; // Default to dark mode for premium feel
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-amber-500 animate-pulse-slow" />
      ) : (
        <Moon className="h-5 w-5 text-violet-600" />
      )}
    </button>
  );
}
