import SwirlAnimation from "../animations/SwirlText.jsx";
import DarkVeil from "../components/DarkVeil.jsx";
import React from "react";

export default function DeckContent() {
  return (
    <section className="p-10 flex flex-col gap-6 text-8xl text-black font-zing">
      <SwirlAnimation
        text="This is animated <br /> across two lines"
        duration={0.8} // each word/char animates 0.8s
        stagger={0.05} // words/characters start 0.05s apart
        mode="line" //line, word
      />
    </section>
  );
}
