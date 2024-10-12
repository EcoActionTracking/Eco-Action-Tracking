import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt, FaTimes } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const ImageModal = ({ isOpen, onClose, imageSrc, challengeTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-4 max-w-3xl max-h-[90vh] overflow-auto ml-40">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{challengeTitle}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <img
          src={imageSrc}
          alt={challengeTitle}
          className="max-w-full h-auto rounded"
        />
      </div>
    </div>
  );
};

const ChallengeList = ({ challenges, onPageChange, onEdit, onDelete }) => {
  const [modalImage, setModalImage] = useState(null);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-yellow-100 text-yellow-800",
      advanced: "bg-red-100 text-red-800",
    };
    return colors[difficulty] || "bg-gray-100 text-gray-800";
  };

  const openModal = (imageSrc, challengeTitle) => {
    setModalImage({ src: imageSrc, title: challengeTitle });
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
                Title
              </th>
              <th className="py-4 px-6 text-left text-white font-semibold">
                Description
              </th>
              <th className="py-4 px-6 text-left text-white font-semibold">
                Target Value
              </th>
              <th className="py-4 px-6 text-left text-white font-semibold">
                Discount
              </th>
              <th className="py-4 px-6 text-left text-white font-semibold">
                Difficulty
              </th>
              <th className="py-4 px-6 text-left text-white font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {challenges.map((challenge) => (
                <motion.tr
                  key={challenge._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-green-50 transition-colors duration-300"
                >
                  <td className="py-4 px-6 text-gray-800">
                    <img
                      src={challenge.image || "/api/placeholder/80/80"}
                      alt={challenge.title}
                      className="w-20 h-20 object-cover rounded cursor-pointer"
                      onClick={() =>
                        openModal(challenge.image, challenge.title)
                      }
                    />
                  </td>
                  <td className="py-4 px-6 text-gray-800">{challenge.title}</td>
                  <td className="py-4 px-6 text-gray-800">
                    {challenge.description}
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    {challenge.targetValue}
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    {challenge.discount.amount} -{" "}
                    {challenge.discount.discountCode}
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    <span
                      className={`px-3 py-1 rounded-full ${getDifficultyColor(
                        challenge.difficultyLevel
                      )}`}
                    >
                      {challenge.difficultyLevel}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onEdit(challenge)}
                        className="text-blue-500 hover:text-blue-700 transition duration-300"
                      >
                        <MdEdit className="text-2xl" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onDelete(challenge._id)}
                        className="text-red-500 hover:text-red-700 transition duration-300"
                      >
                        <FaTrashAlt className="text-xl" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <ImageModal
        isOpen={!!modalImage}
        onClose={closeModal}
        imageSrc={modalImage?.src}
        challengeTitle={modalImage?.title}
      />
    </>
  );
};

export default ChallengeList;
