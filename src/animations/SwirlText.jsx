"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function SwirlAnimation({
  text = "Your Text Here",
  speed = 0.5,
  className = "", // consumer defines size, color, font
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const words = containerRef.current.querySelectorAll(".swirl-word");

    gsap.set(words, {
      opacity: 0,
      transform:
        "translate3d(10px, 40px, -60px) rotateY(60deg) rotateX(-40deg)",
      transformOrigin: "50% 50% -150px",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "100 bottom",
        end: "center bottom",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(words, {
      opacity: 1,
      transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
      ease: "power2.inOut",
      stagger: speed,
    });

    return () => tl.kill();
  }, [speed]);

  return (
    <div ref={containerRef} className={`flex flex-col gap-2 ${className}`}>
      {text.split("<br />").map((line, lineIdx) => (
        <div key={lineIdx} className="flex flex-wrap justify-center gap-2 px-4">
          {line.split(" ").map((word, wordIdx) => (
            <span
              key={wordIdx}
              className="swirl-word inline-block will-change-transform"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
