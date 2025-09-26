import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
export default function Home() {
    return (
        <>
        <div>
            <NavBar />
        </div>
        <body className="mt-24 h-screen w-screen bg-[#163928]">
          {/* ✅ This is a Hero Section */}
          <section className="w-full mx-auto flex h-auto bg-[#000000]">
            <div className="w-full  gap-x-2 max-w-7xl mx-auto flex">
            <div className="w-1/2 mt-12 py-12">
              <h1 className="text-6xl font-bold text-[#D3AF37] mb-2">Crafting Dreams</h1>
              <h1 className="text-6xl font-bold text-[#D3AF37] mb-6">in Gold and Gems</h1>
              <p className="text-xl">Discover the perfect blend of style and sophistication with our collection of handcrafted jewelry. From delicate necklaces to elegant rings, our pieces are designed to make a statement and add a touch of glamour to any outfit.</p>
              <button className="text-xl font-bold bg-[#D3AF37] rounded-md px-6 py-2 text-[#163928] mt-6">Shop Now</button>
              <button className="text-xl font-bold bg-[#D3AF37] rounded-md ml-6 px-6 py-2 text-[#163928] mt-6">Explore</button>
            </div>
            <div className="w-1/2 ml-12">
              <img src="./images/heroImage4.jpg" alt="" className="w-full h-auto m-auto rounded-md shadow-lg"/>
            </div>
            </div>            
          </section>
          {/* ✅ This is a Category Section */}
          <section>
            
          </section>
          {/* ✅ This is a Products Section */}
          <section>
            
          </section>
          {/* ✅ This is a Contact Section */}
          <section>
            
          </section>
        </body>
        <div>
            <Footer />
        </div>
        </>
    )
}