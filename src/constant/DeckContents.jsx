"use client";

import React from "react";
import SwirlAnimation from "../animations/SwirlText.jsx";
import BentoGrid from "../components/BentoGrid.jsx";

export default function DeckContent() {
  return (
    <section className="p-10 text-2xl flex flex-col gap-6 text-white font-zing">
      {/* Animated text */}

      <SwirlAnimation
        className="flex text-8xl flex-col gap-6"
        text="This is animated across two lines"
        duration={1.2}
        stagger={0.05}
        mode="word"
      />

      {/* Bento grid */}
      <div id="projects" className="mt-6 w-full">
        <BentoGrid />
      </div>
    </section>
  );
}
