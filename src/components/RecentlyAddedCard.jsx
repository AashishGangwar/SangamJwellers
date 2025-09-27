// components/CategoryCard.jsx
import React from "react";

export default function RecentlyAddedCard({
  title = "Diamond Necklace",
  category = "Categories",
  centerImage = "/images/necklace.png",
  price = "$450",
  oldPrice = "$550",
  badges = ["NEW", "SALE"],
  onAdd = () => {},
}) {
  return (
    <article
      className="relative w-72 md:w-80 flex-shrink-0 bg-[#F5E7DB] rounded-lg overflow-hidden shadow-lg border border-white/20"
      aria-label={title}
    >
      {/* small ornament top-left (subtle) */}
      <div className="absolute top-4 left-4 z-10 text-xs text-gray-500">{category}</div>

      {/* badges */}
      <div className="absolute top-6 left-4 z-20 flex flex-col gap-2">
        {badges.map((b) => (
          <span
            key={b}
            className="text-[10px] font-semibold bg-white/90 text-[#1e3532] px-2 py-1 rounded-sm shadow-sm"
          >
            {b}
          </span>
        ))}
      </div>

      {/* card content */}
      <div className="px-6 pt-10 pb-4 flex flex-col h-[360px] md:h-[380px]">
        <h3 className="text-lg md:text-xl font-serif text-[#173428] mb-3">{title}</h3>

        {/* center image */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-40 h-28 md:w-44 md:h-36 rounded-md overflow-hidden bg-white/10 border border-white/10">
            <img
              src={centerImage}
              alt={title}
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
              draggable={false}
            />
          </div>
        </div>

        {/* price area */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-[#0f3c33]">{price}</div>
              <div className="text-sm text-gray-400 line-through">{oldPrice}</div>
            </div>
            <div className="text-sm text-gray-300 opacity-0">placeholder</div>
          </div>
        </div>

        {/* CTA button anchored at bottom inside card */}
        <div className="mt-4">
          <button
            onClick={onAdd}
            className="w-full py-3 rounded-md bg-[#12382f] text-white font-semibold flex items-center justify-center gap-2 shadow-inner hover:brightness-110 transition"
            type="button"
            aria-label={`Add ${title} to cart`}
          >
            Add To Cart
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 6h15l-1.5 9h-12z" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
