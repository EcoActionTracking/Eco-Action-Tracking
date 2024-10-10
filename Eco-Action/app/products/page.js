// "use client";

// import React from "react";

// async function getProducts() {
//   const res = await fetch(`/api/products`, {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch products");
//   }
//   return res.json();
// }

// export default async function ProductsPage() {
//   const products = await getProducts();

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Products</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className="bg-white shadow-md rounded-lg overflow-hidden"
//           >
//             <div className="p-4">
//               <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
//               <p className="text-gray-600 mb-4">{product.description}</p>
//               <p className="font-bold">Price: ${product.price.toFixed(2)}</p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Category: {product.category}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
////////////////

"use client";
import React from "react";
import dynamic from "next/dynamic";

const ProductsList = dynamic(() => import("../components/productsList"), {
  loading: () => <p>Loading...</p>,
  ssr: true,
});

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductsList />
    </div>
  );
}
