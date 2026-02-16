'use client';

import dynamic from 'next/dynamic';
import { useViewMode } from '@/hooks/useViewMode';
import Nav from '@/components/Navigation/Nav';
import Hero from '@/components/Hero/Hero';
import EducationSection from '@/components/Education/EducationSection';
import TimelineSection from '@/components/Timeline/TimelineSection';
import LeadershipSection from '@/components/Leadership/LeadershipSection';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import RecruiterView from '@/components/RecruiterView/RecruiterView';
import AboutMe from '@/components/AboutMe/AboutMe';
import ThemeDecor from '@/components/ThemeDecor/ThemeDecor';
import LoadingState from '@/components/ui/LoadingState';

// Lazy load heavier components
const FeaturedWorkChapter = dynamic(
  () => import('@/components/FeaturedWork/FeaturedWorkChapter'),
  {
    ssr: false,
    loading: () => <LoadingState className="bg-[var(--bg-secondary)]" />,
  }
);

const WorkShowcase = dynamic(
  () => import('@/components/WorkShowcase/WorkShowcase'),
  {
    ssr: false,
    loading: () => <LoadingState className="bg-[var(--bg-secondary)]" />,
  }
);

export default function Home() {
  const { isRecruiterMode } = useViewMode();

  return (
    <>
      <Nav />
      <main id="main-content" className="relative" tabIndex={-1}>
        <ThemeDecor />
        {/* Recruiter Mode - Always rendered, shown/hidden via CSS */}
        <div className={isRecruiterMode ? 'block pt-16' : 'hidden'}>
          <RecruiterView />
        </div>

        {/* Story Mode - Always rendered, shown/hidden via CSS */}
        <div className={isRecruiterMode ? 'hidden' : 'block'}>
          {/* 1. Hero - The hook */}
          <Hero />

          {/* 2. Featured Work - What I build at scale (impressive work upfront) */}
          <FeaturedWorkChapter />

          {/* 3. Work Showcase - Proof of the claims */}
          <WorkShowcase />

          {/* 4. Career Timeline - Background & context */}
          <TimelineSection />

          {/* 5. Leadership - Soft skills & how I work with teams */}
          <LeadershipSection />

          {/* 6. Education - Credentials (includes skills snapshot) */}
          <EducationSection />

          {/* 7. About Me - Personality */}
          <AboutMe />

          {/* 8. Contact - CTA */}
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
