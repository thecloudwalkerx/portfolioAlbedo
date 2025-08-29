"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function SwitchText({
  text = "YOUR TEXT HERE",
  slideDistance = 100, // how far it slides in
  blurAmount = 6, // initial blur in pixels
  transitionDuration = 0.8, // duration of animation
  staggerDuration = 0.05, // delay between characters
  slideDirection = "right", // "left" or "right"
  className = "text-6xl font-bold text-white",
}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { amount: 0.3 });
  const [prevInView, setPrevInView] = useState(false);

  // Split text into characters and preserve spaces
  const characters = useMemo(
    () => Array.from(text).map((char) => (char === " " ? "\u00A0" : char)),
    [text],
  );

  // Determine slide distance direction
  const getSlide = (distance) =>
    slideDirection === "left" ? -distance : distance;

  useEffect(() => {
    if (isInView && !prevInView) {
      controls.start("visible");
    } else if (!isInView && prevInView) {
      controls.start("hidden");
    }
    setPrevInView(isInView);
  }, [isInView, prevInView, controls]);

  const variants = {
    hidden: {
      x: getSlide(slideDistance),
      opacity: 0,
      filter: `blur(${blurAmount}px)`,
    },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 100, damping: 20, mass: 1 },
        opacity: { duration: transitionDuration / 2 },
        filter: { duration: transitionDuration },
        delay: i * staggerDuration,
      },
    }),
  };

  return (
    <div
      ref={ref}
      className={`relative inline-block overflow-visible ${className}`} // overflow-visible fixes cutting
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
