"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ========================
// Utility
// ========================
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ========================
// ProductShowcase Section
// ========================
export default function ProductShowcase({ products }) {
  const ref = useRef(null);

  // --- Scroll Progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // --- Spring Config
  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // --- Animations
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );

  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );

  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig,
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );

  // --- Header floating
  const headerFollowFactor = 2.4;
  const headerMaxTranslate = 650;

  const headerTranslateY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      [0, headerMaxTranslate * headerFollowFactor],
    ),
    { stiffness: 300, damping: 30 },
  );

  // --- Split product rows
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  return (
    <section
      id="product-showcase"
      ref={ref}
      className="relative flex flex-col h-[300vh] py-40 overflow-hidden antialiased
                 [perspective:1000px] [transform-style:preserve-3d]"
      aria-labelledby="product-showcase-title"
    >
      {/* Top blur overlay */}
      <div
        className="absolute top-0 left-0 w-full h-40 pointer-events-none z-30
                      bg-gradient-to-b from-white/90 to-transparent dark:from-black/20"
      />

      {/* Floating Header */}
      <motion.div
        style={{ translateY: headerTranslateY }}
        className="relative z-20"
      >
        <Header />
      </motion.div>

      {/* Product Rows */}
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="relative z-10"
      >
        {/* Row 1 */}
        <motion.div className="flex flex-row-reverse gap-20 mb-20">
          {firstRow.map((p) => (
            <ProductCard key={p.title} product={p} translate={translateX} />
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div className="flex flex-row gap-20 mb-20">
          {secondRow.map((p) => (
            <ProductCard
              key={p.title}
              product={p}
              translate={translateXReverse}
            />
          ))}
        </motion.div>

        {/* Row 3 */}
        <motion.div className="flex flex-row-reverse gap-20">
          {thirdRow.map((p) => (
            <ProductCard key={p.title} product={p} translate={translateX} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ========================
// Header
// ========================
export function Header() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-20 md:py-40">
      <h2
        id="product-showcase-title"
        className="text-2xl md:text-7xl font-bold dark:text-white"
      >
        The Ultimate <br /> development studio
      </h2>
      <p className="max-w-2xl mt-8 text-base md:text-xl dark:text-neutral-200">
        We build beautiful products with the latest technologies and frameworks.
        We are a team of passionate developers and designers that love to build
        amazing products.
      </p>
    </div>
  );
}

// ========================
// ProductCard
// ========================
export function ProductCard({ product, translate }) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="relative shrink-0 w-[30rem] h-96 group/product"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail}
          alt={product.title}
          width={600}
          height={600}
          className="absolute inset-0 object-cover object-left-top w-full h-full"
        />
      </a>

      {/* Overlay */}
      <div
        className="absolute inset-0 w-full h-full opacity-0
                      group-hover/product:opacity-80 bg-black pointer-events-none"
      />

      {/* Title */}
      <h3
        className="absolute bottom-4 left-4 text-white opacity-0
                     group-hover/product:opacity-100"
      >
        {product.title}
      </h3>
    </motion.div>
  );
}
// ========================
// Example Products
// ========================
export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];
