"use client";

import { useState } from "react";
import { FiSearch, FiUserPlus, FiEdit, FiTrash2, FiDollarSign, FiShoppingCart, FiCalendar } from "react-icons/fi";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  status: "active" | "inactive";
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "active" | "inactive">("all");
  
  // Sample customer data
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "+91 9876543210",
      orders: 5,
      totalSpent: 12500,
      lastOrder: "2023-10-15",
      status: "active"
    },
    {
      id: "2",
      name: "Priya Patel",
      email: "priya@example.com",
      phone: "+91 8765432109",
      orders: 2,
      totalSpent: 4500,
      lastOrder: "2023-09-28",
      status: "active"
    },
    {
      id: "3",
      name: "Amit Singh",
      email: "amit@example.com",
      phone: "+91 7654321098",
      orders: 1,
      totalSpent: 2999,
      lastOrder: "2023-08-10",
      status: "inactive"
    },
    {
      id: "4",
      name: "Neha Gupta",
      email: "neha@example.com",
      phone: "+91 6543210987",
      orders: 8,
      totalSpent: 21500,
      lastOrder: "2023-10-20",
      status: "active"
    },
    {
      id: "5",
      name: "Vikram Joshi",
      email: "vikram@example.com",
      phone: "+91 9432109876",
      orders: 0,
      totalSpent: 0,
      lastOrder: "",
      status: "inactive"
    }
  ]);

  // Filter customers based on search and active tab
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = activeTab === "all" || customer.status === activeTab;
    return matchesSearch && matchesStatus;
  });

  // Stats calculations
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === "active").length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);

  const deleteCustomer = (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-green-700">Customer Management</h1>
            <p className="text-gray-600">View and manage your customer database</p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FiUserPlus /> Add Customer
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow border border-green-100">
            <h3 className="text-sm font-medium text-gray-500">Total Customers</h3>
            <p className="text-2xl font-bold text-green-700">{totalCustomers}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border border-green-100">
            <h3 className="text-sm font-medium text-gray-500">Active Customers</h3>
            <p className="text-2xl font-bold text-green-700">{activeCustomers}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border border-green-100">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-700">₹{totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers by name, email or phone..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg text-sm ${activeTab === "all" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("active")}
              className={`px-4 py-2 rounded-lg text-sm ${activeTab === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab("inactive")}
              className={`px-4 py-2 rounded-lg text-sm ${activeTab === "inactive" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
            >
              Inactive
            </button>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-green-100 text-left text-gray-700">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Orders</th>
                  <th className="px-6 py-4">Total Spent</th>
                  <th className="px-6 py-4">Last Order</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-black">{customer.name}</div>
                        <div className="text-xs text-gray-500">ID: {customer.id}</div>
                      </td>
                      <td className="px-6 py-4 text-black">
                        <div>{customer.email}</div>
                        <div className="text-sm text-gray-500">{customer.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-black">{customer.orders}</td>
                      <td className="px-6 py-4 text-black">₹{customer.totalSpent.toLocaleString()}</td>
                      <td className="px-6 py-4 text-black">
                        {customer.lastOrder ? (
                          new Date(customer.lastOrder).toLocaleDateString()
                        ) : (
                          <span className="text-gray-400">Never</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${customer.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button className="text-green-600 hover:text-green-800 p-1">
                          <FiEdit />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800 p-1"
                          onClick={() => deleteCustomer(customer.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No customers found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Analytics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Customers */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4 text-green-700 flex items-center gap-2">
              <FiDollarSign /> Top Spending Customers
            </h2>
            <div className="space-y-4">
              {[...customers]
                .sort((a, b) => b.totalSpent - a.totalSpent)
                .slice(0, 5)
                .map((customer, index) => (
                  <div key={customer.id} className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-medium mr-3">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-black">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.orders} orders</p>
                    </div>
                    <div className="text-green-700 font-medium">₹{customer.totalSpent.toLocaleString()}</div>
                  </div>
                ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4 text-green-700 flex items-center gap-2">
              <FiCalendar /> Recent Customer Activity
            </h2>
            <div className="space-y-3">
              {[...customers]
                .filter(c => c.lastOrder)
                .sort((a, b) => new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime())
                .slice(0, 4)
                .map(customer => (
                  <div key={customer.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <FiShoppingCart />
                    </div>
                    <div>
                      <p className="font-medium text-black">{customer.name}</p>
                      <p className="text-sm text-gray-500">
                        Ordered on {new Date(customer.lastOrder).toLocaleDateString()} • ₹{customer.totalSpent.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}