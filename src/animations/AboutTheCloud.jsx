"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import html2canvas from "html2canvas";
import imagesLoaded from "imagesloaded";

gsap.registerPlugin(ScrollTrigger);

export default function AboutTheCloud({
  // your existing props
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

  // disintegration options (tweak as needed)
  shardCount = 75,
  repeatPerPixel = 3,
  scatterRadius = 40, // px displacement per shard
  maxRotate = 30, // deg
  scrub = 1,
  scrollDistanceVH = 200, // total scroll distance controlling the effect
  captureDelayMs = 0, // delay before capturing after in-view
}) {
  const rootRef = useRef(null); // whole section container
  const imgRef = useRef(null); // the photo element
  const layerRef = useRef(null); // canvas layer mount node
  const timelinesRef = useRef([]); // keep TLs for cleanup
  const canvasesRef = useRef([]); // created canvases for cleanup

  const fillControls = useAnimation();
  const strokeControls = useAnimation();

  const isInView = useInView(rootRef, { amount: 0.3 });

  // ---- framer fill + stroke (your existing behavior) ----
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

  // ---- disintegrate on scroll ----
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!imgRef.current || !layerRef.current || prefersReduced) {
      return; // Skip heavy effect for reduced motion
    }

    let isCancelled = false;

    // Ensure the image is fully loaded before capture
    const loader = imagesLoaded(imgRef.current);

    const buildEffect = async () => {
      if (isCancelled) return;

      // Optional small delay if your layout shifts on mount
      if (captureDelayMs > 0)
        await new Promise((r) => setTimeout(r, captureDelayMs));

      // Capture just the <img> node to avoid layout offsets
      const canvas = await html2canvas(imgRef.current, {
        useCORS: true,
        backgroundColor: null,
        scale: 1, // keep 1:1 for consistent shard count/perf
      });

      if (isCancelled) return;

      const width = canvas.width;
      const height = canvas.height;
      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(0, 0, width, height);

      // Hide original image (we’ll overlay canvases in same spot)
      imgRef.current.style.visibility = "hidden";

      // Prepare shard imageData buckets
      const buckets = Array.from({ length: shardCount }, () =>
        ctx.createImageData(width, height),
      );

      // Distribute pixels (bias to the right to simulate drifting apart)
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          const idx = (x + y * width) * 4;
          for (let r = 0; r < repeatPerPixel; r++) {
            const bIndex = Math.floor(
              (shardCount * (Math.random() + (2 * x) / width)) / 3,
            );
            if (bIndex < 0 || bIndex >= shardCount) continue;
            const bucket = buckets[bIndex].data;
            bucket[idx + 0] = imageData.data[idx + 0];
            bucket[idx + 1] = imageData.data[idx + 1];
            bucket[idx + 2] = imageData.data[idx + 2];
            bucket[idx + 3] = imageData.data[idx + 3];
          }
        }
      }

      // Place canvases exactly over the original image’s client box
      const imgBox = imgRef.current.getBoundingClientRect();
      const rootBox = rootRef.current.getBoundingClientRect();

      // The layerRef is positioned relative to rootRef
      const offsetLeft = imgBox.left - rootBox.left;
      const offsetTop = imgBox.top - rootBox.top;

      // Create shard canvases and timelines
      const endDistance = () => `${scrollDistanceVH}vh`;

      buckets.forEach((data, i) => {
        const shard = document.createElement("canvas");
        shard.width = width;
        shard.height = height;
        shard.className = "absolute pointer-events-none";
        Object.assign(shard.style, {
          left: `${offsetLeft}px`,
          top: `${offsetTop}px`,
          width: `${imgBox.width}px`,
          height: `${imgBox.height}px`,
        });

        shard.getContext("2d").putImageData(data, 0, 0);
        layerRef.current.appendChild(shard);
        canvasesRef.current.push(shard);

        const angle = (Math.random() - 0.5) * 2 * Math.PI;
        const rot = maxRotate * (Math.random() - 0.5);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 30%", // when section enters viewport
            end: endDistance(), // continue for N viewport heights
            scrub, // link to scroll
            fastScrollEnd: true,
          },
        });

        tl.to(shard, {
          duration: 1,
          rotate: rot,
          x: scatterRadius * Math.sin(angle),
          y: scatterRadius * Math.cos(angle),
          opacity: 0,
          ease: "none",
          delay: (i / buckets.length) * 2, // cascading delay
        });

        timelinesRef.current.push(tl);
      });
    };

    loader.on("always", buildEffect);

    // Cleanup
    return () => {
      isCancelled = true;
      loader.off("always", buildEffect);
      // Kill our timelines + triggers only
      timelinesRef.current.forEach((tl) => {
        try {
          tl.scrollTrigger && tl.scrollTrigger.kill();
          tl.kill();
        } catch {}
      });
      timelinesRef.current = [];
      // Remove canvases
      canvasesRef.current.forEach((c) => c.remove());
      canvasesRef.current = [];
      // Reveal original image back (useful if the user navigates back)
      if (imgRef.current) imgRef.current.style.visibility = "";
    };
  }, [
    shardCount,
    repeatPerPixel,
    scatterRadius,
    maxRotate,
    scrub,
    scrollDistanceVH,
    captureDelayMs,
  ]);

  return (
    <div
      ref={rootRef}
      className="relative w-full h-full flex order-1 lg:order-2"
    >
      {/* Absolutely-positioned layer where shards mount */}
      <div
        ref={layerRef}
        className="absolute inset-0 pointer-events-none z-20"
      />

      {/* Your photo (becomes hidden once shards mount) */}
      <motion.img
        ref={imgRef}
        src="/src/public/profile_photo.png"
        alt="Background"
        className="absolute top-18 left-20 md:left-10 sm:top-36 md:top-13 lg:top-10 w-75 sm:w-52 md:w-95 lg:w-110 z-10 will-change-transform"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 50, damping: 12 }}
      />

      {/* Filled text (unchanged) */}
      <motion.h1
        className="absolute text-[90px] top-25 leading-20 md:top-0 md:left-20 lg:top-25 left-8 sm:top-28 sm:left-60 text-2xl sm:text-4xl md:text-[90px] lg:text-8xl font-zing text-headline z-0 pointer-events-none"
        initial={{ x: fillX, opacity: fillOpacity }}
        animate={fillControls}
      >
        ABOUT THE CLOUD
      </motion.h1>

      {/* Stroke text (unchanged) */}
      <motion.div
        className="absolute top-25 md:top-0 md:left-20 lg:top-25 left-8 sm:top-28 sm:left-60 z-30 pointer-events-none"
        initial={{ opacity: strokeOpacityStart }}
        animate={strokeControls}
      >
        <h1
          className="text-[90px] leading-20 sm:text-4xl md:text-[90px] lg:text-8xl font-zing text-transparent"
          style={{ WebkitTextStroke: "0.5px #e4d8ff" }}
        >
          ABOUT THE CLOUD
        </h1>
      </motion.div>
    </div>
  );
}
