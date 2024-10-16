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
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="py-2 px-4 bg-[#116A7B] text-white rounded-full shadow-lg hover:bg-[#122e33] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        First
      </motion.button>

      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="py-2 px-4 bg-[#116A7B] text-white rounded-full shadow-lg hover:bg-[#122e33] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </motion.button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <motion.button
            key={page}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(page)}
            className={`py-2 px-4 rounded-full shadow-lg transition duration-300 ${
              currentPage === page
                ? "bg-[#122e33] text-white"
                : "bg-[#116A7B] text-white hover:bg-[#122e33]"
            }`}
          >
            {page}
          </motion.button>
        )
      )}

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="py-2 px-4 bg-[#116A7B] text-white rounded-full shadow-lg hover:bg-[#122e33] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </motion.button>

      {/* Last Page Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="py-2 px-4 bg-[#116A7B] text-white rounded-full shadow-lg hover:bg-[#122e33] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Last
      </motion.button>
    </div>
  );
};

export default Pagination;
