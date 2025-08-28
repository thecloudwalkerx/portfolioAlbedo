import EyeButton from "/src/components/EyeButton.jsx";
import RotatingText from "/src/animations/RotatingText.jsx";
import SplitText from "/src/animations/SplitText.jsx";
import LogoLoop from "/src/components/LogoLoop.jsx";
import { heroLogos } from "../constant/index.jsx";
import { roles } from "../constant/index.jsx";
import { useEffect, useRef } from "react";

export default function Hero() {
  const eyeRef = useRef(null);
  const handleHeroButtonClick = () => console.log("Hero button clicked!");
  const handleAnimationComplete = () =>
    console.log("All letters have animated!");

  useEffect(() => {
    window.heroEye = eyeRef.current; // expose to loader
  }, []);

  return (
    <section
      id="albedo"
      className="relative w-full min-h-screen text-headline overflow-hidden"
    >
      {/* Main content container */}
      <div className="w-full h-full flex flex-col lg:flex-row justify-between items-start lg:items-center pt-30 md:pt-35 lg:pt-50 px-10 sm:px-10 md:px-20 lg:px-30">
        <div className="flex-1 lg:flex-[0_0_55%] relative">
          {/* Wrapper for text + eye */}
          <div className="relative w-full">
            {/* Eye Video (absolute behind headlines) */}
            <video
              ref={eyeRef}
              src="/src/public/hero_eye.webm"
              autoPlay
              muted
              loop
              playsInline
              draggable="false"
              className="
        absolute
        z-0
        left-1/2 -translate-x-1/2
        top-10 sm:top-5
        w-[220px] sm:w-[280px] md:w-[280px] lg:w-[280px]
        opacity-85
        lg:left-[58%] md:left-[74%] lg:top-[-20px] lg:translate-x-0
      "
            />

            <div className="relative z-10">
              <h1 className="font-zing text-7xl sm:text-6xl md:text-8xl lg:text-9xl whitespace-nowrap">
                ALBEDO AND
              </h1>

              <h1
                className="relative top-15 lg:top-0
               md:left-10 lg:left-10 font-zing text-7xl sm:text-6xl md:text-8xl lg:text-9xl lg:flex lg:items-center md:flex md:items-center md:-mt-3 lg:-mt-5"
              >
                THE
                <RotatingText
                  texts={["CLOUD", "WALKER"]}
                  mainClassName="md:justify-center lg:justify-center"
                  staggerFrom="last"
                  initial={{ y: "-200%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "150%" }}
                  staggerDuration={0.015}
                  splitLevelClassName="overflow-hidden md:ml-5 lg:ml-5"
                  transition={{ type: "spring", damping: 60, stiffness: 300 }}
                  rotationInterval={4000}
                />
              </h1>
            </div>
          </div>

          {/* Details + EyeButton below */}
          <div className="relative top-25 md:top-35 lg:top-0">
            <p className="relative font-nunito z-10 max-w-full lg:max-w-[70%] text-base sm:text-lg leading-relaxed mt-6">
              Greetings, I am Albedo. I am an undergraduate computer science
              student with a strong focus on cybersecurity and secure
              communication systems. My academic journey has exposed me to
              cryptography, steganography, and advanced computing concepts,
              while my projects explore the intersection of design, engineering,
              and security.
            </p>

            <div className="relative z-10 mt-5">
              <EyeButton onClick={handleHeroButtonClick}>Learn More</EyeButton>
            </div>
          </div>
        </div>

        {/* === Right Group === */}
        <div className="flex-1 lg:flex-[0_0_45%] flex justify-center lg:justify-end mt-10 lg:mt-0">
          {/*<video*/}
          {/*  src="/src/public/hero_eye.webm"*/}
          {/*  autoPlay*/}
          {/*  muted*/}
          {/*  loop*/}
          {/*  playsInline*/}
          {/*  draggable="false"*/}
          {/*  className="w-full max-w-[400px] lg:max-w-[300px] lg:mr-30 h-auto"*/}
          {/*/>*/}
        </div>
      </div>

      {/* === Logo Loop pinned at bottom === */}
      <div className="absolute w-full bottom-0 pb-20 md:pb-30">
        <LogoLoop
          width="100%"
          logos={heroLogos}
          speed={35}
          direction="left"
          logoHeight={40}
          gap={80}
          hoverMode="slow"
          scaleOnHover={true}
          fadeOut={true}
          fadeOutColor="#0c0b1a"
          ariaLabel="Clients"
        />
      </div>
    </section>
  );
}
