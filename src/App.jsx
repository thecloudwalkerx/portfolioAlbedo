import React from "react";
import Hero from "./sections/Hero.jsx";
import DarkVeil from "./animations/DarkVeil.jsx";

const App = () => {
  return (
    <main>
      <div
        className="absolute inset-0 z-0 transform translate-x-0 translate-y-[-20px] scale-110"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 30%, black 20%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskComposite: "destination-in",
          maskImage:
            "linear-gradient(to right, transparent, black 30%, black 20%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          maskComposite: "intersect",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          maskSize: "100% 100%",
        }}
      >
        <div style={{ height: 500, position: "relative", opacity: 1 }}>
          <DarkVeil />
        </div>
      </div>
      <Hero />
    </main>
  );
};
export default App;
