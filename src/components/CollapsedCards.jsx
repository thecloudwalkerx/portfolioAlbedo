"use client";

import React, { useId, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { myItems } from "/src/constant/index.jsx";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const UL_CLASSES =
  "max-w-2xl mx-auto w-full grid grid-cols-1 gap-1 sm:gap-2 md:gap-1 lg:gap-4";
const LI_CLASSES =
  "flex flex-row justify-start items-center hover:bg-neutral-50 dark:hover:bg-gray-800 rounded-xl cursor-pointer group";
const PADDING_CLASSES = "px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-1";
const IMAGE_CLASSES =
  "h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-auto lg:w-14 object-cover flex-shrink-0";
const TITLE_CLASSES =
  "font-medium text-violet-400 text-sm sm:text-base md:text-lg text-left overflow-hidden relative z-10";
const DESCRIPTION_CLASSES =
  "font-medium pl-3 text-gray-200 text-xs sm:text-sm md:text-base text-left mt-1";

export default function CollapsedCards({
  items = myItems,
  burstAnimationDuration = 0.5,
}) {
  const [burstingCard, setBurstingCard] = useState(null);
  const id = useId();
  const containerRef = useRef(null);

  // Detect if container is in view
  const isInView = useInView(containerRef, { margin: "-100px" });

  const handleClick = (item) => {
    window.open(item.ctaLink || "#", "_blank"); // open immediately
    setBurstingCard(item.title); // still trigger animation
    setTimeout(() => setBurstingCard(null), burstAnimationDuration * 1000);
  };

  return (
    <ul className={UL_CLASSES} ref={containerRef}>
      {items.map((item, index) => (
        <AnimatePresence key={item.title}>
          {!burstingCard || burstingCard !== item.title ? (
            <motion.li
              layoutId={`card-${item.title}-${id}`}
              className={`${LI_CLASSES} ${PADDING_CLASSES}`}
              onClick={() => handleClick(item)}
              initial={{ opacity: 0, scale: 1.2, filter: "blur(8px)" }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, scale: 1.2, filter: "blur(8px)" }
              }
              exit={{ opacity: 0, scale: 1.2, filter: "blur(8px)" }}
              transition={{
                duration: burstAnimationDuration,
                delay: index * 0.15,
              }}
            >
              {item.src && (
                <motion.img
                  layoutId={`image-${item.title}-${id}`}
                  src={item.src}
                  alt={item.title}
                  className={IMAGE_CLASSES}
                />
              )}

              <div className="flex-1 ml-2 sm:ml-3 md:ml-4">
                <span className="relative inline-flex overflow-hidden font-nunito font-medium text-violet-400 text-sm sm:text-base md:text-lg">
                  <span className="inline-block translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[160%] group-hover:skew-y-12">
                    {item.title}
                  </span>
                  <span className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0 text-violet-400">
                    {item.title}
                  </span>
                </span>
                {item.description && (
                  <p className={DESCRIPTION_CLASSES}>{item.description}</p>
                )}
              </div>
            </motion.li>
          ) : null}
        </AnimatePresence>
      ))}
    </ul>
  );
}
