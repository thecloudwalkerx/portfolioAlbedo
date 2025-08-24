import { useEffect, useRef } from "react";

export function useMagneticScroll(ref, options = {}) {
  const { factor = 0.05, clamp = 20, smooth = 200 } = options;
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;

      const rect = element.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;

      if (!inView) {
        // Section is out of view: reset smoothly
        element.style.transition = `transform ${smooth}ms ease-out`;
        element.style.transform = "translateY(0px)";
        return;
      }

      // Calculate magnetic offset
      const rawOffset = -rect.top * factor;
      const translateY = Math.max(0, Math.min(rawOffset, clamp));

      // Apply transition for smooth movement both up and down
      element.style.transition = `transform ${smooth}ms ease-out`;
      element.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, factor, clamp, smooth]);
}
