// AboutMe.jsx
"use client";
import React from "react";
import ExpandableCards from "../components/ExpandableCards.jsx";
import { myItems } from "../constant/index.jsx";
import DeckReveal from "../components/DeckReveal.jsx";
import DeckContent from "../constant/DeckContents.jsx";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="relative w-full h-[1650px] text-headline overflow-visible"
    >
      {/* Two-column container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full lg:px-16 lg:py-20 relative">
        {/* Left column: text + cards (was right before) */}
        <div className="relative flex flex-col items-start justify-start lg:top-15 left-8 sm:top-28 sm:left-16 pr-30 order-2 lg:order-1">
          <p className="pb-8">
            This is all I ever wanted! I will show them, I will show them
            all!...
          </p>

          <ExpandableCards
            items={myItems}
            blurStrength="md"
            blackOpacity={0.3}
            animationSpeed={0.25}
            cardColor="bg-gray-900"
            collapsedTitleColor="text-violet-400"
            collapsedDescriptionColor="#ececec"
            collapsedFont="font-medium"
            expandedTitleColor="text-violet-500"
            expandedDescriptionColor="#ececec"
            expandedFont="font-bold"
            gapBetweenCards="gap-0"
          />
        </div>

        {/* Right column: headline + image (was left before) */}
        <div className="relative w-full h-full flex order-1 lg:order-2">
          <h1 className="absolute lg:top-25 left-8 sm:top-28 sm:left-60 text-2xl sm:text-4xl md:text-5xl lg:text-8xl font-zing text-headline z-0 pointer-events-none">
            ABOUT THE CLOUD
          </h1>

          <img
            src="/src/public/profile_photo.png"
            alt="Background"
            className="absolute left-35 sm:top-36 md:top-40 lg:top-10 w-40 sm:w-52 md:w-64 lg:w-110 z-10"
          />

          <div className="absolute lg:top-25 left-8 sm:top-28 sm:left-60 z-20 pointer-events-none">
            <h1
              className="text-2xl sm:text-4xl md:text-5xl lg:text-8xl font-zing text-transparent"
              style={{ WebkitTextStroke: "0.5px #e4d8ff" }}
            >
              ABOUT THE CLOUD
            </h1>
          </div>
        </div>
      </div>

      <DeckReveal
        height="200vh"
        width="100%"
        rounded
        animationConfig={{ stiffness: 200, damping: 20 }}
        backgroundColor="#e4d8ff"
        offset="2225"
      >
        <DeckContent />
      </DeckReveal>
    </section>
  );
}
