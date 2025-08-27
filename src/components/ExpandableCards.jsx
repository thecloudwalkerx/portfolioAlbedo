"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { myItems } from "/src/constant/index.jsx";
import NavButton from "/src/components/NavButton";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      callback(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};

export default function ExpandableCards({
  items = myItems,
  blurStrength = "sm",
  blackOpacity = 0.4,
  animationSpeed = 0.3,
  cardColor = "bg-white",
  collapsedTitleColor = "text-neutral-800 dark:text-neutral-200",
  collapsedDescriptionColor = "text-neutral-600 dark:text-neutral-400",
  collapsedFont = "font-medium",
  expandedTitleColor = "text-neutral-700 dark:text-neutral-200",
  expandedDescriptionColor = "text-neutral-600 dark:text-neutral-400",
  expandedFont = "font-bold",
  gapBetweenCards = "gap-4",
}) {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActive(null);
    };
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationSpeed }}
            className={`fixed inset-0 backdrop-blur-${blurStrength} z-10`}
            style={{ backgroundColor: `rgba(0,0,0,${blackOpacity})` }}
          />
        )}
      </AnimatePresence>

      {/* Expanded Card */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-50 px-4">
            <motion.div
              ref={ref}
              layoutId={`card-${active.title}-${id}`}
              transition={{ duration: animationSpeed }}
              className={cn(
                "w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col overflow-hidden sm:rounded-3xl",
                cardColor,
              )}
            >
              {/* Image */}
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 object-cover object-top sm:rounded-tl-lg sm:rounded-tr-lg"
                />
              </motion.div>

              {/* Horizontal layout: title/subtitle on left, button aligned with title */}
              <div className="p-4 flex flex-col gap-4">
                <div className="flex items-start justify-between md:flex-row md:items-center">
                  {/* Texts */}
                  <div className="flex flex-col gap-2 md:flex-1">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className={`${expandedFont} ${expandedTitleColor}`}
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className={`${expandedFont} ${expandedDescriptionColor}`}
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  {/* Button aligned with title */}
                  {active.ctaLink && (
                    <div className="flex-shrink-0 md:ml-4 mt-2 md:mt-0">
                      <NavButton
                        id={`cta-${active.title}`}
                        title={active.buttonText || active.ctaText || "Action"}
                        containerClass="w-max"
                        rightIcon={null}
                        leftIcon={null}
                        onClick={() => window.open(active.ctaLink, "_blank")}
                      />
                    </div>
                  )}
                </div>

                {/* Additional content */}
                {active.content && (
                  <motion.div
                    className={`overflow-auto max-h-40 md:max-h-fit ${expandedDescriptionColor}`}
                    layout
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card List */}
      <ul
        className={cn(
          "max-w-2xl mx-auto w-full grid",
          "grid-cols-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-1",
          gapBetweenCards,
        )}
      >
        {items.map((item) => (
          <motion.li
            key={item.title}
            layoutId={`card-${item.title}-${id}`}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-gray-800 rounded-xl cursor-pointer"
            onClick={() => setActive(item)} // <-- move onClick here
          >
            <div className="flex gap-4 flex-col md:flex-row items-center w-full">
              {item.src && (
                <motion.img
                  layoutId={`image-${item.title}-${id}`}
                  src={item.src}
                  alt={item.title}
                  className="h-20 w-20 md:h-14 md:w-14 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <motion.h3
                  layoutId={`title-${item.title}-${id}`}
                  className={`${collapsedFont} ${collapsedTitleColor} text-center md:text-left`}
                >
                  {item.title}
                </motion.h3>
                {item.description && (
                  <motion.p
                    layoutId={`description-${item.description}-${id}`}
                    className={`${collapsedFont} ${collapsedDescriptionColor} text-center md:text-left`}
                  >
                    {item.description}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}
