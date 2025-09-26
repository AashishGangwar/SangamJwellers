import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
export default function Home() {
    return (
        <>
        <div>
            <NavBar />
        </div>
        <body className="h-screen w-screen bg-[#163928]">
            
             {/* ✅ This is a JSX comment */}
            <hero className="w-full bg-white">
                <div className="mx-auto max-w-7xl flex flex-col-reverse md:flex-row items-center">
                <div className="w-full md:w-1/2 p-8 md:p-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#163928]">
            Discover Exquisite Jewelry
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Handcrafted pieces designed to celebrate your special moments. Browse our
            curated collections of necklaces, rings, and bracelets — made with care,
            attention, and timeless style.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/products"
              className="inline-flex items-center rounded-md bg-[#163928] px-6 py-3 text-white shadow-gold transition-transform duration-200 hover:-translate-y-0.5"
            >
              Shop Collection
            </a>

            <a
              href="/about"
              className="inline-flex items-center rounded-md border border-gray-200 bg-white px-6 py-3 text-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              Our Story
            </a>
          </div>

          <ul className="mt-6 flex gap-6 text-sm text-gray-500">
            <li>Free shipping over ₹2000</li>
            <li>30-day returns</li>
            <li>Lifetime polishing</li>
          </ul>
        </div>
        <div className="w-full md:w-1/2">
          <div className="relative h-64 md:h-[420px]">
            <img
              src="/images/hero-jewelry.jpg"            // adjust path to your image
              alt="Elegant gold necklace on dark background"
              className="h-full w-full object-cover"
            />

            {/* Optional overlay accent */}
            <div className="pointer-events-none absolute -bottom-6 -right-6 hidden md:block">
              <div className="h-36 w-36 rounded-full bg-gradient-to-tr from-yellow-300/40 to-transparent blur-3xl shadow-gold" />
            </div>
          </div>
        </div>
                </div>
            </hero>
            <category>
                <div></div>
            </category>
            <products>
                <div></div>
            </products>
            <contact>
                <div></div>
            </contact>
        </body>
        <div>
            <Footer />
        </div>
        </>
    )
}