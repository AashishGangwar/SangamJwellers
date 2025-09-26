export default function Footer() {
    return (
        <footer>
            <div>
            <section className="w-full mx-auto flex h-auto bg-[#000000]">
            <div className="w-full  gap-x-2 max-w-8xl mx-auto flex">
            <div className="w-1/3 ml-12">
              <img src="./images/heroImage1.jpg" alt="" className="w-full h-auto m-auto rounded-md shadow-lg"/>
            </div>
            <div className="w-1/3 mt-12 py-12">
              <h1 className="text-6xl font-bold text-[#D3AF37] mb-2">Crafting Dreams</h1>
              <h1 className="text-6xl font-bold text-[#D3AF37] mb-6">in Gold and Gems</h1>
              <p className="text-xl">Discover the perfect blend of style and sophistication with our collection of handcrafted jewelry. From delicate necklaces to elegant rings, our pieces are designed to make a statement and add a touch of glamour to any outfit.</p>
              <button className="text-xl font-bold bg-[#D3AF37] rounded-md px-6 py-2 text-[#163928] mt-6">Shop Now</button>
            </div>
            <div className="w-1/3">
            <div className="relative w-[400px] h-[300px]">
              <img src="./images/heroImage2.jpg" alt="" className="w-2/3 h-auto object-cover rounded-md shadow-lg"/>
              <img src="./images/heroImage3.jpg" alt="" className="absolute top-100 right-10 w-64 h-64 object-cover rounded-md shadow-md"/>
            </div>
            </div>
            </div>            
          </section>
            </div>
        </footer>
    )
}