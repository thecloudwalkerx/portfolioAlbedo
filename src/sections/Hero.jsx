import Button from "/src/components/Button.jsx";
import RotatingText from "/src/animations/RotatingText.jsx";
import SplitText from "/src/animations/SplitText.jsx";
import LogoLoop from "/src/animations/LogoLoop.jsx";
import { heroLogos } from "../constant/index.jsx";
import { roles } from "../constant/index.jsx";

export default function Hero() {
  const handleHeroButtonClick = () => console.log("Hero button clicked!");
  const handleAnimationComplete = () =>
    console.log("All letters have animated!");

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen text-headline overflow-hidden"
    >
      <div className="relative w-full h-full flex flex-col lg:flex-row items-start justify-between px-10 md:px-20 lg:px-40 py-10 md:py-20 lg:py-25">
        {/* === Left Group === */}
        <div className="mt-20 md:mt-12 lg:mt-35 flex-1 max-w-xl">
          {/* First Line */}
          <h1 className="font-zing text-6xl md:text-8xl whitespace-nowrap">
            ALBEDO AND
          </h1>

          {/* RotatingText Line */}
          <h1 className="font-zing text-6xl md:text-8xl leading-tight mt-2 flex items-center">
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
          <p className="text-sm md:text-lg mt-4">
            Greetings, I am Albedo. I serve as a Senior Visual Artist and a
            Frontend Developer. Verily, I am also an aspiring Security Engineer.
          </p>

          {/* CTA Button */}
          <div className="mt-4">
            <Button onClick={handleHeroButtonClick}>Learn More</Button>
          </div>
        </div>

        {/* === Right Group === */}
        <div className="relative mt-15 lg:mt-35 flex-1 flex justify-center lg:justify-end lg:mr-40">
          {/* Eye Image */}
          <div className="relative w-56 md:w-70 lg:w-80">
            <video
              src="/src/public/hero_eye.webm"
              autoPlay
              muted
              loop
              playsInline
              draggable="false"
              className="w-full h-auto"
            ></video>

            {/* Roles List (staircase effect) */}
            <ul className="absolute top-0 left-20 md:left-26 lg:left-50 flex flex-col min-w-[250px] md:min-w-[280px]">
              {roles.map((role, idx) => (
                <li key={idx} className={role.offset}>
                  <SplitText
                    text={role.text}
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
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* === Logo Loop === */}
      <div className="absolute bottom-10 md:bottom-15 lg:bottom-20 left-0 w-full flex justify-center">
        <div className="overflow-hidden relative h-12">
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
      </div>
    </section>
  );
}
