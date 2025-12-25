import React, { useEffect, useMemo, useState } from "react";
import { createOrder } from "../store/orders";

const CART_KEY = "cart";

function parsePrice(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const cleaned = String(value).replace(/[^0-9.,-]/g, "").replace(/,/g, "");
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(n) {
  const val = Number.isFinite(n) ? n : 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(val);
}

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function Checkout() {
  const [cart, setCart] = useState(() => readCart());
  const [step, setStep] = useState(1); // 1 Address, 2 Payment, 3 Review

  // Address form state
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
  });

  // Payment selection
  const [payment, setPayment] = useState({ method: "cod" });

  useEffect(() => {
    // Keep cart in sync if changed elsewhere
    const onStorage = () => setCart(readCart());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, it) => sum + parsePrice(it.price) * Math.max(1, Number(it.qty ?? 1)), 0);
    const shipping = cart.length > 0 ? 0 : 0;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [cart]);

  const estDelivery = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    const end = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
    const fmt = (d) => d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    return `${fmt(start)} - ${fmt(end)}`;
  }, []);

  const canContinueAddress =
    address.name && address.phone && address.pincode && address.line1 && address.city && address.state;

  const proceedFromAddress = () => {
    if (!canContinueAddress) return;
    setStep(2);
  };

  const placeOrder = () => {
    if (cart.length === 0) return;
    try {
      createOrder({
        items: cart,
        subtotal: totals.subtotal,
        total: totals.total,
        paymentMethod: payment.method,
        address,
      });
      alert("Order placed successfully! Thank you for shopping with us.");
      try { localStorage.removeItem(CART_KEY); } catch {}
      window.location.hash = "/";
    } catch (e) {
      alert("Failed to place order: " + (e?.message || "Unknown error"));
    }
  };

  return (
    <section className="min-h-screen bg-[#f3e9dd] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Steps */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Address */}
          <div className="bg-white rounded-md shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#1e3532]">1. Delivery Address</h2>
              {step > 1 && <button className="text-sm text-[#1e3532] underline" onClick={() => setStep(1)}>Change</button>}
            </div>
            <div className={`${step === 1 ? "block" : "hidden"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border rounded px-3 py-2" placeholder="Full Name" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} />
                <input className="border rounded px-3 py-2" placeholder="Phone Number" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
                <input className="border rounded px-3 py-2" placeholder="Pincode" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
                <input className="border rounded px-3 py-2" placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                <input className="md:col-span-2 border rounded px-3 py-2" placeholder="House No., Building Name" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
                <input className="md:col-span-2 border rounded px-3 py-2" placeholder="Road name, Area, Colony" value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} />
                <input className="border rounded px-3 py-2" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
              </div>
              <div className="mt-4 flex justify-end">
                <button disabled={!canContinueAddress} onClick={proceedFromAddress} className={`px-6 py-2 rounded ${canContinueAddress ? "bg-[#1e3532] text-[#f3e9dd]" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}>Use this address</button>
              </div>
            </div>
            {step > 1 && (
              <div className="text-sm text-[#1e3532]/80">
                {address.name}, {address.line1}, {address.city} {address.pincode}, {address.state}
              </div>
            )}
          </div>

          {/* Step 2: Payment */}
          <div className="bg-white rounded-md shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#1e3532]">2. Payment Method</h2>
              {step > 2 && <button className="text-sm text-[#1e3532] underline" onClick={() => setStep(2)}>Change</button>}
            </div>
            <div className={`${step === 2 ? "block" : "hidden"}`}>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input type="radio" name="payment" checked={payment.method === "cod"} onChange={() => setPayment({ method: "cod" })} />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="payment" checked={payment.method === "card"} onChange={() => setPayment({ method: "card" })} />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="payment" checked={payment.method === "upi"} onChange={() => setPayment({ method: "upi" })} />
                  <span>UPI</span>
                </label>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={() => setStep(3)} className="px-6 py-2 rounded bg-[#1e3532] text-[#f3e9dd]">Continue</button>
              </div>
            </div>
            {step > 2 && (
              <div className="text-sm text-[#1e3532]/80">
                Selected: {payment.method.toUpperCase()}
              </div>
            )}
          </div>

          {/* Step 3: Review */}
          <div className="bg-white rounded-md shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#1e3532]">3. Review Items and Delivery</h2>
            </div>
            <div className="space-y-4">
              {cart.length === 0 ? (
                <div className="text-[#1e3532]/70">Your cart is empty.</div>
              ) : (
                cart.map((it) => (
                  <div key={it.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded overflow-hidden bg-white border">
                      <img src={it.image} alt={it.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[#1e3532]">{it.title}</div>
                      <div className="text-sm text-[#1e3532]/70">Qty: {Math.max(1, Number(it.qty ?? 1))}</div>
                      <div className="text-sm text-green-700">Estimated delivery: {estDelivery}</div>
                    </div>
                    <div className="font-semibold text-[#1e3532]">{formatCurrency(parsePrice(it.price) * Math.max(1, Number(it.qty ?? 1)))}</div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button disabled={cart.length === 0} onClick={placeOrder} className={`px-6 py-3 rounded ${cart.length ? "bg-[#1e3532] text-[#f3e9dd]" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}>Place your order</button>
            </div>
          </div>
        </div>

        {/* Right column: Order summary */}
        <aside className="bg-white rounded-md shadow p-6 h-fit">
          <h3 className="text-lg font-semibold text-[#1e3532] mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Items:</span><span>{formatCurrency(totals.subtotal)}</span></div>
            <div className="flex justify-between"><span>Delivery:</span><span className="text-green-700">Free</span></div>
            <hr className="my-2" />
            <div className="flex justify-between text-base font-semibold"><span>Order total:</span><span>{formatCurrency(totals.total)}</span></div>
          </div>
          <button onClick={() => setStep(3)} className="w-full mt-4 py-2 rounded bg-[#1e3532] text-[#f3e9dd]">Use this payment method</button>
          <div className="mt-2 text-xs text-[#1e3532]/70">By placing your order, you agree to the conditions of use and sale.</div>
        </aside>
      </div>
    </section>
  );
}
