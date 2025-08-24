import Grain from "/src/components/Grain.jsx";
import { BlurReveal } from "../animations/BlurReveal.jsx";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full min-h-screen text-headline overflow-hidden"
    >
      <Grain
        speed={0.2} // particle movement speed
        maxParticles={200} // maximum grains
        opacity={1} // grain opacity
        size={2} // radius of each grain
        blur={1} // blur effect
        color="#500ec0" // grain color
        fadeHeight={20} // top/bottom fade height
      />
      <div className="relative w-full h-full flex flex-col lg:flex-row items-start justify-between px-10 sm:px-15 md:px-25 lg:px-30 py-10 sm:py-10 md:py-25 lg:py-15">
        {/* === Left Group === */}
        <div className="mt-15 sm:mt-20 lg:mt-20 flex-1 flex justify-center items-center">
          {/* Title */}
          <h2 className="font-zing text-6xl md:text-8xl lg:text-tiny text-center">
            ABOUT&nbsp;
            <BlurReveal words="CLOUD" blurStart={30} duration={0.7} />
          </h2>
        </div>

        {/* === Right Group === */}
        <div className="relative mt-15 sm:mt-20 lg:mt-20 flex-1 flex justify-center lg:justify-end lg:mr-40 lg:ml-35">
          {/* Placeholder for future content */}
          <div className="w-56 sm:w-56 md:w-70 lg:w-150 flex text-justify leading-relaxed items-center">
            <p className="text-sm md:text-lg text-muted">
              I navigate the ever-evolving universe of design and development,
              seeking elegance in every pixel and security in every line of
              code.
            </p>
          </div>
        </div>
      </div>
      {/* Footer placeholder for future decorative elements */}
    </section>
  );
}
