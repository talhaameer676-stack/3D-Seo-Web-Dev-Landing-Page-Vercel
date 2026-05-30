import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HlsVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

export const HlsVideo: React.FC<HlsVideoProps> = ({ src, className = "", style }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if the URL is an HLS playlist (.m3u8)
    if (src.includes('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          maxMaxBufferLength: 10,
        });
        hls.loadSource(src);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch((e) => console.log("Hls autoplay blocked:", e));
        });

        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari and iOS)
        video.src = src;
        video.play().catch((e) => console.log("Native Hls autoplay blocked:", e));
      }
    } else {
      // Standard video format (MP4, WebM, etc.)
      video.src = src;
      video.play().catch((e) => console.log("Standard autoplay blocked:", e));
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={`w-full h-full object-cover pointer-events-none select-none ${className}`}
      style={style}
      muted
      playsInline
      loop
      autoPlay
    />
  );
};
