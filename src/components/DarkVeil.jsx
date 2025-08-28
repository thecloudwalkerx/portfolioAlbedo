import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";

const vertex = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
// your fragment shader remains the same
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uSeed;
uniform float uSpeed;
uniform float uAttraction;
uniform float uBlobGap;
uniform vec3 uColor;

float hash(vec2 p){
    return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);
}

float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec4 h = vec4(
        hash(i),
        hash(i + vec2(1.0,0.0)),
        hash(i + vec2(0.0,1.0)),
        hash(i + vec2(1.0,1.0))
    );
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(h.x,h.y,u.x), mix(h.z,h.w,u.x), u.y);
}

void main(){
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    uv.x *= uResolution.x / uResolution.y;

    float seedOffset = uSeed;

    float wave = sin(uv.x * 8.0 + uTime * uSpeed * 0.8 + seedOffset * 2.0) * 0.25 +
                 sin(uv.y * 10.0 + uTime * uSpeed * 1.2 + seedOffset * 3.0) * 0.2 +
                 noise(uv * 4.0 + uTime * uSpeed * 0.25 + seedOffset) * uAttraction;

    float mask = smoothstep(0.3, 0.7, wave);
    float light = 0.4 + 0.6 * noise(uv * 4.0 + uTime * uSpeed * 0.25 + seedOffset);

    vec2 patchCenters[6];
    for(int i=0; i<6; i++){
        float angle = float(i) * 1.618 + seedOffset;
        patchCenters[i] = vec2(0.5) + uBlobGap * vec2(cos(angle), sin(angle));
    }

    float minDist = 1.0;
    for(int i=0; i<6; i++){
        float d = distance(uv, patchCenters[i]);
        minDist = min(minDist, d);
    }

    vec3 finalColor = uColor * light;
    gl_FragColor = vec4(finalColor, mask);
}
`;

export default function DarkVeil({
  color = "#6211df",
  speed = 1,
  attraction = 0.6,
  randomness = true,
  blobGap = 0.3,
}) {
  const ref = useRef(null);

  const hexToRgb = (hex) => {
    const h = hex.replace("#", "");
    return [0, 2, 4].map((i) => parseInt(h.substring(i, i + 2), 16) / 255);
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
    const seed = randomness ? Math.random() * 1000 : 0;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSeed: { value: seed },
        uSpeed: { value: speed },
        uAttraction: { value: attraction },
        uBlobGap: { value: blobGap },
        uResolution: { value: new Vec2(window.innerWidth, window.innerHeight) },
        uColor: { value: hexToRgb(color) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
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
  }, [color, speed, attraction, randomness, blobGap]);

  return (
    //absolute to make it stay 1 page, fixed to all
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        overflow: "hidden", // prevents x-axis scroll
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 20%, black 80%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        WebkitMaskComposite: "destination-in",
        maskImage:
          "linear-gradient(to right, transparent, black 20%, black 80%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        maskComposite: "intersect",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
        maskRepeat: "no-repeat",
        maskSize: "100% 100%",
      }}
    >
      <canvas
        ref={ref}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ background: "transparent" }}
      />
    </div>
  );
}
