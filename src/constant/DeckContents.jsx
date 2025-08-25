import SwirlAnimation from "../animations/SwirlText.jsx";
import DarkVeil from "../components/DarkVeil.jsx";
import React from "react";

export default function DeckContent() {
  return (
    <section className="p-10 flex flex-col gap-6 text-8xl text-black font-zing">
      <SwirlAnimation
        text="This is animated <br /> across two lines"
        speed={0.04}
      />
      <DarkVeil color="e4d8ff" speed={0.8} attraction={0.7} randomness={true} />
    </section>
  );
}
