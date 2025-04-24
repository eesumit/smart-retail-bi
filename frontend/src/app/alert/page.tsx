"use client";

import { useState } from "react";
import { FiAlertTriangle, FiCheckCircle, FiInfo, FiBell, FiFilter, FiX } from "react-icons/fi";

type AlertType = "inventory" | "order" | "system" | "promotion";
type AlertPriority = "high" | "medium" | "low";

interface Alert {
  id: string;
  title: string;
  message: string;
  type: AlertType;
  priority: AlertPriority;
  date: string;
  read: boolean;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      title: "Low Stock Alert",
      message: "Only 5 Wireless Mice left in inventory",
      type: "inventory",
      priority: "high",
      date: "2023-11-15T09:30:00",
      read: false
    },
    {
      id: "2",
      title: "New Order Received",
      message: "Order #10025 from Priya Patel for ₹4,500",
      type: "order",
      priority: "medium",
      date: "2023-11-14T14:15:00",
      read: true
    },
    {
      id: "3",
      title: "System Maintenance",
      message: "Scheduled maintenance tonight at 11 PM",
      type: "system",
      priority: "medium",
      date: "2023-11-14T10:00:00",
      read: true
    },
    {
      id: "4",
      title: "Special Promotion",
      message: "Diwali sale starts tomorrow - 20% off all electronics",
      type: "promotion",
      priority: "low",
      date: "2023-11-13T16:45:00",
      read: false
    },
    {
      id: "5",
      title: "Critical Inventory",
      message: "USB Cables out of stock!",
      type: "inventory",
      priority: "high",
      date: "2023-11-13T08:20:00",
      read: false
    },
    {
      id: "6",
      title: "Order Delayed",
      message: "Order #10022 delayed due to shipping issues",
      type: "order",
      priority: "high",
      date: "2023-11-12T17:30:00",
      read: true
    }
  ]);

  const [filterType, setFilterType] = useState<AlertType | "all">("all");
  const [filterPriority, setFilterPriority] = useState<AlertPriority | "all">("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Filter alerts based on selections
  const filteredAlerts = alerts.filter(alert => {
    const typeMatch = filterType === "all" || alert.type === filterType;
    const priorityMatch = filterPriority === "all" || alert.priority === filterPriority;
    const readStatusMatch = !showUnreadOnly || !alert.read;
    return typeMatch && priorityMatch && readStatusMatch;
  });

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
  };

  const getPriorityColor = (priority: AlertPriority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-yellow-100 text-yellow-700";
      case "low": return "bg-blue-100 text-blue-700";
    }
  };

  const getTypeIcon = (type: AlertType) => {
    switch (type) {
      case "inventory": return <FiAlertTriangle className="text-red-500" />;
      case "order": return <FiCheckCircle className="text-green-500" />;
      case "system": return <FiInfo className="text-blue-500" />;
      case "promotion": return <FiBell className="text-purple-500" />;
    }
  };

  const unreadCount = alerts.filter(alert => !alert.read).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-green-700 flex items-center gap-2">
              <FiBell /> Alerts & Notifications
            </h1>
            <p className="text-gray-600">
              {unreadCount > 0 
                ? `${unreadCount} unread ${unreadCount === 1 ? 'alert' : 'alerts'}`
                : "All alerts read"}
            </p>
          </div>
          <button 
            onClick={markAllAsRead}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
            disabled={unreadCount === 0}
          >
            Mark All as Read
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as AlertType | "all")}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="all">All Types</option>
                <option value="inventory">Inventory</option>
                <option value="order">Orders</option>
                <option value="system">System</option>
                <option value="promotion">Promotions</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as AlertPriority | "all")}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUnreadOnly}
                  onChange={(e) => setShowUnreadOnly(e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Show unread only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {filteredAlerts.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredAlerts.map(alert => (
                <li 
                  key={alert.id} 
                  className={`p-4 hover:bg-gray-50 ${!alert.read ? "bg-green-50" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getTypeIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className={`font-medium ${!alert.read ? "text-green-800" : "text-gray-800"}`}>
                          {alert.title}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(alert.priority)}`}>
                          {alert.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {new Date(alert.date).toLocaleString()}
                        </span>
                        <div className="flex gap-2">
                          {!alert.read && (
                            <button 
                              onClick={() => markAsRead(alert.id)}
                              className="text-xs text-green-600 hover:text-green-800"
                            >
                              Mark as read
                            </button>
                          )}
                          <button 
                            onClick={() => deleteAlert(alert.id)}
                            className="text-xs text-red-600 hover:text-red-800"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-2">
                <FiBell className="inline text-3xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">No alerts found</h3>
              <p className="text-gray-500 mt-1">
                {filterType !== "all" || filterPriority !== "all" || showUnreadOnly
                  ? "Try adjusting your filters"
                  : "You're all caught up!"}
              </p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow border border-red-100">
            <h3 className="text-sm font-medium text-gray-700 mb-1">High Priority</h3>
            <p className="text-2xl font-bold text-red-600">
              {alerts.filter(a => a.priority === "high").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border border-yellow-100">
            <h3 className="text-sm font-medium text-gray-700 mb-1">Unread Alerts</h3>
            <p className="text-2xl font-bold text-yellow-600">{unreadCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border border-green-100">
            <h3 className="text-sm font-medium text-gray-700 mb-1">Today's Alerts</h3>
            <p className="text-2xl font-bold text-green-600">
              {alerts.filter(a => new Date(a.date).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}