'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { darkMode } = useAppStore();

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return <>{children}</>;
}