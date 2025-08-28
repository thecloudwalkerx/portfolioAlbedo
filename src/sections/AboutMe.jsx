"use client";

import React, { useState } from "react";
import CollapsedCards from "../components/CollapsedCards.jsx";
import { myItems } from "../constant/index.jsx";
import DeckReveal from "../components/DeckReveal.jsx";
import DeckContent from "../constant/DeckContents.jsx";
import AboutTheCloud from "../animations/AboutTheCloud.jsx";

export default function AboutMe() {
  const [burstingCard, setBurstingCard] = useState(null);

  return (
    <section
      id="about"
      className="relative w-full min-h-[1650px] text-headline overflow-visible"
    >
      {/* Two-column container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full lg:px-16 lg:py-20 relative">
        {/* Left column: text + cards (desktop & tablet) */}
        <div className="relative flex flex-col items-start justify-start w-full lg:top-15 left-4 sm:left-8 pr-4 order-2 lg:order-1">
          <p className="pb-8">
            This is all I ever wanted! I will show them, I will show them
            all!...
          </p>

          {/* Desktop & tablet cards */}
          <div className="hidden md:block w-full">
            <CollapsedCards items={myItems} burstAnimationDuration={0.5} />
          </div>
        </div>

        {/* Right column: animated headline + image */}
        <AboutTheCloud />
      </div>

      {/*<DeckReveal*/}
      {/*  height="200vh"*/}
      {/*  width="100%"*/}
      {/*  rounded*/}
      {/*  animationConfig={{ stiffness: 200, damping: 20 }}*/}
      {/*  backgroundColor="#e4d8ff"*/}
      {/*  offset="1000"*/}
      {/*>*/}
      {/*  /!* Mobile CollapsedCards + other deck content *!/*/}
      {/*  <DeckContent*/}
      {/*    myItems={myItems}*/}
      {/*    burstingCard={burstingCard}*/}
      {/*    setBurstingCard={setBurstingCard}*/}
      {/*  />*/}
      {/*</DeckReveal>*/}
    </section>
  );
}
