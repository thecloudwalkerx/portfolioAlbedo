"use client";
import React from "react";
import BentoGrid from "../components/BentoGrid.jsx";

export default function Portfolio() {
  return (
    <section className="relative rounded-t-3xl w-screen min-h-screen bg-[#121123] border border-[#121129] overflow-hidden flex flex-col">
      {/* Top Section with two columns */}
      <div className="px-30 mt-20 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        {/* Left Column: Header */}
        <div className="md:flex-1">
          <h1 className="text-8xl text-headline font-anton -mb-1">
            PROJECTS OF
          </h1>
          <h1 className="text-8xl text-headline font-anton mb-6">ALBEDO</h1>

          <div className="w-11/12 h-[1px] bg-headline rounded-2xl opacity-50 mb-6 mx-auto md:mx-0"></div>
        </div>

        {/* Right Column: UL */}
        {/* Right Column: Text lines */}
        <div className="md:flex-none text-right font-nunito text-headline">
          <div>DELIVER PRODUCTS THAT</div>
          <div>CAPTURE ATTENTION,</div>
          <div>INSPIRE ACTION,</div>
          <div>AND DRIVE RESULTS</div>
        </div>
      </div>

      {/* Grid scaled to 150% width but inside 100vw */}
    </section>
  );
}
