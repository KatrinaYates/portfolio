import type { Metadata } from 'next';
import DesignDNA from '@/components/DesignDNA/DesignDNA';

export const metadata: Metadata = {
  title: 'Design DNA | Particle Explorer',
  description: 'An interactive particle system playground. Explore the balance between structure, motion, and expression through a premium control interface.',
  keywords: ['particle system', 'interactive', 'canvas', 'design', 'visualization', 'creative coding'],
  openGraph: {
    title: 'Design DNA | Particle Explorer',
    description: 'An interactive particle system playground exploring balance, motion, and form.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design DNA | Particle Explorer',
    description: 'An interactive particle system playground.',
  },
};

export default function DesignDNAPage() {
  return <DesignDNA />;
}
