import React, { useEffect, useMemo, useState } from "react";
import ProductFilters from "../components/ProductFilters";
import ProductCard from "../components/ProductCard";
import { listProducts, addProduct } from "../store/products";

const ITEMS = [
  { id: "b1", title: "Bestseller Gold Necklace", image: "/images/necklace.png", price: "₹22,999", material: "Gold" },
  { id: "b2", title: "Top Rated Ring", image: "/images/rings.png", price: "₹12,499", material: "Gold" },
  { id: "b3", title: "Popular Earrings", image: "/images/earrings.png", price: "₹3,999", material: "Gold" },
  { id: "b4", title: "Most Loved Bracelet", image: "/images/bracelet.png", price: "₹5,999", material: "Gold" },
];

function parsePrice(value) {
  const cleaned = String(value).replace(/[^0-9.,-]/g, "").replace(/,/g, "");
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}
function deriveType(title) {
  return (title || "").split(" ")[0].replace(/\W/g, "");
}

export default function BestSellers() {
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
    if (filters.types?.length) {
      const want = new Set(filters.types);
      arr = arr.filter((it) => want.has(deriveType(it.title)));
    }
    if (filters.colors?.length) {
      const want = new Set(filters.colors);
      arr = arr.filter((it) => it.material && want.has(it.material));
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
          <p className="text-[#1e3532]/80">Our most popular products</p>
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
