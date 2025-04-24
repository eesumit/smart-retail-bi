"use client";

import { useState } from "react";

interface Sale {
  id: string;
  product: string;
  quantity: number;
  date: string;
  price: number;
}

export default function SalesPage() {
  const [product, setProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [date, setDate] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [sales, setSales] = useState<Sale[]>([]);
  const [activeTab, setActiveTab] = useState<"form" | "analytics">("form");

  const products = [
    { name: "Wireless Mouse", price: 29.99 },
    { name: "Keyboard", price: 49.99 },
    { name: "Charger", price: 19.99 },
    { name: "Headphones", price: 89.99 },
    { name: "Monitor", price: 199.99 },
    { name: "Webcam", price: 59.99 },
  ];

  const addSale = () => {
    if (!product || !date || quantity <= 0) return;

    const selectedProduct = products.find(p => p.name === product);
    const salePrice = selectedProduct ? selectedProduct.price * quantity : 0;

    const newSale: Sale = {
      id: Date.now().toString(),
      product,
      quantity,
      date,
      price: salePrice
    };
    
    setSales([...sales, newSale]);
    setProduct("");
    setQuantity(1);
    setDate("");
    setPrice(0);
  };

  const deleteSale = (id: string) => {
    setSales(sales.filter(sale => sale.id !== id));
  };

  const totalSales = sales.reduce((sum, sale) => sum + sale.price, 0);
  const totalItems = sales.reduce((sum, sale) => sum + sale.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-green-800">🌿 SmartRetail</h1>
          <p className="text-green-600">Track and manage your sales</p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex border-b border-green-200 mb-6">
          <button
            onClick={() => setActiveTab("form")}
            className={`px-4 py-2 font-medium ${activeTab === "form" ? "text-green-700 border-b-2 border-green-600" : "text-green-500"}`}
          >
            🛍️ Sales Entry
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 font-medium ${activeTab === "analytics" ? "text-green-700 border-b-2 border-green-600" : "text-green-500"}`}
          >
            📈 Analytics
          </button>
        </div>

        {activeTab === "form" ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
                <h3 className="text-sm font-medium text-green-600">Total Sales</h3>
                <p className="text-2xl font-bold text-green-800">${totalSales.toFixed(2)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
                <h3 className="text-sm font-medium text-green-600">Items Sold</h3>
                <p className="text-2xl font-bold text-green-800">{totalItems}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
                <h3 className="text-sm font-medium text-green-600">Transactions</h3>
                <p className="text-2xl font-bold text-green-800">{sales.length}</p>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-green-100 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-green-700">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-green-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-green-700">Product</label>
                <select
                  value={product}
                  onChange={(e) => {
                    setProduct(e.target.value);
                    const selected = products.find(p => p.name === e.target.value);
                    if (selected) setPrice(selected.price);
                  }}
                  className="w-full border border-green-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">-- Select Product --</option>
                  {products.map((product) => (
                    <option key={product.name} value={product.name}>
                      {product.name} (${product.price})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-green-700">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full border border-green-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="flex flex-col gap-2 justify-end">
                <button
                  onClick={addSale}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <span>➕</span> Add Sale
                </button>
                <button
                  className="bg-green-50 hover:bg-green-100 text-green-700 py-2 rounded-xl text-sm font-medium border border-green-200 transition-colors flex items-center justify-center gap-1"
                >
                  <span>📤</span> Export Data
                </button>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-green-700">📋 Recent Sales</h2>
                <span className="text-sm text-green-600">{sales.length} records</span>
              </div>
              
              {sales.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-green-400 text-5xl mb-2">🛒</div>
                  <p className="text-gray-500">No sales recorded yet</p>
                  <p className="text-sm text-gray-400 mt-1">Add your first sale using the form above</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-green-50 text-green-700">
                      <tr>
                        <th className="px-4 py-3 text-left rounded-tl-xl">Date</th>
                        <th className="px-4 py-3 text-left">Product</th>
                        <th className="px-4 py-3 text-left">Qty</th>
                        <th className="px-4 py-3 text-left">Unit Price</th>
                        <th className="px-4 py-3 text-left">Total</th>
                        <th className="px-4 py-3 text-left rounded-tr-xl">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-green-100">
                      {sales.map((sale) => (
                        <tr key={sale.id} className="hover:bg-green-50">
                          <td className="px-4 py-3">{sale.date}</td>
                          <td className="px-4 py-3 font-medium">{sale.product}</td>
                          <td className="px-4 py-3">{sale.quantity}</td>
                          <td className="px-4 py-3">${(sale.price / sale.quantity).toFixed(2)}</td>
                          <td className="px-4 py-3 font-medium text-green-600">${sale.price.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => deleteSale(sale.id)}
                              className="text-red-500 hover:text-red-700 text-xs font-medium"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
            <h2 className="text-lg font-semibold mb-4 text-green-700">📈 Sales Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sales Chart Placeholder */}
              <div className="bg-green-50 p-4 rounded-xl border border-green-200 h-64 flex items-center justify-center">
                <div className="text-center text-green-500">
                  <div className="text-4xl mb-2">📊</div>
                  <p>Sales Trend Chart</p>
                  <p className="text-sm text-green-400 mt-1">(Visualization coming soon)</p>
                </div>
              </div>
              
              {/* Top Products Placeholder */}
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h3 className="font-medium text-green-700 mb-3">Top Selling Products</h3>
                {products.slice(0, 4).map((product, index) => (
                  <div key={product.name} className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{product.name}</span>
                      <span className="font-medium text-green-600">{Math.floor(Math.random() * 50) + 10} sold</span>
                    </div>
                    <div className="w-full bg-green-100 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${80 - (index * 15)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Monthly Summary */}
            <div className="mt-6 bg-green-50 p-4 rounded-xl border border-green-200">
              <h3 className="font-medium text-green-700 mb-3">Monthly Summary</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <div className="text-green-500 text-sm">This Month</div>
                  <div className="font-bold text-green-800">${(totalSales * 0.3).toFixed(2)}</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <div className="text-green-500 text-sm">Last Month</div>
                  <div className="font-bold text-green-800">${(totalSales * 0.25).toFixed(2)}</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <div className="text-green-500 text-sm">Growth</div>
                  <div className="font-bold text-green-800">+20%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-green-600">
          <p>SmartRetail Sales Dashboard • {new Date().getFullYear()}  </p>
        </footer>
      </div>
    </div>
  );
}