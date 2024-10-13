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
              <h2 className="text-4xl font-bold mb-6 text-[#4D869C]">
                {product.name}
              </h2>
              <p className="text-lg text-[#7AB2B2] mb-6">{product.description}</p>
              <span className="text-base font-semibold text-[#4D869C] bg-[#CDE8E5] px-4 py-2 rounded-full inline-block">
                {product.category}
              </span>
            </div>
            <div className="mt-8">
              <p className="text-3xl font-bold text-[#4D869C] mb-6">
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
        className="bg-red-100 shadow-xl rounded-lg overflow-hidden cursor-pointer max-w-lg mx-auto mb-8"
        onClick={() => setIsPopupOpen(true)}
      >
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-80 object-cover"
          />
          <div className="absolute top-0 right-0 bg-[#7AB2B2] text-white px-3 py-2 m-4 rounded-md text-lg font-semibold">
            ${product.price.toFixed(2)}
          </div>
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4 text-[#4D869C]">
            {product.name}
          </h2>
          <p className="text-lg text-[#7AB2B2] mb-6">{product.description}</p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-base font-semibold text-[#4D869C] bg-[#CDE8E5] px-4 py-2 rounded-full">
              {product.category}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                addToCart();
              }}
              className="flex items-center justify-center bg-[#4D869C] text-white px-6 py-3 rounded-lg hover:bg-[#7AB2B2] transition-colors duration-300 text-lg"
            >
              <ShoppingCart className="mr-3 h-6 w-6" />
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