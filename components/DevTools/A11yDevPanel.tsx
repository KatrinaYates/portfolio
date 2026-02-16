'use client';

import { useState, useEffect, useCallback } from 'react';
import axe, { AxeResults, Result } from 'axe-core';

// Only render in development
const isDev = process.env.NODE_ENV === 'development';

interface ViolationItemProps {
  violation: Result;
}

function ViolationItem({ violation }: ViolationItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const severityColors: Record<string, string> = {
    critical: 'bg-red-500',
    serious: 'bg-orange-500',
    moderate: 'bg-yellow-500',
    minor: 'bg-blue-500',
  };

  return (
    <div className="border-b border-gray-700 last:border-b-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-3 hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-start gap-2">
          <span
            className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${severityColors[violation.impact || 'minor']}`}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {violation.help}
            </p>
            <p className="text-xs text-gray-400">
              {violation.nodes.length} element{violation.nodes.length !== 1 ? 's' : ''} · {violation.impact}
            </p>
          </div>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 space-y-2">
          <p className="text-xs text-gray-300">{violation.description}</p>

          {/* Affected elements */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-400">Affected elements:</p>
            {violation.nodes.slice(0, 5).map((node, idx) => (
              <code
                key={idx}
                className="block text-xs bg-gray-800 p-2 rounded text-pink-400 overflow-x-auto"
              >
                {node.target.join(' > ')}
              </code>
            ))}
            {violation.nodes.length > 5 && (
              <p className="text-xs text-gray-500">
                +{violation.nodes.length - 5} more elements
              </p>
            )}
          </div>

          {/* Help URL */}
          <a
            href={violation.helpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
          >
            Learn more
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}

export default function A11yDevPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<AxeResults | null>(null);
  const [lastScan, setLastScan] = useState<Date | null>(null);

  const runScan = useCallback(async () => {
    if (typeof window === 'undefined') return;

    setIsScanning(true);
    try {
      const scanResults = await axe.run(
        {
          include: [document.body],
          exclude: ['[data-a11y-ignore="true"]'],
        },
        {
          rules: {
            // Disable some noisy rules for dev
            'color-contrast': { enabled: true },
            'region': { enabled: false }, // Can be noisy
          },
        }
      );
      setResults(scanResults);
      setLastScan(new Date());
    } catch (error) {
      console.error('Accessibility scan failed:', error);
    } finally {
      setIsScanning(false);
    }
  }, []);

  // Run initial scan after mount
  useEffect(() => {
    if (!isDev) return;

    // Delay initial scan to let page render
    const timeout = setTimeout(() => {
      runScan();
    }, 1500);

    return () => clearTimeout(timeout);
  }, [runScan]);

  // Don't render in production
  if (!isDev) return null;

  const violationCount = results?.violations.length || 0;
  const passCount = results?.passes.length || 0;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] font-sans" data-a11y-ignore="true">
      {/* Collapsed Badge */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg transition-all hover:scale-105 ${
            violationCount > 0
              ? 'bg-red-600 hover:bg-red-500'
              : 'bg-green-600 hover:bg-green-500'
          }`}
          title="Accessibility Checker"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-sm font-medium text-white">
            {isScanning ? '...' : violationCount > 0 ? `${violationCount} issues` : '✓ A11y'}
          </span>
        </button>
      )}

      {/* Expanded Panel */}
      {isOpen && (
        <div className="w-96 max-h-[70vh] bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-semibold text-white">Accessibility</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              aria-label="Close panel"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-4 p-3 bg-gray-800/50 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${violationCount > 0 ? 'bg-red-500' : 'bg-green-500'}`} />
              <span className="text-sm text-gray-300">
                <strong className="text-white">{violationCount}</strong> violations
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-300">
                <strong className="text-white">{passCount}</strong> passed
              </span>
            </div>
          </div>

          {/* Scan button */}
          <div className="p-3 border-b border-gray-700">
            <button
              onClick={runScan}
              disabled={isScanning}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white text-sm font-medium rounded transition-colors"
            >
              {isScanning ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Scanning...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Rescan Page
                </>
              )}
            </button>
            {lastScan && (
              <p className="text-xs text-gray-500 text-center mt-2">
                Last scan: {lastScan.toLocaleTimeString()}
              </p>
            )}
          </div>

          {/* Violations List */}
          <div className="flex-1 overflow-y-auto">
            {violationCount === 0 ? (
              <div className="p-6 text-center">
                <span className="text-4xl mb-2 block">🎉</span>
                <p className="text-green-400 font-medium">No violations found!</p>
                <p className="text-xs text-gray-500 mt-1">
                  Your page passes automated a11y checks
                </p>
              </div>
            ) : (
              <div>
                {results?.violations.map((violation, idx) => (
                  <ViolationItem key={`${violation.id}-${idx}`} violation={violation} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-gray-700 bg-gray-800">
            <p className="text-xs text-gray-500 text-center">
              Powered by axe-core · Dev only
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
