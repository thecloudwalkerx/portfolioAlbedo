import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";

const vertex = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec4 h = vec4(
        hash(i),
        hash(i + vec2(1.0, 0.0)),
        hash(i + vec2(0.0, 1.0)),
        hash(i + vec2(1.0, 1.0))
    );
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(h.x, h.y, u.x), mix(h.z, h.w, u.x), u.y);
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    uv.x *= uResolution.x / uResolution.y;

    float wave = sin(uv.x * 8.0 + uTime * 0.8) * 0.25 +
                 sin(uv.y * 10.0 + uTime * 1.2) * 0.2 +
                 noise(uv * 4.0 + uTime * 0.25) * 0.6;

    float mask = smoothstep(0.3, 0.7, wave);
    float light = 0.4 + 0.6 * noise(uv * 4.0 + uTime * 0.25);

    vec3 baseColor = mix(uColor1, uColor2, uv.y + sin(uv.x * 8.0 + uTime * 0.8) * 0.0625);
    vec3 finalColor = baseColor * light;

    gl_FragColor = vec4(finalColor, mask);
}
`;

export default function DarkVeil() {
  const ref = useRef(null);

  const hexToRgb = (hex) => {
    const h = hex.replace("#", "");
    return Array.from(
      [0, 2, 4],
      (i) => parseInt(h.substring(i, i + 2), 16) / 255,
    );
  };

  useEffect(() => {
    const canvas = ref.current;
    const renderer = new Renderer({
      canvas,
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2() },
        uColor1: { value: hexToRgb("#330890") },
        uColor2: { value: hexToRgb("#6211df") },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight; // <-- viewport height instead of scrollHeight
      renderer.setSize(w, h);
      program.uniforms.uResolution.value.set(w, h);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
    };
    window.addEventListener("resize", resize);
    resize();

    const start = performance.now();
    let frame = 0;

    const loop = () => {
      program.uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 30%, black 20%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        WebkitMaskComposite: "destination-in",
        maskImage:
          "linear-gradient(to right, transparent, black 30%, black 20%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        maskComposite: "intersect",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
        maskRepeat: "no-repeat",
        maskSize: "100% 100%",
      }}
    >
      <canvas
        ref={ref}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ background: "transparent", zIndex: -1 }}
      />
    </div>
  );
}
