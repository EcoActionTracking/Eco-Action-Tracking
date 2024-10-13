// // // "use client";

// // // import React, { useState, useEffect } from "react";
// // // import ProductCard from "./ProductCard";

// // // function ProductsList() {
// // //   const [products, setProducts] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     async function fetchProducts() {
// // //       try {
// // //         const apiUrl =
// // //           process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
// // //         const res = await fetch(`${apiUrl}/api/products`);
// // //         if (!res.ok) {
// // //           throw new Error("Failed to fetch products");
// // //         }
// // //         const data = await res.json();
// // //         setProducts(data);
// // //         setLoading(false);
// // //       } catch (err) {
// // //         setError(err.message);
// // //         setLoading(false);
// // //       }
// // //     }
// // //     fetchProducts();
// // //   }, []);

// // //   if (loading) return <div>Loading...</div>;
// // //   if (error) return <div>Error: {error}</div>;

// // //   return (
// // //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // //       {products.map((product) => (
// // //         <ProductCard key={product._id} product={product} />
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // // export default ProductsList;
// // //////////////////////////////////////////////////
// // "use client";

// // import React, { useState, useEffect } from "react";
// // import ProductCard from "./ProductCard";
// // import { motion } from "framer-motion";

// // function ProductsList() {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [productsPerPage] = useState(6); // 3 cards per row, 2 rows

// //   useEffect(() => {
// //     async function fetchProducts() {
// //       try {
// //         const apiUrl =
// //           process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
// //         const res = await fetch(`${apiUrl}/api/products`);
// //         if (!res.ok) {
// //           throw new Error("Failed to fetch products");
// //         }
// //         const data = await res.json();
// //         setProducts(data);
// //         setLoading(false);
// //       } catch (err) {
// //         setError(err.message);
// //         setLoading(false);
// //       }
// //     }
// //     fetchProducts();
// //   }, []);

// //   const filteredProducts = products.filter((product) =>
// //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const indexOfLastProduct = currentPage * productsPerPage;
// //   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
// //   const currentProducts = filteredProducts.slice(
// //     indexOfFirstProduct,
// //     indexOfLastProduct
// //   );

// //   const paginate = (pageNumber) => setCurrentPage(pageNumber);

// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>Error: {error}</div>;

// //   return (
// //     <div className="container mx-auto px-4">
// //       <motion.div
// //         initial={{ opacity: 0, y: -20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5 }}
// //         className="mb-4 max-w-md mx-auto"
// //       >
// //         <input
// //           type="text"
// //           placeholder="Search for a product..."
// //           className="w-full p-2 border border-gray-300 rounded text-sm"
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //         />
// //       </motion.div>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //         {currentProducts.map((product) => (
// //           <ProductCard key={product._id} product={product} />
// //         ))}
// //       </div>
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5 }}
// //         className="flex justify-center mt-4"
// //       >
// //         {[...Array(Math.ceil(filteredProducts.length / productsPerPage))].map(
// //           (_, index) => (
// //             <button
// //               key={index}
// //               onClick={() => paginate(index + 1)}
// //               className={`mx-1 px-3 py-1 border ${
// //                 currentPage === index + 1
// //                   ? "bg-blue-500 text-white"
// //                   : "bg-white text-blue-500"
// //               }`}
// //             >
// //               {index + 1}
// //             </button>
// //           )
// //         )}
// //       </motion.div>
// //     </div>
// //   );
// // }

// // export default ProductsList;
// /////////////////////////////////////////////
// //////////
// ///////////////////////////////////////////
// "use client";

// import React, { useState, useEffect } from "react";
// import ProductCard from "./ProductCard";
// import { motion } from "framer-motion";

// function ProductsList() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(6); // 3 cards per row, 2 rows

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

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   const pageNumbers = Math.ceil(filteredProducts.length / productsPerPage);

//   const paginate = (pageNumber) => {
//     if (pageNumber > 0 && pageNumber <= pageNumbers) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container mx-auto px-4">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="mb-4 max-w-md mx-auto"
//       >
//         <input
//           type="text"
//           placeholder="Search for a product..."
//           className="w-full p-2 border border-gray-300 rounded text-sm"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </motion.div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {currentProducts.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="mt-8"
//       >
//         <ul className="flex space-x-4 justify-center">
//           <li
//             className={`flex items-center justify-center shrink-0 ${
//               currentPage === 1 ? "bg-gray-300" : "hover:bg-gray-50 border-2"
//             } cursor-pointer w-10 h-10 rounded-full`}
//             onClick={() => paginate(currentPage - 1)}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-3 fill-gray-400"
//               viewBox="0 0 55.753 55.753"
//             >
//               <path
//                 d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
//                 data-original="#000000"
//               />
//             </svg>
//           </li>
//           {[...Array(pageNumbers)].map((_, index) => (
//             <li
//               key={index}
//               className={`flex items-center justify-center shrink-0 ${
//                 currentPage === index + 1
//                   ? "bg-blue-500 border-2 border-blue-500 text-white"
//                   : "hover:bg-gray-50 border-2 text-[#333]"
//               } cursor-pointer text-base font-bold w-10 h-10 rounded-full`}
//               onClick={() => paginate(index + 1)}
//             >
//               {index + 1}
//             </li>
//           ))}
//           <li
//             className={`flex items-center justify-center shrink-0 ${
//               currentPage === pageNumbers
//                 ? "bg-gray-300"
//                 : "hover:bg-gray-50 border-2"
//             } cursor-pointer w-10 h-10 rounded-full`}
//             onClick={() => paginate(currentPage + 1)}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-3 fill-gray-400 rotate-180"
//               viewBox="0 0 55.753 55.753"
//             >
//               <path
//                 d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
//                 data-original="#000000"
//               />
//             </svg>
//           </li>
//         </ul>
//       </motion.div>
//     </div>
//   );
// }

// export default ProductsList;
////////////////////////////////////////

"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const productsPerPage = 8;

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
        setCategories([...new Set(data.map((product) => product.category))]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || product.category === selectedCategory)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <form
        className="max-w-lg mx-auto mb-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex items-center">
          <div className="relative">
            <button
              id="dropdown-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex-shrink-0 z-10 inline-flex items-center h-full py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
              type="button"
              style={{ height: "42px" }} // اجعل الارتفاع متناسقًا مع الـ input
            >
              {selectedCategory || "Categories"}{" "}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  <li>
                    <button
                      type="button"
                      onClick={() => handleCategorySelect("")}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      All Categories
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        type="button"
                        onClick={() => handleCategorySelect(category)}
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
              style={{ height: "42px" }} // نفس الارتفاع
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              style={{ height: "42px" }} // نفس الارتفاع
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 border ${
              currentPage === i + 1 ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
