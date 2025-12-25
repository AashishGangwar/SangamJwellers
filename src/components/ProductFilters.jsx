import React, { useEffect, useMemo, useState } from "react";

// Props:
// - value: current filter object { q, min, max, sort, materials, types, colors }
// - onChange: function(newFilters)
// - items: the items array (to compute price bounds / types). Optional.
export default function ProductFilters({ value, onChange, items = [] }) {
  // Compute dataset-derived min/max and available types
  const priceBounds = useMemo(() => {
    const parsePrice = (v) =>
      Number(String(v).replace(/[^0-9.-]/g, "").replace(/,/g, "")) || 0;
    if (!items.length) return { min: 0, max: 100000 };
    const prices = items.map((i) => parsePrice(i.price));
    const min = Math.floor(Math.min(...prices, 0));
    const max = Math.ceil(Math.max(...prices, 100000));
    return { min, max };
  }, [items]);

  const availableTypes = useMemo(() => {
    const set = new Set();
    items.forEach((it) => {
      const t = (it.title || "").split(" ")[0].replace(/\W/g, "");
      if (t) set.add(t);
    });
    return set.size
      ? Array.from(set)
      : [
          "Anklet",
          "Bracelets",
          "Charm",
          "Earrings",
          "GIFT BOX",
          "Jewelry Sets",
          "Necklace",
          "Rakhi",
        ];
  }, [items]);

  // Local UI state to provide smooth UX before committing
  const [local, setLocal] = useState({
    q: value.q || "",
    // Single slider mode: min fixed to dataset min (usually 0), max controlled by slider
    min: priceBounds.min,
    max: value.max ?? priceBounds.max,
    types: value.types || [],
    colors: value.colors || [],
    materials: value.materials || [],
    sort: value.sort || "relevance",
  });

  // Keep local in sync when parent value changes externally
  useEffect(() => {
    setLocal((prev) => ({
      ...prev,
      q: value.q || "",
      min: typeof value.min === "number" ? value.min : priceBounds.min,
      max: typeof value.max === "number" ? value.max : priceBounds.max,
      types: value.types || [],
      colors: value.colors || [],
      materials: value.materials || [],
      sort: value.sort || prev.sort || "relevance",
    }));
  }, [value, priceBounds.min, priceBounds.max]);

  // Helpers
  const formatCurrency = (n) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  const toggleInArray = (arr, val) =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  const applyFilters = () => {
    onChange({
      ...value,
      q: local.q,
      min: local.min,
      max: local.max,
      types: local.types,
      colors: local.colors,
      materials: local.materials,
      sort: local.sort,
    });
  };

  const resetFilters = () => {
    const reset = {
      ...value,
      q: "",
      min: priceBounds.min,
      max: priceBounds.max,
      types: [],
      colors: [],
      materials: [],
      sort: "relevance",
    };
    onChange(reset);
  };

  // Single range control: adjusts the upper bound (max). Lower bound stays at dataset min
  const onMaxRange = (v) => {
    const num = Number(v);
    const max = Math.min(Math.max(num, priceBounds.min), priceBounds.max);
    setLocal((s) => ({ ...s, max }));
  };

  return (
    <aside className="w-full max-w-xs px-4 font-serif py-6 bg-white/90 border rounded-md shadow-sm sticky top-24 max-h-[calc(100vh-120px)] overflow-auto">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg text-[#1e3532] font-semibold tracking-wide">FILTER</h3>
      </div>

      {/* PRICE (0 .. max) single slider controlling upper bound */}
      <div className="mb-2">
        <div className="px-2 pb-2">
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            value={local.max}
            onChange={(e) => onMaxRange(e.target.value)}
            className="w-full h-1 bg-[#1e3532] rounded appearance-none cursor-pointer"
          />
            <div className="text-lg text-[#1e3532] mb-2">
            Price: {formatCurrency(priceBounds.min)} - {formatCurrency(local.max)}
          </div>
        </div>
      </div>

      {/* SORT buttons */}
      <div className="mb-4">
        <div className="text-sm text-[#1e3532] font-semibold mb-3">SORT BY PRICE</div>
        <div className="flex gap-3 justify-center items-center">
          <button
            type="button"
            onClick={() => setLocal((s) => ({ ...s, sort: "price-desc" }))}
            className={`px-3 py-2 rounded border text-sm ${local.sort === "price-desc" ? "bg-black text-white border-black" : "bg-[#1e3532] text-[#f3e9dd] border-[#1e3532]"}`}
          >
            High to Low
          </button>
          <button
            type="button"
            onClick={() => setLocal((s) => ({ ...s, sort: "price-asc" }))}
            className={`px-3 py-2 rounded border text-sm ${local.sort === "price-asc" ? "bg-black text-white border-black" : "bg-[#1e3532] text-[#f3e9dd] border-[#1e3532]"}`}
          >
            Low to High
          </button>
        </div>
      </div>

      <hr className="my-4" />

      {/* PRODUCT TYPE */}
      <div className="mb-4">
        <div className="text-sm text-[#1e3532] font-semibold mb-3">PRODUCT TYPE</div>

        <div className="max-h-40 overflow-auto pr-2">
          {availableTypes.map((type) => {
            const checked = (local.types || []).includes(type);
            return (
              <label
                key={type}
                className="flex items-center gap-3 mb-3 cursor-pointer text-gray-600"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    setLocal((s) => ({ ...s, types: toggleInArray(s.types || [], type) }))
                  }
                  className="w-4 h-4 border-white bg-white rounded"
                />
                <span className="text-lg text-[#1e3532]">{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      <hr className="my-4" />

      {/* COLOR */}
      <div className="mb-6">
        <div className="text-md text-[#1e3532] font-semibold mb-3">COLOR</div>

        <div className="flex gap-3 justify-center items-center">
          {["Gold", "Silver"].map((c) => {
            const active = (local.colors || []).includes(c);
            return (
              <button
                key={c}
                onClick={() =>
                  setLocal((s) => ({ ...s, colors: toggleInArray(s.colors || [], c) }))
                }
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                  active ? "bg-[#1e3532] border-[#1e3532] text-[#f3e9dd]" : "bg-white border-[#1e3532] text-[#1e3532]"
                } text-sm shadow-sm`}
                aria-pressed={active}
                type="button"
              >
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{
                    background: c === "Gold" ? "#caa62f" : c === "Silver" ? "#e6e9ee" : "#ddd",
                    border: "1px solid rgba(43, 255, 0, 0.08)",
                  }}
                />
                <span className="text-sm text-gray-700">{c}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-6">
      <button
          aria-label="Reset filters"
          className="w-full px-4 py-2 rounded bg-[#1e3532] text-[#f3e9dd] text-sm"
          onClick={resetFilters}
        >
          RESET FILTER
        </button>
      </div>
      <div className="mt-2">
        <button
          onClick={applyFilters}
          className="w-full px-4 py-2 rounded bg-[#1e3532] text-[#f3e9dd] text-sm"
          type="button"
        >
          APPLY FILTERS
        </button>
      </div>
    </aside>
  );
}
