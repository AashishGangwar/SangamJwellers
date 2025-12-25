// Billing.jsx
import React, { useMemo, useState } from "react";
import Bill from "../pages/Bill";

/* -------------------- Helpers -------------------- */

function parsePrice(value) {
  if (typeof value === "number") return value;
  if (!value && value !== 0) return 0;
  const cleaned = String(value).replace(/[^0-9.\-]/g, "").replace(/,/g, "");
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(n) {
  const val = Number.isFinite(n) ? Number(n) : 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(val.toFixed(2)));
}

function safeFormatCurrency(n) {
  const val = Number.isFinite(n) ? Number(n) : 0;
  return "Rs " + Number(val.toFixed(2)).toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

// number to words (Indian system). returns "X Rupees and Y/100 Paise Only"
function numberToWordsIN(num) {
  if (!Number.isFinite(num) || Math.abs(num) < 0.005) return "Zero Rupees Only";
  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function twoDigits(n) {
    if (n < 20) return ones[n];
    const t = tens[Math.floor(n / 10)];
    return t + (n % 10 ? " " + ones[n % 10] : "");
  }

  function threeDigits(n) {
    let out = "";
    if (n > 99) {
      out += ones[Math.floor(n / 100)] + " Hundred";
      if (n % 100) out += " and ";
    }
    if (n % 100) out += twoDigits(n % 100);
    return out;
  }

  const parts = [];
  let n = Math.floor(Math.abs(num));
  parts.push(n % 1000); n = Math.floor(n / 1000);
  parts.push(n % 100); n = Math.floor(n / 100);
  parts.push(n % 100); n = Math.floor(n / 100);
  parts.push(n % 100);

  const labels = ["", "Thousand", "Lakh", "Crore"];
  const words = [];
  for (let i = 0; i < parts.length; i++) {
    if (!parts[i]) continue;
    const p = parts[i];
    const chunk = (i === 0) ? threeDigits(p) : ((p < 100) ? twoDigits(p) : threeDigits(p));
    words.unshift(chunk + (labels[i] ? " " + labels[i] : ""));
  }
  const combined = words.filter(Boolean).join(" ").trim();
  const paise = Math.round((Math.abs(num) - Math.floor(Math.abs(num))) * 100);
  const paisePart = paise ? ` and ${paise}/100 Paise` : "";
  return `${combined} Rupees${paisePart} Only`;
}

/* -------------------- jsPDF loader -------------------- */

const tryLoadJsPDF = async () => {
  if (window.jspdf?.jsPDF) return window.jspdf.jsPDF;
  await new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js";
    s.onload = () => res();
    s.onerror = () => rej(new Error("Failed to load jsPDF"));
    document.body.appendChild(s);
  });
  // try load autotable (not fatal)
  if (!window.jspdf?.autoTable) {
    await new Promise((res) => {
      const s2 = document.createElement("script");
      s2.src = "https://cdn.jsdelivr.net/npm/jspdf-autotable@3.5.25/dist/jspdf.plugin.autotable.min.js";
      s2.onload = () => res();
      s2.onerror = () => res();
      document.body.appendChild(s2);
    });
  }
  return window.jspdf?.jsPDF;
};

/* -------------------- Component -------------------- */

export default function Billing() {
  const [form, setForm] = useState({
    shopNameLine1: "Sangam",
    shopNameLine2: "Jewellers",
    pan: "AJEPD7294C",
    gst: "09Axxxxxxxxx",
    addressLine1: "Tedwa Kuti, Near Reliance Trends",
    addressLine2: "Farenda Road, Maharajganj",
    cityState: "Uttar Pradesh, India",
    pincode: "273301",
    customerName: "",
    phone: "",
    address: "",
    invoiceNo: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toLocaleDateString("en-CA"),
    discountPercent: 0,
    discountAmount: 0,
    bankName: "",
    bankAc: "",
    bankIfsc: "",
    bankBranch: "",
    lines: [
      { description: "", title: "", hsn: "9997", weight: 0, rate: 0, making: 0 },
    ],
  });

  const GST_RATE = 0.03; // total 3% (1.5% SGST + 1.5% CGST)

  const totals = useMemo(() => {
    const sub = form.lines.reduce((s, l) => {
      const r = parsePrice(l.rate);
      const w = Number(l.weight || 0);
      const m = parsePrice(l.making);
      return s + r * w + m;
    }, 0);

    let discount = 0;
    if (Number(form.discountPercent) > 0) {
      discount = (sub * Number(form.discountPercent)) / 100;
    } else {
      discount = Number(form.discountAmount || 0);
    }
    discount = Math.max(0, discount);
    const taxable = Math.max(0, sub - discount);
    const sgst = taxable * (GST_RATE / 2);
    const cgst = taxable * (GST_RATE / 2);
    const grand = taxable + sgst + cgst;
    return {
      sub: Number(sub.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      taxable: Number(taxable.toFixed(2)),
      sgst: Number(sgst.toFixed(2)),
      cgst: Number(cgst.toFixed(2)),
      grand: Number(grand.toFixed(2)),
    };
  }, [form, GST_RATE]);

  // Map current editable form into the printable Bill.jsx design's `invoice` shape
  const invoiceData = useMemo(() => {
    return {
      shopName: `${form.shopNameLine1} ${form.shopNameLine2}`.trim(),
      pan: form.pan,
      gstin: form.gst,
      addressLine1: form.addressLine1,
      addressLine2: form.addressLine2,
      state: form.cityState,
      pincode: form.pincode,
      customer: {
        name: form.customerName,
        contact: form.phone,
        address: form.address,
      },
      purchase: {
        invoiceNo: form.invoiceNo,
        date: form.date,
      },
      items: form.lines.map((l, i) => ({
        desc: l.description || l.title || "",
        sl: i + 1,
        hsn: l.hsn || "",
        weight: l.weight,
        rate: l.rate,
        making: l.making,
        amount: Number(parsePrice(l.rate)) * Number(l.weight || 0) + Number(parsePrice(l.making)),
      })),
      discount: totals.discount,
      taxable: totals.taxable,
      sgst: totals.sgst,
      cgst: totals.cgst,
      grandTotal: totals.grand,
      bank: {
        name: form.bankName,
        ac: form.bankAc,
        ifsc: form.bankIfsc,
        branch: form.bankBranch,
      },
    };
  }, [form, totals]);

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const updateLine = (idx, partial) =>
    setForm((f) => {
      const lines = [...f.lines];
      lines[idx] = { ...lines[idx], ...partial };
      return { ...f, lines };
    });
  const addLine = () =>
    setForm((f) => ({ ...f, lines: [...f.lines, { description: "", title: "", hsn: "9997", weight: 0, rate: 0, making: 0 }] }));
  const removeLine = (idx) => setForm((f) => ({ ...f, lines: f.lines.filter((_, i) => i !== idx) }));

  const generatePdf = async () => {
    try {
      const JS = await tryLoadJsPDF();
      if (!JS) throw new Error("jsPDF unavailable");
      const doc = new JS({ unit: "pt", format: "a4" });
      const W = doc.internal.pageSize.getWidth();
      const H = doc.internal.pageSize.getHeight();

      // Watermark
      doc.setFontSize(70);
      doc.setTextColor(230, 230, 230);
      doc.text(form.shopNameLine1 + " " + form.shopNameLine2, W / 2, H / 2, { align: "center", baseline: "middle", angle: -35 });
      doc.setTextColor(0, 0, 0);

      // Header left
      let y = 40;
      doc.setFontSize(22);
      doc.setFont(undefined, "bold");
      doc.text(form.shopNameLine1, 40, y);
      doc.text(form.shopNameLine2, 40, y + 22);
      doc.setFont(undefined, "normal");
      doc.setFontSize(9);
      doc.text(`PAN No.: ${form.pan}`, 40, y + 46);
      doc.text(`GSTIN: ${form.gst}`, 220, y + 46);
      doc.text(form.addressLine1, 40, y + 60);
      doc.text(form.addressLine2, 40, y + 74);
      doc.text(`${form.cityState}`, 40, y + 88);
      doc.text(`Pincode: ${form.pincode}`, 40, y + 102);

      // Invoice meta on right
      const rightX = W - 220;
      doc.setFontSize(11);
      doc.text("Details of Purchase:", rightX, y + 8);
      doc.setFontSize(10);
      doc.text(`Invoice No.: ${form.invoiceNo || ""}`, rightX, y + 28);
      doc.text(`Date of Purchase: ${form.date || ""}`, rightX, y + 44);

      // Customer block
      let cy = y + 120;
      doc.setFontSize(11);
      doc.text("Details of Customer (Billed To)", 40, cy);
      cy += 14;
      doc.setFontSize(10);
      doc.text(`Name: ${form.customerName}`, 40, cy);
      doc.text(`Contact No: ${form.phone}`, rightX, cy);
      cy += 14;
      const addrLines = doc.splitTextToSize(`Address: ${form.address}`, W - 80);
      doc.text(addrLines, 40, cy);
      cy += addrLines.length * 12 + 8;

      // Table heading "Details of Purchase"
      doc.setFontSize(11);
      doc.text("Details of Purchase", 40, cy);
      cy += 12;

      // Table body (we will use autoTable if available)
      const tableBody = [];
      form.lines.forEach((l, idx) => {
        const weight = Number(l.weight || 0);
        const rate = parsePrice(l.rate);
        const making = parsePrice(l.making);
        const amount = Number((rate * weight + making).toFixed(2));
        // Description + row
        tableBody.push([
          l.description || "-",
          String(idx + 1),
          l.hsn || "9997",
          String(weight),
          safeFormatCurrency(rate),
          safeFormatCurrency(making),
          safeFormatCurrency(amount),
        ]);
      });

      if (doc.autoTable) {
        doc.autoTable({
          startY: cy,
          head: [
            ["Description", "Sl. No.", "Hsn/Sac", "Weight (in Gram)", "Rate (per Gram)", "Making Charges", "Amount"],
          ],
          body: tableBody,
          styles: { fontSize: 9, cellPadding: 6 },
          headStyles: { fillColor: [255, 255, 255], textColor: 0, fontStyle: "bold" },
          theme: "grid",
          columnStyles: {
            0: { cellWidth: 180 },
            1: { cellWidth: 50 },
            2: { cellWidth: 60 },
            3: { cellWidth: 80 },
            4: { cellWidth: 80 },
            5: { cellWidth: 80 },
            6: { cellWidth: 90 },
          },
        });
        cy = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : cy + 140;
      } else {
        // fallback: manual table
        const cols = [40, 220, 280, 340, 420, 500, 560];
        doc.setFontSize(9);
        ["Description", "Sl. No.", "Hsn/Sac", "Weight (in Gram)", "Rate (per Gram)", "Making Charges", "Amount"].forEach((h, i) => {
          doc.text(h, cols[i], cy);
        });
        cy += 12;
        form.lines.forEach((l, idx) => {
          const weight = Number(l.weight || 0);
          const rate = parsePrice(l.rate);
          const making = parsePrice(l.making);
          const amount = Number((rate * weight + making).toFixed(2));
          doc.text(l.description || "-", cols[0], cy);
          doc.text(String(idx + 1), cols[1], cy);
          doc.text(l.hsn || "9997", cols[2], cy);
          doc.text(String(weight), cols[3], cy);
          doc.text(String(rate), cols[4], cy);
          doc.text(String(making), cols[5], cy);
          doc.text(String(amount), cols[6], cy);
          cy += 14;
        });
      }

      // Totals box on right
      const t = totals;
      const boxX = W - 300;
      let ty = cy + 6;
      doc.setFontSize(10);
      doc.text(`Discount: ${safeFormatCurrency(t.discount)}`, boxX, ty); ty += 14;
      doc.text(`Taxable Amount: ${safeFormatCurrency(t.taxable)}`, boxX, ty); ty += 14;
      doc.text(`SGST 1.5%: ${safeFormatCurrency(t.sgst)}`, boxX, ty); ty += 14;
      doc.text(`CGST 1.5%: ${safeFormatCurrency(t.cgst)}`, boxX, ty); ty += 18;
      doc.setFontSize(12);
      doc.text(`GRAND TOTAL: ${safeFormatCurrency(t.grand)}`, boxX, ty); ty += 20;

      // Amount in words box spanning width
      const words = numberToWordsIN(t.grand);
      const wordsBoxX = 40;
      const wordsBoxW = W - 80;
      const wordsTop = ty + 8;
      doc.setDrawColor(0);
      doc.rect(wordsBoxX, wordsTop, wordsBoxW, 48);
      doc.setFontSize(10);
      const wLines = doc.splitTextToSize(words, wordsBoxW - 12);
      doc.text(wLines, wordsBoxX + 8, wordsTop + 18);

      // Bank details below words box
      const bankY = wordsTop + 48 + 14;
      doc.setFontSize(10);
      doc.text("Bank Name: " + (form.bankName || ""), 40, bankY);
      doc.text("A/C No.: " + (form.bankAc || ""), 40, bankY + 14);
      doc.text("IFSC Code: " + (form.bankIfsc || ""), 40, bankY + 28);
      doc.text("Branch Name: " + (form.bankBranch || ""), 40, bankY + 42);

      // Footer sign & note
      const footerY = H - 120;
      doc.setFontSize(9);
      doc.text("Weight & Pieces are verified and found ok.", 40, footerY - 18);
      doc.text("All Subject to jurisdiction Only", 40, footerY - 4);

      // Authorised sign
      doc.text("Authorised Signatory", W - 200, footerY + 6);
      doc.line(W - 260, footerY + 12, W - 40, footerY + 12);

      // filename includes invoice number if available
      const fileName = `Sangam_${form.invoiceNo || Date.now()}.pdf`;
      doc.save(fileName);
    } catch (err) {
      console.error("PDF generation failed:", err);
      // fallback: open print HTML with a simple layout
      const html = `<!doctype html><title>Invoice</title><div style="font-family: Arial; padding:20px; color:#111">
        <h2>${form.shopNameLine1} ${form.shopNameLine2}</h2>
        <div>PAN: ${form.pan} &nbsp; GSTIN: ${form.gst}</div>
        <div>${form.addressLine1}, ${form.addressLine2}, ${form.cityState} - ${form.pincode}</div>
        <hr/>
        <h3>Details of Customer (Billed To)</h3>
        <div>Name: ${form.customerName}</div>
        <div>Contact: ${form.phone}</div>
        <div>Address: ${form.address}</div>
        <h3>Details of Purchase</h3>
        ${form.lines.map((l,i)=>`<div style="margin:4px 0">${i+1}. ${l.description || '-'} — W:${l.weight}g Rate:${formatCurrency(parsePrice(l.rate))} Making:${formatCurrency(parsePrice(l.making))} Amount:${formatCurrency(parsePrice(l.rate)*Number(l.weight||0)+parsePrice(l.making))}</div>`).join("")}
        <hr/>
        <div>Subtotal: ${formatCurrency(totals.sub)}</div>
        <div>Discount: ${formatCurrency(totals.discount)}</div>
        <div>Taxable: ${formatCurrency(totals.taxable)}</div>
        <div>SGST: ${formatCurrency(totals.sgst)}</div>
        <div>CGST: ${formatCurrency(totals.cgst)}</div>
        <div><strong>Total: ${formatCurrency(totals.grand)}</strong></div>
        <hr/>
        <div>Bank: ${form.bankName} | A/C: ${form.bankAc} | IFSC: ${form.bankIfsc} | Branch: ${form.bankBranch}</div>
        <div style="margin-top:20px">Weight & Pieces are verified and found ok.<br/>All Subject to jurisdiction Only</div>
      </div>`;
      const w = window.open("", "_blank");
      if (w) {
        w.document.write(html);
        w.print();
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-[#1e3532] font-serif mb-4">Billing — Sangam Jewellers</h1>
      <div className="bg-white text-[#1e3532] rounded-md shadow p-6 space-y-4">
        {/* Header editable small fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Shop Line 1" value={form.shopNameLine1} onChange={(e)=>setField("shopNameLine1", e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Shop Line 2" value={form.shopNameLine2} onChange={(e)=>setField("shopNameLine2", e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="PAN" value={form.pan} onChange={(e)=>setField("pan", e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="GSTIN" value={form.gst} onChange={(e)=>setField("gst", e.target.value)} />
          <input className="border rounded px-3 py-2 md:col-span-2" placeholder="Address line 1" value={form.addressLine1} onChange={(e)=>setField("addressLine1", e.target.value)} />
          <input className="border rounded px-3 py-2 md:col-span-2" placeholder="Address line 2" value={form.addressLine2} onChange={(e)=>setField("addressLine2", e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="City/State" value={form.cityState} onChange={(e)=>setField("cityState", e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Pincode" value={form.pincode} onChange={(e)=>setField("pincode", e.target.value)} />
        </div>

        {/* Customer + invoice meta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Customer Name" value={form.customerName} onChange={(e)=>setField("customerName", e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Contact No." value={form.phone} onChange={(e)=>setField("phone", e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Invoice No." value={form.invoiceNo} onChange={(e)=>setField("invoiceNo", e.target.value)} />
          <input className="border rounded px-3 py-2 md:col-span-2" placeholder="Customer Address" value={form.address} onChange={(e)=>setField("address", e.target.value)} />
          <input className="border rounded px-3 py-2" type="date" value={form.date} onChange={(e)=>setField("date", e.target.value)} />
        </div>

        {/* Items */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Items</h2>
            <button type="button" onClick={addLine} className="px-3 py-1 rounded bg-[#1e3532] text-[#f3e9dd]">Add Line</button>
          </div>

          {form.lines.map((l, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-7 gap-2 items-start border-b pb-3">
              <input className="border rounded px-3 py-2 md:col-span-2" placeholder="Description" value={l.description} onChange={(e)=>updateLine(idx, { description: e.target.value })} />
              <input className="border rounded px-3 py-2" placeholder="Sl. No." value={idx+1} disabled />
              <input className="border rounded px-3 py-2" placeholder="Hsn/Sac" value={l.hsn} onChange={(e)=>updateLine(idx, { hsn: e.target.value })} />
              <input className="border rounded px-3 py-2" placeholder="Weight (g)" type="number" value={l.weight} onChange={(e)=>updateLine(idx, { weight: Number(e.target.value) })} />
              <input className="border rounded px-3 py-2" placeholder="Rate (per g)" type="number" value={l.rate} onChange={(e)=>updateLine(idx, { rate: e.target.value })} />
              <input className="border rounded px-3 py-2" placeholder="Making Charges" type="number" value={l.making} onChange={(e)=>updateLine(idx, { making: e.target.value })} />
              <div className="flex gap-2 items-center">
                <div className="text-sm">Amount: <strong>{safeFormatCurrency(parsePrice(l.rate) * Number(l.weight || 0) + parsePrice(l.making))}</strong></div>
                <button type="button" onClick={()=>removeLine(idx)} className="px-3 py-2 rounded border ml-auto">Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* Discount & bank & totals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-2">
            <label className="text-sm">Discount (%) - takes precedence if &gt;0</label>
            <input className="border rounded px-3 py-2" type="number" value={form.discountPercent} onChange={(e)=>setField("discountPercent", Number(e.target.value))} />
            <label className="text-sm">Or Discount (Absolute Rs)</label>
            <input className="border rounded px-3 py-2" type="number" value={form.discountAmount} onChange={(e)=>setField("discountAmount", Number(e.target.value))} />
            <div className="mt-2">
              <h3 className="text-sm font-semibold">Bank Details (printed)</h3>
              <input className="border rounded px-3 py-2 mt-1 w-full" placeholder="Bank Name" value={form.bankName} onChange={(e)=>setField("bankName", e.target.value)} />
              <input className="border rounded px-3 py-2 mt-1 w-full" placeholder="A/C No." value={form.bankAc} onChange={(e)=>setField("bankAc", e.target.value)} />
              <input className="border rounded px-3 py-2 mt-1 w-full" placeholder="IFSC Code" value={form.bankIfsc} onChange={(e)=>setField("bankIfsc", e.target.value)} />
              <input className="border rounded px-3 py-2 mt-1 w-full" placeholder="Branch Name" value={form.bankBranch} onChange={(e)=>setField("bankBranch", e.target.value)} />
            </div>
          </div>

          <div className="col-span-2 space-y-2 p-4 border rounded">
            <div className="flex justify-between"><div>Subtotal:</div><div><strong>{formatCurrency(totals.sub)}</strong></div></div>
            <div className="flex justify-between"><div>Discount:</div><div><strong>{formatCurrency(totals.discount)}</strong></div></div>
            <div className="flex justify-between"><div>Taxable Amount:</div><div><strong>{formatCurrency(totals.taxable)}</strong></div></div>
            <div className="flex justify-between"><div>SGST (1.5%):</div><div><strong>{formatCurrency(totals.sgst)}</strong></div></div>
            <div className="flex justify-between"><div>CGST (1.5%):</div><div><strong>{formatCurrency(totals.cgst)}</strong></div></div>
            <div className="flex justify-between mt-2 text-lg"><div>Grand Total:</div><div><strong>{formatCurrency(totals.grand)}</strong></div></div>
          </div>
        </div>

        {/* Live Preview (New Bill Design) */}
        <div className="pt-6">
          <h2 className="text-lg font-semibold mb-3">Invoice Preview (New Design)</h2>
          <div className="border rounded overflow-hidden">
            <Bill invoice={invoiceData} />
          </div>
        </div>

        {/* Footer controls */}
        <div className="flex justify-between items-center">
          <div className="text-sm">Weight & Pieces are verified and found ok. · All Subject to jurisdiction Only</div>
          <div className="flex gap-2">
            <button onClick={generatePdf} className="px-6 py-2 rounded bg-[#1e3532] text-[#f3e9dd] font-bold">GENERATE BILL</button>
          </div>
        </div>
      </div>
    </div>
  );
}
