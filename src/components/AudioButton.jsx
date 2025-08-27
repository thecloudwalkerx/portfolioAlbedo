// AudioButton.jsx
"use client";

import { useEffect, useRef, useState } from "react";

const AudioButton = ({
  audioSrc = "/audio/loop.mp3",
  bars = 5,
  height = 16,
  animationSpeed = 1.5,
  fadeDuration = 1000, // fade duration in ms
  volume = 1, // max volume (0 to 1)
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const fadeAudio = (fadeIn = true) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    let vol = fadeIn ? 0 : audio.volume;
    const stepTime = 50;
    const steps = fadeDuration / stepTime;
    const volumeStep = fadeIn ? volume / steps : -audio.volume / steps;

    if (fadeIn) audio.volume = 0;

    audio.play();

    const interval = setInterval(() => {
      vol += volumeStep;
      if ((fadeIn && vol >= volume) || (!fadeIn && vol <= 0)) {
        audio.volume = fadeIn ? volume : 0;
        if (!fadeIn) audio.pause();
        clearInterval(interval);
      } else {
        audio.volume = Math.min(Math.max(vol, 0), volume);
      }
    }, stepTime);
  };

  const toggleAudio = () => {
    setIsPlaying((prev) => !prev);
    fadeAudio(!isPlaying);
  };

  // mirrored bars
  const barIndices = [...Array(bars).keys()];
  const mirroredIndices = [...barIndices, ...barIndices.slice().reverse()];

  return (
    <>
      <style>
        {`
          @keyframes wave {
            0%, 100% { transform: scaleY(0.3); }
            50% { transform: scaleY(1); }
          }
        `}
      </style>

      <button
        onClick={toggleAudio}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          padding: 0,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          height: `${height}px`,
        }}
      >
        <audio ref={audioRef} src={audioSrc} loop className="hidden" />

        {mirroredIndices.map((i, idx) => {
          const delay = (i * 0.1).toFixed(2);
          const scale = isPlaying ? 0.3 + (i / bars) * 0.7 : 0.2;

          return (
            <div
              key={idx}
              style={{
                width: "1px",
                height: `${height}px`,
                background: "white",
                borderRadius: "1px",
                transformOrigin: "center",
                transform: `scaleY(${scale})`,
                opacity: isPlaying ? 1 : 0.5,
                animation: isPlaying
                  ? `wave ${animationSpeed}s infinite ease-in-out ${delay}s`
                  : "none",
              }}
            />
          );
        })}
      </button>
    </>
  );
};

export default AudioButton;
