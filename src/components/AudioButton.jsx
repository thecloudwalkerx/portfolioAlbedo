// /src/components/AudioButton.jsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const clamp01 = (v) => Math.max(0, Math.min(1, v));

export default function AudioButton({
  audioSrc = "/audio/loop.mp3",
  width = 56,
  height = 14,
  reactivity = 1.35,
  targetRMS = 0.2,
  attack = 0.06,
  release = 0.2,

  // white lines with descending opacity
  lineColors = [
    "rgba(255,255,255,1.0)",
    "rgba(255,255,255,0.70)",
    "rgba(255,255,255,0.45)",
  ],

  pad = 6,
  fadeDuration = 500,
  volume = 0.5,
  autoPlay = false,
  ariaLabel = "Toggle audio",
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const actxRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaSrcRef = useRef(null);
  const timeRef = useRef(null);
  const freqRef = useRef(null);

  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const envRef = useRef(0);
  const gainRef = useRef(1);

  const fadeAudio = useCallback(
    (fadeIn = true) => {
      const el = audioRef.current;
      if (!el) return;
      const stepMs = 50;
      const steps = Math.max(1, Math.round(fadeDuration / stepMs));
      const dv = fadeIn ? volume / steps : -el.volume / steps;

      if (fadeIn) el.volume = 0;
      el.play().catch(() => {});
      let v = el.volume;
      const id = setInterval(() => {
        v += dv;
        const done = (fadeIn && v >= volume) || (!fadeIn && v <= 0);
        el.volume = clamp01(v);
        if (done) {
          el.volume = fadeIn ? volume : 0;
          if (!fadeIn) el.pause();
          clearInterval(id);
        }
      }, stepMs);
    },
    [fadeDuration, volume],
  );

  const onToggle = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    fadeAudio(next);
  };

  const ensureAnalyser = useCallback(() => {
    const el = audioRef.current;
    if (!el) return false;

    if (!actxRef.current) {
      try {
        actxRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
      } catch {
        return false;
      }
    }
    if (!analyserRef.current) {
      const an = actxRef.current.createAnalyser();
      an.fftSize = 2048;
      an.smoothingTimeConstant = 0.9; // <— higher smoothing for steadier motion
      analyserRef.current = an;
      timeRef.current = new Uint8Array(an.frequencyBinCount);
      freqRef.current = new Uint8Array(an.frequencyBinCount);
    }
    if (!mediaSrcRef.current) {
      try {
        const src = actxRef.current.createMediaElementSource(el);
        src.connect(analyserRef.current);
        analyserRef.current.connect(actxRef.current.destination);
        mediaSrcRef.current = src;
      } catch {}
    }
    if (actxRef.current.state === "suspended") actxRef.current.resume();
    return true;
  }, []);

  useEffect(() => {
    const cnv = canvasRef.current;
    if (!cnv) return;
    const ctx = cnv.getContext("2d");

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const resize = () => {
      cnv.style.width = `${width}px`;
      cnv.style.height = `${height}px`;
      cnv.width = Math.floor(width * dpr);
      cnv.height = Math.floor(height * dpr);
    };
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const samples = 160; // <— increased sample points for smoother curves
    const coreLW = 1.5 * dpr;
    const attackK = Math.exp(-1 / (attack * 60));
    const releaseK = Math.exp(-1 / (release * 60));

    const hash = (n) => {
      const s = Math.sin(n * 127.1) * 43758.5453;
      return s - Math.floor(s);
    };
    const lerp = (a, b, t) => a + (b - a) * t;
    const smooth = (t) => t * t * (3 - 2 * t);
    const noise1D = (x, seed) => {
      const i = Math.floor(x),
        f = x - i;
      const a = hash(i + seed),
        b = hash(i + 1 + seed);
      return lerp(a, b, smooth(f));
    };
    const fbm1D = (x, seed = 0) => {
      let v = 0,
        amp = 0.5,
        freq = 1.0;
      for (let o = 0; o < 4; o++) {
        v += amp * noise1D(x * freq, seed + o * 19.19);
        freq *= 2.0;
        amp *= 0.55;
      }
      return v;
    };

    const drawSmooth = (context, pts, stroke, lw) => {
      if (pts.length < 2) return;
      context.strokeStyle = stroke;
      context.lineWidth = lw;
      context.lineJoin = "round";
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 2; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2;
        const yc = (pts[i].y + pts[i + 1].y) / 2;
        context.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
      }
      const i = pts.length - 2;
      context.quadraticCurveTo(pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y);
      context.stroke();
    };

    let timePhase = 0;

    const loop = () => {
      const an = analyserRef.current;
      const time = timeRef.current;
      const freq = freqRef.current;

      const W = cnv.width;
      const H = cnv.height;
      const left = pad * dpr;
      const right = (width - pad) * dpr;
      const cy = H / 2;

      ctx.clearRect(0, 0, W, H);

      let low = 0.08,
        mid = 0.07,
        high = 0.06,
        rms = 0.1;
      if (an && time && freq && isPlaying) {
        an.getByteTimeDomainData(time);
        an.getByteFrequencyData(freq);

        let s = 0;
        for (let i = 0; i < time.length; i++) {
          const v = (time[i] - 128) / 128;
          s += v * v;
        }
        rms = Math.sqrt(s / time.length);
        const prev = envRef.current || 0;
        const k = rms > prev ? attackK : releaseK;
        const env = rms + k * (prev - rms);
        envRef.current = env;

        const g = clamp01(targetRMS / Math.max(0.001, env));
        gainRef.current = gainRef.current * 0.9 + g * 0.1;

        const n = freq.length;
        const band = (a, b) => {
          const st = Math.floor(n * a),
            en = Math.floor(n * b);
          let sum = 0;
          for (let i = st; i < en; i++) sum += freq[i];
          return sum / (en - st || 1) / 255;
        };
        low = 0.05 + band(0.0, 0.18) * 0.55;
        mid = 0.04 + band(0.12, 0.55) * 0.45;
        high = 0.03 + band(0.35, 1.0) * 0.4;
      } else {
        timePhase += 0.02;
        low = 0.07 + 0.03 * Math.sin(timePhase * 1.2);
        mid = 0.06 + 0.03 * Math.sin(timePhase * 1.6 + 0.9);
        high = 0.05 + 0.02 * Math.sin(timePhase * 2.0 + 1.7);
        gainRef.current = 1;
      }

      const A =
        (H / 2 - pad * dpr) * 0.95 * reactivity * clamp01(gainRef.current);
      const t = performance.now() * 0.001;

      const makeRibbon = (amp, seed, timeShift) => {
        const pts = [];
        for (let i = 0; i < samples; i++) {
          const u = i / (samples - 1);
          const x = left + u * (right - left);
          const n = fbm1D(u * 2.0 + (t + timeShift) * 0.5, seed);
          const n2 = fbm1D(u * 4.0 - (t + timeShift) * 0.35, seed + 7.3);
          const yNoise = (n * 0.7 + n2 * 0.3 - 0.5) * 2.0;
          const yWeave =
            Math.sin(u * Math.PI * 2 + (t + timeShift) * 0.9 + seed) * 0.25;
          const yCore = yNoise * 0.7 + yWeave * 0.3;
          pts.push({ x, y: cy + yCore * A * amp });
        }
        return pts;
      };

      const ribLow = makeRibbon(low, 11.1, 0.0);
      const ribMid = makeRibbon(mid, 23.7, 0.6);
      const ribHigh = makeRibbon(high, 41.5, 1.2);

      drawSmooth(ctx, ribLow, lineColors[0], coreLW);
      drawSmooth(ctx, ribMid, lineColors[1], coreLW);
      drawSmooth(ctx, ribHigh, lineColors[2], coreLW);

      rafRef.current = requestAnimationFrame(loop);
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [
    width,
    height,
    reactivity,
    targetRMS,
    attack,
    release,
    lineColors,
    pad,
    isPlaying,
  ]);

  useEffect(() => {
    if (isPlaying) ensureAnalyser();
  }, [isPlaying, ensureAnalyser]);

  useEffect(() => {
    if (autoPlay && !isPlaying) {
      setIsPlaying(true);
      fadeAudio(true);
    }
    if (!autoPlay && isPlaying) {
      setIsPlaying(false);
      fadeAudio(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  useEffect(() => {
    return () => {
      try {
        if (mediaSrcRef.current) mediaSrcRef.current.disconnect();
        if (analyserRef.current) analyserRef.current.disconnect();
        const a = audioRef.current;
        if (a) {
          a.pause();
          a.src = "";
        }
        if (actxRef.current && actxRef.current.state !== "closed")
          actxRef.current.close();
      } catch {}
    };
  }, []);

  return (
    <button
      onClick={onToggle}
      aria-pressed={isPlaying}
      aria-label={ariaLabel}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        borderRadius: 8,
        overflow: "visible",
      }}
      title={isPlaying ? "Pause" : "Play"}
    >
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        className="hidden"
      />
      <canvas
        ref={canvasRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: "block",
          pointerEvents: "none",
          borderRadius: 4,
        }}
      />
    </button>
  );
}
