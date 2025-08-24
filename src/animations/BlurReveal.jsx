"use client";
import { useEffect, useRef } from "react";
import { stagger, useAnimate, motion } from "motion/react";

export const BlurReveal = ({
  words = "",
  blurStart = 10,
  duration = 0.5,
  filter = true,
}) => {
  const [scope, animate] = useAnimate();
  const containerRef = useRef(null);
  const wordsArray = words.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(
              "span",
              { opacity: 1, "--blur": 0 },
              { duration, delay: stagger(0.2) },
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animate, duration]);

  return (
    <motion.span
      ref={(el) => {
        scope.current = el;
        containerRef.current = el;
      }}
      style={{ display: "inline" }} // keeps inline with parent text
    >
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          style={{
            opacity: 0,
            filter: filter ? "blur(var(--blur))" : "none",
            ["--blur"]: `${blurStart}px`,
            willChange: "filter, opacity",
            display: "inline",
            marginLeft: idx === 0 ? "0" : "0.25em", // only add spacing between words
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
