// ProductList.js
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBox, FaDollarSign, FaTrashAlt } from "react-icons/fa";
import { MdEdit, MdCategory } from "react-icons/md";
import { BsInboxesFill } from "react-icons/bs";

const ProductList = ({ products, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-green-600 to-teal-600">
          <tr>
            <th className="py-4 px-6 text-left text-white font-semibold">
              Name
            </th>
            <th className="py-4 px-6 text-left text-white font-semibold">
              Price
            </th>
            <th className="py-4 px-6 text-left text-white font-semibold">
              Category
            </th>
            <th className="py-4 px-6 text-left text-white font-semibold">
              Stock
            </th>
            <th className="py-4 px-6 text-left text-white font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {products.length > 0 ? (
              products.map(product => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-green-50 transition-colors duration-300"
                >
                  <td className="py-4 px-6 text-gray-800 flex items-center">
                    <FaBox className="text-green-500 mr-3" />
                    {product.name}
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    <div className="flex items-center">
                      <FaDollarSign className="text-green-500 mr-1" />
                      {product.price}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    <div className="flex items-center">
                      <MdCategory className="text-green-500 mr-2" />
                      {product.category}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    <div className="flex items-center">
                      <BsInboxesFill className="text-green-500 mr-2" />
                      {product.stock_quantity}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onEdit(product)}
                        className="text-blue-500 hover:text-blue-700 transition duration-300"
                      >
                        <MdEdit className="text-2xl" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onDelete(product._id)}
                        className="text-red-500 hover:text-red-700 transition duration-300"
                      >
                        <FaTrashAlt className="text-xl" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
