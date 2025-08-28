import React from "react";
import SwirlAnimation from "../animations/SwirlText.jsx";
import CollapsedCards from "../components/CollapsedCards.jsx";

export default function DeckContent() {
  return (
    <section className="p-10 flex flex-col gap-6 text-8xl text-black font-zing">
      <CollapsedCards />
      <SwirlAnimation
        text="This is animated <br /> across two lines"
        duration={0.8} // each word/char animates 0.8s
        stagger={0.05} // words/characters start 0.05s apart
        mode="line" //line, word
      />
    </section>
  );
}
