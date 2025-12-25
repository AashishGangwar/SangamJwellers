import React, { useMemo, useState } from "react";
import { listProducts, addProduct, updateProduct, toggleAvailability } from "../store/products";

export default function Products() {
  const [refresh, setRefresh] = useState(0);
  const products = useMemo(() => listProducts(), [refresh]);

  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    images: "",
    image: "",
    video: "",
    type: "",
    color: "",
    material: "",
    mrp: "",
    price: "",
    available: true,
  });

  const [editingId, setEditingId] = useState("");

  const resetForm = () => setForm({ id: "", title: "", description: "", images: "", image: "", video: "", type: "", color: "", material: "", mrp: "", price: "", available: true });

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        updateProduct(editingId, form);
      } else {
        addProduct(form);
      }
      resetForm();
      setEditingId("");
      setRefresh((x) => x + 1);
      alert("Saved product");
    } catch (err) {
      alert(err?.message || "Failed to save product");
    }
  };

  const onEdit = (p) => {
    setEditingId(p.id);
    setForm({
      id: p.id,
      title: p.title,
      description: p.description || "",
      images: (p.images || []).join(", "),
      image: p.image || "",
      video: p.video || "",
      type: p.type || "",
      color: p.color || "",
      material: p.material || "",
      mrp: p.mrp || "",
      price: p.price || "",
      available: !!p.available,
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-serif text-[#1e3532]">Products</h1>

      {/* Add / Edit form */}
      <form onSubmit={onSubmit} className="bg-white/90 border border-[#1e3532]/20 text-[#1e3532] rounded-md p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border rounded px-3 py-2" placeholder="Product ID (optional, must be unique)" value={form.id} onChange={(e)=>setForm({...form, id:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} required />
          <input className="border rounded px-3 py-2" placeholder="Primary Image URL" value={form.image} onChange={(e)=>setForm({...form, image:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="Additional Images (comma separated URLs)" value={form.images} onChange={(e)=>setForm({...form, images:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="Video URL (optional)" value={form.video} onChange={(e)=>setForm({...form, video:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="Type (e.g., Necklace)" value={form.type} onChange={(e)=>setForm({...form, type:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="Color (Gold/Silver)" value={form.color} onChange={(e)=>setForm({...form, color:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="Material (Gold/Silver/Artificial)" value={form.material} onChange={(e)=>setForm({...form, material:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="MRP" value={form.mrp} onChange={(e)=>setForm({...form, mrp:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="Sale Price" value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})} />
        </div>
        <textarea className="w-full border rounded px-3 py-2" rows={3} placeholder="Description" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} />
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.available} onChange={(e)=>setForm({...form, available:e.target.checked})} />
          <span>Available</span>
        </label>
        <div className="flex gap-3">
          <button type="submit" className="px-6 py-2 rounded bg-[#1e3532] text-[#f3e9dd]">{editingId ? "Update Product" : "Add Product"}</button>
          {editingId && (
            <button type="button" onClick={()=>{resetForm(); setEditingId("");}} className="px-4 py-2 rounded border">Cancel</button>
          )}
        </div>
      </form>

      {/* Product list */}
      <div className="bg-white/90 border border-[#1e3532]/20 text-[#1e3532] rounded-md p-4 overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">Image</th>
              <th className="py-2 pr-4">Title</th>
              <th className="py-2 pr-4">ID</th>
              <th className="py-2 pr-4">MRP</th>
              <th className="py-2 pr-4">Price</th>
              <th className="py-2 pr-4">Avail</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="py-2 pr-4">
                  <img src={p.image} alt={p.title} className="w-12 h-12 object-contain" />
                </td>
                <td className="py-2 pr-4">{p.title}</td>
                <td className="py-2 pr-4">{p.id}</td>
                <td className="py-2 pr-4">₹{Number(p.mrp||0).toLocaleString()}</td>
                <td className="py-2 pr-4">₹{Number(p.price||0).toLocaleString()}</td>
                <td className="py-2 pr-4">
                  <button onClick={()=>{toggleAvailability(p.id); setRefresh(x=>x+1);}} className={`px-2 py-1 rounded text-xs ${p.available? 'bg-green-100 text-green-700':'bg-gray-200 text-gray-700'}`}>{p.available? 'Available':'Hidden'}</button>
                </td>
                <td className="py-2 pr-4">
                  <button onClick={()=>onEdit(p)} className="px-3 py-1 rounded border">Edit</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td className="py-4 text-[#1e3532]/70" colSpan={7}>No products yet. Add some above.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
