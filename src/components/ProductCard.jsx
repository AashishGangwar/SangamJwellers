import React, { useState } from "react";

// product: { id, title, image, video?, price }
export default function ProductCard({ product }) {
  const [showVideo, setShowVideo] = useState(false);

  const openDetails = () => {
    try {
      const id = product.id ?? `${product.title}-${product.image ?? ""}`;
      localStorage.setItem(`product:${id}`, JSON.stringify({ ...product, id }));
      window.location.hash = `/product/${encodeURIComponent(id)}`;
    } catch {
      // fallback navigation
      window.location.hash = '/';
    }
  };

  const addTo = (key) => {
    try {
      const raw = localStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      const id = product.id ?? `${product.title}-${product.image ?? ""}`;
      const idx = arr.findIndex((x) => (x.id ?? `${x.title}-${x.image ?? ""}`) === id);
      if (key === "cart") {
        if (idx >= 0) arr[idx].qty = Math.max(1, Number(arr[idx].qty ?? 1)) + 1;
        else arr.push({ id, title: product.title, image: product.image, price: product.price, qty: 1 });
      } else {
        if (idx === -1) arr.push({ id, title: product.title, image: product.image, price: product.price });
      }
      localStorage.setItem(key, JSON.stringify(arr));
      if (key === "cart") alert(`Added to cart: ${product.title}`);
      if (key === "wishlist") alert(`Saved to wishlist: ${product.title}`);
    } catch {}
  };

  return (
    <article className="bg-white/90 border border-white/40 rounded-lg overflow-hidden shadow">
      <button onClick={openDetails} className="w-full aspect-[4/3] bg-white/50 flex items-center justify-center">
        {showVideo && product.video ? (
          <video className="w-full h-full object-cover" src={product.video} controls />
        ) : (
          <img className="w-full h-full object-contain p-4" src={product.image} alt={product.title} />
        )}
      </button>

      <div className="p-4">
        <button onClick={openDetails} className="text-left w-full">
          <h3 className="text-lg font-semibold text-[#12382f] truncate" title={product.title}>{product.title}</h3>
        </button>
        <div className="text-sm text-[#12382f]/70">{product.price}</div>

        <div className="mt-3 flex gap-2">
          {product.video && (
            <button
              onClick={() => setShowVideo((v) => !v)}
              className="px-3 py-2 rounded-md border border-[#12382f]/20 text-[#12382f] hover:bg-[#12382f]/5"
              type="button"
            >
              {showVideo ? "Show Image" : "Play Video"}
            </button>
          )}
          <button
            onClick={() => addTo("cart")}
            className="flex-1 py-2 rounded-md bg-[#12382f] text-white font-semibold"
            type="button"
          >
            Add to Cart
          </button>
          <button
            onClick={() => addTo("wishlist")}
            className="px-3 py-2 rounded-md bg-white text-[#12382f] border border-[#12382f]/30 hover:bg-[#12382f]/5"
            type="button"
          >
            Wishlist
          </button>
        </div>
      </div>
    </article>
  );
}
