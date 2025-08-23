import React from "react";
import Hero from "./sections/Hero.jsx";
import DarkVeil from "./animations/DarkVeil.jsx";
import Navbar from "./components/Navbar.jsx";
import HeroParallax, { products } from "./sections/ProductShowcase.jsx";

const App = () => {
  return (
    <main>
      <Navbar />
      <DarkVeil />
      <Hero />
      <HeroParallax products={products} />
    </main>
  );
};
export default App;
