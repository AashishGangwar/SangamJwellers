import React from "react";
import CategoryCard from "../components/CategoryGrid";
import RecentlyAddedGrid from "../components/RecentlyAddedGrid";
import ArtificialCollection from "../components/ArtificialCollection";
import Hero from "../components/Hero";
import HistoryGrid from "../components/HistoryGrid";
export default function Home() {
  return (
    <>
      <div className="mt-24 w-screen bg-[#1e3532]">
        {/* This is a Hero Section */}
        <section className="w-full mx-auto flex h-auto bg-[#1e3532]">
          <Hero />
        </section>

        {/* This is a Category Section */}
        <section className="w-full mx-auto gap-y-2 h-auto bg-[#1e3532]">
          <CategoryCard />
        </section>

        {/* This is a Recently Added Section */}
        <section className="w-full mx-auto gap-y-2 h-auto bg-[#f3e9dd]">
          <RecentlyAddedGrid />
        </section>

        {/* This is a History Section */}
        <section className="w-full bg-[#15362f]">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* LEFT: 2x2 feature grid */}
              <div className="flex justify-center md:justify-start">
                <HistoryGrid />
              </div>

              {/* RIGHT: textual content */}
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl md:text-6xl font-brand font-bold  font-serif text-[#c9b77a] leading-tight mb-6">
                  Crafting Jewellery<br/>Since 1888.
                </h1>

                <p className="text-lg text-[#e6ebe9] max-w-lg leading-relaxed mb-8">
                  As we all know, smaller gifts tend to be the best and there are few things as exciting
                  as a Jewellery box-shaped present. The best jewellery gifts are those that show you
                  truly know the recipient — so if you really care about them, you're going to want to
                  put some thought into it.
                </p>
                <button className="inline-block w-50 bg-[#f3e9dd] text-[#15362f] px-6 py-3 rounded-md text-lg font-bold">
                  Explore More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* This is a Artificial Collection Section */}
        <section className="w-full mx-auto gap-y-2 h-auto bg-[#f3e9dd]">
          <ArtificialCollection />
        </section>

        {/* This is a visit us section*/}
        <section className="w-full mx-auto flex h-auto bg-[#f3e9dd]">
          <div className="w-full gap-x-2 max-w-7xl mx-auto flex">
            <div className="w-1/3 mt-12 py-12">
              <h1 className="text-6xl font-bold text-[#1e3532] mb-2">Visit Sangam Jwellers</h1>
              <p className="text-xl text-[#1e3532]">Sangam Jwellers hospitality is an experience to live. Come and try magnificient collection of jwellery and live this grandeur experience in a Sangam Jweller store.</p>
              <button className="text-xl font-bold bg-[#1e3532] rounded-md px-6 py-2 text-[#f3e9dd] mt-6">Visit Us</button>
            </div>
            <div className="w-1/2 ml-12">
              <img src="./images/heroImage.jpg" alt="" className="w-full h-auto m-auto rounded-md shadow-lg"/>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}