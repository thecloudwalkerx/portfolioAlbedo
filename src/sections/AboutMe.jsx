"use client";
import React from "react";
import ExpandableCards from "../components/ExpandableCards.jsx";
import { myItems } from "../constant/index.jsx";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="relative w-full h-screen text-headline overflow-hidden"
    >
      {/* Two-column container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full px-8 lg:px-16 relative">
        {/* Left column: headline + image */}
        <div className="relative w-full h-full flex">
          {/* Filled text behind the image */}
          <h1 className="absolute lg:top-25 left-8 sm:top-28 sm:left-16 text-2xl sm:text-4xl md:text-5xl lg:text-8xl font-zing text-white z-0 pointer-events-none">
            ABOUT THE CLOUD
          </h1>

          {/* Image in the middle */}
          <img
            src="/src/public/profile_photo.png"
            alt="Background"
            className="absolute left-0 sm:top-36 md:top-40 lg:top-10 w-40 sm:w-52 md:w-64 lg:w-110 z-10"
          />

          {/* Outline text above the image */}
          <div className="absolute lg:top-25 left-8 sm:top-28 sm:left-16 z-20 pointer-events-none">
            <h1
              className="text-2xl sm:text-4xl md:text-5xl lg:text-8xl font-zing text-transparent"
              style={{ WebkitTextStroke: "0.5px white" }}
            >
              ABOUT THE
            </h1>
          </div>
        </div>

        {/* Right column */}
        <div className="relative flex flex-col items-start justify-start lg:top-15 left-8 sm:top-28 sm:left-16 pr-30">
          <p className="pb-15">
            This is all I ever wanted! I will show them, I will show them
            all!This is all I ever wanted! I will show them, I will show them
            all!This is all I ever wanted! I will show them, I will show them
            all!
          </p>

          <ExpandableCards
            items={myItems} // your list of items
            blurStrength="lg" // Tailwind blur: sm, md, lg, xl
            blackOpacity={0.7} // 0 to 1
            animationSpeed={0.25} // seconds
            cardColor="bg-gray-100" // expanded card background
            collapsedTitleColor="text-blue-700"
            collapsedDescriptionColor="text-gray-500"
            collapsedFont="font-medium"
            expandedTitleColor="text-red-600"
            expandedDescriptionColor="text-gray-700"
            expandedFont="font-bold"
            gapBetweenCards="gap-1"
          />
        </div>
      </div>
    </section>
  );
}
