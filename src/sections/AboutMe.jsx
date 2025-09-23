"use client";

import React from "react";
import CollapsedCards from "../components/CollapsedCards.jsx";
import { myItems } from "../constant/index.jsx";
import AboutTheCloud from "../animations/AboutTheCloud.jsx";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex flex-col justify-end text-headline overflow-visible"
    >
      {/* Two-column container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full lg:px-16 relative">
        {/* Left column: text + cards */}
        <div
          className="
            relative flex flex-col items-start justify-start w-full pr-4
            order-1 md:order-1   /* text comes first on mobile */
          "
        >
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
              disableLayout={false}
            />
          </div>
        </div>

        {/* Right column: animated headline + image */}
        <div
          className="
            order-2 md:order-2   /* image comes last on mobile, right on desktop */
          "
        >
          <AboutTheCloud />
        </div>
      </div>
    </section>
  );
}
