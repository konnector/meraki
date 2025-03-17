"use client";

import React from "react";

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
}

export function DotPattern({
  width = 16,
  height = 16,
  cx = 0.5,
  cy = 0.5,
  cr = 0.5,
  className,
  ...props
}: DotPatternProps) {
  const pattern = React.useMemo(() => {
    const dots = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        dots.push(
          <circle
            key={`${x}-${y}`}
            cx={x + cx}
            cy={y + cy}
            r={cr}
          />
        );
      }
    }
    return dots;
  }, [width, height, cx, cy, cr]);

  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {pattern}
    </svg>
  );
} 