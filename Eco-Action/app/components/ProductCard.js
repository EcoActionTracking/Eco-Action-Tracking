"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X } from "lucide-react";

function ProductPopup({ product, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-10 max-w-5xl w-11/12 max-h-[95vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
        >
          <X size={28} />
        </button>
        <div className="flex flex-col lg:flex-row gap-10">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full lg:w-1/2 h-80 lg:h-[500px] object-cover rounded-lg"
          />
          <div className="flex flex-col justify-between lg:w-1/2">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <span className="text-sm font-semibold text-gray-800 bg-gray-200 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-800 mb-4">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProductCard({ product }) {
  const { updateCartQuantity } = useCart();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const addToCart = async () => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });
      if (response.ok) {
        updateCartQuantity(1);
        alert("Product added to cart!");
      } else {
        throw new Error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md"
        onClick={() => setIsPopupOpen(true)}
      >
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          {product.status === "Available" ? (
            <div className="absolute top-2 right-2 bg-green-500 w-3 h-3 rounded-full"></div>
          ) : (
            <div className="absolute top-2 right-2 bg-red-500 w-3 h-3 rounded-full"></div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-sm font-medium text-gray-800 truncate flex-grow">
              {product.name}
            </h2>
            <span className="text-sm font-bold text-gray-800 ml-2">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.category}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                addToCart();
              }}
              className="flex items-center justify-center bg-gray-800 text-white px-2 py-1 rounded-full text-xs hover:bg-gray-700 transition-colors duration-300"
            >
              <ShoppingCart className="mr-1 h-3 w-3" />
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {isPopupOpen && (
          <ProductPopup
            product={product}
            onClose={() => setIsPopupOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default ProductCard;
