import React from "react";
import Button from "../components/Button";
import DarkVeil from '../animations/DarkVeil.jsx';

const Hero = () => {
    const handleHeroButtonClick = () => {
        console.log("Hero button clicked!");
    };

    return (
        <section className="relative w-full min-h-screen flex flex-col justify-start px-5 md:px-20 py-10 overflow-hidden">

            {/* DarkVeil Background */}
            <div className="absolute inset-0 z-10 h-[150px]">
                <DarkVeil />
            </div>

            {/* Layer 1: Big Text + Image */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16 w-full relative z-10">

                {/* Left Text */}
                <div className="flex-1 flex flex-col transform transition-all duration-500 md:ml-[205px] ml-0">
                    <h1 className="-mt-9 text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-tight tracking-[1px]" style={{ fontFamily: 'Anton, sans-serif' }}>
                        ALBEDO AND
                    </h1>
                    <h1 className="-mt-9 text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-tight tracking-[1px]" style={{ fontFamily: 'Anton, sans-serif' }}>
                        THE CLOUD
                    </h1>
                </div>

                {/* Image */}
                <div className="flex-1 relative w-full md:w-auto min-w-[150px]">
                    <img
                        src="/src/public/hero_eye.png"
                        alt="Hero"
                        className="w-full sm:w-3/4 md:w-auto max-w-[400px] transform scale-75 md:scale-100 md:translate-x-7 md:translate-y-7 select-none pointer-events-none transition-transform duration-500"
                        draggable={false}
                    />
                </div>
            </div>

            {/* Layer 2: Paragraph */}
            <div className="max-w-full sm:max-w-xl md:max-w-2xl mt-4 md:-mt-16 mx-auto md:mx-0 text-justify p-6 md:p-8 rounded-md relative z-10 bg-black/50 transition-all duration-500">
                <p className="text-base sm:text-base md:text-lg lg:text-lg">
                    This world was never forged in balance. Some are born to greatness, others to shadows. Yet exceptions exist: warmth may touch winter, a bud may bloom on a withered branch, a lone star may pierce the night. Even in disparity, brilliance can arise where least expected.
                </p>
            </div>

            {/* Layer 3: Button */}
            <div className="mt-6 relative z-10 flex justify-center md:justify-start">
                <Button onClick={handleHeroButtonClick}>Get Started</Button>
            </div>

        </section>
    );
};

export default Hero;
