import React, { useEffect, useMemo, useState } from "react";
import ProductFilters from "../components/ProductFilters";
import ProductCard from "../components/ProductCard";
import { listProducts, addProduct } from "../store/products";

const ITEMS = [
  { id: "f1", title: "New Diamond Necklace", image: "/images/necklace.png", price: "₹24,999", material: "Diamond" },
  { id: "f2", title: "Latest Gold Ring", image: "/images/rings.png", price: "₹14,499", material: "Gold" },
  { id: "f3", title: "Trend Earrings", image: "/images/earrings.png", price: "₹4,299", material: "Gold" },
  { id: "f4", title: "Fresh Bracelet", image: "/images/bracelet.png", price: "₹6,799", material: "Gold" },
];

function parsePrice(value) {
  const cleaned = String(value).replace(/[^0-9.,-]/g, "").replace(/,/g, "");
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function FreshArrivals() {
  const [filters, setFilters] = useState({ q: "", min: 0, max: 999999, sort: "relevance", materials: [] });
  const [storeItems, setStoreItems] = useState(() => listProducts());

  useEffect(() => {
    if (!storeItems.length) {
      ITEMS.forEach((p) => { try { addProduct(p); } catch {} });
      setStoreItems(listProducts());
    }
  }, []);

  const source = useMemo(() => (storeItems.length ? storeItems : ITEMS), [storeItems]);

  const data = useMemo(() => {
    let arr = source.slice();
    if (filters.q) {
      const q = filters.q.toLowerCase();
      arr = arr.filter((it) => it.title.toLowerCase().includes(q));
    }
    if (filters.materials?.length) {
      arr = arr.filter((it) => filters.materials.includes(it.material));
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
          <p className="text-[#1e3532]/80">Brand new pieces just in</p>
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
