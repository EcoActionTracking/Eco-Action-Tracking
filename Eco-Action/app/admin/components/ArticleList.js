import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt, FaTimes } from "react-icons/fa";
import { MdEdit, MdCategory } from "react-icons/md";
import { BsCardText } from "react-icons/bs";

const ImageModal = ({ isOpen, onClose, imageSrc, articleTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#122e33] rounded-lg p-4 max-w-3xl max-h-[90vh] overflow-auto ml-40">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{articleTitle}</h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-200"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <img
          src={imageSrc}
          alt={articleTitle}
          className="max-w-full h-auto rounded"
        />
      </div>
    </div>
  );
};

const ArticleList = ({ articles, onDelete, onEdit }) => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = (imageSrc, articleTitle) => {
    setModalImage({ src: imageSrc, name: articleTitle });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-[#116A7B] to-[#122e33]">
            <tr>
              <th className="py-4 px-6 text-left text-white font-semibold">
                Image
              </th>
              <th className="py-4 px-6 text-left text-white font-semibold">
                Title
              </th>
              <th className="py-4 px-6 text-left text-white font-semibold">
                Category
              </th>
              <th className="py-4 px-6 text-left text-white font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {articles.length > 0 ? (
                articles.map(article => (
                  <motion.tr
                    key={article._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-[#e2f1f2] transition-colors duration-300"
                  >
                    <td className="py-4 px-6 text-gray-800">
                      <img
                        src={
                          article.media.photos[0] || "/api/placeholder/80/80"
                        }
                        alt={article.title}
                        className="w-20 h-20 object-cover rounded cursor-pointer"
                        onClick={() =>
                          openModal(article.media.photos[0], article.title)
                        }
                      />
                    </td>
                    <td className="py-4 px-6 text-gray-800 flex items-center">
                      <BsCardText className="text-[#116A7B] mr-3" />
                      {article.title}
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      <div className="flex items-center">
                        <MdCategory className="text-[#116A7B] mr-2" />
                        {article.category}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-800">
                      <div className="flex items-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onEdit(article)}
                          className="text-blue-500 hover:text-blue-700 transition duration-300"
                        >
                          <MdEdit className="text-2xl" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onDelete(article._id)}
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
                    colSpan="4"
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No articles found.
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
        articleTitle={modalImage?.name}
      />
    </>
  );
};

export default ArticleList;
