// import React from "react";

// function ProductCard({ product }) {
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
//     <div className="bg-white shadow-md rounded-lg overflow-hidden">
//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
//         <p className="text-gray-600 mb-4">{product.description}</p>
//         <p className="font-bold">Price: ${product.price.toFixed(2)}</p>
//         <p className="text-sm text-gray-500 mt-2">
//           Category: {product.category}
//         </p>
//         <button
//           onClick={addToCart}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;
////////////////// هاض سستم //////

"use client";

import React from "react";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { updateCartQuantity } = useCart();

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
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* ... (rest of the component remains the same) */}

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="font-bold">Price: ${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mt-2">
          Category: {product.category}
        </p>
        <button
          onClick={addToCart}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
