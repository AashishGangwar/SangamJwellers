// NavBar.jsx
import React, { useEffect, useState } from "react";

export default function NavBar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const readCounts = () => {
      try {
        const raw = localStorage.getItem("cart");
        const items = raw ? JSON.parse(raw) : [];
        const count = Array.isArray(items)
          ? items.reduce((n, it) => n + Math.max(1, Number(it.qty ?? 1)), 0)
          : 0;
        setCartCount(count);
      } catch {
        setCartCount(0);
      }
    };
    readCounts();
    const onStorage = (e) => {
      if (e.key === "cart" || e.key === null) readCounts();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", readCounts);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", readCounts);
    };
  }, []);
  const categories = [
    "Fresh Arrivals",
    "Best Sellers",
    "Fine Silver",
    "Gifting Jewellery",
    "Wedding",
    "Engagement",
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main bar */}
      <nav className="bg-[#1e3532] border-b border-[#D3AF37]/20 shadow-md">
        <div className="mx-auto max-w-7xl px-6 py-3">
          {/* Grid with 3 columns: logo | search | icons */}
          <div className="grid grid-cols-3 items-center gap-4">
            {/* Left: Logo + brand */}
            <div className="flex items-center space-x-3">
              <a href="#/" className="flex items-center">
                <img
                  src="./images/centerLogo.png"
                  alt="Sangam Jewellers Logo"
                  className="h-16 w-auto"
                />
              </a>
              <div className="text-[#D3AF37]">
                <div className="text-xl md:text-2xl font-serif font-semibold leading-tight">
                  SANGAM
                </div>
                <div className="text-xl md:text-2xl font-serif font-semibold -mt-1">
                  JEWELLERS
                </div>
              </div>
            </div>

            {/* Center: Search bar */}
            <div className="flex justify-center">
              <form
                role="search"
                className="w-full max-w-2xl"
                onSubmit={(e) => {
                  e.preventDefault();
                  // handle search submit if needed
                }}
              >
                <label htmlFor="shop-search" className="sr-only">
                  Search products
                </label>
                <div className="relative">
                  <input
                    id="shop-search"
                    type="search"
                    placeholder="Search jewellery, rings, necklaces, gifting..."
                    className="w-full rounded-full border border-[#D3AF37]/30 bg-[#ffffff0d] py-3 pl-4 pr-12 text-sm placeholder:text-[#D3AF37]/70 text-white focus:outline-none focus:ring-2 focus:ring-[#D3AF37]/40"
                    aria-label="Search products"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-[#D3AF37] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#D3AF37]/40"
                    aria-label="Search"
                  >
                    {/* Magnifying glass icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
            {/* Right: Icons (profile, wishlist, cart) */}
            <div className="flex justify-end items-center space-x-3">

              {/* Wishlist (heart) */}
              <button
                className="inline-flex items-center rounded-lg px-3 py-2 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#D3AF37]/40"
                aria-label="Wishlist"
                title="Wishlist"
                onClick={() => { window.location.hash = "/wishlist"; }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#D3AF37]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 21s-7.5-4.35-9.2-7.09C.9 10.9 5.2 6 8.8 8.11 10 9 12 11 12 11s2-2 3.2-2.89C18.8 6 23.1 10.9 21.2 13.91 19.5 16.65 12 21 12 21z" />
                </svg>
              </button>

              {/* Cart */}
              <button
                className="relative inline-flex items-center rounded-lg px-3 py-2 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#D3AF37]/40"
                aria-label="Cart"
                title="Cart"
                onClick={() => {
                  window.location.hash = "/cart";
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#D3AF37]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path d="M6 6h15l-1.5 9h-12z" />
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="18" cy="20" r="1" />
                </svg>

                {/* small cart badge (example count) */}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-[#D3AF37] px-1.5 py-0.5 text-[10px] font-semibold text-[#0b0b0b]">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Profile */}
              <button
                className="inline-flex items-center rounded-lg px-3 py-2 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#D3AF37]/40"
                aria-label="Profile"
                title="Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#D3AF37]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 20.25a7.5 7.5 0 0115 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#D3AF37]/10">
          <div className="mx-auto max-w-7xl px-6 py-2">
            <div className="flex items-center justify-center gap-3 overflow-x-auto">
              {categories.map((c) => {
                const isHighlighted = c === "Fresh Arrivals" || c === "Best Sellers" || c === "Fine Silver" || c === "Gifting Jewellery";
                const routeMap = {
                  "Fresh Arrivals": "/fresh-arrivals",
                  "Best Sellers": "/best-sellers",
                  "Fine Silver": "/silver",
                  "Gifting Jewellery": "/artificial",
                };
                const href = routeMap[c] ? `#${routeMap[c]}` : `/#${c.replace(/\s+/g, "-").toLowerCase()}`;
                return (
                  <a
                    key={c}
                    href={href}
                    className={`whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium ${
                      isHighlighted
                        ? "border-[#D3AF37] bg-white/5 text-[#D3AF37]"
                        : "border-transparent text-[#D3AF37] hover:border-[#D3AF37] hover:bg-white/5"
                    } focus:outline-none focus:ring-2 focus:ring-[#D3AF37]/40`}
                  >
                    {c}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </nav>  {/* 👈 don’t remove this closing nav */}
      
      {/* spacer so page content doesn't go under the fixed header */}
      <div className="h-[92px]" aria-hidden="true" />
    </header>
  );
}
