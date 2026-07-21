import React from "react";

export default function FotoHero({
  src,
  alt,
  className = "",
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <picture>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        decoding="async"
        className={className}
      />
    </picture>
  );
}
