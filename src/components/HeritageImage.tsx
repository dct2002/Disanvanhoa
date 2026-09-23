import { useState } from "react";
import { placeholderImage } from "../data/placeholder";

interface HeritageImageProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}

export default function HeritageImage({ src, alt, className, eager }: HeritageImageProps) {
  const [error, setError] = useState(false);
  const finalSrc = error ? placeholderImage(alt) : src;

  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setError(true)}
    />
  );
}
