"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiSave, FiPlus, FiX, FiImage, FiDollarSign, FiTag, FiBox } from "react-icons/fi";

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    category: "Electronics",
    sku: "",
    cost: "",
    price: "",
    stock: "",
    supplier: "",
    description: ""
  });
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Electronics",
    "Audio",
    "Lighting",
    "Accessories",
    "Computers",
    "Mobile",
    "Home Appliances"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSKU = () => {
    const prefix = formData.category.slice(0, 3).toUpperCase();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const sku = `${prefix}-${randomNum}`;
    setFormData(prev => ({ ...prev, sku }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (!formData.name || !formData.sku || !formData.cost || !formData.price || !formData.stock) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (parseFloat(formData.cost) >= parseFloat(formData.price)) {
      setError("Price must be greater than cost");
      setIsLoading(false);
      return;
    }

    try {
      // In a real app, you would call your API here
      // await addProductToInventory(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect back to inventory with success state
      router.push("/inventory?success=true");
    } catch (err) {
      setError("Failed to add product. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-green-700">Add New Product</h1>
            <p className="text-gray-600">Fill in the details to add a new product to your inventory</p>
          </div>
          <button
            onClick={() => router.push("/inventory")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <FiX /> Cancel
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow overflow-hidden">
          {/* Image Upload */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <FiImage /> Product Image
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-40 h-40 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <FiImage className="mx-auto text-gray-400 text-2xl mb-2" />
                    <p className="text-xs text-gray-500">No image selected</p>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  id="product-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="product-image"
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer mb-2"
                >
                  <FiPlus className="inline mr-2" />
                  Upload Image
                </label>
                <p className="text-xs text-gray-500">
                  Recommended size: 800x800px. JPG, PNG format.
                </p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <FiTag /> Product Information
            </h2>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-black w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Wireless Headphones"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="text-black w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    className="text-black flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., AUD-HP-1001"
                    required
                  />
                  <button
                    type="button"
                    onClick={generateSKU}
                    className="bg-green-400 hover:bg-gray-200 px-3 rounded-lg text-sm"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier
                </label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  className=" text-black w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., TechSupplies Inc"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="text-black w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Product features and details..."
                />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <FiDollarSign /> Pricing & Inventory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost Price (₹) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    className="text-black w-full border rounded-lg pl-8 pr-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price (₹) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="text-black w-full border rounded-lg pl-8 pr-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  min="0"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="text-black w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/inventory")}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                "Saving..."
              ) : (
                <>
                  <FiSave /> Save Product
                </>
              )}
            </button>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <h3 className="font-medium text-green-800 mb-2 flex items-center gap-2">
            <FiBox /> Product Addition Tips
          </h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Use clear, descriptive product names</li>
            <li>• Generate SKUs automatically for consistency</li>
            <li>• Ensure selling price is higher than cost price</li>
            <li>• Upload high-quality product images</li>
          </ul>
        </div>
      </div>
    </div>
  );
}