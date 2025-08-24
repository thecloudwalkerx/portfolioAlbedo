import React from "react";

const Button = ({
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
      className={`
        relative inline-flex max-w-max justify-center items-center h-[42px] text-base font-black uppercase
        overflow-hidden border-[1.5px] border-headline rounded-2xl px-6 pr-11 py-2 text-headline
        transition-all duration-700 ease-in-out active:scale-95 group hover:scale-105
        ${className}
      `}
    >
      {/* Background wipe */}
      <span
        className="
          absolute inset-0 bg-headline rounded-2xl -z-10 w-0 group-hover:w-full
          transition-[width] duration-700 ease-in-out
        "
      ></span>

      {/* Bottom-right curved image */}
      <img
        src="src/public/button/button_eye.png"
        alt="Curved decoration"
        className="absolute top-0 right-0 w-[60px] h-[60px] pointer-events-none select-none"
        style={{
          objectFit: "contain",
          transform: "translate(30%, -25%)", // stays at the edge dynamically
        }}
      />

      {/* Left Icon */}
      {leftIcon && (
        <span className="relative z-10 mr-2 flex items-center">{leftIcon}</span>
      )}

      {/* Button Text */}
      <span className="relative z-10 whitespace-nowrap transition-colors duration-700 ease-in-out group-hover:text-black">
        {children}
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

export default Button;
