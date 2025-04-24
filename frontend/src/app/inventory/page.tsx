"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiFilter, FiDownload, FiAlertTriangle } from "react-icons/fi";

export default function InventoryPage() {
  const router = useRouter();
  const [inventory, setInventory] = useState([
    { id: 1, name: "USB Cable", category: "Accessories", cost: 30, price: 99, stock: 8, sku: "USB-CBL-01", supplier: "TechSupplies Inc" },
    { id: 2, name: "Wireless Mouse", category: "Electronics", cost: 200, price: 459, stock: 98, sku: "WL-MSE-02", supplier: "PeriTech" },
    { id: 3, name: "Smart LED Bulb", category: "Lighting", cost: 120, price: 299, stock: 152, sku: "LED-BLB-03", supplier: "LumiHome" },
    { id: 4, name: "Bluetooth Speaker", category: "Audio", cost: 500, price: 999, stock: 42, sku: "BT-SPK-04", supplier: "SoundMasters" },
    { id: 5, name: "Earphones", category: "Audio", cost: 150, price: 349, stock: 9, sku: "EAR-BUD-05", supplier: "AudioGear" },
    { id: 6, name: "Power Bank", category: "Electronics", cost: 700, price: 1299, stock: 4, sku: "PWR-BNK-06", supplier: "PowerTech" },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [lowStockThreshold, setLowStockThreshold] = useState(10);

  // Get unique categories
  const categories = ["All", ...new Set(inventory.map(item => item.category))];

  // Filter and sort inventory
  const filteredInventory = inventory
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item => selectedCategory === "All" || item.category === selectedCategory)
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const deleteItem = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  const exportToCSV = () => {
    // In a real app, this would generate and download a CSV file
    alert("Exporting inventory data to CSV...");
  };

  const totalItems = inventory.length;
  const totalStockValue = inventory.reduce((sum, item) => sum + (item.cost * item.stock), 0);
  const lowStockItems = inventory.filter(item => item.stock < lowStockThreshold).length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-green-700">Inventory Management</h1>
          <p className="text-gray-600">Manage your products and stock levels</p>
        </div>
        <button 
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 flex items-center gap-2"
          onClick={() => router.push("/add-product")}
        >
          <FiPlus /> Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow border border-green-100">
          <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold text-green-700">{totalItems}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-green-100">
          <h3 className="text-sm font-medium text-gray-500">Total Stock Value</h3>
          <p className="text-2xl font-bold text-green-700">₹{totalStockValue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-red-100">
          <h3 className="text-sm font-medium text-gray-500">Low Stock Items</h3>
          <p className="text-2xl font-bold text-red-600">{lowStockItems}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search products or SKU..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <select
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <button 
            className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg flex items-center gap-2"
            onClick={exportToCSV}
          >
            <FiDownload /> Export
          </button>
        </div>
      </div>

      {/* Low Stock Warning */}
      {lowStockItems > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3">
          <FiAlertTriangle className="text-red-500 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-red-700">Low Stock Alert</h3>
            <p className="text-sm text-red-600">
              You have {lowStockItems} product{lowStockItems !== 1 ? 's' : ''} with stock below {lowStockThreshold}. 
              Consider replenishing soon.
            </p>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-auto rounded-xl shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-green-100 text-left text-gray-700">
            <tr>
              <th 
                className="px-6 py-4 cursor-pointer hover:bg-green-200"
                onClick={() => requestSort("name")}
              >
                <div className="flex items-center gap-1">
                  Name
                  {sortConfig.key === "name" && (
                    <span>{sortConfig.direction === "asc" ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 cursor-pointer hover:bg-green-200"
                onClick={() => requestSort("category")}
              >
                <div className="flex items-center gap-1">
                  Category
                  {sortConfig.key === "category" && (
                    <span>{sortConfig.direction === "asc" ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 cursor-pointer hover:bg-green-200"
                onClick={() => requestSort("sku")}
              >
                SKU
              </th>
              <th 
                className="px-6 py-4 cursor-pointer hover:bg-green-200"
                onClick={() => requestSort("cost")}
              >
                <div className="flex items-center gap-1">
                  Cost
                  {sortConfig.key === "cost" && (
                    <span>{sortConfig.direction === "asc" ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 cursor-pointer hover:bg-green-200"
                onClick={() => requestSort("price")}
              >
                <div className="flex items-center gap-1">
                  Price
                  {sortConfig.key === "price" && (
                    <span>{sortConfig.direction === "asc" ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 cursor-pointer hover:bg-green-200"
                onClick={() => requestSort("stock")}
              >
                <div className="flex items-center gap-1">
                  Stock
                  {sortConfig.key === "stock" && (
                    <span>{sortConfig.direction === "asc" ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="px-6 py-4">Supplier</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <tr
                  key={item.id}
                  className={`border-t ${item.stock < lowStockThreshold ? "bg-red-50" : "bg-white hover:bg-gray-50"}`}
                >
                  <td className="px-6 py-4 font-medium">{item.name}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4 text-gray-500">{item.sku}</td>
                  <td className="px-6 py-4">₹{item.cost}</td>
                  <td className="px-6 py-4 font-medium text-green-700">₹{item.price}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${item.stock < lowStockThreshold ? "text-red-600" : "text-gray-700"}`}>
                      {item.stock}
                    </span>
                    {item.stock < lowStockThreshold && (
                      <span className="ml-2 text-xs text-red-500">Low</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.supplier}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button 
                      className="text-green-600 hover:text-green-800 flex items-center gap-1"
                      onClick={() => router.push(`/edit-product/${item.id}`)}
                    >
                      <FiEdit size={14} /> Edit
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                      onClick={() => deleteItem(item.id)}
                    >
                      <FiTrash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                  No products found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Inventory Settings */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-green-700">Inventory Settings</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <label className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Low stock threshold:</span>
            <input
              type="number"
              min="1"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(parseInt(e.target.value) || 1)}
              className="border rounded-lg px-3 py-1 w-20"
            />
          </label>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}