import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Orders from "./Orders";
import Analytics from "./Analytics";
import Billing from "./Billing";

function getAdminPath() {
  const hash = (window.location.hash || "").replace(/^#/, "");
  if (!hash.startsWith("/admin")) return "/admin";
  return hash;
}

export default function AdminRouter() {
  const [path, setPath] = useState(getAdminPath());
  useEffect(() => {
    const onChange = () => setPath(getAdminPath());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  let view = <Dashboard />;
  if (path.startsWith("/admin/products")) view = <Products />;
  else if (path.startsWith("/admin/orders")) view = <Orders />;
  else if (path.startsWith("/admin/analytics")) view = <Analytics />;
  else if (path.startsWith("/admin/billing")) view = <Billing />;

  return <AdminLayout>{view}</AdminLayout>;
}
