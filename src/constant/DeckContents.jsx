"use client";

import React from "react";
import SwirlAnimation from "../animations/SwirlText.jsx";
import CollapsedCards from "../components/CollapsedCards.jsx";
import BentoGrid from "../components/BentoGrid.jsx"; // <-- import it

export default function DeckContent() {
  return (
    <section className="p-10 flex flex-col gap-6 text-black font-zing">
      {/* Collapsed cards */}
      {/*<CollapsedCards />*/}

      {/* Animated text */}
      <SwirlAnimation
        text="This is animated <br /> across two lines"
        duration={0.8}
        stagger={0.05}
        mode="line"
      />

      {/* Bento grid */}
      <div className="mt-6 w-full">
        <BentoGrid />
      </div>
    </section>
  );
}
