'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Keyboard, A11y } from 'swiper/modules';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { SlideMedia } from '@/data/content';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface ImageSliderProps {
  images: SlideMedia[];
  title: string;
}

// Helper to get asset path with basePath prefix
const getAssetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;

// Renders a single media item (image or video)
function MediaItem({ item }: { item: SlideMedia }) {
  if (item.type === 'video') {
    // Autoplay videos: muted, loop, no controls
    if (item.autoplay) {
      return (
        <video
          src={getAssetPath(item.src)}
          poster={item.poster ? getAssetPath(item.poster) : undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label={item.alt}
          className="w-full h-full object-cover"
        />
      );
    }

    // Standard video with controls
    return (
      <video
        src={getAssetPath(item.src)}
        poster={item.poster ? getAssetPath(item.poster) : undefined}
        controls
        playsInline
        preload="metadata"
        aria-label={item.alt}
        className="w-full h-full object-contain bg-black"
      />
    );
  }

  return (
    <img
      src={getAssetPath(item.src)}
      alt={item.alt}
      loading="lazy"
      className="w-full h-full object-cover"
    />
  );
}

export default function ImageSlider({ images, title }: ImageSliderProps) {
  const prefersReducedMotion = useReducedMotion();
  const hasMultipleItems = images.length > 1;

  // Single item - just render it without Swiper overhead
  if (!hasMultipleItems) {
    return <MediaItem item={images[0]} />;
  }

  return (
    <Swiper
      modules={[Pagination, Navigation, Keyboard, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      keyboard={{
        enabled: true,
      }}
      grabCursor={true}
      a11y={{
        prevSlideMessage: `Previous ${title} slide`,
        nextSlideMessage: `Next ${title} slide`,
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        paginationBulletMessage: 'Go to slide {{index}}',
      }}
      speed={prefersReducedMotion ? 0 : 300}
      className="image-slider w-full h-full"
      style={{
        '--swiper-navigation-color': 'var(--accent-start)',
        '--swiper-pagination-color': 'var(--accent-start)',
      } as React.CSSProperties}
    >
      {images.map((item, index) => (
        <SwiperSlide key={index} className="w-full h-full">
          <MediaItem item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
