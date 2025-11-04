"use client";

import React, { useEffect, useRef, useState } from "react";
import CollapsedCards from "../components/CollapsedCards.jsx";
import { myItems } from "../constant/index.jsx";
import AboutTheCloud from "../animations/AboutTheCloud.jsx";

export default function AboutMe() {
  const sectionRef = useRef(null);
  const [visibleRatio, setVisibleRatio] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // round ratio to nearest 0.1 for bigger opacity steps
          const steppedRatio = Math.round(entry.intersectionRatio * 10) / 10;
          setVisibleRatio(steppedRatio);
        });
      },
      {
        threshold: Array.from({ length: 11 }, (_, i) => i / 10), // 0, 0.1, ... 1.0
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-end text-headline overflow-visible"
    >
      {/* 🔲 Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-30 relative z-10">
        {/* Left column: text + cards */}
        <div className="relative flex flex-col items-start justify-start w-full pr-4">
          <p className="font-nunito pb-8">
            With a background in graphics and frontend development, I combine
            technical precision with creative problem solving. I am actively
            seeking opportunities to grow as a security engineer and contribute
            to impactful projects.
          </p>

          {/* Cards only visible on desktop/tablet */}
          <div className="hidden md:block w-full">
            <CollapsedCards
              items={myItems}
              burstAnimationDuration={0.5}
              disableLayout={false}
            />
          </div>
        </div>

        {/* Right column: animated headline + image */}
        <div>
          <AboutTheCloud />
        </div>
      </div>
    </section>
  );
}
