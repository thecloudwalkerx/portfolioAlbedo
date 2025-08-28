"use client";

import React, { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { myItems } from "/src/constant/index.jsx";

// Utility to merge Tailwind classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ----------------- CONFIGURABLE CLASSES ----------------- //
const UL_CLASSES =
  "max-w-2xl mx-auto w-full grid grid-cols-1 gap-1 sm:gap-2 md:gap-3"; // Grid gap responsive
const LI_CLASSES =
  "flex flex-row justify-start items-center hover:bg-neutral-50 dark:hover:bg-gray-800 rounded-xl cursor-pointer"; // Base card styling
const PADDING_CLASSES = "px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3"; // Responsive padding inside card
const IMAGE_CLASSES =
  "h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-lg object-cover flex-shrink-0"; // Responsive image sizes
const TITLE_CLASSES =
  "font-medium text-violet-400 text-sm sm:text-base md:text-lg text-left"; // Title font + color + responsive size
const DESCRIPTION_CLASSES =
  "font-medium text-gray-200 text-xs sm:text-sm md:text-base text-left"; // Description font + color + responsive size
// --------------------------------------------------------- //

export default function CollapsedCards({
  items = myItems,
  burstAnimationDuration = 0.5,
}) {
  const [burstingCard, setBurstingCard] = useState(null); // Tracks which card is bursting
  const id = useId();

  const handleClick = (item) => {
    setBurstingCard(item.title); // Start burst animation
    setTimeout(() => {
      window.open(item.ctaLink || "#", "_blank"); // Open link in new tab
      setBurstingCard(null); // Reset burst state
    }, burstAnimationDuration * 1000);
  };

  return (
    <ul className={UL_CLASSES}>
      {items.map((item) => (
        <AnimatePresence key={item.title}>
          {!burstingCard || burstingCard !== item.title ? (
            <motion.li
              layoutId={`card-${item.title}-${id}`}
              className={`${LI_CLASSES} ${PADDING_CLASSES}`} // Combine base styling with padding
              onClick={() => handleClick(item)}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(8px)" }} // Burst animation
              transition={{ duration: burstAnimationDuration }}
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
                <motion.h3
                  layoutId={`title-${item.title}-${id}`}
                  className={TITLE_CLASSES}
                >
                  {item.title}
                </motion.h3>
                {item.description && (
                  <motion.p
                    layoutId={`description-${item.description}-${id}`}
                    className={DESCRIPTION_CLASSES}
                  >
                    {item.description}
                  </motion.p>
                )}
              </div>
            </motion.li>
          ) : null}
        </AnimatePresence>
      ))}
    </ul>
  );
}
