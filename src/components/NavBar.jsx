import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import NavButton from "/src/components/NavButton";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const NavBar = ({
  hideDuration = 0.3, // seconds
  showDuration = 0.3, // seconds
  hideDelay = 0,
  showDelay = 0,
  topOpacity = 0, // opacity at top/hero
  scrolledOpacity = 0.8, // opacity after scroll
  backdrop = "backdrop-blur-md",
  outlineWidth = "1px",
  outlineColor = "white",
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTop, setIsTop] = useState(true);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Scroll handling with top detection
  useEffect(() => {
    setIsTop(currentScrollY < 50); // top threshold

    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Smooth GSAP animation with overwrite to prevent stuck states
  useEffect(() => {
    if (!navContainerRef.current) return;

    gsap.killTweensOf(navContainerRef.current);

    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -navContainerRef.current.offsetHeight,
      opacity: isNavVisible ? scrolledOpacity : 0,
      duration: isNavVisible ? showDuration : hideDuration,
      delay: isNavVisible ? showDelay : hideDelay,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, [
    isNavVisible,
    hideDuration,
    showDuration,
    hideDelay,
    showDelay,
    scrolledOpacity,
  ]);

  return (
    <div
      ref={navContainerRef}
      className={clsx(
        "fixed inset-x-0 top-4 z-50 h-16 transition-all duration-500 sm:inset-x-6 rounded-xl flex items-center border-solid",
        backdrop,
      )}
      style={{
        backgroundColor: isTop
          ? `rgba(0,0,0,${topOpacity})`
          : `rgba(12, 11, 26,${scrolledOpacity})`,
        borderWidth: outlineWidth,
        borderColor: outlineColor,
      }}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex w-full items-center justify-between p-4">
          {/* Logo + Product button */}
          <div className="flex items-center gap-7">
            <img src="/src/public/albedo.ico" alt="logo" className="w-10" />
            <NavButton
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Nav links + audio button */}
          <div className="flex h-full items-center">
            <div className="hidden md:flex gap-6">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-white font-medium transition-all duration-200 hover:text-violet-400 hover:scale-110"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
