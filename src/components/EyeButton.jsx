import React from "react";
import clsx from "clsx";

const EyeButton = ({
  children = "Get Started",
  onClick,
  className = "",
  leftIcon = null,
  rightIcon = null,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "group relative inline-flex max-w-max justify-center items-center h-[42px] text-base font-black uppercase overflow-hidden border-[1.5px] border-headline rounded-2xl px-6 pr-11 py-2 text-headline transition-all duration-700 ease-in-out active:scale-95 hover:scale-105",
        className,
      )}
    >
      {/* Background wipe */}
      <span className="absolute inset-0 bg-headline rounded-2xl -z-10 w-0 group-hover:w-full transition-[width] duration-700 ease-in-out"></span>

      {/* Bottom-right curved image */}
      <img
        src="src/public/button/button_eye.png"
        alt="Curved decoration"
        className="absolute top-0 right-0 w-[60px] h-[60px] pointer-events-none select-none"
        style={{ objectFit: "contain", transform: "translate(30%, -25%)" }}
      />

      {/* Left Icon */}
      {leftIcon && (
        <span className="relative z-10 mr-2 flex items-center">{leftIcon}</span>
      )}

      {/* Animated Text Flip */}
      <span className="relative z-10 inline-flex overflow-hidden whitespace-nowrap">
        <div className="relative">
          {/* Original text */}
          <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[160%] group-hover:skew-y-12">
            {children}
          </div>

          {/* Black text appears only when background fills */}
          <div
            className="absolute top-0 left-0 w-full translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0 text-[#0c0b1a]"
            style={{ mixBlendMode: "difference" }}
          >
            {children}
          </div>
        </div>
      </span>

      {/* Right Icon */}
      {rightIcon && (
        <span className="relative z-10 ml-2 flex items-center">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default EyeButton;
