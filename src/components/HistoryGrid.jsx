import React from "react";

/**
 * LeftFeatureGrid
 * - 2x2 grid: top-left text card, top-right image; bottom-left image, bottom-right text card
 * - Replace image src strings with your real images
 */
export default function HistoryGrid() {
  const images = {
    hand: "/images/hand-earring.jpg",      // top-right
    model: "/images/model-necklace.jpg",  // bottom-left
  };

  return (
    <div className="w-full max-w-md md:max-w-none">
      <div className="grid grid-cols-2 grid-rows-2 gap-6">
        {/* Top-left: framed text card */}
        <div className="relative bg-transparent">
          <div className="h-full p-6 rounded-md bg-[#0f3c36] border border-[#c9b77a]">
            <div className="flex flex-col items-center text-center h-full">
              {/* Icon */}
              <div className="mb-4">
                <img src="./icons/Ring.png" alt="" className="w-20 h-26" />

              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold text-[#eaf0ee] font-brand mb-3">New Rings</h3>

              {/* Description */}
              <p className="text-sm text-[#dfe7e5] leading-relaxed">
                In mathematics, rings are algebraic structures that generalize fields; multiplication need not be commutative and...
              </p>
            </div>
          </div>

          {/* thin inner gold outline (to match screenshot framing) */}
          <div className="pointer-events-none absolute inset-2 border border-[#c9b77a] rounded-md" />
        </div>

        {/* Top-right: large image */}
        <div className="relative">
          <div className="w-full h-full overflow-hidden rounded-md bg-white">
            <img
              src= "./images/History1.png"
              alt="Earring closeup"
              className="w-full h-full object-cover rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Bottom-left: model image */}
        <div className="relative">
          <div className="w-full h-full overflow-hidden rounded-md bg-white">
            <img
              src= "./images/History2.png"
              alt="Model necklace"
              className="w-full h-full object-cover rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Bottom-right: framed text card (wedding collection) */}
        <div className="relative bg-transparent">
          <div className="h-full p-6 rounded-md bg-[#0f3c36] border border-[#c9b77a] flex flex-col items-center text-center">
            <div className="mb-4">
              <img src="./icons/Necklace.png" alt="" className="w-24 h-24" />
            </div>

            <h3 className="text-xl md:text-2xl font-semibold text-[#eaf0ee] font-brand mb-3">Wedding Collection</h3>

            <p className="text-sm text-[#dfe7e5] leading-relaxed">
              In mathematics, rings are algebraic structures that generalize fields; multiplication need not be commutative and...
            </p>
          </div>

          {/* inner gold outline */}
          <div className="pointer-events-none absolute inset-2 border border-[#c9b77a] rounded-md" />
        </div>
      </div>
    </div>
  );
}
