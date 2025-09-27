import React from "react";
import NavBar from "../components/NavBar";
import CategoryCard from "../components/CategoryGrid";
import Footer from "../components/Footer";
import RecentlyAddedGrid from "../components/RecentlyAddedGrid";
import ArtificialCollection from "../components/ArtificialCollection";
import Hero from "../components/Hero";
export default function Home() {
    return (
        <>
        <div>
            <NavBar />
        </div>
        <body className="mt-24 h-screen w-screen bg-[#1e3532]">


          {/* This is a Hero Section */}
          <section className="w-full mx-auto flex h-auto bg-[#1e3532]">
            <Hero />
          </section>


          {/* This is a Category Section */}
          <section className="w-full mx-auto gap-y-2 h-auto bg-[#f3e9dd]">
            <CategoryCard />
          </section>


          {/* This is a Recently Added Section */}
          <section className="w-full mx-auto gap-y-2 h-auto bg-[#f3e9dd]">
            <RecentlyAddedGrid />
          </section>


          {/* This is a History Section */}
          <section className="w-full mx-auto flex h-auto bg-[#1e3532]">
            <div className="w-full gap-x-2 max-w-7xl mx-auto flex">    
            <div className="w-1/2 ml-12">
              <img src="./images/heroImage.jpg" alt="" className="w-full h-auto m-auto rounded-md shadow-lg"/>
            </div>
            <div className="w-1/3 mt-12 py-12">
              <h1 className="text-5xl font-bold text-[#f3e9dd] mb-2">Crafting Jwellery Since 1888.</h1>
              <p className="text-xl">As we all know, smaller gifts tend to be the best and there are few things as exciting as a Jwellery box-shaped presents. The best jewellery gifts are those that show your truly know the recipient. so, if you really care about them, you're going to want to put some thought into it.</p>
              <button className="text-xl font-bold bg-[#D3AF37] rounded-md px-6 py-2 text-[#1e3532] mt-6">Explore More</button>
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
              <button className="text-xl font-bold bg-[#1e3532] rounded-md px-6 py-2 text-[#D3AF37] mt-6">Visit Us</button>
            </div>    
            <div className="w-1/2 ml-12">
              <img src="./images/heroImage.jpg" alt="" className="w-full h-auto m-auto rounded-md shadow-lg"/>
            </div>
            </div>            
          </section>
        </body>
        <div>
            <Footer />
        </div>
        </>
    )
}