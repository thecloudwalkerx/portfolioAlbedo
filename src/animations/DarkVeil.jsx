import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";
import { useControls, folder } from "leva";

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

uniform float uAmplitude1;
uniform float uAmplitude2;
uniform float uAmplitude3;
uniform float uAmplitude4;

uniform float uWavelength1;
uniform float uWavelength2;
uniform float uWavelength3;
uniform float uWavelength4;

uniform float uSpeed1;
uniform float uSpeed2;
uniform float uSpeed3;
uniform float uSpeed4;

uniform float uPhase1;
uniform float uPhase2;
uniform float uPhase3;
uniform float uPhase4;

float auroraLayer(vec2 uv, float amplitude, float wavelength, float speed, float phase){
    float y = uv.y;
    y += sin(uv.x * wavelength + uTime * speed + phase) * amplitude;
    return clamp(y, 0.0, 1.0);
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    uv.x *= uResolution.x / uResolution.y;

    float layer1 = auroraLayer(uv, uAmplitude1, uWavelength1, uSpeed1, uPhase1);
    float layer2 = auroraLayer(uv, uAmplitude2, uWavelength2, uSpeed2, uPhase2);
    float layer3 = auroraLayer(uv, uAmplitude3, uWavelength3, uSpeed3, uPhase3);
    float layer4 = auroraLayer(uv, uAmplitude4, uWavelength4, uSpeed4, uPhase4);

    float alpha = layer1*0.35 + layer2*0.3 + layer3*0.25 + layer4*0.2;
    vec3 color = mix(uColor1, uColor2, uv.y) * alpha;

    gl_FragColor = vec4(color, alpha);
}
`;

export default function DarkVeilSlider() {
    const ref = useRef(null);

    // ========================
    // Sliders using Leva
    // ========================
    const controls = useControls({
        Colors: folder({
            topColor: { value: [0.23, 0.06, 0.56], min: 0, max: 1, step: 0.01 },
            bottomColor: { value: [0.39, 0.12, 0.9], min: 0, max: 1, step: 0.01 },
        }),
        Layer1: folder({
            amplitude1: { value: 0.05, min: 0, max: 0.5, step: 0.01 },
            wavelength1: { value: 4, min: 1, max: 20, step: 0.1 },
            speed1: { value: 1.5, min: 0, max: 5, step: 0.1 },
            phase1: { value: 0, min: 0, max: 10, step: 0.1 },
        }),
        Layer2: folder({
            amplitude2: { value: 0.08, min: 0, max: 0.5, step: 0.01 },
            wavelength2: { value: 6, min: 1, max: 20, step: 0.1 },
            speed2: { value: 1.8, min: 0, max: 5, step: 0.1 },
            phase2: { value: 1.5, min: 0, max: 10, step: 0.1 },
        }),
        Layer3: folder({
            amplitude3: { value: 0.1, min: 0, max: 0.5, step: 0.01 },
            wavelength3: { value: 9, min: 1, max: 20, step: 0.1 },
            speed3: { value: 1.2, min: 0, max: 5, step: 0.1 },
            phase3: { value: 3, min: 0, max: 10, step: 0.1 },
        }),
        Layer4: folder({
            amplitude4: { value: 0.12, min: 0, max: 0.5, step: 0.01 },
            wavelength4: { value: 12, min: 1, max: 20, step: 0.1 },
            speed4: { value: 2.0, min: 0, max: 5, step: 0.1 },
            phase4: { value: 4.5, min: 0, max: 10, step: 0.1 },
        }),
    });

    useEffect(() => {
        const canvas = ref.current;
        const parent = canvas.parentElement;

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
                uColor1: { value: controls.topColor },
                uColor2: { value: controls.bottomColor },
                uAmplitude1: { value: controls.amplitude1 },
                uAmplitude2: { value: controls.amplitude2 },
                uAmplitude3: { value: controls.amplitude3 },
                uAmplitude4: { value: controls.amplitude4 },
                uWavelength1: { value: controls.wavelength1 },
                uWavelength2: { value: controls.wavelength2 },
                uWavelength3: { value: controls.wavelength3 },
                uWavelength4: { value: controls.wavelength4 },
                uSpeed1: { value: controls.speed1 },
                uSpeed2: { value: controls.speed2 },
                uSpeed3: { value: controls.speed3 },
                uSpeed4: { value: controls.speed4 },
                uPhase1: { value: controls.phase1 },
                uPhase2: { value: controls.phase2 },
                uPhase3: { value: controls.phase3 },
                uPhase4: { value: controls.phase4 },
            },
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

            // Update uniforms in real-time
            program.uniforms.uColor1.value = controls.topColor;
            program.uniforms.uColor2.value = controls.bottomColor;
            program.uniforms.uAmplitude1.value = controls.amplitude1;
            program.uniforms.uAmplitude2.value = controls.amplitude2;
            program.uniforms.uAmplitude3.value = controls.amplitude3;
            program.uniforms.uAmplitude4.value = controls.amplitude4;
            program.uniforms.uWavelength1.value = controls.wavelength1;
            program.uniforms.uWavelength2.value = controls.wavelength2;
            program.uniforms.uWavelength3.value = controls.wavelength3;
            program.uniforms.uWavelength4.value = controls.wavelength4;
            program.uniforms.uSpeed1.value = controls.speed1;
            program.uniforms.uSpeed2.value = controls.speed2;
            program.uniforms.uSpeed3.value = controls.speed3;
            program.uniforms.uSpeed4.value = controls.speed4;
            program.uniforms.uPhase1.value = controls.phase1;
            program.uniforms.uPhase2.value = controls.phase2;
            program.uniforms.uPhase3.value = controls.phase3;
            program.uniforms.uPhase4.value = controls.phase4;

            renderer.render({ scene: mesh });
            frame = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", resize);
        };
    }, [controls]);

    return (
        <canvas
            ref={ref}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ background: "transparent", zIndex: -1 }}
        />
    );
}
