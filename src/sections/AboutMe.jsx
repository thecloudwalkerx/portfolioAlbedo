"use client";
import React from "react";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="relative w-full h-screen text-headline overflow-visible"
    >
      {/* Two-column container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full px-8 lg:px-16 relative">
        {/* Left column: headline + image */}
        <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
          {/* Headline behind image */}
          <h1 className="absolute top-20 left-8 sm:top-28 sm:left-16 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-zing text-white z-0 pointer-events-none">
            ABOUT THE CLOUD
          </h1>

          {/* Image above headline */}
          <img
            src="/src/public/profile_photo.png"
            alt="Background"
            className="absolute top-32 sm:top-36 md:top-40 lg:top-44 w-40 sm:w-52 md:w-64 lg:w-80 z-10"
          />
        </div>

        {/* Right column */}
        <div className="flex flex-col items-start justify-start p-4 lg:p-8">
          <p className="text-xl text-white">Right column content goes here</p>
        </div>
      </div>
    </section>
  );
}
