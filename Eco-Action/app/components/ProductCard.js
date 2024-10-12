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
        className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-lg"
          />
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-[#4D869C]">
                {product.name}
              </h2>
              <p className="text-[#7AB2B2] mb-4">{product.description}</p>
              <span className="text-sm font-semibold text-[#4D869C] bg-[#CDE8E5] px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-[#4D869C] mb-4">
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
        className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
        onClick={() => setIsPopupOpen(true)}
      >
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-0 right-0 bg-[#7AB2B2] text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
            ${product.price.toFixed(2)}
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 text-[#4D869C]">
            {product.name}
          </h2>
          <p className="text-[#7AB2B2] mb-4">{product.description}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-[#4D869C] bg-[#CDE8E5] px-3 py-1 rounded-full">
              {product.category}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                addToCart();
              }}
              className="flex items-center justify-center bg-[#4D869C] text-white px-4 py-2 rounded-lg hover:bg-[#7AB2B2] transition-colors duration-300"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
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
