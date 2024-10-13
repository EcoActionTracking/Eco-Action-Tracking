"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // 3 cards per row, 2 rows

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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= pageNumbers) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 max-w-md mx-auto"
      >
        <input
          type="text"
          placeholder="Search for a product..."
          className="w-full p-2 border border-gray-300 rounded text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <ul className="flex space-x-4 justify-center">
          <li
            className={`flex items-center justify-center shrink-0 ${
              currentPage === 1 ? "bg-gray-300" : "hover:bg-gray-50 border-2"
            } cursor-pointer w-10 h-10 rounded-full`}
            onClick={() => paginate(currentPage - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 fill-gray-400"
              viewBox="0 0 55.753 55.753"
            >
              <path
                d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                data-original="#000000"
              />
            </svg>
          </li>
          {[...Array(pageNumbers)].map((_, index) => (
            <li
              key={index}
              className={`flex items-center justify-center shrink-0 ${
                currentPage === index + 1
                  ? "bg-blue-500 border-2 border-blue-500 text-white"
                  : "hover:bg-gray-50 border-2 text-[#333]"
              } cursor-pointer text-base font-bold w-10 h-10 rounded-full`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </li>
          ))}
          <li
            className={`flex items-center justify-center shrink-0 ${
              currentPage === pageNumbers
                ? "bg-gray-300"
                : "hover:bg-gray-50 border-2"
            } cursor-pointer w-10 h-10 rounded-full`}
            onClick={() => paginate(currentPage + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 fill-gray-400 rotate-180"
              viewBox="0 0 55.753 55.753"
            >
              <path
                d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                data-original="#000000"
              />
            </svg>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

export default ProductsList;