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
        src={src}
        alt=""
        fill
        sizes={`${size}px`}
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}
