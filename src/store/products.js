import { readJSON, writeJSON, genId, nowISO } from "./storage";

function parsePrice(value) {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  const cleaned = String(value).replace(/[^0-9.,-]/g, '').replace(/,/g, '');
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

const KEY = "products";

export function listProducts() {
  return readJSON(KEY, []);
}

export function getProductById(id) {
  return listProducts().find((p) => p.id === id) || null;
}

export function addProduct(input) {
  const products = listProducts();
  const id = input.id && String(input.id).trim() ? String(input.id).trim() : genId("prod");
  if (products.some((p) => p.id === id)) {
    throw new Error("Product ID already exists");
  }
  const prod = {
    id,
    title: input.title || "Untitled",
    description: input.description || "",
    images: Array.isArray(input.images) ? input.images : (input.images ? String(input.images).split(",").map(s=>s.trim()).filter(Boolean) : []),
    image: input.image || (Array.isArray(input.images) && input.images[0]) || "/images/placeholder.png",
    video: input.video || "",
    type: input.type || "",
    color: input.color || "",
    material: input.material || "",
    mrp: parsePrice(input.mrp ?? 0),
    price: parsePrice(input.price ?? 0),
    available: input.available !== false,
    createdAt: nowISO(),
    updatedAt: nowISO(),
  };
  products.unshift(prod);
  writeJSON(KEY, products);
  return prod;
}

export function updateProduct(id, patch) {
  const products = listProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Product not found");
  const next = { ...products[idx], ...patch, updatedAt: nowISO() };
  products[idx] = next;
  writeJSON(KEY, products);
  return next;
}

export function toggleAvailability(id) {
  const prod = getProductById(id);
  if (!prod) throw new Error("Product not found");
  return updateProduct(id, { available: !prod.available });
}

export function seedProductsIfEmpty(defaults = []) {
  const products = listProducts();
  if (products.length) return products;
  const seeded = defaults.map((d) => addProduct(d));
  return seeded;
}
