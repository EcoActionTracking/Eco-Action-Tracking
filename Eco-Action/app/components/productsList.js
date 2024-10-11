// // app/components/ProductsList.js

// import React, { useState, useEffect } from "react";

// function ProductsList() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const apiUrl =
//           process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
//         const res = await fetch(`${apiUrl}/api/products`);
//         if (!res.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         const data = await res.json();
//         setProducts(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     }

//     fetchProducts();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {products.map((product) => (
//         <div
//           key={product._id}
//           className="bg-white shadow-md rounded-lg overflow-hidden"
//         >
//           <div className="p-4">
//             <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
//             <p className="text-gray-600 mb-4">{product.description}</p>
//             <p className="font-bold">Price: ${product.price.toFixed(2)}</p>
//             <p className="text-sm text-gray-500 mt-2">
//               Category: {product.category}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ProductsList;
/////////////////////////////////////////////////
"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const res = await fetch(`${apiUrl}/api/products`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductsList;
