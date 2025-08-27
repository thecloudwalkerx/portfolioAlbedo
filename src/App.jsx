import React, { useEffect, useState } from "react";
import Hero from "./sections/Hero.jsx";
import NavBar from "./components/NavBar.jsx";
import Grain from "./components/Grain.jsx";
import DarkVeil from "./components/DarkVeil.jsx";
import AboutMe from "./sections/AboutMe.jsx";
import ExperimentalSection from "./sections/ExperimentalSection.jsx";
import { motion, AnimatePresence } from "framer-motion";
import HeroLoader from "./sections/HeroLoader.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // loader duration
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [loading]);

  return (
    <main className="relative w-full">
      {/* NavBar outside blur */}
      <NavBar
        hideDuration={0.2}
        showDuration={0.3}
        hideDelay={0.2}
        showDelay={0.1}
        topOpacity={0}
        scrolledOpacity={1}
        backdrop="backdrop-blur-lg"
        outlineWidth="1px"
        outlineColor="#121129"
      />

      {/* Animated blur wrapper */}
      <motion.div
        initial={{ filter: "blur(20px)" }}
        animate={{ filter: loading ? "blur(20px)" : "blur(0px)" }}
        transition={{ duration: 1.2 }}
      >
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

        <Hero />
        <AboutMe />
        <ExperimentalSection />
      </motion.div>

      {/* Loader overlay */}
      <HeroLoader loading={loading} />
    </main>
  );
};

export default App;
