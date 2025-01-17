// ////////////////////////////////////////

// "use client";

// import React, { useState, useEffect } from "react";
// import ProductCard from "./ProductCard";
// import { motion } from "framer-motion";

// function ProductsList() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const productsPerPage = 8;

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
//         setCategories([...new Set(data.map((product) => product.category))]);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     }
//     fetchProducts();
//   }, []);

//   const filteredProducts = products.filter(
//     (product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (selectedCategory === "" || product.category === selectedCategory)
//   );

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setIsDropdownOpen(false);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="container px-4 mx-auto">
//       <form
//         className="max-w-lg mx-auto mb-4"
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <div className="flex items-center">
//           <div className="relative">
//             <button
//               id="dropdown-button"
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               className="flex-shrink-0 z-10 inline-flex items-center h-full py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
//               type="button"
//               style={{ height: "42px" }} // اجعل الارتفاع متناسقًا مع الـ input
//             >
//               {selectedCategory || "Categories"}{" "}
//               <svg
//                 className="w-2.5 h-2.5 ms-2.5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 10 6"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="m1 1 4 4 4-4"
//                 />
//               </svg>
//             </button>
//             {isDropdownOpen && (
//               <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
//                 <ul
//                   className="py-2 text-sm text-gray-700 dark:text-gray-200"
//                   aria-labelledby="dropdown-button"
//                 >
//                   <li>
//                     <button
//                       type="button"
//                       onClick={() => handleCategorySelect("")}
//                       className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                     >
//                       All Categories
//                     </button>
//                   </li>
//                   {categories.map((category) => (
//                     <li key={category}>
//                       <button
//                         type="button"
//                         onClick={() => handleCategorySelect(category)}
//                         className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                       >
//                         {category}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//           <div className="relative w-full">
//             <input
//               type="search"
//               id="search-dropdown"
//               className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               required
//               style={{ height: "42px" }} // نفس الارتفاع
//             />
//             <button
//               type="submit"
//               className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               style={{ height: "42px" }} // نفس الارتفاع
//             >
//               <svg
//                 className="w-4 h-4"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                 />
//               </svg>
//               <span className="sr-only">Search</span>
//             </button>
//           </div>
//         </div>
//       </form>
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {currentProducts.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>
//       <div className="flex justify-center mt-4">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => paginate(i + 1)}
//             className={`mx-1 px-3 py-1 border ${
//               currentPage === i + 1 ? "bg-gray-800 text-white" : "bg-white"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductsList;
///////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import ProductCard from "./ProductCard";

// function ProductsList() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const productsPerPage = 8;

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
//         setCategories([...new Set(data.map((product) => product.category))]);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     }
//     fetchProducts();
//   }, []);

//   const filteredProducts = products.filter(
//     (product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (selectedCategory === "" || product.category === selectedCategory)
//   );

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setIsDropdownOpen(false);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div
//       className="container px-4 mx-auto"
//       style={{ backgroundColor: "#EEF7FF" }}
//     >
//       <form
//         className="max-w-lg mx-auto mb-4"
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <div className="flex items-center">
//           <div className="relative">
//             <button
//               id="dropdown-button"
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               className="flex-shrink-0 z-10 inline-flex items-center h-full py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-[#CDE8E5] border border-[#7AB2B2] rounded-s-lg hover:bg-[#7AB2B2] focus:ring-4 focus:outline-none focus:ring-[#7AB2B2] dark:bg-[#4D869C] dark:hover:bg-[#7AB2B2] dark:focus:ring-[#7AB2B2] dark:text-white dark:border-[#7AB2B2]"
//               type="button"
//               style={{ height: "42px" }}
//             >
//               {selectedCategory || "Categories"}{" "}
//               <svg
//                 className="w-2.5 h-2.5 ms-2.5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 10 6"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="m1 1 4 4 4-4"
//                 />
//               </svg>
//             </button>
//             {isDropdownOpen && (
//               <div className="absolute z-10 bg-[#EEF7FF] divide-y divide-[#7AB2B2] rounded-lg shadow w-44 dark:bg-[#4D869C]">
//                 <ul
//                   className="py-2 text-sm text-gray-700 dark:text-[#CDE8E5]"
//                   aria-labelledby="dropdown-button"
//                 >
//                   <li>
//                     <button
//                       type="button"
//                       onClick={() => handleCategorySelect("")}
//                       className="inline-flex w-full px-4 py-2 hover:bg-[#7AB2B2] dark:hover:bg-[#7AB2B2] dark:hover:text-white"
//                     >
//                       All Categories
//                     </button>
//                   </li>
//                   {categories.map((category) => (
//                     <li key={category}>
//                       <button
//                         type="button"
//                         onClick={() => handleCategorySelect(category)}
//                         className="inline-flex w-full px-4 py-2 hover:bg-[#7AB2B2] dark:hover:bg-[#7AB2B2] dark:hover:text-white"
//                       >
//                         {category}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//           <div className="relative w-full">
//             <input
//               type="search"
//               id="search-dropdown"
//               className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#CDE8E5] rounded-e-lg border-s-[#7AB2B2] border-s-2 border border-[#7AB2B2] focus:ring-[#4D869C] focus:border-[#4D869C] dark:bg-[#4D869C] dark:border-s-[#7AB2B2] dark:border-[#7AB2B2] dark:placeholder-[#CDE8E5] dark:text-white dark:focus:border-[#4D869C]"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               required
//               style={{ height: "42px" }}
//             />
//             <button
//               type="submit"
//               className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#4D869C] rounded-e-lg border border-[#4D869C] hover:bg-[#7AB2B2] focus:ring-4 focus:outline-none focus:ring-[#7AB2B2] dark:bg-[#7AB2B2] dark:hover:bg-[#4D869C] dark:focus:ring-[#4D869C]"
//               style={{ height: "42px" }}
//             >
//               <svg
//                 className="w-4 h-4"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                 />
//               </svg>
//               <span className="sr-only">Search</span>
//             </button>
//           </div>
//         </div>
//       </form>
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {currentProducts.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>
//       <div className="flex justify-center mt-4">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => paginate(i + 1)}
//             className={`mx-1 px-3 py-1 border ${
//               currentPage === i + 1 ? "bg-[#4D869C] text-white" : "bg-[#CDE8E5]"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductsList;
////////////////////////////////////////
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
        const res = await fetch(`/api/products`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
        setCategories([...new Set(data.map(product => product.category))]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    product =>
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

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#EEF7FF]">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-[#7AB2B2] rounded-full animate-spin mb-4"></div>
          <h2 className="text-2xl font-semibold text-[#4D869C] mb-2">
            Loading Products
          </h2>
          <p className="text-[#7AB2B2]">
            Please wait while we fetch eco-friendly items for you...
          </p>
        </div>
      </div>
    );
  }

  if (error)
    return <div className="mt-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div
      className="container px-6 mx-auto"
     
    >
      <form
        className="max-w-lg mx-auto mb-4"
        onSubmit={e => e.preventDefault()}
      >
        <div className="flex items-center my-20">
          <div className="relative">
            <button
              id="dropdown-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex-shrink-0 z-10 inline-flex items-center h-full py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-[#CDE8E5] border border-[#7AB2B2] rounded-s-lg hover:bg-[#7AB2B2] focus:ring-4 focus:outline-none focus:ring-[#7AB2B2] dark:bg-[#4D869C] dark:hover:bg-[#7AB2B2] dark:focus:ring-[#7AB2B2] dark:text-white dark:border-[#7AB2B2] "
              type="button"
              style={{ height: "42px" }}
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
              <div className="absolute z-10 bg-[#EEF7FF] divide-y divide-[#7AB2B2] rounded-lg shadow w-44 dark:bg-[#4D869C]">
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-[#CDE8E5]"
                  aria-labelledby="dropdown-button"
                >
                  <li>
                    <button
                      type="button"
                      onClick={() => handleCategorySelect("")}
                      className="inline-flex w-full px-4 py-2 hover:bg-[#7AB2B2] dark:hover:bg-[#7AB2B2] dark:hover:text-white"
                    >
                      All Categories
                    </button>
                  </li>
                  {categories.map(category => (
                    <li key={category}>
                      <button
                        type="button"
                        onClick={() => handleCategorySelect(category)}
                        className="inline-flex w-full px-4 py-2 hover:bg-[#7AB2B2] dark:hover:bg-[#7AB2B2] dark:hover:text-white"
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
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#CDE8E5] rounded-e-lg border-s-[#7AB2B2] border-s-2 border border-[#7AB2B2] focus:ring-[#4D869C] focus:border-[#4D869C] dark:bg-[#4D869C] dark:border-s-[#7AB2B2] dark:border-[#7AB2B2] dark:placeholder-[#CDE8E5] dark:text-white dark:focus:border-[#4D869C]"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              required
              style={{ height: "42px" }}
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#4D869C] rounded-e-lg border border-[#4D869C] hover:bg-[#7AB2B2] focus:ring-4 focus:outline-none focus:ring-[#7AB2B2] dark:bg-[#7AB2B2] dark:hover:bg-[#4D869C] dark:focus:ring-[#4D869C]"
              style={{ height: "42px" }}
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
      <div className="grid grid-cols-1 gap-4 mb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-7">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 border ${
              currentPage === i + 1 ? "bg-[#4D869C] text-white" : "bg-[#CDE8E5]"
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
