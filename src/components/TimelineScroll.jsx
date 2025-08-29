"use client";

import { useEffect, useState, useRef } from "react";

export default function TimelineScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rocketBlur, setRocketBlur] = useState(0);
  const targetProgress = useRef(0);
  const targetBlur = useRef(0);
  const lastScrollTop = useRef(window.scrollY);
  const rafId = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      targetProgress.current = (scrollTop / docHeight) * 100;

      // calculate scroll speed
      const speed = Math.abs(scrollTop - lastScrollTop.current);
      lastScrollTop.current = scrollTop;

      // map speed to blur (max 12px)
      targetBlur.current = Math.min(speed / 5, 12);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const animate = () => {
      // Smooth scroll progress
      setScrollProgress((prev) => prev + (targetProgress.current - prev) * 0.1);

      // Smooth blur animation
      setRocketBlur((prev) => prev + (targetBlur.current - prev) * 0.1);

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <div className="fixed top-0 right-5 h-full w-2 z-50 flex flex-col items-center pointer-events-none">
      <div className="relative w-1 h-full overflow-hidden">
        {scrollProgress > 0 && (
          <>
            {/* Smooth glowing trail behind rocket */}
            <div
              className="absolute left-0 w-full rounded-full"
              style={{
                top: 0,
                height: `${scrollProgress}%`,
                background: `linear-gradient(to bottom, rgba(128,0,255,0.2), rgba(128,0,255,0.8))`,
                filter: `blur(6px)`,
              }}
            />

            {/* Rocket tip */}
            <div
              className="absolute left-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-lg"
              style={{
                top: `${scrollProgress}%`,
                transform: "translate(-50%, -50%)",
                filter: `blur(${rocketBlur}px)`,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
