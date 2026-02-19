'use client';

import { useEffect, useRef } from 'react';

export default function LandingBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch (error) {
        console.log('Autoplay prevented:', error);
      }
    };

    playVideo();

    document.addEventListener('touchstart', playVideo, { once: true });
    document.addEventListener('click', playVideo, { once: true });

    return () => {
      document.removeEventListener('touchstart', playVideo);
      document.removeEventListener('click', playVideo);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      poster="/videos/landing-bg-poster.webp"
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source src="/videos/landing-bg.webm" type="video/webm" />
    </video>
  );
}
