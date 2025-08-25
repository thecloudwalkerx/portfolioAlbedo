import { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxCard({ title, description }) {
  const cardRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const el = cardRef.current;

    // GSAP ScrollTrigger parallax animation
    gsap.to(el, {
      y: -100, // Move up by 100px as you scroll
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom", // When the top of element hits bottom of viewport
        end: "bottom top", // When the bottom of element hits top of viewport
        scrub: true, // Smoothly animate
      },
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-xl shadow-lg p-8 max-w-sm mx-auto my-16"
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
}
