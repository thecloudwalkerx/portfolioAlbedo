import { BlurReveal } from "../animations/BlurReveal.jsx";
import { useRef } from "react";

export default function YouLie() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="section-three"
      className="snap-start relative w-full text-headline overflow-hidden
                 px-6 sm:px-10 md:px-16 lg:px-40 xl:px-32 py-32
                 bg-headline rounded-t-[6rem] shadow-xl"
    >
      <div className="relative flex flex-col items-center justify-center text-center">
        <h2 className="m-0 font-zing text-6xl md:text-8xl lg:text-[120px] z-10">
          <BlurReveal words="SECTION THREE" blurStart={40} duration={0.8} />
        </h2>
        <p className="mt-6 text-muted text-lg max-w-2xl">
          This is a placeholder for your next section content.
        </p>
      </div>
    </section>
  );
}
