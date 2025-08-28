"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function DeckReveal({
  rounded = false,
  baseDeckHeight = { sm: 1, md: 1.5, lg: 2 }, // deck height per device
  baseScrollHeight = { sm: 1.5, md: 1.2, lg: 1.5 }, // scroll height per device
  baseOffset = { sm: 50, md: 500, lg: 1000 }, // scroll travel per device
  baseFixedOffset = { sm: 0, md: -100, lg: -200 }, // visual start offset per device
  width = "100%",
  animationConfig = { stiffness: 120, damping: 15 },
  backgroundColor = "#fff",
  children,
}) {
  const ref = useRef(null);
  const [deckHeight, setDeckHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [responsiveOffset, setResponsiveOffset] = useState(0);
  const [responsiveFixedOffset, setResponsiveFixedOffset] = useState(0);

  // Helper to pick value based on viewport
  const getResponsiveValue = (value) => {
    const vw = window.innerWidth;
    if (vw < 640) return value.sm ?? 0;
    if (vw < 1024) return value.md ?? 0;
    return value.lg ?? 0;
  };

  useEffect(() => {
    const updateHeights = () => {
      const vh = window.innerHeight;
      setDeckHeight(vh * getResponsiveValue(baseDeckHeight));
      setScrollHeight(vh * getResponsiveValue(baseScrollHeight));
      setResponsiveOffset(getResponsiveValue(baseOffset));
      setResponsiveFixedOffset(getResponsiveValue(baseFixedOffset));
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, [baseDeckHeight, baseScrollHeight, baseOffset, baseFixedOffset]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Final y-transform
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [responsiveFixedOffset, responsiveFixedOffset - responsiveOffset],
  );
  const y = useSpring(rawY, animationConfig);

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{ height: scrollHeight }}
    >
      <motion.div
        style={{
          y,
          height: deckHeight,
          width,
          borderRadius: rounded ? "1.5rem" : 0,
          backgroundColor,
        }}
        className="sticky z-30 shadow-xl flex flex-col items-start justify-start will-change-transform"
      >
        {children}
      </motion.div>
    </section>
  );
}
