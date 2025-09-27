import React from "react";
import CategoryCard from "./CategoryCard";

export default function CategoryGrid() {
  const bgCommon = "/images/categoryBackground1.png"; // common background for all cards
  const items = [
    { title: "Necklaces", img: "/images/necklace1.png" },
    { title: "Rings", img: "/images/rings1.png" },
    { title: "Earrings", img: "/images/earrings1.png" },
    { title: "Pendants", img: "/images/pendants1.png" },
    { title: "Chains", img: "/images/chains1.png" },
    { title: "Bangles", img: "/images/bangles1.png" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 id="recent-heading" className="text-4xl md:text-5xl font-bold font-serif text-[#1e3532] mb-8">
           Shop by Category
          </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((it) => (
          <CategoryCard
            key={it.title}
            title={it.title}
            centerImage={it.img}
            bgImage={bgCommon}
            ctaText="Check More Products"
            onClick={() => alert(`Open ${it.title}`)}
          />
        ))}
      </div>
    </div>
  );
}
