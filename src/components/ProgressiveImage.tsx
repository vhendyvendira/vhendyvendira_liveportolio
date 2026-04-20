import React, { useState, useEffect } from 'react';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ProgressiveImage({ src, alt, className, style }: ProgressiveImageProps) {
  const [highResLoaded, setHighResLoaded] = useState(false);
  const [lowResLoaded, setLowResLoaded] = useState(false);

  // Derive thumbnail for Picsum images
  const thumbSrc = src.includes("picsum.photos") 
    ? src.replace(/\/\d+\/\d+/, "/50/50") + "?blur=5"
    : src; // For local images, we just use the same src or a generic placeholder if we had one

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    ...style
  };

  return (
    <div className={className} style={containerStyle}>
      {/* Skeleton Shimmer remains as the absolute base layer until at least thumb loads */}
      {!lowResLoaded && !highResLoaded && (
        <div className="skeleton-shimmer" style={{
          position: "absolute",
          inset: 0,
          background: "#eeeeee",
          zIndex: 1
        }} />
      )}

      {/* Low-res Thumbnail */}
      <img
        src={thumbSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setLowResLoaded(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(10px)", // Keep blurred until fully replaced
          opacity: highResLoaded ? 0 : (lowResLoaded ? 1 : 0),
          transition: "opacity 0.8s ease-in-out",
          zIndex: 2,
          transform: "scale(1.1)" // Scale slightly to hide blurred edges
        }}
      />

      {/* High-res Image */}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setHighResLoaded(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: highResLoaded ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
          zIndex: 3
        }}
      />
    </div>
  );
}
