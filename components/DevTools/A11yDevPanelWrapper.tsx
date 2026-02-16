'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues with axe-core
const A11yDevPanel = dynamic(() => import('./A11yDevPanel'), { ssr: false });

export default function A11yDevPanelWrapper() {
  const [mounted, setMounted] = useState(false);

  // Hydration safety: ensure consistent render between server and client
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration pattern
    setMounted(true);
  }, []);

  // Only render in development and after mount
  if (!mounted || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return <A11yDevPanel />;
}
