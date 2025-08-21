import React from "react";
import Button from "../components/Button"; // adjust path as needed

const Hero = () => {
    const handleHeroButtonClick = () => {
        console.log("Hero button clicked!");
    };

    return (
        <section id="hero" className="relative overflow-hidden">
            <div className="absolute top-0 left-0 z-10"> Hello!!!</div>

            <div className="hero-layout">
                <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
                    <div className="flex flex-col gap-7">
                        <div className="hero-text">
                            <h1>Shaping Designs</h1>
                            <h1>into Real Projects</h1>
                            <h1>that Deliver Results</h1>
                        </div>
                        <p>Hello! I am Albedo!</p>

                        {/* Here is your reusable button */}
                        <Button onClick={handleHeroButtonClick}>Get Started</Button>
                    </div>
                </header>
            </div>
        </section>
    );
};

export default Hero;
