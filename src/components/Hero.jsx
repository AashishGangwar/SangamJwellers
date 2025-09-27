import React, { useState, useEffect } from "react";

export default function Hero() {
  // images to cycle through
  const images = [
    "./images/heroImage1.png",
    "./images/heroImage2.png",
    "./images/heroImage3.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // change image every 2 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    // cleanup
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full mx-auto flex h-auto bg-[#1e3532]">
      <div className="bg-[#f3e9dd] w-full justify-center items-center my-10 mx-10 flex p-6 rounded-xl">
        <div className="w-full px-6 gap-x-6 justify-center items-center mx-auto flex">
          {/* Left text */}
          <div className="w-1/2 mt-12 py-12">
            <h1 className="text-6xl font-bold text-[#1e3532] mb-2">
              Crafting Dreams
            </h1>
            <h1 className="text-6xl font-bold text-[#1e3532] mb-6">
              in Gold and Gems
            </h1>
            <p className="text-xl text-[#1e3532]">
              Discover the perfect blend of style and sophistication with our
              collection of handcrafted jewelry. From delicate necklaces to
              elegant rings, our pieces are designed to make a statement and add
              a touch of glamour to any outfit.
            </p>
            <button className="text-xl font-bold bg-[#1e3532] rounded-md px-6 py-2 text-[#D3AF37] mt-6">
              Shop Now
            </button>
            <button className="text-xl font-bold bg-[#1e3532] rounded-md ml-6 px-6 py-2 text-[#D3AF37] mt-6">
              Explore
            </button>
          </div>

          {/* Right rotating image */}
          <div>
            <img
              src={images[currentIndex]}
              alt="Hero"
              className="h-auto m-auto rounded-md transition-opacity duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
