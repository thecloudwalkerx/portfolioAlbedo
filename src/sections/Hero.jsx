import React from "react";
import Button from "../components/Button";
import DarkVeil from '../animations/DarkVeil.jsx';

const Hero = () => {
    const handleHeroButtonClick = () => {
        console.log("Hero button clicked!");
    };

    return (
        <section className="relative w-full min-h-screen flex flex-col justify-start px-5 md:px-20 py-10 overflow-hidden">

            {/* Top Light Beam */}
            <div className="absolute top-0 left-0 w-full h-[2px] z-20 overflow-hidden">
                {/* White base beam */}
                <div className="w-full h-full bg-white opacity-40 beam-glow"></div>

                {/* Comet / Rocket Light */}
                <div className="absolute top-0 left-[-5%] w-2 h-full rounded-full comet-glow animate-comet">
                    {/* Tail gradient */}
                    <div className="absolute top-0 left-[-50px] w-[50px] h-full bg-gradient-to-r from-white/80 to-white/0 rounded-full"></div>
                </div>
            </div>

            {/* DarkVeil Background */}
            <div className="absolute inset-0 z-0">
                <div style={{ position: 'relative', opacity: 0.5 }}>
                    <DarkVeil
                    />
                </div>
            </div>


            {/* Layer 1: Big Text + Image */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16 w-full relative z-10">
                {/* Left Text */}
                <div className="flex-1 flex flex-col transform transition-all duration-500" style={{ marginLeft: '205px' }}>
                    <h1 className="-mt-9 text-8xl md:text-9xl font-bold leading-tight tracking-[1px] font-anton">ALBEDO AND</h1>
                    <h1 className="-mt-9 text-8xl md:text-9xl font-bold leading-tight tracking-[1px] font-anton">THE CLOUD</h1>
                </div>

                {/* Image */}
                <div className="flex-1 relative w-full md:w-auto min-w-[150px]">
                    <img
                        src="/src/public/hero_eye.png"
                        alt="Hero"
                        className="w-full md:w-auto max-w-[400px] transform scale-75 md:scale-100 md:translate-x-30 md:translate-y-30 select-none pointer-events-none transition-transform duration-500"
                        draggable={false}
                    />
                </div>
            </div>

            {/* Layer 2: Paragraph */}
            <div className="max-w-2xl ml-40 text-justify p-8 rounded-md relative z-10">
                <p className="text-base md:text-lg">
                    This world was never forged in balance. Some are born to greatness, others to shadows. Yet exceptions exist: warmth may touch winter, a bud may bloom on a withered branch, a lone star may pierce the night. Even in disparity, brilliance can arise where least expected.
                </p>
            </div>

            {/* Layer 3: Button */}
            <div className="ml-50 mt-5 relative z-10">
                <Button onClick={handleHeroButtonClick}>Get Started</Button>
            </div>

            {/* Animation keyframes */}
            <style jsx>{`
                @keyframes slide-right {
                    0% { left: -20%; }
                    100% { left: 100%; }
                }
                .animate-slide-right {
                    animation: slide-right 1.5s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default Hero;
