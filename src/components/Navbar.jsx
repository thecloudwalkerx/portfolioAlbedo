import { useState, useEffect } from "react";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Work", link: "#work" },
    { name: "Experience", link: "#experience" },
    { name: "Skills", link: "#skills" },
    { name: "Testimonials", link: "#testimonials" },
  ];

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
            ? "top-0 bg-black/70 backdrop-blur-lg border-b border-transparent shadow-sm"
            : "md:top-10 top-0 bg-black/50 backdrop-blur-md border-b border-transparent"
        }`}
    >
      <div className="mx-auto flex items-center justify-between">
        <a
          href="#hero"
          className="text-[#d9ecff] text-xl md:text-2xl font-semibold transition-transform duration-300 hover:scale-105"
        >
          Adrian JSM
        </a>

        <nav className="hidden lg:flex items-center">
          <ul className="flex space-x-8">
            {navLinks.map(({ link, name }) => (
              <li key={name} className="text-[#d9ecff] relative group">
                <a href={link} className="relative">
                  <span className="transition-colors duration-300 group-hover:text-white">
                    {name}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className="flex group">
          <div className="px-5 py-2 rounded-lg bg-white/90 text-black group-hover:bg-black/60 transition-colors duration-300">
            <span className="group-hover:text-white transition-colors duration-300">
              Contact me
            </span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
