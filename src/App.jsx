import React, { useState, useEffect } from "react";
import Hero from "./sections/Hero.jsx";
import Navbar from "./sections/Navbar.jsx";
import Grain from "./backgrounds/Grain.jsx";
import DarkVeil from "./backgrounds/DarkVeil.jsx";
import AboutMe from "./sections/AboutMe.jsx";
import Skills from "./sections/Skills.jsx";
import Loader from "./sections/Loader.jsx";
import GalaxyParticles from "./backgrounds/GalaxyParticles.jsx";
import TimelineScroll from "./components/TimelineScroll.jsx";

const App = () => {
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate dynamic loading
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 10;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setLoaderFinished(true);
      }
      setProgress(currentProgress);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loaderFinished) {
      const timer = requestAnimationFrame(() => setShowContent(true));
      return () => cancelAnimationFrame(timer);
    }
  }, [loaderFinished]);

  return (
    <main className="relative overflow-x-hidden">
      {/* Background particles */}
      <GalaxyParticles
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        particleCount={1500}
        particleSpread={25}
        speed={0.2}
        particleBaseSize={120}
        sizeRandomness={1.5}
        particleColors={["#ffffff", "#ffeedd", "#99bbff", "#aaddff", "#ffccaa"]}
        moveParticlesOnHover={true}
        particleHoverFactor={2}
      />

      {/* Always visible visual effects */}
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
        speed={0.5}
        attraction={0.65}
        randomness={true}
      />

      {/* Loader overlay */}
      {!loaderFinished && (
        <Loader
          progressValue={progress}
          onFinish={() => setLoaderFinished(true)}
        />
      )}

      {/* Floating header, only after loader */}
      {loaderFinished && (
        <Navbar
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
      )}

      {/* Custom rocket scroll indicator */}
      {loaderFinished && <TimelineScroll />}

      {/* Page content that will blur-reveal */}
      <div
        className={`transition-opacity duration-1000 ease-out ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
        style={{
          filter: showContent ? "blur(0px)" : "blur(20px)",
          transition: "filter 1s ease-out, opacity 1s ease-out",
          position: "relative",
          zIndex: 0,
        }}
      >
        <Hero />
        <AboutMe />
        <Skills />
      </div>
    </main>
  );
};

export default App;
