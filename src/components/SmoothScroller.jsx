"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function SmoothScroller({
  smooth = 1,
  smoothTouch = 0.1,
  effects = true,
  ease = "expo",
}) {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth,
      smoothTouch,
      effects,
      ease,
      // normalizeScroll: true, // optional
    });

    // Intercept in-page anchor clicks: <a href="#sectionId">
    const onAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const targetEl = document.querySelector(href);
      if (!targetEl) return;

      e.preventDefault();
      // ScrollSmoother handles the smooth scroll
      smoother.scrollTo(targetEl, true); // true => smooth
    };

    document.addEventListener("click", onAnchorClick);

    // If page loads with a hash, jump into position (no animation on load)
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) smoother.scrollTo(el, false);
    }

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    // expose for debugging if needed
    window.__smoother = smoother;

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("resize", onResize);
      smoother?.kill();
      delete window.__smoother;
    };
  }, [smooth, smoothTouch, effects, ease]);

  return null;
}
