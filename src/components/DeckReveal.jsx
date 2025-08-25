"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function DeckReveal({
  rounded = false,
  height = "300px",
  width = "100%",
  animationConfig = { stiffness: 100, damping: 20 }, // can now control spring
  backgroundColor = "#ffffff",
  offset = "100%",
  children,
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Apply spring physics to the scroll animation
  const rawY = useTransform(scrollYProgress, [0, 1], [offset, "0%"]);
  const y = useSpring(rawY, animationConfig);

  const borderRadius = rounded ? "2rem" : "0";

  return (
    <section className="relative w-full flex justify-center items-center overflow-visible">
      <motion.div
        ref={ref}
        style={{ y, height, width, borderRadius, backgroundColor }}
        className={`relative overflow-hidden ${rounded ? "rounded-2xl" : ""}`}
      >
        {children}
      </motion.div>
    </section>
  );
}
