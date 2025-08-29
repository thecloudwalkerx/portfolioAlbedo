"use client";

import React from "react";
import SwirlAnimation from "../animations/SwirlText.jsx";
import SwitchText from "../animations/SwitchText.jsx";

export default function DeckContent() {
  return (
    <section className="relative lg:py-20 lg:px-50 text-2xl flex flex-col gap-6">
      <SwirlAnimation
        className="text-[f3f4e5] flex text-7xl flex-col gap-6 font-zing"
        text="TIMELINE OF ALBEDO"
        duration={1.6}
        stagger={0.8}
        mode="line"
      />
      <p className="font-nunito text-[20px] text-center py-5">
        My journey so far has been shaped by curiosity, learning, and growth.
        From the first steps and to the last experiences defined, each moment
        has contributed to who I am today. Explore the milestones and my growth,
        unfolded by highlighting the moments that have guided me toward my
        passions and ambitions.
      </p>
      <SwitchText
        text="2019 - Visual Artist"
        slideDistance={120} // how far it slides in from the right
        blurAmount={6} // initial blur in pixels
        transitionDuration={0.8} // duration of animation
        staggerDuration={0.05} // delay between characters
        className="text-4xl font-zing text-headline text-left"
        slideDirection="left"
      />{" "}
      <p className="font-nunito text-[20px] text-left">
        Youth Vogue, hired me as a graphics designer,.
      </p>
    </section>
  );
}
