"use client";

import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { motion, useInView } from "framer-motion";
import EyeButton from "/src/components/EyeButton";
import { BentoCards } from "/src/constant/index.jsx";

/* ------------------ BentoTilt ------------------ */
const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;
    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;
    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`,
    );
  };

  const handleMouseLeave = () => setTransformStyle("");

  return (
    <div
      ref={itemRef}
      className={className}
      style={{ transform: transformStyle }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

/* ------------------ Animated Wrapper ------------------ */
const AnimatedCardWrapper = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, rotateX: 25, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, rotateX: 0, scale: 1, y: 0 }
          : { opacity: 0, rotateX: 25, scale: 0.9, y: 50 }
      }
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

/* ------------------ BentoCard ------------------ */
const BentoCard = ({ src, title, description }) => {
  return (
    <div className="relative w-full h-full rounded-md overflow-hidden group">
      {src ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-red-400" />
      )}

      <div className="relative z-10 flex flex-col justify-between w-full h-full p-5 text-blue-50">
        {(title || description) && (
          <div>
            {title && (
              <h1 className="bento-title special-font relative inline-flex overflow-hidden text-lg md:text-2xl font-bold">
                {/* First title (goes up) */}
                <span className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[120%] group-hover:skew-y-12">
                  {title}
                </span>
                {/* Second title (comes from down) */}
                <span className="absolute translate-y-[130%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                  {title}
                </span>
              </h1>
            )}

            {description && (
              <p className="mt-3 max-w-full text-xs md:text-base">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="relative mt-4 flex justify-start">
          <EyeButton leftIcon={<TiLocationArrow />} children="Coming Soon" />
        </div>
      </div>
    </div>
  );
};

/* ------------------ BentoGrid ------------------ */
const BentoGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
      {/* Row 1 */}
      <AnimatedCardWrapper className="lg:col-span-3">
        <BentoTilt className="w-full h-64 md:h-80 lg:h-96">
          <BentoCard {...BentoCards[0]} />
        </BentoTilt>
      </AnimatedCardWrapper>

      {/* Row 2 */}
      <AnimatedCardWrapper className="lg:col-span-1">
        <BentoTilt className="w-full pl-20 h-64 md:h-80 lg:h-full">
          <BentoCard {...BentoCards[1]} />
        </BentoTilt>
      </AnimatedCardWrapper>
      <div className="lg:col-span-2 grid grid-rows-2 gap-4">
        <AnimatedCardWrapper>
          <BentoTilt className="w-full pr-20 h-64 md:h-80 lg:h-100">
            <BentoCard {...BentoCards[2]} />
          </BentoTilt>
        </AnimatedCardWrapper>
        <AnimatedCardWrapper>
          <BentoTilt className="w-full pl-20 h-64 md:h-80 lg:h-full">
            <BentoCard {...BentoCards[3]} />
          </BentoTilt>
        </AnimatedCardWrapper>
      </div>

      {/* Row 3 */}
      <AnimatedCardWrapper className="lg:col-span-2">
        <BentoTilt className="w-full pr-20 h-64 md:h-80 lg:h-96">
          <BentoCard {...BentoCards[4]} />
        </BentoTilt>
      </AnimatedCardWrapper>
      <AnimatedCardWrapper className="lg:col-span-1">
        <BentoTilt className="w-full h-64 md:h-80 lg:h-96">
          <BentoCard {...BentoCards[5]} />
        </BentoTilt>
      </AnimatedCardWrapper>
    </div>
  );
};

export default BentoGrid;
