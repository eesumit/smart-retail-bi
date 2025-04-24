"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiShoppingCart, FiUsers, FiPackage, FiAlertTriangle, FiMessageSquare, FiPlus, FiFileText, FiList, FiTruck } from "react-icons/fi";

export default function DashboardPage() {
  const router = useRouter();
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const isLoggedIn = true;
    if (!isLoggedIn) router.push("/login");
    
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 text-gray-800">
      {/* Header */}
      <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">SR</div>
          <h1 className="text-2xl font-thin text-green-700">SmartRetail</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
            <FiTruck className="text-green-500" />
            <span>{time.toLocaleDateString()}, {formatTime(time)}</span>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/sales")}
              className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-xl shadow transition flex items-center gap-2"
            >
              <FiShoppingCart /> View Sales
            </button>
            <button
              onClick={() => router.push("/login")}
              className="text-sm text-gray-600 hover:text-green-700 transition flex items-center gap-1"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm h-[calc(100vh-72px)] sticky top-[72px] hidden md:block">
          <nav className="p-4">
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${activeTab === "dashboard" ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
                >
                  <FiShoppingCart /> Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push("/sales")}
                  className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-100"
                >
                  <FiFileText /> Sales
                </button>
              </li>
              <li>
                <button 
                onClick={() => router.push("/customers")}
                className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-100">
                  <FiUsers /> Customers
                </button>
              </li>
              <li>
                <button 
                onClick={() => router.push("/inventory")}
                className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-100">
                  <FiPackage /> Inventory
                </button>
              </li>
              <li>
                <button 
                onClick={()=> router.push("/reports")}
                className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-100">
                  <FiList /> Reports
                </button>
              </li>
            </ul>
            
            <div className="mt-8 px-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Quick Links</h3>
              <ul className="space-y-1">
                <li>
                  <button 
                  onClick={() => router.push("/add-product")}
                  className="w-full text-left px-4 py-2 text-sm rounded-lg flex items-center gap-2 hover:bg-gray-100">
                    <FiPlus size={14} /> Add Product
                  </button>
                </li>
                <li>
                  <button 
                  onClick={() => router.push("/alert")}
                  className="w-full text-left px-4 py-2 text-sm rounded-lg flex items-center gap-2 hover:bg-gray-100">
                    <FiAlertTriangle size={14} /> Alerts
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Welcome Banner */}
          <section className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-2">Welcome back, Sumit!</h2>
            <p className="text-green-100">Here is what is happening with your store today.</p>
          </section>

          {/* Top Summary Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card 
              title="Today's Sales" 
              value="₹24,500" 
              info="+12.4% from yesterday" 
              icon={<FiShoppingCart className="text-green-500" />} 
              trend="up" 
            />
            <Card 
              title="Customers" 
              value="1,234" 
              info="+5 new today" 
              icon={<FiUsers className="text-blue-500" />} 
              trend="up" 
            />
            <Card 
              title="Pending Orders" 
              value="36" 
              info="8 due today" 
              icon={<FiPackage className="text-yellow-500" />} 
              trend="neutral" 
            />
            <Card 
              title="Inventory" 
              value="842 items" 
              info="Updated 2h ago" 
              icon={<FiList className="text-purple-500" />} 
              trend="down" 
            />
          </section>

          {/* Activity & Chart Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <section className="bg-white p-6 rounded-2xl shadow lg:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-green-700">Recent Activity</h2>
                <button className="text-sm text-green-600 hover:underline">View All</button>
              </div>
              <ul className="space-y-4">
                <ActivityItem 
                  icon="🛒" 
                  title="Order #4521 placed" 
                  description="Ravi Kumar — ₹1,200" 
                  time="2 min ago" 
                />
                <ActivityItem 
                  icon="📦" 
                  title="Inventory updated" 
                  description="10x Bluetooth Speakers added" 
                  time="30 min ago" 
                />
                <ActivityItem 
                  icon="👤" 
                  title="New customer" 
                  description="Anita Sharma signed up" 
                  time="1 hour ago" 
                />
                <ActivityItem 
                  icon="🔄" 
                  title="Price updated" 
                  description="Wireless Mouse now ₹459" 
                  time="2 hours ago" 
                />
              </ul>
            </section>

            {/* Sales Trend Chart Placeholder */}
            <section className="bg-white p-6 rounded-2xl shadow lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-green-700">Sales Trend</h2>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>This month</option>
                </select>
              </div>
              <div className="h-64 bg-gradient-to-r from-green-50 to-green-100 flex items-center justify-center text-green-700 font-medium rounded-xl border border-green-200">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <p>Sales Trend Visualization</p>
                  <p className="text-sm text-green-500 mt-1">(Chart will be displayed here)</p>
                </div>
              </div>
            </section>
          </div>

          {/* Product & Stock Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Popular Products */}
            <section className="bg-white p-6 rounded-2xl shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-green-700">Popular Products</h2>
                <button className="text-sm text-green-600 hover:underline">Manage</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ProductCard 
                  name="Wireless Mouse" 
                  price="₹459" 
                  stock={98} 
                  image="/placeholder-mouse.jpg" 
                  rating={4.5} 
                />
                <ProductCard 
                  name="Smart LED Bulb" 
                  price="₹299" 
                  stock={152} 
                  image="/placeholder-bulb.jpg" 
                  rating={4.2} 
                />
                <ProductCard 
                  name="Bluetooth Speaker" 
                  price="₹999" 
                  stock={42} 
                  image="/placeholder-speaker.jpg" 
                  rating={4.8} 
                />
                <ProductCard 
                  name="USB Cable" 
                  price="₹99" 
                  stock={15} 
                  image="/placeholder-cable.jpg" 
                  rating={3.9} 
                />
              </div>
            </section>

            {/* Alerts Section */}
            <section className="space-y-6">
              {/* Low Stock Alerts */}
              <div className="bg-white p-6 rounded-2xl shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-red-600 flex items-center gap-2">
                    <FiAlertTriangle /> Low Stock Alerts
                  </h2>
                  <button className="text-sm text-green-600 hover:underline">View All</button>
                </div>
                <ul className="space-y-3">
                  <AlertItem 
                    severity="high" 
                    message="USB Cable – Only 15 left" 
                  />
                  <AlertItem 
                    severity="medium" 
                    message="Earphones – Only 9 left" 
                  />
                  <AlertItem 
                    severity="high" 
                    message="Power Bank – Only 4 left" 
                  />
                </ul>
              </div>

              {/* Customer Messages */}
              <div className="bg-white p-6 rounded-2xl shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
                    <FiMessageSquare /> Customer Messages
                  </h2>
                  <button className="text-sm text-green-600 hover:underline">View All</button>
                </div>
                <ul className="space-y-3">
                  <MessageItem 
                    sender="Akash Jain" 
                    message="Order delayed. Please update." 
                    time="10 min ago" 
                  />
                  <MessageItem 
                    sender="Priya Verma" 
                    message="Add new color for LED Bulbs" 
                    time="45 min ago" 
                  />
                  <MessageItem 
                    sender="Shweta" 
                    message="Can I get invoice for Order #4421?" 
                    time="2 hours ago" 
                  />
                </ul>
              </div>
            </section>
          </div>

          {/* Quick Actions */}
          <section className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4 text-green-700">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <QuickAction 
                icon={<FiPlus className="text-green-600" />} 
                title="Add Product" 
                onClick={() => {}} 
              />
              <QuickAction 
                icon={<FiFileText className="text-blue-600" />} 
                title="Generate Report" 
                onClick={() => {}} 
              />
              <QuickAction 
                icon={<FiPackage className="text-yellow-600" />} 
                title="View Orders" 
                onClick={() => {}} 
              />
              <QuickAction 
                icon={<FiList className="text-purple-600" />} 
                title="Inventory List" 
                onClick={() => {}} 
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// Reusable Components
function Card({ title, value, info, icon, trend }: { 
  title: string; 
  value: string; 
  info: string; 
  icon: React.ReactNode;
  trend: "up" | "down" | "neutral";
}) {
  const trendColors = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-yellow-500"
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-sm font-medium text-gray-500">{title}</h2>
        <div className="p-2 bg-green-50 rounded-lg">{icon}</div>
      </div>
      <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
      <div className="flex items-center gap-1">
        <span className={`text-sm ${trendColors[trend]}`}>
          {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {info}
        </span>
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, description, time }: { 
  icon: string; 
  title: string; 
  description: string; 
  time: string;
}) {
  return (
    <li className="flex gap-3">
      <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-green-600">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{title}</p>
        <p className="text-sm text-gray-500 truncate">{description}</p>
      </div>
      <div className="text-xs text-gray-400 whitespace-nowrap">{time}</div>
    </li>
  );
}

function ProductCard({ name, price, stock, image, rating }: { 
  name: string; 
  price: string; 
  stock: number;
  image: string;
  rating: number;
}) {
  const stockStatus = stock < 20 ? "text-red-500" : stock < 50 ? "text-yellow-500" : "text-green-500";
  
  return (
    <div className="border rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="bg-gray-100 h-32 rounded-lg mb-3 flex items-center justify-center text-gray-400">
        {image.includes('placeholder') ? (
          <span className="text-xs">Product Image</span>
        ) : (
          <img src={image} alt={name} className="h-full object-cover" />
        )}
      </div>
      <h3 className="font-semibold truncate">{name}</h3>
      <div className="flex justify-between items-center mt-1">
        <span className="text-sm font-medium text-gray-700">{price}</span>
        <span className={`text-xs ${stockStatus}`}>{stock} in stock</span>
      </div>
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-xs text-gray-500 ml-1">{rating}</span>
      </div>
    </div>
  );
}

function AlertItem({ severity, message }: { 
  severity: "high" | "medium" | "low";
  message: string;
}) {
  const severityColors = {
    high: "bg-red-50 text-red-700",
    medium: "bg-yellow-50 text-yellow-700",
    low: "bg-blue-50 text-blue-700"
  };

  return (
    <li className={`px-3 py-2 rounded-lg flex items-center gap-2 ${severityColors[severity]}`}>
      <FiAlertTriangle className="flex-shrink-0" />
      <span className="text-sm">{message}</span>
    </li>
  );
}

function MessageItem({ sender, message, time }: { 
  sender: string; 
  message: string; 
  time: string;
}) {
  return (
    <li className="px-3 py-2 rounded-lg flex items-start gap-3 hover:bg-gray-50">
      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mt-1">
        <FiMessageSquare size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{sender}</p>
        <p className="text-sm text-gray-600 truncate">"{message}"</p>
      </div>
      <div className="text-xs text-gray-400 whitespace-nowrap">{time}</div>
    </li>
  );
}

function QuickAction({ icon, title, onClick }: { 
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
    >
      <div className="w-10 h-10 rounded-full bg-white border flex items-center justify-center mb-2">
        {icon}
      </div>
      <span className="text-sm font-medium">{title}</span>
    </button>
  );
}