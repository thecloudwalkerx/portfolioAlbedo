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
      className={`fixed w-full left-1/2 py-5 px-5 md:px-20 -translate-x-1/2 z-[100] transition-all ease-in-out
          ${
            scrolled
              ? "top-0 bg-black/70 backdrop-blur-lg border-b border-transparent shadow-sm"
              : "md:top-10 top-0 bg-black/50 backdrop-blur-md border-b border-transparent"
          }`}
      style={{ transitionDuration: "300ms" }}
    >
      <div className="mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="text-[#d9ecff] text-xl md:text-2xl font-semibold hover:scale-105 transition-transform"
          style={{ transitionDuration: "500ms" }}
        >
          Adrian JSM
        </a>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center">
          <ul className="flex space-x-8">
            {navLinks.map(({ link, name }) => (
              <li key={name} className="text-[#d9ecff] relative group">
                <a href={link} className="relative">
                  <span
                    className="group-hover:text-white transition-colors"
                    style={{ transitionDuration: "300ms" }}
                  >
                    {name}
                  </span>
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all"
                    style={{ transitionDuration: "300ms" }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Button with scale only */}
        <a
          href="#contact"
          className="relative group inline-flex items-center justify-center px-5 py-2 rounded-lg border border-transparent text-white font-semibold transition-transform duration-600 ease-in-out hover:scale-105"
        >
          Contact me
        </a>
      </div>
    </header>
  );
};

export default NavBar;
