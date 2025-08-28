"use client";
import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function AboutTheCloud({
  fillX = 100,
  fillOpacity = 0,
  fillStiffness = 100,
  fillDamping = 20,
  fillMass = 2,
  fillEase = "easeOut",

  strokeOpacityStart = 0,
  strokeOpacityEnd = 1,
  strokeDelay = 0.8,
  strokeDuration = 0.4,
  strokeEase = "easeOut",
}) {
  const ref = useRef(null);
  const fillControls = useAnimation();
  const strokeControls = useAnimation();
  const isInView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      fillControls.start({
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: fillStiffness,
          damping: fillDamping,
          mass: fillMass,
        },
      });
      strokeControls.start({
        opacity: strokeOpacityEnd,
        transition: {
          duration: strokeDuration,
          ease: strokeEase,
          delay: strokeDelay,
        },
      });
    } else {
      fillControls.start({ x: fillX, opacity: fillOpacity });
      strokeControls.start({ opacity: strokeOpacityStart });
    }
  }, [
    isInView,
    fillControls,
    strokeControls,
    fillX,
    fillOpacity,
    strokeOpacityEnd,
    strokeOpacityStart,
    fillStiffness,
    fillDamping,
    fillMass,
    strokeDuration,
    strokeEase,
    strokeDelay,
  ]);

  return (
    <div ref={ref} className="relative w-full h-full flex order-1 lg:order-2">
      {/* Static background image */}
      <img
        src="/src/public/profile_photo.png"
        alt="Background"
        className="absolute left-35 sm:top-36 md:top-40 lg:top-10 w-40 sm:w-52 md:w-64 lg:w-110 z-10"
      />

      {/* Animated fill text */}
      <motion.h1
        className="absolute lg:top-25 left-8 sm:top-28 sm:left-60 text-2xl sm:text-4xl md:text-5xl lg:text-8xl font-zing text-headline z-0 pointer-events-none"
        initial={{ x: fillX, opacity: fillOpacity }}
        animate={fillControls}
      >
        ABOUT THE CLOUD
      </motion.h1>

      {/* Stroke text fading in */}
      <motion.div
        className="absolute lg:top-25 left-8 sm:top-28 sm:left-60 z-20 pointer-events-none"
        initial={{ opacity: strokeOpacityStart }}
        animate={strokeControls}
      >
        <h1
          className="text-2xl sm:text-4xl md:text-5xl lg:text-8xl font-zing text-transparent"
          style={{ WebkitTextStroke: "0.5px #e4d8ff" }}
        >
          ABOUT THE CLOUD
        </h1>
      </motion.div>
    </div>
  );
}
