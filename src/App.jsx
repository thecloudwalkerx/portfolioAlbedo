import React from "react";
import Hero from "./sections/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Projects from "./sections/Projects.jsx";
import Grain from "./components/Grain.jsx";
import YouLie from "./sections/YouLie.jsx";

const App = () => {
  return (
    <main>
      {/* Background grain */}
      <Grain
        speed={0.2}
        maxParticles={200}
        opacity={1}
        size={2}
        blur={1}
        color="#500ec0"
        fadeHeight={20}
      />

      <Navbar />
      <Hero />
      <Projects />
      <YouLie />
    </main>
  );
};

export default App;
