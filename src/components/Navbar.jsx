import { useState, useEffect } from "react";
import { navLinks } from "../constant/index.jsx";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full left-1/2 py-5 px-5 md:px-20 -translate-x-1/2 z-[100] transition-all duration-300 ease-in-out
    ${
      scrolled
        ? "top-0 bg-black/50 backdrop-blur-lg border-b border-transparent shadow-sm"
        : "md:top-10 top-0 bg-black/40 backdrop-blur-md border-b border-transparent"
    }`}
    >
      <div className="mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center text-headline text-xl md:text-2xl font-semibold transition-transform duration-300 hover:scale-105"
        >
          <img
            src="src/public/albedo.ico"
            alt="Logo"
            className="w-8 h-8 md:w-10 md:h-10 mr-2"
          />
          Arubedo
        </a>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center">
          <ul className="flex space-x-8">
            {navLinks.map(({ link, name }) => (
              <li key={name} className="text-headline relative group">
                <a href={link} className="relative">
                  <span className="transition-colors duration-300 group-hover:text-[#9566ff]">
                    {name}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Portal Button */}
        <a href="#contact" className="flex group">
          <div
            className="px-5 py-2 rounded-lg text-headline
                  transition-transform duration-300 ease-in-out
                  group-hover:scale-105"
          >
            <span className="transition-colors duration-300 group-hover:text-[#9566ff]">
              Portal!
            </span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
