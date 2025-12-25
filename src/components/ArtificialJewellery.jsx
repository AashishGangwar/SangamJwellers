import React, { useEffect, useMemo, useState } from "react";
import ProductFilters from "./ProductFilters";
import ProductCard from "./ProductCard";
import { listProducts, addProduct } from "../store/products";

const ITEMS = [
  { id: "a1", title: "Artificial Necklace Set", image: "/images/necklace.png", video: "/videos/necklace.mp4", price: "₹2,499", material: "Artificial" },
  { id: "a2", title: "Artificial Earrings", image: "/images/earrings.png", price: "₹799", material: "Artificial" },
  { id: "a3", title: "Party Wear Bracelet", image: "/images/bracelet.png", price: "₹1,199", material: "Artificial" },
  { id: "a4", title: "Statement Rings", image: "/images/rings.png", price: "₹999", material: "Artificial" },
];

function parsePrice(value) {
  const cleaned = String(value).replace(/[^0-9.,-]/g, "").replace(/,/g, "");
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}
function deriveType(title) {
  return (title || "").split(" ")[0].replace(/\W/g, "");
}

export default function ArtificialJewellery() {
  const [filters, setFilters] = useState({ q: "", min: 0, max: 999999, sort: "relevance", materials: ["Artificial"] });
  const [storeItems, setStoreItems] = useState(() => listProducts());

  useEffect(() => {
    // Seed store with local ITEMS if empty
    if (!storeItems.length) {
      ITEMS.forEach((p) => {
        try { addProduct(p); } catch {}
      });
      setStoreItems(listProducts());
    }
  }, []);

  const source = useMemo(() => {
    const base = (storeItems.length ? storeItems : ITEMS).filter((p) => p.material === "Artificial");
    return base.map((p) => ({ ...p, price: p.price }));
  }, [storeItems]);

  const data = useMemo(() => {
    let arr = source.slice();
    if (filters.q) {
      const q = filters.q.toLowerCase();
      arr = arr.filter((it) => it.title.toLowerCase().includes(q));
    }
    if (filters.materials?.length) {
      arr = arr.filter((it) => filters.materials.includes(it.material));
    }
    // product type filter (derived from first word of title)
    if (filters.types?.length) {
      const want = new Set(filters.types);
      arr = arr.filter((it) => want.has(deriveType(it.title)));
    }
    // color filter maps to material if present
    if (filters.colors?.length) {
      const want = new Set(filters.colors);
      arr = arr.filter((it) => (it.material && want.has(it.material)));
    }
    arr = arr.filter((it) => {
      const p = parsePrice(it.price);
      return p >= (filters.min || 0) && p <= (filters.max || Infinity);
    });
    switch (filters.sort) {
      case "price-asc":
        arr.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case "price-desc":
        arr.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "title-asc":
        arr.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        arr.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return arr;
  }, [filters, source]);

  return (
    <section className="min-h-screen bg-[#f3e9dd] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-serif text-[#1e3532]">Artificial Jewellery</h1>
          <p className="text-[#1e3532]/80">Trendy designs with elegant finish</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <ProductFilters value={filters} onChange={setFilters} items={source} />
          </div>
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
            {data.length === 0 && (
              <div className="col-span-full text-center text-[#1e3532]/70">No products match your filters.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

