'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { personalInfo } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useViewMode } from '@/hooks/useViewMode';

// Typing effect component
function TypeWriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let charIndex = 0;

    const startTyping = () => {
      const interval = setInterval(() => {
        if (charIndex < text.length) {
          setDisplayText(text.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(interval);
          // Hide cursor after typing complete
          setTimeout(() => setShowCursor(false), 1000);
        }
      }, 50);

      return () => clearInterval(interval);
    };

    const timeout = setTimeout(startTyping, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayText}
      {showCursor && <span className="animate-pulse">|</span>}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isRecruiterMode } = useViewMode();
  const [mounted, setMounted] = useState(false);

  // Hydration safety: prevent SSR/client mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration pattern
    setMounted(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isRecruiterMode || !mounted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.5 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, isRecruiterMode, mounted]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isRecruiterMode) {
    return (
      <section className="py-16 bg-gradient-radial">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-display mb-4">
            {personalInfo.name}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-2">
            {personalInfo.title} · {personalInfo.subtitle}
          </p>
          <p className="text-[var(--text-muted)]">
            {personalInfo.email} · {personalInfo.location}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 0%, var(--bg-primary) 70%)',
        }}
      />

      {/* Content */}
      <div className="container relative z-10 text-center px-4">
        {/* Small intro with typing effect */}
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent-start)] mb-6 font-mono h-6">
          {mounted && <TypeWriter text="UX Engineering" delay={200} />}
        </p>

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        >
          <span className="gradient-text">{personalInfo.tagline}</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        >
          {personalInfo.intro}
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        >
          <button
            onClick={() => scrollToSection('featured')}
            className="btn btn-primary"
            aria-label="See my featured work"
          >
            <span>See My Work</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scrollToSection('work')}
            className="btn btn-secondary"
            aria-label="Jump to portfolio section"
          >
            <span>View Portfolio</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator - Interactive hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-[var(--text-muted)]">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-[var(--text-muted)]/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-[var(--accent-start)] rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
