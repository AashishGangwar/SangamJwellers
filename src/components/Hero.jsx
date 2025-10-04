import React, { useState, useEffect } from "react";

export default function Hero() {
  const images = [
    "./images/heroImage1.png",
    "./images/heroImage1.png",
    "./images/heroImage1.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000); // 6 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full flex justify-center items-center bg-[#1e3532] py-10 pt-[92px]">
      {/* Hero box with original ratio */}
      <div className="relative w-[calc(100%-20px)] max-w-8xl mx-10 aspect-[48/16] rounded-xl overflow-hidden shadow-lg" >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
