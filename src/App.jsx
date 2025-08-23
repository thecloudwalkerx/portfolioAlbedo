import React from "react";
import Hero from "./sections/Hero.jsx";
import DarkVeil from "./animations/DarkVeil.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <main>
      <Navbar />
      <DarkVeil />
      <Hero />
    </main>
  );
};
export default App;
