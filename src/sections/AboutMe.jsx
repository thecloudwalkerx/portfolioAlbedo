"use client";

import React, { useState } from "react";
import CollapsedCards from "../components/CollapsedCards.jsx";
import { myItems } from "../constant/index.jsx";
import DeckReveal from "../backgrounds/DeckReveal.jsx";
import DeckContent from "../constant/DeckContents.jsx";
import AboutTheCloud from "../animations/AboutTheCloud.jsx";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="relative w-full h-screen text-headline overflow-hidden"
    >
      {/* Two-column container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full lg:px-16 lg:py-20 relative">
        {/* Left column: text + cards (desktop & tablet) */}
        <div className="relative flex flex-col items-start justify-start w-full top-0 left-5 lg:top-15 left-4 sm:left-8 pr-4 order-2 lg:order-1">
          <p className="font-nunito pb-8">
            With a background in graphics and frontend development, I combine
            technical precision with creative problem solving. I am actively
            seeking opportunities to grow as a security engineer and contribute
            to impactful projects.
          </p>

          {/* Desktop & tablet cards */}
          <div className="hidden md:block w-full">
            <CollapsedCards
              items={myItems}
              burstAnimationDuration={0.5}
              disableLayout={false} // full motion
            />
          </div>
        </div>

        {/* Right column: animated headline + image */}
        <AboutTheCloud />
      </div>
    </section>
  );
}
