"use client";
import React from "react";
import BentoGrid from "../components/BentoGrid.jsx";

export default function Portfolio() {
  return (
    <section className="relative rounded-t-3xl w-screen min-h-screen bg-[#0C0B1A] border border-[#121129] overflow-hidden flex flex-col">
      {/* Header */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white text-center mt-8 mb-8">
        HELLO
      </h1>

      {/* Grid scaled to 150% width but inside 100vw */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-[150%] scale-90">
          <BentoGrid />
        </div>
      </div>
    </section>
  );
}
