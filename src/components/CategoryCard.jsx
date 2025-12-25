// CategoryCard.jsx
import React from "react";

/**
 * Props:
 * - title: string
 * - centerImage: string (url of the centered image)
 * - bgImage: string (url of the common background image - covers the whole card)
 * - ctaText: string
 * - onClick: function
 * - className: additional tailwind classes for the outer container
 */
export default function CategoryCard({
  title = "Category",
  centerImage,
  bgImage,
  ctaText = "Shop",
  onClick,
  className = "",
}) {
  return (
    <article
      className={`relative w-full h-[360px] rounded-2xl overflow-hidden shadow-xl ${className}`}
      role="group"
      aria-label={title}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* optional translucent overlay to make text/buttons pop */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* center image wrapper - we use group-hover on parent to trigger zoom */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-lg overflow-hidden flex items-center justify-center transition-transform duration-500 transform-gpu group-hover:scale-105">
          {/* inner image - zoom effect on hover (on parent group) */}
          <img
            src={centerImage}
            alt={title}
            className="w-full h-full object-contain transition-transform duration-700 transform-gpu group-hover:scale-110"
            draggable={false}
          />
        </div>
      </div>

      {/* Title (optional) */}
      <header className="absolute top-6 left-6 z-20">
        <h3 className="text-white text-lg md:text-xl font-semibold drop-shadow-lg">
          {title}
        </h3>
      </header>

      {/* CTA Button anchored to bottom of card */}
      <div className="absolute right-4 bottom-4 z-20 flex">
        <button
          onClick={onClick}
          className="w-full flex py-2 px-4 rounded-lg bg-[#1e3532] text-[#f3e9dd] font-bold shadow-md hover:brightness-120 transition"
          type="button"
        >
          {ctaText}
        {/* Arrow Icon */}
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-4 h-4 ml-2 mt-1.5"
        >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12l-7.5 7.5M21 12H3" />
        </svg>
        </button>
      </div>
    </article>
  );
}
