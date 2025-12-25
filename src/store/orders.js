import { readJSON, writeJSON, genId, nowISO } from "./storage";

const KEY = "orders";

export function listOrders() {
  return readJSON(KEY, []);
}

export function getOrderById(id) {
  return listOrders().find((o) => o.id === id) || null;
}

export function createOrder({ items, subtotal, total, paymentMethod, address }) {
  const id = genId("ord");
  const order = {
    id,
    items: (items || []).map((it) => ({
      productId: it.id,
      title: it.title,
      image: it.image,
      price: Number(it.price),
      qty: Math.max(1, Number(it.qty ?? 1)),
    })),
    subtotal: Number(subtotal || 0),
    total: Number(total || 0),
    paymentMethod: paymentMethod || "cod",
    status: "placed",
    address,
    createdAt: nowISO(),
    deliveredAt: null,
  };
  const orders = listOrders();
  orders.unshift(order);
  writeJSON(KEY, orders);
  return order;
}

export function updateOrder(id, patch) {
  const orders = listOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) throw new Error("Order not found");
  const next = { ...orders[idx], ...patch };
  orders[idx] = next;
  writeJSON(KEY, orders);
  return next;
}

export function markDelivered(id) {
  return updateOrder(id, { status: "delivered", deliveredAt: nowISO() });
}

export function summarizeSalesByMonth() {
  const byMonth = {};
  for (const o of listOrders()) {
    const d = new Date(o.createdAt);
    const key = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}`;
    byMonth[key] = (byMonth[key] || 0) + Number(o.total || 0);
  }
  return byMonth; // { '2025-01': amount, ... }
}
