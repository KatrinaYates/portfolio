'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { featuredPanels, experience } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useViewMode } from '@/hooks/useViewMode';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';

export default function FeaturedWorkChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isRecruiterMode } = useViewMode();

  const disneyExperience = experience.find((exp) => exp.id === 'disney');

  // Set up scroll animations - panels slide up as you scroll
  useEffect(() => {
    if (prefersReducedMotion || isRecruiterMode) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate each panel as it comes into view
      const panels = gsap.utils.toArray<HTMLElement>('.featured-panel');

      panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          {
            opacity: 0,
            y: 80,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Animate the section header
      gsap.fromTo(
        '.featured-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, isRecruiterMode]);

  // Recruiter mode: simplified view
  if (isRecruiterMode) {
    return (
      <section id="featured" className="section bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent-start)] mb-2 font-mono">
              Featured Experience
            </p>
            <h2 className="section-title">The Walt Disney Company</h2>
            <p className="text-xl text-[var(--text-secondary)]">
              {disneyExperience?.role} · {disneyExperience?.period}
            </p>
          </div>

          <ul className="space-y-3 mb-8">
            {disneyExperience?.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-[var(--accent-start)] mt-1">•</span>
                <span className="text-[var(--text-secondary)]">{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {disneyExperience?.tech?.map((tech) => (
              <span key={tech} className="tech-chip">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="featured"
      className="relative bg-[var(--bg-secondary)] py-20 md:py-32"
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 30% 50%, rgba(89, 184, 231, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Chapter 01"
          title="What I Build"
          subtitle={`Currently at ${disneyExperience?.company} · ${disneyExperience?.role}`}
          className="featured-header mb-16"
        />

        {/* Panels - Normal scroll with slide-up animations */}
        <div className="space-y-12 max-w-4xl mx-auto">
          {featuredPanels.map((panel, index) => (
            <Card
              key={panel.id}
              as="article"
              className="featured-panel p-8 md:p-10"
            >
              {/* Panel Number & Line */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl md:text-6xl font-display font-bold gradient-text opacity-60">
                  0{index + 1}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-[var(--accent-start)] to-transparent opacity-30" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent-start)] font-mono">
                  {panel.subtitle}
                </p>

                <h3 className="text-2xl md:text-3xl font-display font-bold leading-tight">
                  {panel.title}
                </h3>

                <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
                  {panel.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {panel.tech.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-mono text-[var(--accent-start)] bg-[var(--accent-start)]/10 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA at bottom */}
        <div className="text-center mt-12">
          <a
            href="#work"
            className="btn btn-primary inline-flex"
          >
            See My Work
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
