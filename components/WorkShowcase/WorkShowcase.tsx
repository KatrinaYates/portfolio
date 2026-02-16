'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from '@/lib/gsap';
import { workShowcase, workCategories, WorkShowcaseItem } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useViewMode } from '@/hooks/useViewMode';
import Modal from '@/components/ui/Modal';
import Card from '@/components/ui/Card';
import CardCTA from '@/components/ui/CardCTA';
import BulletList from '@/components/ui/BulletList';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import SectionLabel from '@/components/ui/SectionLabel';

// Dynamically import ImageSlider for code-splitting (only loads when modal opens)
const ImageSlider = dynamic(() => import('./ImageSlider'), {
  loading: () => <div className="w-full h-full bg-[var(--bg-tertiary)] animate-pulse" />,
  ssr: false,
});

// Helper to check if item is powered by Aloha (for badges and filtering)
const isPoweredByAloha = (item: WorkShowcaseItem): boolean => {
  return item.poweredBy === 'aloha' || (item.platformRole === 'implementation' && item.platform === 'aloha');
};

// Enterprise site IDs for filtering
const ENTERPRISE_SITE_IDS = ['disney-parks-blog', 'in-disney-connect', 'disney-experiences'];

export default function WorkShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { isRecruiterMode } = useViewMode();

  // Filter and sort work items based on category
  const filteredWork = (() => {
    let filtered: WorkShowcaseItem[];

    switch (activeCategory) {
      case 'all':
        filtered = workShowcase;
        break;
      case 'aloha-platform':
        // Aloha Platform: core + all aloha-powered implementations
        filtered = workShowcase.filter(
          (item) => item.platformRole === 'core' || isPoweredByAloha(item)
        );
        break;
      case 'enterprise':
        // Enterprise Sites: DPB, in.DisneyConnect, Disney Experiences
        filtered = workShowcase.filter((item) => ENTERPRISE_SITE_IDS.includes(item.id));
        break;
      default:
        filtered = workShowcase.filter((item) => item.category === activeCategory);
    }

    // Sort: core items first, then implementations, then others
    return [...filtered].sort((a, b) => {
      if (a.platformRole === 'core' && b.platformRole !== 'core') return -1;
      if (a.platformRole !== 'core' && b.platformRole === 'core') return 1;
      if (a.platformRole === 'implementation' && !b.platformRole) return -1;
      if (!a.platformRole && b.platformRole === 'implementation') return 1;
      return 0;
    });
  })();

  const selectedItem = workShowcase.find((item) => item.id === selectedProject);

  // Animate on scroll
  useEffect(() => {
    if (prefersReducedMotion || isRecruiterMode) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-header',
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

  // Recruiter mode: simple list (sorted with core platform first)
  if (isRecruiterMode) {
    const sortedWork = [...workShowcase].sort((a, b) => {
      if (a.platformRole === 'core' && b.platformRole !== 'core') return -1;
      if (a.platformRole !== 'core' && b.platformRole === 'core') return 1;
      return 0;
    });

    return (
      <section id="work" className="section bg-[var(--bg-primary)]">
        <div className="container">
          <h2 className="section-title mb-8">Work Showcase</h2>
          <div className="space-y-4">
            {sortedWork.map((item) => (
              <Card key={item.id}>
                <div className="flex items-center gap-2 mb-1">
                  {item.platformRole === 'core' && (
                    <span className="text-xs font-mono px-2 py-0.5 bg-[var(--accent-start)] text-[var(--text-on-accent)] rounded">
                      PLATFORM
                    </span>
                  )}
                  {isPoweredByAloha(item) && (
                    <span className="text-xs font-mono text-[var(--accent-start)]">
                      Powered by Aloha
                    </span>
                  )}
                </div>
                <h3 className="font-display font-semibold">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{item.role}</p>
                <p className="text-sm text-[var(--text-muted)] mt-2">{item.whatIOwned}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section bg-[var(--bg-primary)] overflow-hidden"
    >
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Chapter 02"
          title="The Work"
          subtitle="Click to explore each project in detail"
          className="work-header"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {workCategories.map((category) => (
            <Button
              key={category.id}
              variant="filter"
              onClick={() => setActiveCategory(category.id)}
              active={activeCategory === category.id}
              className="px-4 py-2 text-sm font-medium"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Interactive Project Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredWork.map((item, index) => (
            <Card
              key={item.id}
              as="button"
              onClick={() => setSelectedProject(item.id)}
              onMouseEnter={() => setHoveredProject(item.id)}
              onMouseLeave={() => setHoveredProject(null)}
              interactive
              className={`group text-left h-full relative overflow-hidden transition-opacity duration-500 ${
                hoveredProject && hoveredProject !== item.id ? 'opacity-50' : 'opacity-100'
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Featured Image/Video */}
              {(item.featuredImage || item.images[0]?.src) && (
                <div className="aspect-video -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-[inherit]">
                  {!item.featuredImage && item.images[0]?.type === 'video' ? (
                    <video
                      src={item.images[0].src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.featuredImage || item.images[0]?.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )}

              {/* Content */}
              <div className="relative z-10">
                {/* Category & Platform Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {item.platformRole === 'core' && (
                      <Badge variant="solid">PLATFORM</Badge>
                    )}
                    {isPoweredByAloha(item) && (
                      <Badge variant="accent" className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                        Powered by Aloha
                      </Badge>
                    )}
                    {!item.platformRole && !isPoweredByAloha(item) && (
                      <span className="text-xs font-mono text-[var(--accent-start)]">
                        {item.category.replace(/-/g, ' ').toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-4xl font-display font-bold text-[var(--text-muted)]">
                    0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-2xl font-display font-semibold mb-2 group-hover:text-[var(--accent-start)] transition-colors ${
                  item.platformRole === 'core' ? 'text-[var(--accent-start)]' : ''
                }`}>
                  {item.title}
                </h3>

                {/* Role */}
                <p className="text-[var(--text-secondary)] mb-4">{item.role}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 font-mono text-[var(--accent-start)] bg-[var(--accent-start)]/10 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <CardCTA>View Details</CardCTA>
              </div>
            </Card>
          ))}
        </div>

        {/* Project Detail Modal */}
        <Modal
          isOpen={!!selectedProject && !!selectedItem}
          onClose={() => { setSelectedProject(null); setDetailsExpanded(false); }}
          title={selectedItem?.title || 'Project Details'}
          className="max-w-3xl w-full"
        >
          {selectedItem && (
            <>
              {/* Project Image(s) */}
              <div className="aspect-video bg-gradient-to-br from-[var(--accent-start)]/20 to-[var(--accent-end)]/20 overflow-hidden">
                <ImageSlider images={selectedItem.images} title={selectedItem.title} />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  {selectedItem.platformRole === 'core' && (
                    <Badge variant="solid">PLATFORM</Badge>
                  )}
                  {isPoweredByAloha(selectedItem) && (
                    <Badge variant="accent" className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      Powered by Aloha
                    </Badge>
                  )}
                  {!selectedItem.platformRole && !isPoweredByAloha(selectedItem) && (
                    <span className="text-xs font-mono text-[var(--accent-start)]">
                      {selectedItem.category.replace(/-/g, ' ').toUpperCase()}
                    </span>
                  )}
                </div>

                <h3 className={`text-2xl font-display font-semibold mb-4 ${
                  selectedItem.platformRole === 'core' ? 'text-[var(--accent-start)]' : ''
                }`}>
                  {selectedItem.title}
                  <span className="text-[var(--accent-start)] font-mono text-lg font-normal">
                    {' | '}{selectedItem.role}
                  </span>
                </h3>

                <div className="mb-6">
                  <SectionLabel>What I Owned</SectionLabel>
                  <p className="text-[var(--text-muted)]">{selectedItem.whatIOwned}</p>
                </div>

                {/* Why It Matters */}
                {selectedItem.whyItMatters && (
                  <div className="mb-6">
                    <SectionLabel>Why It Matters</SectionLabel>
                    <p className="text-[var(--text-muted)]">{selectedItem.whyItMatters}</p>
                  </div>
                )}

                {/* Expandable Details Section */}
                {(() => {
                  const hasExpandableContent =
                    (selectedItem.impact && selectedItem.impact.length > 0) ||
                    (selectedItem.modalSections && selectedItem.modalSections.length > 0) ||
                    (selectedItem.modalHighlights && selectedItem.modalHighlights.length > 0);

                  if (!hasExpandableContent) return null;

                  return (
                    <div className="mb-6">
                      <button
                        onClick={() => setDetailsExpanded(!detailsExpanded)}
                        className="flex items-center gap-2 text-sm font-medium text-[var(--accent-start)] hover:text-[var(--accent-end)] transition-colors mb-4"
                        aria-expanded={detailsExpanded}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${detailsExpanded ? 'rotate-90' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Technical Details
                      </button>

                      {detailsExpanded && (
                        <div className="pl-6 border-l-2 border-[var(--border-subtle)] space-y-6">
                          {/* Impact */}
                          {selectedItem.impact && selectedItem.impact.length > 0 && (
                            <div>
                              <SectionLabel className="mb-3">Impact</SectionLabel>
                              <BulletList items={selectedItem.impact} />
                            </div>
                          )}

                          {/* Structured Modal Sections (for Aloha core platform) */}
                          {selectedItem.modalSections && selectedItem.modalSections.length > 0 && (
                            <div className="space-y-6">
                              {selectedItem.modalSections.map((section) => (
                                <div key={section.heading}>
                                  <SectionLabel className="mb-3 border-b border-[var(--border-subtle)] pb-2">
                                    {section.heading}
                                  </SectionLabel>
                                  <BulletList items={section.bullets} />
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Modal Highlights (for implementations) */}
                          {selectedItem.modalHighlights && selectedItem.modalHighlights.length > 0 && (
                            <div>
                              <SectionLabel className="mb-3">Key Highlights</SectionLabel>
                              <BulletList items={selectedItem.modalHighlights} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })()}

                <div className="mb-6">
                  <SectionLabel>Tech Stack</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.stack.map((tech) => (
                      <span key={tech} className="tech-chip">{tech}</span>
                    ))}
                  </div>
                </div>

                {selectedItem.links.some(link => link.url !== '#') && (
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--border-subtle)]">
                    {selectedItem.links.filter(link => link.url !== '#').map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary text-sm"
                      >
                        {link.label}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </Modal>
      </div>
    </section>
  );
}
