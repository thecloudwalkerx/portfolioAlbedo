"use client";

import React, { useState } from "react";
import CollapsedCards from "../components/CollapsedCards.jsx";
import { myItems } from "../constant/index.jsx";
import DeckReveal from "../components/DeckReveal.jsx";
import DeckContent from "../constant/DeckContents.jsx";
import AboutTheCloud from "../animations/AboutTheCloud.jsx";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="relative w-full h-full text-headline overflow-visible"
    >
      {/* Two-column container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full lg:px-16 lg:py-20 relative">
        {/* Left column: text + cards (desktop & tablet) */}
        <div className="relative flex flex-col items-start justify-start w-full top-0 left-5 lg:top-15 left-4 sm:left-8 pr-4 order-2 lg:order-1">
          <p className="pb-8">
            This is all I ever wanted! I will show them, I will show them
            all!...
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
      <DeckReveal
        baseDeckHeight={{ sm: 2, md: 2.5, lg: 3 }} // deck height per device
        baseScrollHeight={{ sm: 1.64, md: 1.72, lg: 2 }} // scroll section height
        baseOffset={{ sm: 800, md: 900, lg: 1000 }} // scroll travel per device
        baseFixedOffset={{ sm: 450, md: -5, lg: -10 }} // visual start offset per device
        backgroundColor="#e4d8ff"
        rounded
      >
        <DeckContent myItems={myItems} />
      </DeckReveal>
    </section>
  );
}
