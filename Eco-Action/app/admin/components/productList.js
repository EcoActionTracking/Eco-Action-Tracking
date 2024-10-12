import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBox, FaDollarSign, FaTrashAlt, FaTimes } from "react-icons/fa";
import { MdEdit, MdCategory } from "react-icons/md";
import { BsInboxesFill } from "react-icons/bs";

const ImageModal = ({ isOpen, onClose, imageSrc, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ">
      <div className="bg-white rounded-lg p-4 max-w-3xl max-h-[90vh] overflow-auto ml-40">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{productName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <img
          src={imageSrc}
          alt={productName}
          className="max-w-full h-auto rounded"
        />
      </div>
    </div>
  );
};

const ProductList = ({ products, onDelete, onEdit }) => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = (imageSrc, productName) => {
    setModalImage({ src: imageSrc, name: productName });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-green-600 to-teal-600">
            <tr>
              <th className="py-4 px-6 text-left text-white font-semibold">
                Image
              </th>
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
                products.map((product) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-green-50 transition-colors duration-300"
                  >
                    <td className="py-4 px-6 text-gray-800">
                      <img
                        src={product.images[0] || "/api/placeholder/80/80"}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded cursor-pointer"
                        onClick={() =>
                          openModal(product.images[0], product.name)
                        }
                      />
                    </td>
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
                  <td
                    colSpan="6"
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <ImageModal
        isOpen={!!modalImage}
        onClose={closeModal}
        imageSrc={modalImage?.src}
        productName={modalImage?.name}
      />
    </>
  );
};

export default ProductList;
