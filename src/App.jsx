import React from "react";
import Hero from "./sections/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Projects from "./sections/Projects.jsx";

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
    </main>
  );
};

export default App;
