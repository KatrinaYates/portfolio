'use client';

import { useMemo } from 'react';
import { getSvgContent } from '@/data/svgSprite';

interface SvgDecorItemProps {
  svgPath: string;
  color: string;
  size: number;
  rotation: number;
  opacity: number;
  top: number;
  left: number;
}

/**
 * Apply color to SVG content by replacing fill attributes
 */
function applyColorToSvg(svgContent: string, color: string): string {
  // Replace fill colors with our color
  // Handles fill="#000000", fill="#000", fill="black", fill="currentColor"
  let coloredSvg = svgContent
    .replace(/fill="#[0-9a-fA-F]{3,6}"/g, `fill="${color}"`)
    .replace(/fill="black"/g, `fill="${color}"`)
    .replace(/fill="currentColor"/g, `fill="${color}"`);

  // Also handle fill in style attributes
  coloredSvg = coloredSvg.replace(
    /fill:\s*#[0-9a-fA-F]{3,6}/g,
    `fill: ${color}`
  );

  // Handle stroke colors for outline SVGs
  coloredSvg = coloredSvg.replace(
    /stroke:\s*rgb\(0,\s*0,\s*0\)/g,
    `stroke: ${color}`
  );

  return coloredSvg;
}

export default function SvgDecorItem({
  svgPath,
  color,
  size,
  rotation,
  opacity,
  top,
  left,
}: SvgDecorItemProps) {
  // Get SVG content from bundled sprite - no network fetch needed
  const svgContent = useMemo(() => {
    const content = getSvgContent(svgPath);
    if (!content) {
      return null;
    }
    return applyColorToSvg(content, color);
  }, [svgPath, color]);

  if (!svgContent) {
    return null;
  }

  return (
    <div
      className="absolute [&>svg]:w-full [&>svg]:h-full"
      style={{
        top,
        left: `${left}%`,
        width: size,
        height: size,
        opacity,
        transform: `rotate(${rotation}deg)`,
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
