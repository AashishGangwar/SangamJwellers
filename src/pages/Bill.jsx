import React from "react";

// SangamInvoice.jsx
// Single-file React component (TailwindCSS classes) that reproduces the uploaded Sangam Jewellers invoice design.
// Default export a React component. Pass `invoice` prop to render dynamic data. If not provided, sample placeholders are used.

export default function Bill({ invoice }) {
  // Helper function to format date as DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return as is if invalid date
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const sample = {
    shopName: "Sangam Jewellers",
    pan: "AJEPD7294C",
    gstin: "09Ajakldjflkfjklkdsj",
    addressLine1: "Tedwa Kuti, Near Reliance Trends",
    addressLine2: "Farenda Road, Maharajganj",
    state: "Uttar Pradesh, India",
    pincode: "273301",
    customer: { 
      name: invoice?.customer?.name || "", 
      contact: invoice?.customer?.contact || "", 
      address: invoice?.customer?.address || "" 
    },
    purchase: { 
      invoiceNo: invoice?.purchase?.invoiceNo || `INV-${new Date().getFullYear()}-${String(new Date().getTime()).slice(-4)}`,
      date: invoice?.purchase?.date || formatDate(new Date())
    },
    items: [
      { 
        sl: 1, 
        hsn: "711319", 
        weight: "10.500", 
        rate: "5,200", 
        making: "250", 
        amount: "54,850",
        type: "Bangle",
        details: "22KT Gold Bangle with traditional design"
      }
    ],
    discount: "",
    taxable: "",
    sgst: "",
    cgst: "",
    grandTotal: "",
    bank: { 
      name: "Axis Bank", 
      ac: "8349839483984", 
      ifsc: "UTIB0000000", 
      branch: "MAHARAJGANJ, UTTAR PRADESH" 
    },
  };

  const data = invoice || sample;

  return (
    <div className="relative">
      {/* Watermark */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-13 pointer-events-none z-0">
        <img 
          src="/images/fullLogo.png" 
          alt="Watermark" 
          className="w-96 h-auto object-contain"
        />
      </div>
      <style>{`
        @page {
          size: A4;
          margin: 18mm;
        }
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .invoice-a4 { box-shadow: none !important; margin: 0 !important; background: white !important; }
        }
        .invoice-a4 {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          background:rgb(255, 255, 255);
        }
      `}</style>
      <div className="invoice-a4 p-2 flex flex-col">
        <div className="bg-white border-2 border-black p-2 overflow-hidden text-black flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <img 
                src="/images/fullLogo.png" 
                alt="Sangam Jewellers Logo" 
                className="w-28 h-28 object-contain self-center"
              />
              <div className="self-center">
                <h1 className="text-3xl font-bold font-serif leading-tight">
                  <span className="block">Sangam</span>
                  <span className="block">Jewellers</span>
                </h1>
              </div>
            </div>
            <div className="text-right text-sm mt-2 font-serif">
              <div className="font-medium">GSTIN: {data.gstin}</div>
              <div className="mt-1">{data.addressLine1}</div>
              <div>{data.addressLine2}</div>
              <div>{data.state}</div>
              <div>Pincode: {data.pincode}</div>
            </div>
          </div>

          {/* Solid line matching the footer style */}
          <div className="border-t-2 border-black -mx-2 my-4"></div>
<div className="text-center font-bold font-serif mb-4 text-xl underline"><h1>Tax Invoice</h1></div>
          {/* Billing / Purchase Details */}
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div className="border p-3 rounded">
              <div className="font-semibold mb-1">Details of Customer (Billed To)</div>
              <div>Name: {data.customer.name}</div>
              <div>Contact No: {data.customer.contact}</div>
              <div>Address: {data.customer.address}</div>
            </div>

            <div className="border p-3 rounded">
              <div className="font-semibold mb-1">Details of Purchase</div>
              <div>Invoice No.: {data.purchase.invoiceNo}</div>
              <div>Date of Purchase: {data.purchase.date}</div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm table-fixed border-collapse [&_tr]:border-b [&_tr:last-child]:border-b-0">
              <thead>
                <tr>
                  <th className="border px-1 py-3 w-12 text-sm">Sl. No.</th>
                  <th className="border px-2 py-3 text-center w-2/5 text-sm">Description</th>
                  <th className="border px-1 py-3 w-16 text-sm text-center">Hsn/Sac</th>
                  <th className="border px-1 py-3 w-24 text-sm text-center">Weight <br /> (in Gram)</th>
                  <th className="border px-1 py-3 w-24 text-sm text-center">Rate <br /> (₹/Gram)</th>
                  <th className="border px-1 py-3 w-20 text-sm text-center">Making <br /> (₹)</th>
                  <th className="border px-1 py-3 w-24 text-sm text-center">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {data.items && data.items.length > 0 ? (
                  data.items.map((it, idx) => (
                    <tr key={idx} className="h-16 border-b border-gray-200 last:border-b-0">
                      <td className="border px-1 py-3 text-center align-middle">{it.sl}</td>
                      <td className="border px-2 py-3 align-middle">
                        <div className="ml-2">
                          <div className="text-sm">{it.type || 'Item'}</div>
                          <div className="font-bold italic text-xs text-gray-700 mt-0.5">{it.details || it.desc}</div>
                        </div>
                      </td>
                      <td className="border px-1 py-3 text-center align-middle">{it.hsn}</td>
                      <td className="border px-1 py-3 text-center align-middle">{it.weight}</td>
                      <td className="border px-1 py-3 text-center align-middle">₹{it.rate}</td>
                      <td className="border px-1 py-3 text-center align-middle">₹{it.making}</td>
                      <td className="border px-1 py-3 text-center align-middle">₹{it.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="border px-2 py-6 text-center" colSpan={7}>
                      No items — replace `invoice.items` with real rows
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Bank Details and Totals */}
          <div className="flex justify-between gap-4 mb-4">
            {/* Bank Details - Left Side */}
            <div className="w-1/2 border p-4 rounded text-sm">
              <div className="font-bold text-lg font-serif mb-2">Bank Details</div>
              <div className="flex justify-between">
                <span>Bank Name:</span>
                <span className="font-medium">{data.bank.name}</span>
              </div>
              <div className="flex justify-between">
                <span>A/C No.:</span>
                <span className="font-medium">{data.bank.ac}</span>
              </div>
              <div className="flex justify-between">
                <span>IFSC Code:</span>
                <span className="font-medium">{data.bank.ifsc}</span>
              </div>
              <div className="flex justify-between">
                <span>Branch Name:</span>
                <span className="font-medium text-right">{data.bank.branch}</span>
              </div>
            </div>

            {/* Totals - Right Side */}
            <div className="w-1/2 border p-4 rounded text-sm">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between"><span>Discount:</span><span className="font-mono">₹{data.discount || '0.00'}</span></div>
                <div className="flex justify-between"><span>Taxable Amount:</span><span className="font-mono">₹{data.taxable || '0.00'}</span></div>
                <div className="flex justify-between"><span>SGST 1.5%:</span><span className="font-mono">₹{data.sgst || '0.00'}</span></div>
                <div className="flex justify-between"><span>CGST 1.5%:</span><span className="font-mono">₹{data.cgst || '0.00'}</span></div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>GRAND TOTAL:</span>
                  <span className="font-mono">₹{data.grandTotal || '0.00'}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Full-width line connecting inner border, above signature */}
          <div className="border-t-2 border-black -mx-2 mb-12"></div>

          <div className="flex  font-bold font-serif items-center justify-between">
            <div className="text-sm">
              <div>Weight & Pieces are verified and found ok.</div>
              <div>All Subject to jurisdiction Only</div>
            </div>
            <div className="text-sm text-center">
              <div className="mb-14">Authorised Signatory</div>
              <div className="font-semibold">For {data.shopName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
