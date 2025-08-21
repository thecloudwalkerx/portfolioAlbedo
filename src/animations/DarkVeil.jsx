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
uniform vec3 uColor1; // top color
uniform vec3 uColor2; // bottom color

float auroraLayer(vec2 uv, float offset){
    float speed = 1.5 + offset * 0.2;
    float y = uv.y;
    y += sin(uv.x * 4.0 + uTime * speed + offset*1.5) * 0.18;
    y += sin(uv.x * 6.0 + uTime * speed * 1.3 + offset*2.1) * 0.07;
    y += cos(uv.x * 9.0 + uTime * speed * 0.9 + offset*0.5) * 0.08;
    y += sin(uv.x * 12.0 + uTime * speed * 1.1 + offset*3.0) * 0.05;
    return clamp(y, 0.0, 1.0);
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;

    float layer1 = auroraLayer(uv, 0.0);
    float layer2 = auroraLayer(uv, 1.0);
    float layer3 = auroraLayer(uv, 2.0);
    float layer4 = auroraLayer(uv, 3.0);

    float alpha = layer1*0.35 + layer2*0.3 + layer3*0.25 + layer4*0.2;

    vec3 color = mix(uColor1, uColor2, uv.y) * alpha;

    gl_FragColor = vec4(color, alpha);
}
`;

export default function AuroraHero() {
    const ref = useRef(null);

    useEffect(() => {
        const canvas = ref.current;
        const parent = canvas.parentElement;

        const renderer = new Renderer({ canvas, dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
        const gl = renderer.gl;
        gl.clearColor(0,0,0,0);

        const geometry = new Triangle(gl);

        // =======================
        // Hardcoded colors
        const topColor = [0.23, 0.06, 0.56];   // top color RGB
        const bottomColor = [0.39, 0.12, 0.90]; // bottom color RGB
        // =======================

        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new Vec2() },
                uColor1: { value: topColor },
                uColor2: { value: bottomColor }
            }
        });

        const mesh = new Mesh(gl, { geometry, program });

        const resize = () => {
            const w = parent.clientWidth;
            const h = parent.clientHeight;
            renderer.setSize(w, h);
            program.uniforms.uResolution.value.set(w, h);
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
        <canvas
            ref={ref}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ background: "transparent", zIndex: -1 }}
        />
    );
}
