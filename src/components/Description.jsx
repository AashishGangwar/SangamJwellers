import React, { useEffect, useMemo, useState } from "react";
import { getProductById, listProducts } from "../store/products";

const STORAGE_PRODUCT_PREFIX = "product:";

function parseHashId() {
  const hash = (window.location.hash || "").replace(/^#/, "");
  // expected format: /product/<id>
  const m = hash.match(/^\/product\/(.+)$/);
  return m ? decodeURIComponent(m[1]) : null;
}

function formatCurrency(n) {
  const num = Number(n);
  const val = Number.isFinite(num) ? num : 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(val);
}

function parsePrice(value) {
  if (typeof value === "number") return value;
  const cleaned = String(value || "").replace(/[^0-9.,-]/g, "").replace(/,/g, "");
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function Description() {
  const [product, setProduct] = useState(null);
  const [activeMedia, setActiveMedia] = useState("image");
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoverImage, setHoverImage] = useState(null);
  const [zoomState, setZoomState] = useState({ active: false, xPct: 50, yPct: 50 });

  useEffect(() => {
    const id = parseHashId();
    if (!id) return;
    try {
      const raw = localStorage.getItem(STORAGE_PRODUCT_PREFIX + id);
      let obj = raw ? JSON.parse(raw) : null;
      if (!obj) {
        // Try store-backed products by ID
        obj = getProductById(id) || null;
        if (!obj) {
          // As a last resort, try to find same ID in all products
          const all = listProducts();
          obj = all.find(p => String(p.id) === String(id)) || null;
        }
        if (obj) {
          // Cache for subsequent navigations
          try { localStorage.setItem(STORAGE_PRODUCT_PREFIX + id, JSON.stringify(obj)); } catch {}
        }
      }
      setProduct(obj);
      if (obj?.image) setSelectedImage(obj.image);
      // track recently viewed for "similar" section
      if (obj) {
        const listRaw = localStorage.getItem("recently_viewed");
        const list = listRaw ? JSON.parse(listRaw) : [];
        const exists = list.find((p) => p && p.id === obj.id);
        const next = exists ? list : [{ id: obj.id, title: obj.title, image: obj.image, price: obj.price, material: obj.material }, ...list].slice(0, 12);
        localStorage.setItem("recently_viewed", JSON.stringify(next));
      }
    } catch {}
  }, []);

  const priceInfo = useMemo(() => {
    if (!product) return { mrp: 0, sale: 0, off: 0 };
    const sale = parsePrice(product.price);
    const mrp = product.mrp ? parsePrice(product.mrp) : Math.round(sale * 1.2);
    const off = mrp > 0 ? Math.max(0, Math.round(((mrp - sale) / mrp) * 100)) : 0;
    return { mrp, sale, off };
  }, [product]);

  const addTo = (key) => {
    if (!product) return;
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

  const buyNow = () => {
    addTo("cart");
    window.location.hash = "/cart";
  };

  const similar = useMemo(() => {
    try {
      const raw = localStorage.getItem("recently_viewed");
      const list = raw ? JSON.parse(raw) : [];
      return list.filter((p) => !product || p.id !== product.id).slice(0, 8);
    } catch {
      return [];
    }
  }, [product]);

  // Build image list for the thumbnail rail: prefer product.images else replicate primary image
  const images = useMemo(() => {
    const list = Array.isArray(product?.images) ? product.images.filter(Boolean) : [];
    if (list.length) return list;
    if (product?.image) return new Array(5).fill(product.image);
    return [];
  }, [product]);

  if (!product) {
    return (
      <section className="min-h-screen bg-[#f3e9dd] mt-24">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center text-[#1e3532]">
          Loading product...
        </div>
      </section>
    );
  }

  const mainImage = hoverImage || selectedImage || product?.image;

  return (
    <section className="min-h-screen bg-[#f3e9dd] mt-32">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gallery */}
          <div className="grid grid-cols-[80px_1fr] gap-4 items-start">
            {/* Vertical thumbnails (outside the main image card) */}
            <div className="flex flex-col gap-3 m-auto px-2 py-2 overflow-auto max-h-[520px] pr-1">
              {images.slice(0, 6).map((src, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`w-16 h-16 border rounded overflow-hidden bg-white ${ (hoverImage||selectedImage) === src ? 'ring-2 ring-[#1e3532]' : ''}`}
                  onMouseEnter={() => setHoverImage(src)}
                  onMouseLeave={() => setHoverImage(null)}
                  onClick={() => setSelectedImage(src)}
                >
                  <img src={src} alt={product?.title} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Main card with media */}
            <div className="bg-white rounded-lg p-4 shadow">
              <div
                className="relative aspect-square bg-white flex items-center justify-center rounded overflow-hidden"
                onMouseEnter={() => setZoomState((s) => ({ ...s, active: true }))}
                onMouseLeave={() => setZoomState((s) => ({ ...s, active: false }))}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const xPct = ((e.clientX - rect.left) / rect.width) * 100;
                  const yPct = ((e.clientY - rect.top) / rect.height) * 100;
                  setZoomState({ active: true, xPct, yPct });
                }}
              >
                {activeMedia === "video" && product.video ? (
                  <video src={product.video} controls className="w-full h-full object-contain" />
                ) : (
                  <img
                    src={mainImage}
                    alt={product.title}
                    className="w-full h-full object-contain transition-transform duration-100"
                    style={{
                      transform: zoomState.active ? 'scale(1.8)' : 'scale(1)',
                      transformOrigin: `${zoomState.xPct}% ${zoomState.yPct}%`,
                    }}
                  />
                )}
              </div>

              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveMedia("image")}
                  className={`px-3 py-1 rounded border text-sm ${activeMedia === "image" ? "bg-[#1e3532] text-[#f3e9dd] border-[#1e3532]" : "bg-white text-[#1e3532] border-[#1e3532]"}`}
                >
                  Image
                </button>
                {product.video && (
                  <button
                    type="button"
                    onClick={() => setActiveMedia("video")}
                    className={`px-3 py-1 rounded border text-sm ${activeMedia === "video" ? "bg-[#1e3532] text-[#f3e9dd] border-[#1e3532]" : "bg-white text-[#1e3532] border-[#1e3532]"}`}
                  >
                    Video
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col m-auto gap-4 text-[#1e3532]">
            <h1 className="text-3xl font-serif font-bold">{product.title}</h1>
            <div className="text-lg">Material: {product.material || "—"}</div>
            <div className="flex items-end gap-3">
              <div className="text-3xl font-bold">{formatCurrency(priceInfo.sale)}</div>
              <div className="text-gray-500 line-through">{formatCurrency(priceInfo.mrp)}</div>
              {priceInfo.off > 0 && <div className="text-green-700 font-semibold">{priceInfo.off}% off</div>}
            </div>

            <p className="text-base leading-relaxed">
              {product.description || "A beautifully crafted piece designed to elevate your style for any occasion."}
            </p>

            <div className="flex gap-3 mt-2">
              <button onClick={buyNow} className="px-6 py-3 rounded-md bg-[#1e3532] text-[#f3e9dd] font-semibold">Buy Now</button>
              <button onClick={() => addTo("cart")} className="px-6 py-3 rounded-md bg-white border border-[#1e3532] text-[#1e3532] font-semibold">Add to Cart</button>
              <button onClick={() => addTo("wishlist")} aria-label="Add to wishlist" className="px-4 py-3 rounded-md bg-white border border-[#1e3532] text-[#1e3532]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Similar products */}
        <div className="mt-12">
          <h2 className="text-2xl font-serif text-[#1e3532] mb-4">Similar Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {similar.map((p) => (
              <a
                key={p.id}
                href={`#/product/${encodeURIComponent(p.id)}`}
                className="bg-white rounded-lg shadow p-3 hover:shadow-md transition"
                onClick={() => {
                  try { localStorage.setItem(STORAGE_PRODUCT_PREFIX + p.id, JSON.stringify(p)); } catch {}
                }}
              >
                <div className="aspect-square bg-white flex items-center justify-center">
                  <img src={p.image} alt={p.title} className="w-full h-full object-contain" />
                </div>
                <div className="mt-2 text-sm text-[#1e3532] truncate">{p.title}</div>
                <div className="text-sm text-[#1e3532]/80">{p.price}</div>
              </a>
            ))}
            {similar.length === 0 && (
              <div className="text-[#1e3532]/70">No similar products yet.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

