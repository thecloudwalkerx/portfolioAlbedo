import React from "react";
import Hero from "./sections/Hero.jsx";
import NavBar from "./components/NavBar.jsx";
import Grain from "./components/Grain.jsx";
import DarkVeil from "./components/DarkVeil.jsx";
import AboutMe from "./sections/AboutMe.jsx";
import ExperimentalSection from "./sections/ExperimentalSection.jsx";

// PLEASE CHANGE THE HEADER TO ZENTRYS HEADER
// MAKE IT FLOATABLE AND FIX THE BUTTON.
//
//     ADD A LOADING SCREEN WHERE THE EYE WILL SHOW
// CLOSING TO OPENING ANIMATION AND THEN
// IT WILL HAVE FULL BLACK OVERLAY, THINK OF MORE ANIMATION
// ADD MORE TAILWIND LIKE ANIMATIONS TO MAKE THE WEBSITE LIVE

const App = () => {
  return (
    <main>
      <Grain
        speed={0.4}
        maxParticles={50}
        opacity={0.5}
        size={3}
        blur={0.5}
        color="#500ec0"
        fadeHeight={100}
      />

      <DarkVeil
        color="#500ec0"
        speed={0.8}
        attraction={0.7}
        randomness={true}
      />

      <NavBar
        hideDuration={0.2} // seconds to hide navbar
        showDuration={0.3} // seconds to show navbar
        hideDelay={0.2} // optional delay before hiding
        showDelay={0.1} // optional delay before showing
        topOpacity={0} // navbar opacity when at hero (0 = fully transparent)
        scrolledOpacity={1} // navbar opacity when scrolled down
        backdrop="backdrop-blur-lg" // Tailwind backdrop blur class
        outlineWidth="1px" // outline thickness
        outlineColor="#121129" // outline color
      />

      <Hero />
      <AboutMe />
      <ExperimentalSection />
    </main>
  );
};

export default App;
