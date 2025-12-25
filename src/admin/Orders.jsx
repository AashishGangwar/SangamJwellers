import React, { useMemo, useState } from "react";
import { listOrders, markDelivered } from "../store/orders";

export default function Orders() {
  const [refresh, setRefresh] = useState(0);
  const orders = useMemo(() => listOrders(), [refresh]);
  const [expanded, setExpanded] = useState("");

  const toggleExpand = (id) => setExpanded((e) => (e === id ? "" : id));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-[#1e3532]">Orders</h1>

      <div className="bg-white/90 border border-[#1e3532]/20 text-[#1e3532] rounded-md p-4 overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">Order ID</th>
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Items</th>
              <th className="py-2 pr-4">Total</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <React.Fragment key={o.id}>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-mono">{o.id}</td>
                  <td className="py-2 pr-4">{new Date(o.createdAt).toLocaleString()}</td>
                  <td className="py-2 pr-4">{o.items.reduce((c,i)=>c+i.qty,0)}</td>
                  <td className="py-2 pr-4">₹{Number(o.total||0).toLocaleString()}</td>
                  <td className="py-2 pr-4">
                    <span className={`px-2 py-1 rounded text-xs ${o.status==='delivered'?'bg-green-100 text-green-700':'bg-yellow-100 text-yellow-700'}`}>{o.status}</span>
                  </td>
                  <td className="py-2 pr-4 space-x-2">
                    <button className="px-2 py-1 rounded border" onClick={()=>toggleExpand(o.id)}>{expanded===o.id? 'Hide':'View'}</button>
                    {o.status !== 'delivered' && (
                      <button className="px-2 py-1 rounded bg-[#1e3532] text-[#f3e9dd]" onClick={()=>{markDelivered(o.id); setRefresh(x=>x+1);}}>Mark Delivered</button>
                    )}
                  </td>
                </tr>
                {expanded === o.id && (
                  <tr>
                    <td colSpan={6} className="py-3 bg-[#f8f8f8]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
                        <div>
                          <h3 className="font-semibold text-[#1e3532] mb-2">Items</h3>
                          <ul className="space-y-2">
                            {o.items.map((it, idx) => (
                              <li key={idx} className="flex items-center gap-3">
                                <img src={it.image} alt={it.title} className="w-12 h-12 object-contain rounded bg-white border" />
                                <div className="flex-1">
                                  <div className="font-medium">{it.title}</div>
                                  <div className="text-xs text-[#1e3532]/70">Qty: {it.qty}</div>
                                </div>
                                <div className="font-semibold">₹{(Number(it.price||0)*it.qty).toLocaleString()}</div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#1e3532] mb-2">Delivery Address</h3>
                          <div className="text-sm text-[#1e3532]">
                            <div>{o.address?.name}</div>
                            <div>{o.address?.line1}</div>
                            {o.address?.line2 && <div>{o.address?.line2}</div>}
                            <div>{o.address?.city} {o.address?.pincode}</div>
                            <div>{o.address?.state}</div>
                            <div>Phone: {o.address?.phone}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {orders.length === 0 && (
              <tr><td className="py-4 text-[#1e3532]/70" colSpan={6}>No orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
