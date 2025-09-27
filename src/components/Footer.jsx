// components/Footer.jsx
import React from "react";

/**
 * Responsive Footer:
 * - Mobile: stacked & centered (logo above, links centered)
 * - Desktop: 3-column layout with logo+brand inline (left), links (center), address+icons (right)
 */
export default function Footer() {
  return (
    <footer className="bg-[#10362f] text-[#d8b466]">
      {/* top area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16">
        {/* Grid: 1 column on mobile, 3 columns on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-start md:items-center gap-y-8 md:gap-y-0 md:gap-x-10">
          {/* LEFT: Logo + Brand
              - mobile: stacked & centered
              - desktop: inline (logo left, brand right)
          */}
          <div className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start gap-4">
            {/* logo */}
            <div className="flex-shrink-0 rounded-full flex items-center justify-center">
              <img
                src="./images/navBarLogo.png"
                alt="Sangam Jewellers Logo"
                className="w-36 h-36 object-contain"
              />
            </div>

            {/* brand: stacked on mobile, inline block on desktop */}
            <div className="text-center md:text-left font-serif">
              {/* On desktop we want the brand next to the logo (single-line look).
                  Using block-level two-line text but it sits to the right of the logo. */}
              <div className="text-2xl md:text-3xl font-semibold leading-tight">SANGAM</div>
              <div className="text-2xl md:text-3xl font-semibold -mt-1 leading-tight">JEWELLERS</div>
            </div>
          </div>

          {/* CENTER: Quicklinks + Useful Links
              - mobile: centered stacked
              - desktop: two columns side-by-side
              - we limit width so center area doesn't expand too wide
          */}
          <div className="w-full flex justify-center ml-15">
            <div className="w-full max-w-lg">
              {/* grid: 1 col on mobile (stacked centered), 2 cols on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Quicklinks */}
                <div className="text-center md:text-left">
                  <h4 className="text-lg font-medium mb-3">Quicklinks</h4>
                  <nav aria-label="Quicklinks" className="flex flex-col gap-2 text-sm">
                    <a href="/shop" className="hover:underline">Shop</a>
                    <a href="/collections" className="hover:underline">Collections</a>
                    <a href="/about" className="hover:underline">About Us</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                  </nav>
                </div>

                {/* Useful Links */}
                <div className="text-center md:text-left">
                  <h4 className="text-lg font-medium mb-3">Useful Links</h4>
                  <nav aria-label="Useful Links" className="flex flex-col gap-2 text-sm">
                    <a href="/faq" className="hover:underline">FAQ</a>
                    <a href="/privacy" className="hover:underline">Privacy Policy</a>
                    <a href="/terms" className="hover:underline">Terms &amp; Conditions</a>
                    <a href="/support" className="hover:underline">Support</a>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Address + Social Icons
              - Align center on mobile, align right on desktop
              - reduced gap between middle and right is handled by md:gap-x-10 on parent grid
          */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-2">
            <h4 className="text-lg font-medium">Address</h4>
            <address className="not-italic text-sm leading-relaxed">
              Near Reliance Trends<br />
              Farenda Road<br />
              Maharajganj, Uttar Pradesh
            </address>

            {/* Social icons row */}
            <div className="mt-1 flex items-center gap-4">
              <a href="https://instagram.com" aria-label="Instagram" className="p-2 rounded-full hover:bg-white/5 transition">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#d8b466" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <path d="M17.5 6.5h.01" />
                </svg>
              </a>

              <a href="https://facebook.com" aria-label="Facebook" className="p-2 rounded-full hover:bg-white/5 transition">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#d8b466" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a4 4 0 00-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3z" />
                </svg>
              </a>

              <a href="https://twitter.com" aria-label="X / Twitter" className="p-2 rounded-full hover:bg-white/5 transition">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#d8b466" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>

              <a href="https://maps.google.com" aria-label="Open in Maps" className="p-2 rounded-full hover:bg-white/5 transition">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#d8b466" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 6-9 11-9 11S3 16 3 10a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* thin divider line */}
      <div className="h-[1px] bg-white/20 mx-6 md:mx-12" />

      {/* bottom copyright */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[#d8b466] text-sm md:text-base font-serif">
            Sangam Jewellers - Copyright © {new Date().getFullYear()} All Rights Reserved.
            Designed &amp; Developed by Deepak Verma
          </p>
        </div>
      </div>
    </footer>
  );
}
