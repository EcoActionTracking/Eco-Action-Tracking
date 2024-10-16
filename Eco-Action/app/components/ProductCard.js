// "use client";

// import React, { useState } from "react";
// import { useCart } from "../context/CartContext";
// import { motion, AnimatePresence } from "framer-motion";
// import { ShoppingCart, X } from "lucide-react";

// function ProductPopup({ product, onClose }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         className="bg-white rounded-lg p-10 max-w-5xl w-11/12 max-h-[95vh] overflow-y-auto relative"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={onClose}
//           className="absolute text-gray-500 top-6 right-6 hover:text-gray-700"
//         >
//           <X size={28} />
//         </button>
//         <div className="flex flex-col gap-10 lg:flex-row">
//           <img
//             src={product.images[0]}
//             alt={product.name}
//             className="w-full lg:w-1/2 h-80 lg:h-[500px] object-cover rounded-lg"
//           />
//           <div className="flex flex-col justify-between lg:w-1/2">
//             <div>
//               <h2 className="mb-4 text-3xl font-bold text-gray-800">
//                 {product.name}
//               </h2>
//               <p className="mb-4 text-gray-600">{product.description}</p>
//               <span className="px-3 py-1 text-sm font-semibold text-gray-800 bg-gray-200 rounded-full">
//                 {product.category}
//               </span>
//             </div>
//             <div className="mt-4">
//               <p className="mb-4 text-2xl font-bold text-gray-800">
//                 ${product.price.toFixed(2)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// function ProductCard({ product }) {
//   const { updateCartQuantity } = useCart();
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const addToCart = async () => {
//     try {
//       const response = await fetch("/api/cart/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           productId: product._id,
//           quantity: 1,
//         }),
//       });
//       if (response.ok) {
//         updateCartQuantity(1);
//         alert("Product added to cart!");
//       } else {
//         throw new Error("Failed to add product to cart");
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert("Failed to add product to cart. Please try again.");
//     }
//   };

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md"
//         onClick={() => setIsPopupOpen(true)}
//       >
//         <div className="relative">
//           <img
//             src={product.images[0]}
//             alt={product.name}
//             className="object-cover w-full h-48"
//           />
//           {product.status === "Available" ? (
//             <div className="absolute w-3 h-3 bg-green-500 rounded-full top-2 right-2"></div>
//           ) : (
//             <div className="absolute w-3 h-3 bg-red-500 rounded-full top-2 right-2"></div>
//           )}
//         </div>
//         <div className="p-4">
//           <div className="flex items-start justify-between mb-2">
//             <h2 className="flex-grow text-sm font-medium text-gray-800 truncate">
//               {product.name}
//             </h2>
//             <span className="ml-2 text-sm font-bold text-gray-800">
//               ${product.price.toFixed(2)}
//             </span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
//               {product.category}
//             </span>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 addToCart();
//               }}
//               className="flex items-center justify-center px-2 py-1 text-xs text-white transition-colors duration-300 bg-gray-800 rounded-full hover:bg-gray-700"
//             >
//               <ShoppingCart className="w-3 h-3 mr-1" />
//               Add to Cart
//             </motion.button>
//           </div>
//         </div>
//       </motion.div>
//       <AnimatePresence>
//         {isPopupOpen && (
//           <ProductPopup
//             product={product}
//             onClose={() => setIsPopupOpen(false)}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// export default ProductCard;
////////////

"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Check } from "lucide-react";

function EcoAlert({ message, isVisible, onClose }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed top-20 right-4 bg-[#CDE8E5] border-l-4 border-[#7AB2B2] text-[#4D869C] p-4 rounded shadow-md z-50 flex items-center"
          role="alert"
        >
          <Check className="w-5 h-5 mr-2" />
          <p>{message}</p>
          <button
            onClick={onClose}
            className="ml-4 text-[#4D869C] hover:text-[#7AB2B2]"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProductPopup({ product, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#EEF7FF] rounded-lg p-10 max-w-5xl w-11/12 max-h-[95vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#4D869C] hover:text-[#7AB2B2]"
        >
          <X size={28} />
        </button>
        <div className="flex flex-col gap-10 lg:flex-row">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full lg:w-1/2 h-80 lg:h-[500px] object-cover rounded-lg"
          />
          <div className="flex flex-col justify-between lg:w-1/2">
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
  const [showAlert, setShowAlert] = useState(false);

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
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
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
        className="bg-[#EEF7FF] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md"
        onClick={() => setIsPopupOpen(true)}
      >
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-48"
          />
          {product.status === "Available" ? (
            <div className="absolute top-2 right-2 bg-[#7AB2B2] w-3 h-3 rounded-full"></div>
          ) : (
            <div className="absolute w-3 h-3 bg-red-500 rounded-full top-2 right-2"></div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-sm font-medium text-[#4D869C] truncate flex-grow">
              {product.name}
            </h2>
            <span className="text-sm font-bold text-[#4D869C] ml-2">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#7AB2B2] bg-[#CDE8E5] px-2 py-1 rounded-full">
              {product.category}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                addToCart();
              }}
              className="flex items-center justify-center bg-[#7AB2B2] text-white px-2 py-1 rounded-full text-xs hover:bg-[#4D869C] transition-colors duration-300"
            >
              <ShoppingCart className="w-3 h-3 mr-1" />
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
      <EcoAlert
        message="Eco-friendly product added to cart!"
        isVisible={showAlert}
        onClose={() => setShowAlert(false)}
      />
    </>
  );
}

export default ProductCard;
