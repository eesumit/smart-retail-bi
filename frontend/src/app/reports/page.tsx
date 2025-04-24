"use client";

import { useState } from "react";
import { FiDownload, FiFilter, FiBarChart2, FiPieChart, FiDollarSign, FiCalendar } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: number;
}

interface SalesData {
  name: string;
  category: string;
  date: string;
  sales: number;
  revenue: number;
  cost: number;
  profit: number;
}

interface PieData {
  name: string;
  value: number;
}

interface BarData {
  name: string;
  revenue: number;
  cost: number;
  profit: number;
}

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [reportType, setReportType] = useState<string>("sales");
  const [viewType, setViewType] = useState<"chart" | "table">("chart");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Sample data - in a real app this would come from your API
  const salesData: SalesData[] = [
    { name: "Wireless Mouse", category: "Electronics", date: "2023-10-01", sales: 15, revenue: 6885, cost: 3000, profit: 3885 },
    { name: "Smart LED Bulb", category: "Lighting", date: "2023-10-02", sales: 8, revenue: 2392, cost: 960, profit: 1432 },
    { name: "Bluetooth Speaker", category: "Audio", date: "2023-10-03", sales: 5, revenue: 4995, cost: 2500, profit: 2495 },
    { name: "USB Cable", category: "Accessories", date: "2023-10-04", sales: 23, revenue: 2277, cost: 690, profit: 1587 },
    { name: "Power Bank", category: "Electronics", date: "2023-10-05", sales: 3, revenue: 3897, cost: 2100, profit: 1797 },
    { name: "Earphones", category: "Audio", date: "2023-10-06", sales: 12, revenue: 4188, cost: 1800, profit: 2388 },
    { name: "Keyboard", category: "Electronics", date: "2023-10-07", sales: 7, revenue: 3213, cost: 1400, profit: 1813 },
  ];

  const categories = ["all", ...new Set(salesData.map(item => item.category))];
  
  // Filter data based on selections
  const filteredData = salesData.filter(item => {
    const dateInRange = item.date >= dateRange.start && item.date <= dateRange.end;
    const categoryMatch = categoryFilter === "all" || item.category === categoryFilter;
    return dateInRange && categoryMatch;
  });

  // Prepare data for charts
  const barChartData: BarData[] = filteredData.map(item => ({
    name: item.name,
    revenue: item.revenue,
    cost: item.cost,
    profit: item.profit
  }));

  const pieChartData: PieData[] = filteredData.reduce((acc: PieData[], item) => {
    const existing = acc.find(i => i.name === item.category);
    if (existing) {
      existing.value += item.profit;
    } else {
      acc.push({ name: item.category, value: item.profit });
    }
    return acc;
  }, []);

  const summary = filteredData.reduce((acc, item) => ({
    totalSales: acc.totalSales + item.sales,
    totalRevenue: acc.totalRevenue + item.revenue,
    totalCost: acc.totalCost + item.cost,
    totalProfit: acc.totalProfit + item.profit
  }), { totalSales: 0, totalRevenue: 0, totalCost: 0, totalProfit: 0 });

  const handleExport = (format: string) => {
    alert(`Exporting report as ${format.toUpperCase()}...`);
    // In a real app, this would generate and download the file
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-green-700">Sales Reports</h1>
            <p className="text-gray-600">Analyze your business performance</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => handleExport("csv")}
              className="bg-white border border-green-600 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 flex items-center gap-2"
            >
              <FiDownload /> CSV
            </button>
            <button 
              onClick={() => handleExport("pdf")}
              className="bg-white border border-green-600 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 flex items-center gap-2"
            >
              <FiDownload /> PDF
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
            <FiFilter /> Report Filters
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg"
                  />
                </div>
                <span className="flex items-center">to</span>
                <div className="relative flex-1">
                  <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="sales">Sales Report</option>
                <option value="inventory">Inventory Report</option>
                <option value="profit">Profit Analysis</option>
                <option value="customer">Customer Report</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <SummaryCard 
            title="Total Sales" 
            value={summary.totalSales} 
            icon={<FiBarChart2 className="text-blue-500" />} 
            change={12.4}
          />
          <SummaryCard 
            title="Total Revenue" 
            value={`₹${summary.totalRevenue.toLocaleString()}`} 
            icon={<FiDollarSign className="text-green-500" />} 
            change={8.2}
          />
          <SummaryCard 
            title="Total Cost" 
            value={`₹${summary.totalCost.toLocaleString()}`} 
            icon={<FiDollarSign className="text-yellow-500" />} 
            change={-3.1}
          />
          <SummaryCard 
            title="Total Profit" 
            value={`₹${summary.totalProfit.toLocaleString()}`} 
            icon={<FiDollarSign className="text-purple-500" />} 
            change={18.7}
          />
        </div>

        {/* View Toggle */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setViewType("chart")}
              className={`px-4 py-2 rounded-md ${viewType === "chart" ? "bg-green-100 text-green-700" : "text-gray-600"}`}
            >
              <FiBarChart2 className="inline mr-2" /> Charts
            </button>
            <button
              onClick={() => setViewType("table")}
              className={`px-4 py-2 rounded-md ${viewType === "table" ? "bg-green-100 text-green-700" : "text-gray-600"}`}
            >
              <FiFilter className="inline mr-2" /> Data Table
            </button>
          </div>
        </div>

        {/* Charts/Data */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          {viewType === "chart" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bar Chart */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Profit & Loss by Product</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                      <Bar dataKey="cost" fill="#82ca9d" name="Cost" />
                      <Bar dataKey="profit" fill="#ffc658" name="Profit" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Profit by Category</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ) : (
            /* Data Table */
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Sales</th>
                    <th className="px-4 py-3 text-right">Revenue</th>
                    <th className="px-4 py-3 text-right">Cost</th>
                    <th className="px-4 py-3 text-right">Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3">{item.category}</td>
                      <td className="px-4 py-3">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-right">{item.sales}</td>
                      <td className="px-4 py-3 text-right">₹{item.revenue.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">₹{item.cost.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-medium text-green-700">₹{item.profit.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 font-medium">
                  <tr>
                    <td colSpan={3} className="px-4 py-3">Total</td>
                    <td className="px-4 py-3 text-right">{summary.totalSales}</td>
                    <td className="px-4 py-3 text-right">₹{summary.totalRevenue.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">₹{summary.totalCost.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-green-700">₹{summary.totalProfit.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* Additional Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Monthly Sales Trend</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              Monthly trend chart placeholder
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Top Performing Products</h3>
            <div className="space-y-3">
              {filteredData
                .sort((a, b) => b.profit - a.profit)
                .slice(0, 5)
                .map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-medium mr-3">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <div className="text-green-700 font-medium">₹{item.profit.toLocaleString()}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon, change }: SummaryCardProps) {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-semibold mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
          {icon}
        </div>
      </div>
      <div className={`mt-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'} from last period
      </div>
    </div>
  );
}