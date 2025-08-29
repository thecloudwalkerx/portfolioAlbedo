"use client";

import React from "react";
import SwirlAnimation from "../animations/SwirlText.jsx";
import SwitchText from "../animations/SwitchText.jsx";

export default function DeckContent() {
  return (
    <section className="relative lg:py-20 lg:px-50 text-2xl flex flex-col gap-6 font-zing">
      <SwirlAnimation
        className="text-[f3f4e5] flex text-7xl flex-col gap-6"
        text="TIMELINE OF ALBEDO"
        duration={1.6}
        stagger={0.8}
        mode="line"
      />

      <SwitchText
        text="ABOUT THE CLOUD"
        slideDistance={120} // how far it slides in from the right
        blurAmount={6} // initial blur in pixels
        transitionDuration={0.8} // duration of animation
        staggerDuration={0.05} // delay between characters
        className="text-6xl font-zing text-headline"
        slideDirection="left"
      />
    </section>
  );
}
