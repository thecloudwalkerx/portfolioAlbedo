// DeckReveal.jsx
"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function DeckReveal({
  rounded = false,
  height = "300px",
  width = "100%",
  animationConfig = { stiffness: 100, damping: 20 },
  backgroundColor = "#ffffff",
  offset = "100%", // now interpreted as “move up by offset”
  children,
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Convert offset to a proper upward movement
  // Start at 0% and move upward by offset
  const rawY = useTransform(scrollYProgress, [0, 1], [`0%`, `-${offset}`]);
  const y = useSpring(rawY, animationConfig);

  const borderRadius = rounded ? "1.5rem" : "0";

  return (
    <section className="relative w-full h-[200vh] flex justify-center items-center overflow-visible z-[20]">
      <motion.div
        ref={ref}
        style={{ y, height, width, borderRadius, backgroundColor }}
        className={`relative ${rounded ? "rounded-2xl" : ""} shadow-deck`}
      >
        {children}
      </motion.div>
    </section>
  );
}
