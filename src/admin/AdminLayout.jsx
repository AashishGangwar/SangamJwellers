import React, { useEffect, useState } from "react";

function getSubroute() {
  const hash = (window.location.hash || "").replace(/^#/, "");
  if (!hash.startsWith("/admin")) return "";
  const parts = hash.split("/");
  // /admin, /admin/products, /admin/orders, /admin/analytics, /admin/billing
  return `/${parts[1] || "admin"}/${parts[2] || ""}`;
}

export default function AdminLayout({ children }) {
  const [route, setRoute] = useState(getSubroute());

  useEffect(() => {
    const onChange = () => setRoute(getSubroute());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return (
    <section className="min-h-screen bg-[#f3e9dd] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 bg-white/90 border border-[#1e3532]/20 text-[#1e3532] rounded-md p-4 h-fit sticky top-24">
          <h2 className="text-lg font-semibold mb-3">Admin</h2>
          <nav className="space-y-2">
            <a className="block px-3 py-2 rounded hover:bg-[#1e3532]/10" href="#/admin">Dashboard</a>
            <a className="block px-3 py-2 rounded hover:bg-[#1e3532]/10" href="#/admin/products">Products</a>
            <a className="block px-3 py-2 rounded hover:bg-[#1e3532]/10" href="#/admin/orders">Orders</a>
            <a className="block px-3 py-2 rounded hover:bg-[#1e3532]/10" href="#/admin/analytics">Analytics</a>
            <a className="block px-3 py-2 rounded hover:bg-[#1e3532]/10" href="#/admin/billing">Billing</a>
          </nav>
        </aside>
        <main className="md:col-span-3">{children}</main>
      </div>
    </section>
  );
}
