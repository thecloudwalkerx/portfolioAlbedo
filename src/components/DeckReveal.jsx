"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function DeckReveal({
  rounded = false,
  baseDeckHeight = { sm: 1, md: 1.5, lg: 2 },
  baseScrollHeight = { sm: 1.5, md: 1.2, lg: 1.5 },
  baseOffset = { sm: 50, md: 500, lg: 1000 },
  baseFixedOffset = { sm: 0, md: -100, lg: -200 },
  width = "99%",
  animationConfig = { stiffness: 180, damping: 28, mass: 1 },
  backgroundColor = "#ffffff",
  children,
}) {
  const ref = useRef(null);
  const [deckHeight, setDeckHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [responsiveOffset, setResponsiveOffset] = useState(0);
  const [responsiveFixedOffset, setResponsiveFixedOffset] = useState(0);

  const getResponsiveValue = (value) => {
    const vw = window.innerWidth;
    if (vw < 640) return value.sm ?? 0;
    if (vw < 1024) return value.md ?? 0;
    return value.lg ?? 0;
  };

  useEffect(() => {
    const updateSizes = () => {
      const vh = window.innerHeight;
      setDeckHeight(vh * getResponsiveValue(baseDeckHeight));
      setScrollHeight(vh * getResponsiveValue(baseScrollHeight));
      setResponsiveOffset(getResponsiveValue(baseOffset));
      setResponsiveFixedOffset(getResponsiveValue(baseFixedOffset));
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, [baseDeckHeight, baseScrollHeight, baseOffset, baseFixedOffset]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to a y-position
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [responsiveFixedOffset, responsiveFixedOffset - responsiveOffset],
  );

  // Smooth spring for “drag-like” feel
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
          position: "sticky",
          top: 0,
          margin: "0 auto",
          zIndex: 30,
          willChange: "transform",
        }}
        className="shadow-deck flex flex-col items-center justify-start"
      >
        {children}
      </motion.div>
    </section>
  );
}
