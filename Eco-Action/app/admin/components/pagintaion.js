// components/Pagination.js
import React from "react";
import { motion } from "framer-motion";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center justify-center mt-8 space-x-2">
      {/* First Page Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(1)} // Go to first page
        disabled={currentPage === 1}
        className="py-2 px-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        First
      </motion.button>

      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="py-2 px-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </motion.button>

      {/* Page Numbers  */}
      {Array.from({ length: totalPages }, (_, index) => (
        <motion.button
          key={index + 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(index + 1)}
          className={`py-2 px-4 rounded-full shadow-lg transition duration-300 ${
            currentPage === index + 1
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-green-600 hover:bg-green-500 hover:text-white"
          }`}
        >
          {index + 1}
        </motion.button>
      ))}

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="py-2 px-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </motion.button>

      {/* Last Page Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="py-2 px-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Last
      </motion.button>
    </div>
  );
};

export default Pagination;
