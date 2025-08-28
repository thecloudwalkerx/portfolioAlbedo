"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SwirlAnimation({
  text = "Your Text Here",
  mode = "word", // "word" | "char" | "line" | "all"
  duration = 0.8,
  stagger = 0.05,
  maxTilt = 5, // degrees of rotation per char/word
  className = "",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let elements;
    switch (mode) {
      case "char":
        elements = containerRef.current.querySelectorAll(".swirl-char");
        break;
      case "line":
        elements = containerRef.current.querySelectorAll(".swirl-line");
        break;
      case "all":
        elements = [containerRef.current];
        break;
      default:
        elements = containerRef.current.querySelectorAll(".swirl-word");
    }

    // Reset initial state
    gsap.set(elements, {
      opacity: 0,
      y: 30,
      filter: "blur(4px)",
      rotateZ: () => (Math.random() - 0.5) * maxTilt * 2, // random tilt
      transformOrigin: "50% 50%",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.to(elements, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      rotateZ: 0,
      ease: "power3.out",
      duration: duration,
      stagger: mode === "all" ? 0 : stagger,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [text, duration, mode, stagger, maxTilt]);

  return (
    <div ref={containerRef} className={`flex flex-col gap-2 ${className}`}>
      {text.split("<br />").map((line, lineIdx) => (
        <div
          key={lineIdx}
          className={`flex flex-wrap justify-center gap-2 px-2 swirl-line`}
        >
          {mode === "char"
            ? line.split("").map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="swirl-char inline-block will-change-transform"
                >
                  {char}
                </span>
              ))
            : line.split(" ").map((word, wordIdx) => (
                <span
                  key={wordIdx}
                  className="swirl-word inline-block will-change-transform"
                >
                  {word}
                </span>
              ))}
        </div>
      ))}
    </div>
  );
}
