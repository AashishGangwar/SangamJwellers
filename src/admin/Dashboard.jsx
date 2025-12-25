import React from "react";
import { listProducts } from "../store/products";
import { listOrders } from "../store/orders";

export default function Dashboard() {
  const products = listProducts();
  const orders = listOrders();
  const delivered = orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-[#1e3532]">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/90 border border-[#1e3532]/20 text-[#1e3532] rounded-md p-4">
          <div className="text-sm text-[#1e3532]/70">Products</div>
          <div className="text-3xl font-bold text-[#1e3532]">{products.length}</div>
        </div>
        <div className="bg-white/90 border border-[#1e3532]/20 text-[#1e3532] rounded-md p-4">
          <div className="text-sm text-[#1e3532]/70">Orders</div>
          <div className="text-3xl font-bold text-[#1e3532]">{orders.length}</div>
        </div>
        <div className="bg-white/90 border border-[#1e3532]/20 text-[#1e3532] rounded-md p-4">
          <div className="text-sm text-[#1e3532]/70">Delivered</div>
          <div className="text-3xl font-bold text-[#1e3532]">{delivered}</div>
        </div>
      </div>
      <div className="bg-white/90 border border-[#1e3532]/20 text-[#1e3532] rounded-md p-6">
        <p className="text-[#1e3532]">Welcome. Use the left menu to manage products, orders, analytics, and billing.</p>
      </div>
    </div>
  );
}
