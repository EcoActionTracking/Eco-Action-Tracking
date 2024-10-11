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
//     <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//       {products.map((product) => (
//         <div
//           key={product._id}
//           className="overflow-hidden bg-white rounded-lg shadow-md"
//         >
//           <div className="p-4">
//             <h2 className="mb-2 text-xl font-semibold">{product.name}</h2>
//             <p className="mb-4 text-gray-600">{product.description}</p>
//             <p className="font-bold">Price: ${product.price.toFixed(2)}</p>
//             <p className="mt-2 text-sm text-gray-500">
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
        console.log("data", data);
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductsList;
