'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useViewMode } from '@/hooks/useViewMode';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';

// ============================================
// ABOUT ME CONTENT - EDIT THIS TO PERSONALIZE!
// ============================================

// Featured intro video (TikTok/Reels style - 9:16 aspect ratio)
const introVideo = {
  src: '/about/intro-video.mp4',
  poster: '', // Optional: add a thumbnail image e.g., '/about/intro-poster.jpg'
  title: 'A little peek into my world',
};

const aboutContent = {
  headline: "Beyond the Code",
  intro: "This is the part where the job titles stop and the rest of me shows up.",

  sections: [
    {
      id: 'family',
      title: 'My Support',
      description:
        "My husband and kids have an endless amount of confidence in me. It makes aiming high feel easy.",
    },
    {
      id: 'circle',
      title: 'My Circle',
      description:
        "I really enjoy bringing people together and making sure everyone feels seen. I'm usually happiest when the group vibe is good.",
    },
    {
      id: 'spark',
      title: 'My Spark',
      description:
        "I love playful, slightly magical moments. Festivals, holidays, and spaces with lights or sparkle bring out my best energy.",
    },
  ],

  funFacts: [
    { label: "Favorite book", value: "Project Hail Mary", emoji: "📚" },
    { label: "Go-to series", value: "Big Bang Theory", emoji: "🎬" },
    { label: "Comfort activity", value: "Audiobooks + crafting", emoji: "🧶" },
    { label: "First D&D character", value: "Zella the Rogue", emoji: "🗡️" },
    { label: "Favorite Flower", value: "Daisy, Sunflower, and Rose", emoji: "🌼" },
    { label: "Spirit Animal", value: "Raccoon", emoji: "🐾" },
    { label: "Current Obsession", value: "Dungeon Crawler Carl", emoji: "🔥" },
    { label: "Coffee Order", value: "Vanilla & Caramel Hot Latte", emoji: "☕" },
    { label: "Seasonal weakness", value: "Christmas", emoji: "🎄" },
  ],
};

// Vertical Video Player Component (TikTok/Reels style)
function IntroVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // If no video source, show placeholder
  if (!introVideo.src) {
    return (
      <div className="relative w-full max-w-[280px]">
        <div className="aspect-[9/16] bg-gradient-to-br from-[var(--accent-start)]/20 to-[var(--accent-end)]/20 rounded-2xl flex items-center justify-center border-2 border-dashed border-[var(--border-subtle)]">
          <div className="text-center p-6">
            <div className="text-5xl mb-4">🎬</div>
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">
              {introVideo.title}
            </p>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              Add a short video intro!
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              Edit <code className="text-[var(--accent-start)]">introVideo.src</code><br />
              in AboutMe.tsx
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[280px] group">
      {/* Video Container */}
      <div className="aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl shadow-[var(--accent-start)]/20">
        <video
          ref={videoRef}
          src={introVideo.src}
          poster={introVideo.poster || undefined}
          className="w-full h-full object-cover"
          autoPlay
          loop
          playsInline
          muted={isMuted}
          onClick={togglePlay}
        />


        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>

        {/* Title Badge */}
        <div className="absolute top-4 left-4 right-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-black/50 backdrop-blur-sm text-white rounded-full">
            {introVideo.title}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isRecruiterMode } = useViewMode();

  useEffect(() => {
    if (prefersReducedMotion || isRecruiterMode) return;

    const ctx = gsap.context(() => {
      // Animate content on scroll
      gsap.fromTo(
        '.about-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate fun facts
      gsap.fromTo(
        '.fun-fact',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.fun-facts-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, isRecruiterMode]);

  if (isRecruiterMode) return null;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section bg-[var(--bg-primary)] overflow-hidden"
    >
      <div className="container">
        {/* Header */}
        <SectionHeader
          eyebrow="Chapter 06"
          title="Beyond the Code"
          subtitle={aboutContent.intro}
        />

        {/* Main Layout: Video Left, Text Right */}
        <div className="max-w-4xl mx-auto grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-start mb-16">
          {/* Left: Video */}
          <div className="flex justify-center about-content">
            <IntroVideoPlayer />
          </div>

          {/* Right: Stacked Text Blocks */}
          <div className="space-y-4">
            {aboutContent.sections.map((section) => (
              <Card key={section.id} className="about-content p-6">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-xl font-display font-semibold text-[var(--text-primary)]">
                    {section.title}
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-[var(--accent-start)] to-transparent opacity-30" />
                </div>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  {section.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Fun Facts Grid */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-lg font-display font-semibold mb-8 text-[var(--text-secondary)]">
            Quick Facts About Me
          </h3>
          <div className="fun-facts-grid grid grid-cols-2 md:grid-cols-3 gap-4">
            {aboutContent.funFacts.map((fact, index) => (
              <div
                key={index}
                className="fun-fact group relative p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-start)]/50 transition-all duration-300"
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <span className="absolute -top-3 -right-2 text-2xl transform group-hover:scale-125 transition-transform">
                  {fact.emoji}
                </span>
                <p className="text-xs font-mono text-[var(--accent-start)] mb-1 uppercase tracking-wider">
                  {fact.label}
                </p>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
