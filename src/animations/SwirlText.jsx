"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function SwirlAnimation({
  text = "Your Text Here",
  duration = 0.8, // duration per element
  stagger = 0.1, // delay between elements
  className = "",
  mode = "word", // "word" | "char" | "line" | "all"
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
        break;
    }

    // Reset elements before every animation
    const resetElements = () => {
      gsap.set(elements, {
        opacity: 0,
        transform:
          "translate3d(10px,40px,-60px) rotateY(60deg) rotateX(-40deg)",
        transformOrigin: "50% 50% -150px",
      });
    };

    resetElements();

    // Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play reverse play reverse", // plays every scroll in/out
        scroller: window, // viewport relative
        immediateRender: false,
      },
    });

    tl.to(elements, {
      opacity: 1,
      transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
      ease: "power2.inOut",
      duration: duration,
      stagger: mode === "all" ? 0 : stagger,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [duration, stagger, mode, text]);

  return (
    <div ref={containerRef} className={`flex flex-col gap-2 ${className}`}>
      {text.split("<br />").map((line, lineIdx) => (
        <div
          key={lineIdx}
          className={`flex flex-wrap justify-center gap-2 px-4 swirl-line`}
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
