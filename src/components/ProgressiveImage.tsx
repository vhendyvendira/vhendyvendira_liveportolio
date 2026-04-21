import React, { useState, useEffect, useRef } from 'react';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  aspectRatio?: string;
}

export default function ProgressiveImage({ src, alt, className, style, aspectRatio }: ProgressiveImageProps) {
  const [highResLoaded, setHighResLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Derive thumbnail for Picsum images - very low res for immediate hit
  const thumbSrc = src.includes("picsum.photos") 
    ? src.replace(/\/\d+\/\d+/, "/20/20") + "?blur=10"
    : src;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Load early before it hits the viewport
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "#efedea", // Warmer neutral base
    aspectRatio: aspectRatio,
    ...style
  };

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      {/* 1. Base Layer: Shimmer Effect */}
      {!highResLoaded && (
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          overflow: "hidden"
        }}>
          <div style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, #efedea 0%, #f5f4f2 50%, #efedea 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite linear",
          }} />
        </div>
      )}

      {/* 2. Middle Layer: Low-res Blurred Thumbnail (Loads immediately if in view or soon) */}
      {isInView && (
        <img
          src={thumbSrc}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(20px)",
            opacity: highResLoaded ? 0 : 1,
            transition: "opacity 0.6s ease-out",
            zIndex: 2,
            transform: "scale(1.1)",
          }}
        />
      )}

      {/* 3. Top Layer: High-res Image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setHighResLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: highResLoaded ? 1 : 0,
            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 3
          }}
        />
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
