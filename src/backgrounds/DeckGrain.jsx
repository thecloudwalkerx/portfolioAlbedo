import { useRef, useEffect } from "react";

const DeckGrain = ({
  speed = 0.05, // dreamy motion speed
  maxParticles = 150,
  opacity = 0.08,
  size = 2,
  blur = 1,
  color = "#ffffff", // single particle color
  starPoints = 5,
}) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      // initialize particles
      particles.current = Array.from({ length: maxParticles }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        color: color, // use the color prop
        twinkleSpeed: 0.001 + Math.random() * 0.001,
        twinkleOffset: Math.random() * 2 * Math.PI,
      }));
    };

    const draw = (time) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      particles.current.forEach((p) => {
        // gentle dreamy motion
        p.x += p.vx + Math.sin(time * 0.0002 + p.vy) * 0.1;
        p.y += p.vy + Math.cos(time * 0.0002 + p.vx) * 0.1;

        // wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // slow twinkle
        const twinkle =
          0.7 + 0.3 * Math.sin(time * p.twinkleSpeed + p.twinkleOffset);

        // subtle glow behind star
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(p.color, (opacity * twinkle) / 4);
        ctx.fill();

        // star shape
        ctx.beginPath();
        for (let i = 0; i <= starPoints; i++) {
          const angle = (i * 2 * Math.PI) / starPoints - Math.PI / 2;
          const radius = i % 2 === 0 ? size : size / 2;
          const x = p.x + Math.cos(angle) * radius;
          const y = p.y + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = hexToRgba(p.color, opacity * twinkle);
        ctx.fill();
      });
    };

    const loop = (time) => {
      draw(time);
      animationId = requestAnimationFrame(loop);
    };

    const timer = setTimeout(() => {
      resize();
      animationId = requestAnimationFrame(loop);
    }, 100);

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
      clearTimeout(timer);
    };
  }, [speed, maxParticles, opacity, size, blur, color, starPoints]);

  const hexToRgba = (hex, alpha) => {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3)
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    const int = parseInt(hex, 16);
    const r = (int >> 16) & 255;
    const g = (int >> 8) & 255;
    const b = int & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        filter: `blur(${blur}px)`,
        pointerEvents: "none",
      }}
    />
  );
};

export default DeckGrain;
