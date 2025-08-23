import Button from "/src/components/Button.jsx";
import RotatingText from "/src/animations/RotatingText.jsx";
import SplitText from "/src/animations/SplitText.jsx";
import LogoLoop from "/src/animations/LogoLoop.jsx";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];

export default function Hero() {
  const handleHeroButtonClick = () => console.log("Hero button clicked!");
  const handleAnimationComplete = () =>
    console.log("All letters have animated!");

  return (
    <section className="relative w-full min-h-screen text-headline overflow-hidden">
      <div className="relative w-full h-full">
        {/* === Left Group: Headline + RotatingText + Intro + Button === */}
        <div className="absolute top-16 left-6 sm:top-20 sm:left-8 md:top-24 md:left-12 lg:top-32 lg:left-16 transition-all duration-500 ease-in-out">
          {/* First Line */}
          <h1 className="font-zing text-tiny lg:text-tiny">ALBEDO AND</h1>

          {/* RotatingText Line */}
          <h1 className="font-zing text-tiny lg:text-tiny leading-tiny mt-2 flex items-center gap-2">
            THE
            <RotatingText
              texts={["CLOUD", "WALKER"]}
              mainClassName="px-2 lg:px-3 text-headline overflow-hidden py-1 justify-center rounded-lg"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.015}
              splitLevelClassName="overflow-hidden pb-1"
              transition={{ type: "spring", damping: 50, stiffness: 400 }}
              rotationInterval={2000}
            />
          </h1>

          {/* Intro Paragraph */}
          <p className="text-sm md:text-lg max-w-md mt-4">
            Greetings, I am Albedo. I serve as a Senior Visual Artist and a
            Frontend Developer. Verily, I am also an aspiring Security Engineer.
          </p>

          {/* CTA Button */}
          <div className="mt-4">
            <Button onClick={handleHeroButtonClick}>Learn More</Button>
          </div>
        </div>

        {/* === Right Group: Eye + List === */}
        <div className="absolute top-48 right-12 sm:top-44 sm:right-8 md:top-48 md:right-10 lg:top-52 lg:right-24 z-0">
          {/* Eye Image */}
          <div className="w-56 lg:w-56 md:w-48 sm:w-40 scale-150 lg:scale-150 md:scale-125 sm:scale-110 relative">
            <img src="/src/public/hero_eye.png" alt="Hero Eye" />
          </div>

          {/* Role List */}
          <ul className="absolute top-0 left-[185px] flex flex-col gap-2 min-w-[250px]">
            <li className="ml-0">
              <SplitText
                text="• Security Engineer"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                duration={1.5}
                delay={10}
                ease="elastic.out(0.1, 0.3)"
                onLetterAnimationComplete={handleAnimationComplete}
                className="inline-block"
              />
            </li>
            <li className="ml-8">
              <SplitText
                text="• Senior Visual Artist"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                duration={1.5}
                delay={10}
                ease="elastic.out(0.1, 0.3)"
                onLetterAnimationComplete={handleAnimationComplete}
                className="inline-block"
              />
            </li>
            <li className="ml-16">
              <SplitText
                text="• UI/UX Designer"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                duration={1.5}
                delay={10}
                ease="elastic.out(0.1, 0.3)"
                onLetterAnimationComplete={handleAnimationComplete}
                className="inline-block"
              />
            </li>
            <li className="ml-20">
              <SplitText
                text="• Web Developer"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                duration={1.5}
                delay={10}
                ease="elastic.out(0.1, 0.3)"
                onLetterAnimationComplete={handleAnimationComplete}
                className="inline-block"
              />
            </li>
          </ul>
        </div>

        {/* === Logo Loop === */}
        <div className="absolute top-[180px] left-0 w-full flex justify-center sm:top-[140px] md:top-[160px] lg:top-[180px]">
          <div className="overflow-hidden relative h-24 md:h-32">
            <LogoLoop
              width="100%"
              logos={techLogos}
              speed={35}
              direction="left"
              logoHeight={48}
              gap={120}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#2e0b70"
              ariaLabel="Technology partners"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
