"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Leaf, Package, CheckCircle, XCircle, Loader2 } from "lucide-react";

const GradientButton = ({ children, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    {children}
  </button>
);

const OrderCard = ({ order, onStatusChange, isPending }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">
          {order.user.username}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            order.orderStatus
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {order.orderStatus ? "Completed" : "Pending"}
        </span>
      </div>
      <p className="text-gray-600">{order.user.email}</p>
      <p className="text-2xl font-bold text-gray-900">
        ${order.totalAmount.toFixed(2)}
      </p>
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-700">Products:</h4>
        <ul className="space-y-2">
          {order.products.map((productDetail) => (
            <li
              key={productDetail.product._id}
              className="flex justify-between items-center"
            >
              <span className="text-gray-700">
                {productDetail.product.name} (x{productDetail.quantity})
              </span>
              <span className="font-medium text-gray-900">
                ${productDetail.product.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {isPending && (
        <button
          onClick={() => onStatusChange(order._id)}
          className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full font-semibold hover:from-green-500 hover:to-blue-600 transition-all duration-300"
        >
          Mark as Completed
        </button>
      )}
    </div>
  </div>
);

export default function OrdersSection() {
  const [activeTab, setActiveTab] = useState("pending");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const endpoint =
        activeTab === "pending"
          ? "/api/admin/orders/pending"
          : "/api/admin/orders/completed";
      const response = await axios.get(endpoint);
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId) => {
    try {
      await axios.patch(`/api/admin/orders/${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error(
        "Failed to update order status:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Order Management
        </h1>
        <div className="flex space-x-4 mb-8">
          <GradientButton
            isActive={activeTab === "pending"}
            onClick={() => setActiveTab("pending")}
          >
            <div className="flex items-center">
              <Package className="mr-2" />
              Pending Orders
            </div>
          </GradientButton>
          <GradientButton
            isActive={activeTab === "completed"}
            onClick={() => setActiveTab("completed")}
          >
            <div className="flex items-center">
              <CheckCircle className="mr-2" />
              Completed Orders
            </div>
          </GradientButton>
        </div>
        <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-lg">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-green-500" size={48} />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64 text-red-500">
              <XCircle className="mr-2" />
              {error}
            </div>
          ) : orders.length === 0 ? (
            <div className="flex justify-center items-center h-64 text-gray-500">
              <Leaf className="mr-2" />
              No orders found.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {orders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  isPending={activeTab === "pending"}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
