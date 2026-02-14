'use client';

import { useEffect, useState } from 'react';

export default function LandingBackground() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/videos/landing-bg-poster.webp')" }}
        aria-hidden="true" 
      />
    );
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      poster="/videos/landing-bg-poster.webp"
      preload="metadata"
      className="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source src="/videos/landing-bg.webm" type="video/webm" />
      <source src="/videos/landing-bg.mp4" type="video/mp4" />
    </video>
  );
}
