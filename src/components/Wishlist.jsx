import React, { useEffect, useState } from "react";

// Wishlist item shape we support:
// { id: string|number, title: string, price?: string|number, image?: string }

const STORAGE_KEY = "wishlist";
const CART_KEY = "cart";

function parsePrice(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const cleaned = String(value).replace(/[^0-9.,-]/g, "").replace(/,/g, "");
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(n) {
  const val = Number.isFinite(n) ? n : 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(val);
}

function read(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function normalize(arr) {
  return (arr || []).map((it) => ({
    id: it.id ?? `${it.title}-${it.image ?? ""}`,
    title: it.title ?? "Item",
    image: it.image || it.centerImage || it.img || "/images/placeholder.png",
    price: parsePrice(it.price ?? it.amount),
  }));
}

export default function Wishlist({ initialItems }) {
  const [items, setItems] = useState(() => {
    if (Array.isArray(initialItems) && initialItems.length) return normalize(initialItems);
    return normalize(read(STORAGE_KEY));
  });

  useEffect(() => {
    write(STORAGE_KEY, items);
  }, [items]);

  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));
  const clearAll = () => setItems([]);

  const moveToCart = (item) => {
    const cart = normalize(read(CART_KEY));
    const idx = cart.findIndex((c) => c.id === item.id);
    if (idx >= 0) {
      cart[idx] = { ...cart[idx], qty: Math.max(1, Number(cart[idx].qty ?? 1)) + 1 };
    } else {
      cart.push({ ...item, qty: 1 });
    }
    write(CART_KEY, cart);
    // remove from wishlist after moving
    setItems((prev) => prev.filter((it) => it.id !== item.id));
  };

  return (
    <section className="min-h-screen bg-[#f3e9dd]">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-[#1e3532]">Your Wishlist</h1>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-[#1e3532] text-[#f3e9dd] px-3 py-1 text-sm">
              {items.length} saved
            </span>
            {items.length > 0 && (
              <button onClick={clearAll} className="text-sm text-red-700 hover:underline" type="button">
                Clear all
              </button>
            )}
          </div>
        </header>

        {items.length === 0 ? (
          <div className="bg-white/70 border border-white/40 rounded-lg p-10 text-center">
            <p className="text-[#1e3532] text-lg">Your wishlist is empty.</p>
            <p className="text-sm text-[#1e3532]/70 mt-2">Save products you love to find them faster.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
              <article key={it.id} className="bg-white/80 border border-white/40 rounded-lg p-4 flex flex-col">
                <div className="w-full h-44 rounded-md overflow-hidden bg-white/60 border border-white/40 flex items-center justify-center">
                  <img src={it.image} alt={it.title} className="w-full h-full object-contain" />
                </div>
                <h3 className="mt-3 text-[#0f3c33] font-semibold truncate" title={it.title}>
                  {it.title}
                </h3>
                <div className="text-sm text-[#0f3c33]/70">
                  {it.price ? formatCurrency(parsePrice(it.price)) : ""}
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => moveToCart(it)}
                    className="flex-1 py-2 rounded-md bg-[#12382f] text-white font-semibold shadow-inner hover:brightness-110 transition"
                    type="button"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeItem(it.id)}
                    className="px-4 py-2 rounded-md bg-white text-red-700 border border-red-200 hover:bg-red-50"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

