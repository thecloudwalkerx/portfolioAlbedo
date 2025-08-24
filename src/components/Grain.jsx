import { useRef, useEffect } from "react";

const Grain = ({
  speed = 0.2,
  maxParticles = 1000,
  opacity = 0.05,
  size = 2,
  blur = 2,
  color = "#ffffff",
  fadeHeight = 150,
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
      // Fix canvas to viewport size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particles.current = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
        });
      }
    };

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        let fadeFactor = 1;
        if (p.y < fadeHeight) fadeFactor = 0.3 + 0.7 * (p.y / fadeHeight);
        else if (p.y > height - fadeHeight)
          fadeFactor = 0.3 + 0.7 * ((height - p.y) / fadeHeight);

        const particleAlpha = opacity * fadeFactor;

        ctx.fillStyle = `rgba(${parseInt(color.slice(1, 3), 16)},${parseInt(
          color.slice(3, 5),
          16,
        )},${parseInt(color.slice(5, 7), 16)},${particleAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const loop = () => {
      draw();
      animationId = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [speed, maxParticles, opacity, size, color, fadeHeight]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed top-0 left-0"
      style={{
        zIndex: 0,
        filter: `blur(${blur}px)`,
        width: window.innerWidth,
        height: window.innerHeight,
        imageRendering: "auto",
      }}
    />
  );
};

export default Grain;
