'use client';

import Image from 'next/image';

interface PngDecorItemProps {
  src: string;
  size: number;
  rotation: number;
  opacity: number;
  top: number;
  left: number;
}

// Helper to get asset path with basePath prefix
const getAssetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;

export default function PngDecorItem({
  src,
  size,
  rotation,
  opacity,
  top,
  left,
}: PngDecorItemProps) {
  return (
    <div
      className="absolute"
      style={{
        top,
        left: `${left}%`,
        width: size,
        height: size,
        opacity,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <Image
        src={getAssetPath(src)}
        alt=""
        fill
        sizes={`${size}px`}
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}
