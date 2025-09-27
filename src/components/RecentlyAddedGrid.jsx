// components/RecentAdded.jsx
import React, { useRef } from "react";
import RecentlyAddedCard from "./RecentlyAddedCard";

const items = [
  { title: "Diamond Bracelet", img: "/images/bracelet.png", price: "$450", oldPrice: "$550" },
  { title: "Diamond Earing", img: "/images/earrings.png", price: "$320", oldPrice: "$420" },
  { title: "Diamond Rings", img: "/images/rings.png", price: "$310", oldPrice: "$430" },
  { title: "Diamond Necklace", img: "/images/necklace.png", price: "$450", oldPrice: "$550" },
  { title: "Diamond Rings", img: "/images/rings.png", price: "$310", oldPrice: "$430" },
  { title: "Diamond Necklace", img: "/images/necklace.png", price: "$450", oldPrice: "$550" },
  { title: "Diamond Rings", img: "/images/rings.png", price: "$310", oldPrice: "$430" },
  { title: "Diamond Necklace", img: "/images/necklace.png", price: "$450", oldPrice: "$550" },
  // add more items if needed
];

export default function RecentAdded() {
  const scrollerRef = useRef(null);

  const scrollBy = (dir = "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("article")?.offsetWidth || 320;
    const gap = 24; // should match gap-x on container
    const scrollAmount = (cardWidth + gap) * 2; // scroll 2 cards at a time
    el.scrollBy({ left: dir === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" });
  };

  return (
    <section
      className="relative py-16 px-6 md:px-12 bg-[#0f3c36] text-white overflow-hidden"
      aria-labelledby="recent-heading"
    >
      {/* decorative background pattern (optional) */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        {/* you can replace with an SVG or image */}
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200" fill="none">
          <rect width="100%" height="100%" fill="#0f3c36" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="flex items-start justify-between mb-8">
          <h2 id="recent-heading" className="text-4xl md:text-5xl font-serif text-[#F5E7DB]">
            Recently Added to Collection
          </h2>

          {/* nav buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => scrollBy("left")}
              className="w-12 h-12 rounded-md bg-[#F5E7DB] text-[#0f3c36] flex items-center justify-center shadow hover:scale-105 transition"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={() => scrollBy("right")}
              className="w-12 h-12 rounded-md bg-[#F5E7DB] text-[#0f3c36] flex items-center justify-center shadow hover:scale-105 transition"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* scroller */}
        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-snap-x scroll-smooth scrollbar-hide"
          style={{ scrollPadding: "1rem" }}
        >
          {items.map((it) => (
            <div key={it.title} className="scroll-snap-start">
              <RecentlyAddedCard
                title={it.title}
                centerImage={it.img}
                price={it.price}
                oldPrice={it.oldPrice}
                onAdd={() => alert(`Added ${it.title}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
