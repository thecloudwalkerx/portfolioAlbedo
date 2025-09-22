"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutMe from "../sections/AboutMe.jsx";
import Skills from "../sections/Skills.jsx";

if (!gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StackedSections() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".panel");
      panels.forEach((panel, i) => {
        // For all panels except the last one,
        // pin until the next panel reaches the top
        const next = panels[i + 1];
        ScrollTrigger.create({
          trigger: panel,
          start: "top top", // start pin as soon as panel top hits viewport top
          endTrigger: next || undefined,
          end: next ? "top top" : "+=0", // release when next panel hits top; last panel pins only for its own height
          pin: true,
          pinSpacing: false,
          pinReparent: true,
          anticipatePin: 1,
        });
      });
    }, root);

    const t = setTimeout(() => ScrollTrigger.refresh(), 0);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="relative">
      <section className="panel">
        <AboutMe />
      </section>
      <section className="panel">
        <Skills />
      </section>
    </div>
  );
}
