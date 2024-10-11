"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, PenSquare, Plus, Search } from "lucide-react";

const ChallengeManagement = () => {
  const [challenges, setChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [challengesPerPage] = useState(5);
  const [editingChallenge, setEditingChallenge] = useState(null);
  const [addingChallenge, setAddingChallenge] = useState(false);

  const emptyChallenge = {
    title: "",
    description: "",
    targetValue: 0,
    discount: {
      amount: 0,
      discountCode: "",
    },
    difficultyLevel: "intermediate",
    participationCount: 0,
    stages: [],
    image: "",
    isDeleted: false,
  };

  const [newChallenge, setNewChallenge] = useState(emptyChallenge);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/challenges");
      const data = await response.json();
      setChallenges(data);
    } catch (err) {
      setError("Error fetching challenges");
    } finally {
      setLoading(false);
    }
  };

  const handleAddStage = (challengeData) => {
    const newStage = {
      stageNumber: challengeData.stages.length + 1,
      stageDescription: "",
      imageUrl: "",
    };

    if (editingChallenge) {
      setEditingChallenge({
        ...editingChallenge,
        stages: [...editingChallenge.stages, newStage],
      });
    } else {
      setNewChallenge({
        ...newChallenge,
        stages: [...newChallenge.stages, newStage],
      });
    }
  };

  const handleStageChange = (index, field, value, isEditing) => {
    const updateStages = (stages) => {
      const newStages = [...stages];
      newStages[index] = {
        ...newStages[index],
        [field]: value,
      };
      return newStages;
    };

    if (isEditing) {
      setEditingChallenge({
        ...editingChallenge,
        stages: updateStages(editingChallenge.stages),
      });
    } else {
      setNewChallenge({
        ...newChallenge,
        stages: updateStages(newChallenge.stages),
      });
    }
  };

  const validateChallenge = (challenge) => {
    if (
      !challenge.title ||
      !challenge.description ||
      challenge.targetValue < 0
    ) {
      return false;
    }
    if (!challenge.discount.amount || !challenge.discount.discountCode) {
      return false;
    }
    if (challenge.participationCount < 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (challenge, isEditing) => {
    if (!validateChallenge(challenge)) {
      setError("Please fill all required fields correctly");
      return;
    }

    try {
      const url = isEditing
        ? `/api/admin/challenges/${challenge._id}`
        : "/api/admin/challenges";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(challenge),
      });

      if (!response.ok) throw new Error("Failed to save challenge");

      await fetchChallenges();
      setEditingChallenge(null);
      setAddingChallenge(false);
      setNewChallenge(emptyChallenge);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/admin/challenges/${id}`, {
        method: "DELETE",
      });
      await fetchChallenges();
    } catch (err) {
      setError("Failed to delete challenge");
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-yellow-100 text-yellow-800",
      advanced: "bg-red-100 text-red-800",
    };
    return colors[difficulty] || "bg-gray-100 text-gray-800";
  };

  const ChallengeForm = ({ challenge, isEditing, onSubmit }) => (
    <div className="space-y-4 p-4 border rounded-lg">
      <Input
        placeholder="Title"
        value={challenge.title}
        onChange={(e) =>
          isEditing
            ? setEditingChallenge({
                ...editingChallenge,
                title: e.target.value,
              })
            : setNewChallenge({ ...newChallenge, title: e.target.value })
        }
      />
      <Textarea
        placeholder="Description"
        value={challenge.description}
        onChange={(e) =>
          isEditing
            ? setEditingChallenge({
                ...editingChallenge,
                description: e.target.value,
              })
            : setNewChallenge({ ...newChallenge, description: e.target.value })
        }
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          placeholder="Target Value"
          value={challenge.targetValue}
          onChange={(e) =>
            isEditing
              ? setEditingChallenge({
                  ...editingChallenge,
                  targetValue: Number(e.target.value),
                })
              : setNewChallenge({
                  ...newChallenge,
                  targetValue: Number(e.target.value),
                })
          }
        />
        <Input
          type="number"
          placeholder="Participation Count"
          value={challenge.participationCount}
          onChange={(e) =>
            isEditing
              ? setEditingChallenge({
                  ...editingChallenge,
                  participationCount: Number(e.target.value),
                })
              : setNewChallenge({
                  ...newChallenge,
                  participationCount: Number(e.target.value),
                })
          }
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Discount</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Discount Amount"
            value={challenge.discount.amount}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (isEditing) {
                setEditingChallenge({
                  ...editingChallenge,
                  discount: { ...editingChallenge.discount, amount: value },
                });
              } else {
                setNewChallenge({
                  ...newChallenge,
                  discount: { ...newChallenge.discount, amount: value },
                });
              }
            }}
          />
          <Input
            placeholder="Discount Code"
            value={challenge.discount.discountCode}
            onChange={(e) => {
              if (isEditing) {
                setEditingChallenge({
                  ...editingChallenge,
                  discount: {
                    ...editingChallenge.discount,
                    discountCode: e.target.value,
                  },
                });
              } else {
                setNewChallenge({
                  ...newChallenge,
                  discount: {
                    ...newChallenge.discount,
                    discountCode: e.target.value,
                  },
                });
              }
            }}
          />
        </div>
      </div>

      <Select
        value={challenge.difficultyLevel}
        onValueChange={(value) =>
          isEditing
            ? setEditingChallenge({
                ...editingChallenge,
                difficultyLevel: value,
              })
            : setNewChallenge({ ...newChallenge, difficultyLevel: value })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="beginner">Beginner</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Stages</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAddStage(challenge)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Stage
          </Button>
        </div>
        {challenge.stages.map((stage, index) => (
          <div key={index} className="space-y-2 p-2 border rounded">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Stage {stage.stageNumber}</span>
            </div>
            <Textarea
              placeholder="Stage Description"
              value={stage.stageDescription}
              onChange={(e) =>
                handleStageChange(
                  index,
                  "stageDescription",
                  e.target.value,
                  isEditing
                )
              }
            />
            <Input
              placeholder="Image URL"
              value={stage.imageUrl}
              onChange={(e) =>
                handleStageChange(index, "imageUrl", e.target.value, isEditing)
              }
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() =>
            isEditing ? setEditingChallenge(null) : setAddingChallenge(false)
          }
        >
          Cancel
        </Button>
        <Button onClick={() => onSubmit(challenge, isEditing)}>
          {isEditing ? "Update" : "Create"} Challenge
        </Button>
      </div>
    </div>
  );

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

        {loading ? (
          <div className="text-center text-xl text-purple-700">
            Loading challenges...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-xl">{error}</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                  <tr>
                    <th className="py-4 px-6 text-left text-white font-semibold">
                      Title
                    </th>
                    <th className="py-4 px-6 text-left text-white font-semibold">
                      Difficulty
                    </th>
                    <th className="py-4 px-6 text-left text-white font-semibold">
                      Points
                    </th>
                    <th className="py-4 px-6 text-left text-white font-semibold">
                      Duration
                    </th>
                    <th className="py-4 px-6 text-left text-white font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {currentChallenges.map((challenge) => (
                      <motion.tr
                        key={challenge._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-purple-50 transition-colors duration-300"
                      >
                        <td className="py-4 px-6 text-gray-800 flex items-center">
                          <FaTrophy className="text-purple-500 mr-3" />
                          {challenge.title}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(
                              challenge.difficulty
                            )}`}
                          >
                            {challenge.difficulty}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-800">
                          <div className="flex items-center">
                            <FaMedal className="text-purple-500 mr-2" />
                            {challenge.points}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-800">
                          <div className="flex items-center">
                            <FaClock className="text-purple-500 mr-2" />
                            {challenge.duration}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-800">
                          <div className="flex items-center space-x-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setEditingChallenge(challenge)}
                              className="text-blue-500 hover:text-blue-700 transition duration-300"
                            >
                              <MdEdit className="text-2xl" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSoftDelete(challenge._id)}
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

            {/* Pagination */}
            <div className="flex items-center justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(page)}
                    className={`py-2 px-4 rounded-full shadow-lg transition duration-300 ${
                      currentPage === page
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-purple-600 hover:bg-purple-500 hover:text-white"
                    }`}
                  >
                    {page}
                  </motion.button>
                )
              )}
            </div>
          </>
        )}
      </div>

      {/* Edit Challenge Modal */}
      {editingChallenge && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
            <h3 className="text-2xl font-bold mb-4">Edit Challenge</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  value={editingChallenge.title}
                  onChange={(e) =>
                    setEditingChallenge({
                      ...editingChallenge,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={editingChallenge.description}
                  onChange={(e) =>
                    setEditingChallenge({
                      ...editingChallenge,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Difficulty</label>
                <select
                  value={editingChallenge.difficulty}
                  onChange={(e) =>
                    setEditingChallenge({
                      ...editingChallenge,
                      difficulty: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Points</label>
                <input
                  type="number"
                  value={editingChallenge.points}
                  onChange={(e) =>
                    setEditingChallenge({
                      ...editingChallenge,
                      points: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Duration (in minutes)
                </label>
                <input
                  type="number"
                  value={editingChallenge.duration}
                  onChange={(e) =>
                    setEditingChallenge({
                      ...editingChallenge,
                      duration: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="button"
                onClick={handleEditChallenge}
                className="py-2 px-4 mr-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-300"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditingChallenge(null)}
                className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Challenge Modal */}
      {addingChallenge && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
            <h3 className="text-2xl font-bold mb-4">Add New Challenge</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  value={newChallenge.title}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={newChallenge.description}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Difficulty</label>
                <select
                  value={newChallenge.difficulty}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      difficulty: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Points</label>
                <input
                  type="number"
                  value={newChallenge.points}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      points: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Duration (in minutes)
                </label>
                <input
                  type="number"
                  value={newChallenge.duration}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      duration: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="button"
                onClick={handleAddChallenge}
                className="py-2 px-4 mr-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-300"
              >
                Add Challenge
              </button>
              <button
                type="button"
                onClick={() => setAddingChallenge(false)}
                className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ChallengeManagement;
