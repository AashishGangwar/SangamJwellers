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
                src="./images/fullLogo.png"
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
              Sangam Jewllers<br />
              Tedwa Kuti, Near Reliance Trends<br />
              Farenda Road, Maharajganj<br />
              Uttar Pradesh, India<br />
              Pincode: 273301
            </address>

            {/* Social icons row */}
            <div className="mt-1 flex items-center gap-4">
              <a href="https://www.instagram.com/sangam_jewellers___?igsh=YTFlY2tmeTg3bW5x" aria-label="Instagram" className="p-2 rounded-full hover:bg-white/5 transition">
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

              <a href="https://wa.me/8279422731" aria-label="WhatsApp" className="p-2 rounded-full hover:bg-white/5 transition">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#d8b466" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12a9.95 9.95 0 0 0 1.63 5.36L2 22l4.85-1.61A9.95 9.95 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
                <path d="M15.1 14.85c-.2-.1-1.1-.55-1.3-.6-.2-.05-.4 0-.5.15-.1.2-.4.5-.5.6-.1.1-.2.15-.4.05-.6-.3-1.8-1.1-2.3-2.1-.05-.1 0-.2.1-.3.1-.1.2-.2.3-.3.1-.1.1-.2.2-.3s0-.2 0-.3c0-.2-.5-1.2-.6-1.6s-.35-.3-.45-.3h-.4c-.2 0-.4.1-.6.3s-.6.5-.6 1.4c0 .9.6 1.7.7 1.9.1.1 1.5 2.5 4 3.4.6.2 1 .35 1.3.45.5.2.9.15 1.2.1.4-.1 1-.5 1.2-1 .1-.4.1-.7.1-.8-.1-.1-.2-.15-.4-.2z"/>
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
            Designed &amp; Developed by Aashish Gangwar
          </p>
        </div>
      </div>
    </footer>
  );
}
