"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaTrophy,
  FaTrashAlt,
  FaClock,
  FaMedal,
  FaSpinner,
} from "react-icons/fa";
import { MdEdit, MdAdd } from "react-icons/md";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const ChallengeManagement = () => {
  const [challenges, setChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [challengesPerPage] = useState(5);
  const [editingChallenge, setEditingChallenge] = useState(null);
  const [addingChallenge, setAddingChallenge] = useState(false);

  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    targetValue: 0,
    discount: {
      amount: 0,
      discountCode: "",
    },
    difficultyLevel: "intermediate",
    participationCount: 0,
    stages: [], // Initialize as an empty array
    image: "",
    isDeleted: false,
  });

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/admin/challenges");
      setChallenges(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching challenges");
      setLoading(false);
    }
  };

  const handleAddChallenge = async () => {
    if (!validateChallengeData(newChallenge)) return;

    try {
      await axios.post("/api/admin/challenges", newChallenge);
      setNewChallenge({
        title: "",
        description: "",
        targetValue: "",
        discount: {
          amount: "",
          discountCode: "",
        },
        difficultyLevel: "intermediate",
        participationCount: 0,
        image: "",
        isDeleted: false,
      });
      setAddingChallenge(false);
      fetchChallenges();
      Swal.fire({
        title: "Challenge added!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#2F855A",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add the challenge.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#2F855A",
      });
    }
  };

  const handleEditChallenge = async () => {
    if (!validateChallengeData(editingChallenge)) return;

    try {
      await axios.put(
        `/api/admin/challenges/${editingChallenge._id}`,
        editingChallenge
      );
      setEditingChallenge(null);
      fetchChallenges();
      Swal.fire({
        title: "Challenge updated!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#2F855A",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update the challenge.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#2F855A",
      });
    }
  };

  const handleSoftDelete = async (id) => {
    try {
      await axios.patch(`/api/admin/challenges/${id}`, { isDeleted: true });
      fetchChallenges();
      Swal.fire({
        title: "Challenge deleted!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#2F855A",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the challenge.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#2F855A",
      });
    }
  };

  const validateChallengeData = (challenge) => {
    const requiredFields = [
      "title",
      "description",
      "targetValue",
      "discount",
      "difficultyLevel",
      "participationCount",
    ];
    for (let field of requiredFields) {
      if (field === "discount") {
        if (!challenge.discount.amount || !challenge.discount.discountCode) {
          Swal.fire({
            title: "Validation Error",
            text: "Discount amount and code are required.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#2F855A",
          });
          return false;
        }
      } else if (!challenge[field]) {
        Swal.fire({
          title: "Validation Error",
          text: `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } is required.`,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#2F855A",
        });
        return false;
      }
    }
    return true;
  };

  const addStage = () => {
    setNewChallenge({
      ...newChallenge,
      stages: [
        ...newChallenge.stages,
        { stageNumber: "", stageDescription: "", imageUrl: "" },
      ],
    });
  };

  const updateStage = (index, updatedStage) => {
    const updatedStages = newChallenge.stages.map((stage, i) =>
      i === index ? { ...stage, ...updatedStage } : stage
    );
    setNewChallenge({ ...newChallenge, stages: updatedStages });
  };

  const removeStage = (index) => {
    const updatedStages = newChallenge.stages.filter((_, i) => i !== index);
    setNewChallenge({ ...newChallenge, stages: updatedStages });
  };

  const filteredChallenges = challenges.filter(
    (challenge) =>
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !challenge.isDeleted // Use isDeleted instead of status
  );

  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage;
  const currentChallenges = filteredChallenges.slice(
    indexOfFirstChallenge,
    indexOfLastChallenge
  );

  const totalPages = Math.ceil(filteredChallenges.length / challengesPerPage);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-yellow-100 text-yellow-800",
      advanced: "bg-red-100 text-red-800",
    };
    return colors[difficulty] || "bg-gray-100 text-gray-800";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="container mx-auto bg-white p-8 rounded-2xl shadow-lg border border-purple-200">
        <h2 className="text-4xl font-bold mb-8 text-purple-800 text-center">
          Challenge Management
        </h2>

        <div className="mb-8 flex justify-between items-center">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search challenges..."
              className="w-full p-4 pl-12 border-2 border-purple-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute top-5 left-4 text-purple-500 text-xl" />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAddingChallenge(true)}
            className="py-2 px-4 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition duration-300 flex items-center"
          >
            <MdAdd className="mr-2" />
            Add New Challenge
          </motion.button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-10">
            <FaSpinner className="h-10 w-10 text-purple-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-10">{error}</div>
        ) : filteredChallenges.length > 0 ? (
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="text-purple-600 bg-purple-50">
                <th className="p-4">Title</th>
                <th className="p-4">Description</th>
                <th className="p-4">Target Value</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Difficulty</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentChallenges.map((challenge) => (
                <tr key={challenge._id} className="border-b">
                  <td className="p-4">{challenge.title}</td>
                  <td className="p-4">{challenge.description}</td>
                  <td className="p-4">{challenge.targetValue}</td>
                  <td className="p-4">
                    {challenge.discount.amount} -{" "}
                    {challenge.discount.discountCode}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full ${getDifficultyColor(
                        challenge.difficultyLevel
                      )}`}
                    >
                      {challenge.difficultyLevel}
                    </span>
                  </td>
                  <td className="p-4 flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditingChallenge(challenge)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSoftDelete(challenge._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-full shadow hover:bg-red-600"
                    >
                      Delete
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10 text-purple-600">
            No challenges found.
          </div>
        )}
      </div>

      <div className="flex justify-center items-center space-x-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-4 py-2 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition duration-300 ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
        >
          Previous
        </motion.button>
        <span className="text-purple-600">
          Page {currentPage} of {totalPages}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-4 py-2 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition duration-300 ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
        >
          Next
        </motion.button>
      </div>

      {addingChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg w-2/3">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">
              Add New Challenge
            </h3>
            <form>
              {/* Title */}
              <input
                type="text"
                placeholder="Title"
                value={newChallenge.title}
                onChange={(e) =>
                  setNewChallenge({ ...newChallenge, title: e.target.value })
                }
                className="w-full p-2 mb-4 border-2 border-purple-300 rounded-lg"
              />

              {/* Description */}
              <textarea
                placeholder="Description"
                value={newChallenge.description}
                onChange={(e) =>
                  setNewChallenge({
                    ...newChallenge,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 mb-4 border-2 border-purple-300 rounded-lg"
              />

              {/* Target Value */}
              <input
                type="number"
                placeholder="Target Value"
                value={newChallenge.targetValue}
                onChange={(e) =>
                  setNewChallenge({
                    ...newChallenge,
                    targetValue: e.target.value,
                  })
                }
                className="w-full p-2 mb-4 border-2 border-purple-300 rounded-lg"
              />

              {/* Discount Amount */}
              <input
                type="number"
                placeholder="Discount Amount"
                value={newChallenge.discount.amount}
                onChange={(e) =>
                  setNewChallenge({
                    ...newChallenge,
                    discount: {
                      ...newChallenge.discount,
                      amount: e.target.value,
                    },
                  })
                }
                className="w-full p-2 mb-4 border-2 border-purple-300 rounded-lg"
              />

              {/* Discount Code */}
              <input
                type="text"
                placeholder="Discount Code"
                value={newChallenge.discount.discountCode}
                onChange={(e) =>
                  setNewChallenge({
                    ...newChallenge,
                    discount: {
                      ...newChallenge.discount,
                      discountCode: e.target.value,
                    },
                  })
                }
                className="w-full p-2 mb-4 border-2 border-purple-300 rounded-lg"
              />

              {/* Difficulty Level */}
              <select
                value={newChallenge.difficultyLevel}
                onChange={(e) =>
                  setNewChallenge({
                    ...newChallenge,
                    difficultyLevel: e.target.value,
                  })
                }
                className="w-full p-2 mb-4 border-2 border-purple-300 rounded-lg"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              {/* Participation Count */}
              <input
                type="number"
                placeholder="Participation Count"
                value={newChallenge.participationCount}
                onChange={(e) =>
                  setNewChallenge({
                    ...newChallenge,
                    participationCount: e.target.value,
                  })
                }
                className="w-full p-2 mb-4 border-2 border-purple-300 rounded-lg"
              />

              {/* Stages */}
              {newChallenge.stages.map((stage, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="number"
                    placeholder={`Stage ${index + 1} Number`}
                    value={stage.stageNumber}
                    onChange={(e) =>
                      updateStage(index, { stageNumber: e.target.value })
                    }
                    className="w-full p-2 mb-2 border-2 border-purple-300 rounded-lg"
                  />
                  <textarea
                    placeholder={`Stage ${index + 1} Description`}
                    value={stage.stageDescription}
                    onChange={(e) =>
                      updateStage(index, { stageDescription: e.target.value })
                    }
                    className="w-full p-2 mb-2 border-2 border-purple-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Image URL (optional)"
                    value={stage.imageUrl}
                    onChange={(e) =>
                      updateStage(index, { imageUrl: e.target.value })
                    }
                    className="w-full p-2 mb-2 border-2 border-purple-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeStage(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
                  >
                    Remove Stage
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addStage}
                className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 mb-4"
              >
                Add Stage
              </button>

              {/* Image */}
              <input
                type="text"
                placeholder="Image URL"
                value={newChallenge.image}
                onChange={(e) =>
                  setNewChallenge({ ...newChallenge, image: e.target.value })
                }
                className="w-full p-2 mb-4 border-2 border-purple-300 rounded-lg"
              />

              {/* Form Buttons */}
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddChallenge}
                  className="px-4 py-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
                >
                  Add Challenge
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAddingChallenge(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg w-1/2">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">
              Edit Challenge
            </h3>
            <form>
              <input
                type="text"
                placeholder="Title"
                value={editingChallenge.title}
                onChange={(e) =>
                  setEditingChallenge({
                    ...editingChallenge,
                    title: e.target.value,
                  })
                }
                className="w-full p-2 mb-4 border-2 border-purple-300 rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={editingChallenge.description}
                onChange={(e) =>
                  setEditingChallenge({
                    ...editingChallenge,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 mb-4 border-2 border-purple-300 rounded-lg"
              />
              {/* Additional form fields */}
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEditChallenge}
                  className="px-4 py-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
                >
                  Save Changes
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditingChallenge(null)}
                  className="px-4 py-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ChallengeManagement;
