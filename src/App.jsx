import React from "react";
import Hero from "./sections/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Grain from "./components/Grain.jsx";
import DarkVeil from "./components/DarkVeil.jsx";
import AboutMe from "./sections/AboutMe.jsx";

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

      <Navbar />
      <Hero />
      <AboutMe />
      <Hero />
    </main>
  );
};

export default App;
