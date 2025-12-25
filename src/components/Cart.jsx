import React, { useEffect, useMemo, useState } from "react";

// Cart item shape we support:
// { id: string|number, title: string, price: string|number, image?: string, qty?: number }

const STORAGE_KEY = "cart";

function parsePrice(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;
  // Remove currency symbols and non-number characters except dot and comma
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

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export default function Cart({ initialItems }) {
  const [items, setItems] = useState(() => {
    const stored = readStorage();
    if (Array.isArray(initialItems) && initialItems.length) return normalize(initialItems);
    return normalize(stored);
  });

  function normalize(arr) {
    return (arr || []).map((it) => ({
      id: it.id ?? `${it.title}-${it.image ?? ""}`,
      title: it.title ?? "Item",
      image: it.image || it.centerImage || it.img || "/images/placeholder.png",
      price: parsePrice(it.price ?? it.amount),
      qty: Math.max(1, Number(it.qty ?? 1)),
    }));
  }

  useEffect(() => {
    writeStorage(items);
  }, [items]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, it) => sum + parsePrice(it.price) * it.qty, 0);
    const shipping = items.length > 0 ? 0 : 0;
    const total = subtotal + shipping;
    const count = items.reduce((c, it) => c + it.qty, 0);
    return { subtotal, shipping, total, count };
  }, [items]);

  const increment = (id) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)));
  };

  const decrement = (id) => {
    setItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it))
        .filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <section className="min-h-screen bg-[#f3e9dd]">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-[#1e3532]">Your Cart</h1>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-[#1e3532] text-[#f3e9dd] px-3 py-1 text-sm">
              {totals.count} items
            </span>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm text-red-700 hover:underline"
                type="button"
              >
                Clear cart
              </button>
            )}
          </div>
        </header>

        {items.length === 0 ? (
          <div className="bg-white/70 border border-white/40 rounded-lg p-10 text-center">
            <p className="text-[#1e3532] text-lg">Your cart is empty.</p>
            <p className="text-sm text-[#1e3532]/70 mt-2">Browse products and add them to your cart.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items list */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((it) => (
                <article
                  key={it.id}
                  className="flex items-center gap-4 bg-white/80 border border-white/40 rounded-lg p-4"
                >
                  <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-white/60 border border-white/40">
                    <img src={it.image} alt={it.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#0f3c33] font-semibold truncate">{it.title}</h3>
                    <div className="text-sm text-[#0f3c33]/70">{formatCurrency(parsePrice(it.price))}</div>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrement(it.id)}
                      className="w-8 h-8 rounded-md bg-[#12382f] text-white flex items-center justify-center"
                      aria-label="Decrease quantity"
                      type="button"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold text-[#12382f]">{it.qty}</span>
                    <button
                      onClick={() => increment(it.id)}
                      className="w-8 h-8 rounded-md bg-[#12382f] text-white flex items-center justify-center"
                      aria-label="Increase quantity"
                      type="button"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-24 text-right font-semibold text-[#0f3c33]">
                    {formatCurrency(parsePrice(it.price) * it.qty)}
                  </div>

                  <button
                    onClick={() => removeItem(it.id)}
                    className="ml-2 text-sm text-red-700 hover:underline"
                    type="button"
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>

            {/* Summary */}
            <aside className="bg-white/80 border border-white/40 rounded-lg p-6 h-fit">
              <h2 className="text-xl font-semibold text-[#1e3532] mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#1e3532]/80">Subtotal</span>
                  <span className="font-medium text-[#1e3532]">{formatCurrency(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1e3532]/80">Delivery</span>
                  <span className="text-green-700 font-medium">Free</span>
                </div>
                <hr className="border-white/60 my-3" />
                <div className="flex justify-between text-base font-semibold text-[#0f3c33]">
                  <span>Total</span>
                  <span>{formatCurrency(totals.total)}</span>
                </div>
              </div>
              <button
                className="w-full mt-6 py-3 rounded-md bg-[#12382f] text-white font-semibold shadow-inner hover:brightness-110 transition"
                type="button"
                onClick={() => { window.location.hash = '/checkout'; }}
              >
                Proceed to Checkout
              </button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

