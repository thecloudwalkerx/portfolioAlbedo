"use client";
import React from "react";
import DeckReveal from "/src/components/DeckReveal";
import DeckContent from "../constant/DeckContents.jsx";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen text-headline overflow-visible"
    >
      {/* Bottom layer */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <h1 className="text-[15vw] font-bold text-gray-400 select-none">
          BOTTOM BOX
        </h1>
      </div>
      <DeckReveal
        height="800px"
        width="98%"
        rounded
        animationConfig={{ stiffness: 80, damping: 15 }}
        backgroundColor="#f0f0f0"
        offset="100%"
      >
        <DeckContent />
      </DeckReveal>
    </section>
  );
}
