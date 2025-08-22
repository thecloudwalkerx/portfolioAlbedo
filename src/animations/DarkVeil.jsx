import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";
// import { useControls, folder } from "leva"; // commented out, slider disabled

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

uniform float uVerticalOffset;

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

uniform float uBlur1;
uniform float uBlur2;
uniform float uBlur3;
uniform float uBlur4;

float auroraLayer(vec2 uv, float amplitude, float wavelength, float speed, float phase, float blur){
    float y = uv.y + uVerticalOffset + sin(uv.x * wavelength + uTime * speed + phase) * amplitude;
    y = clamp(y, 0.0, 1.0);
    float alpha = smoothstep(0.0, blur, y);
    return alpha;
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    uv.x *= uResolution.x / uResolution.y;

    float layer1 = auroraLayer(uv, uAmplitude1, uWavelength1, uSpeed1, uPhase1, uBlur1);
    float layer2 = auroraLayer(uv, uAmplitude2, uWavelength2, uSpeed2, uPhase2, uBlur2);
    float layer3 = auroraLayer(uv, uAmplitude3, uWavelength3, uSpeed3, uPhase3, uBlur3);
    float layer4 = auroraLayer(uv, uAmplitude4, uWavelength4, uSpeed4, uPhase4, uBlur4);

    float alpha = layer1*0.35 + layer2*0.3 + layer3*0.25 + layer4*0.2;
    vec3 color = mix(uColor1, uColor2, uv.y) * alpha;

    gl_FragColor = vec4(color, alpha);
}
`;

export default function DarkVeil() {
    const ref = useRef(null);

    // Hardcoded values from your last settings
    const controls = {
        verticalOffset: -0.81,
        topColor: "#330890",
        bottomColor: "#6211df",

        amplitude1: 0,
        wavelength1: 20,
        speed1: 0.4,
        phase1: 0,
        blur1: 0.12,

        amplitude2: 0.04,
        wavelength2: 3,
        speed2: 0.4,
        phase2: 0,
        blur2: 0.15,

        amplitude3: 0.07,
        wavelength3: 4,
        speed3: 0.5,
        phase3: 0,
        blur3: 0.09,

        amplitude4: 0.07,
        wavelength4: 7.2,
        speed4: 0.9,
        phase4: 0,
        blur4: 0.14,
    };

    const hexToRgb = (hex) => {
        const h = hex.replace("#", "");
        return [
            parseInt(h.substring(0, 2), 16) / 255,
            parseInt(h.substring(2, 4), 16) / 255,
            parseInt(h.substring(4, 6), 16) / 255,
        ];
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
                uVerticalOffset: { value: controls.verticalOffset },
                uColor1: { value: hexToRgb(controls.topColor) },
                uColor2: { value: hexToRgb(controls.bottomColor) },
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
                uBlur1: { value: controls.blur1 },
                uBlur2: { value: controls.blur2 },
                uBlur3: { value: controls.blur3 },
                uBlur4: { value: controls.blur4 },
            },
        });

        const mesh = new Mesh(gl, { geometry, program });

        const resize = () => {
            const w = window.innerWidth;
            const h = document.body.scrollHeight;
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
        <canvas
            ref={ref}
            className="absolute top-0 left-0 pointer-events-none"
            style={{ background: "transparent", zIndex: -1 }}
        />
    );
}
