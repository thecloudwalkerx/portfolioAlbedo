import { useRef } from "react";
import { BlurReveal } from "../animations/BlurReveal.jsx";
import { useMagneticScroll } from "../hooks/useMagneticScroll.jsx";

export default function Projects() {
  const sectionRef = useRef(null);

  useMagneticScroll(sectionRef, { factor: 0.5, clamp: 40, smooth: 700 });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="snap-start relative w-full text-headline overflow-hidden
             px-6 sm:px-10 md:px-16 lg:px-40 xl:px-32 lg:pt-40"
    >
      <div className="relative w-full flex flex-col lg:flex-row items-start justify-center gap-10 lg:gap-20">
        {/* Left group */}
        <div className="flex-1 flex flex-col items-center lg:items-start gap-6">
          <h2 className="m-0 font-zing text-6xl md:text-8xl lg:text-[120px] text-center lg:text-left z-10">
            ABOUT&nbsp;
            <BlurReveal words="CLOUD" blurStart={30} duration={0.7} />
          </h2>

          <img
            src="src/public/profile_photo.png"
            alt="My Photo"
            className="w-40 sm:w-48 md:w-48 lg:w-80 object-contain m-0"
          />
        </div>

        {/* Right group */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="w-56 sm:w-56 md:w-70 lg:w-[36rem] flex text-justify leading-relaxed items-center">
            <p className="m-0 text-sm md:text-lg text-muted">
              I navigate the ever-evolving universe of design and development,
              seeking elegance in every pixel and security in every line of
              code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
