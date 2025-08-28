import React, { useEffect, useState } from "react";

const Loader = ({ onFinish, progressValue = null }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (progressValue !== null) {
      setProgress(progressValue);
      if (progressValue >= 100) {
        setFadeOut(true);
        setTimeout(() => onFinish?.(), 1000);
      }
    }
  }, [progressValue, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-1000`}
      style={{ opacity: fadeOut ? 0 : 1 }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Loader content */}
      <div className="absolute flex flex-col justify-center items-center overflow-hidden">
        <div className="text-xl mb-4 text-white">Loading...</div>
        <div className="w-64 h-2 bg-gray-700 rounded overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
