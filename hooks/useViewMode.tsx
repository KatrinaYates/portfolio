'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

type ViewMode = 'story' | 'recruiter';

const RECRUITER_HASH = '#recruiter';

interface ViewModeContextType {
  mode: ViewMode;
  isStoryMode: boolean;
  isRecruiterMode: boolean;
  toggleMode: () => void;
  setMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

interface ViewModeProviderProps {
  children: ReactNode;
}

export function ViewModeProvider({ children }: ViewModeProviderProps) {
  const [mode, setModeState] = useState<ViewMode>('story');
  const [mounted, setMounted] = useState(false);

  // Sync mode from URL hash on mount and handle browser back/forward
  useEffect(() => {
    setMounted(true);
    
    const syncFromHash = () => {
      const hash = window.location.hash;
      const shouldBeRecruiter = hash === RECRUITER_HASH;
      setModeState(shouldBeRecruiter ? 'recruiter' : 'story');
    };

    // Initial sync
    syncFromHash();

    // Listen for back/forward navigation
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  // Update URL hash when mode changes (after mount)
  useEffect(() => {
    if (!mounted) return;
    
    const currentHash = window.location.hash;
    const shouldHaveHash = mode === 'recruiter';
    const hasHash = currentHash === RECRUITER_HASH;

    if (shouldHaveHash && !hasHash) {
      window.history.pushState(null, '', RECRUITER_HASH);
    } else if (!shouldHaveHash && hasHash) {
      // Remove hash without adding to history
      window.history.pushState(null, '', window.location.pathname);
    }
  }, [mode, mounted]);

  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === 'story' ? 'recruiter' : 'story'));
  }, []);

  const setMode = useCallback((newMode: ViewMode) => {
    setModeState(newMode);
  }, []);

  const value: ViewModeContextType = {
    mode,
    isStoryMode: mode === 'story',
    isRecruiterMode: mode === 'recruiter',
    toggleMode,
    setMode,
  };

  return (
    <ViewModeContext.Provider value={value}>
      <div className={mode === 'recruiter' ? 'recruiter-mode' : ''}>
        {children}
      </div>
    </ViewModeContext.Provider>
  );
}

export function useViewMode(): ViewModeContextType {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
}

export default useViewMode;
