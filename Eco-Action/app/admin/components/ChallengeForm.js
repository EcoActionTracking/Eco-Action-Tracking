"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageUpload from "./ImageUpload";
import { uploadImage } from "@/utils/uploadImage";
import { FaTimes, FaPlus, FaMinus, FaInfoCircle } from "react-icons/fa";

const ChallengeForm = ({ challenge, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    challenge || {
      title: "",
      description: "",
      targetValue: "",
      discount: {
        amount: "",
        discountCode: "",
      },
      difficultyLevel: "intermediate",
      participationCount: "",
      stages: [],
      image: null,
      isDeleted: false,
    }
  );

  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showTargetTooltip, setShowTargetTooltip] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddStage = () => {
    setFormData({
      ...formData,
      stages: [
        ...formData.stages,
        { stageNumber: "", stageDescription: "", imageUrl: null },
      ],
    });
  };

  const updateStage = (index, updatedStage) => {
    const updatedStages = formData.stages.map((stage, i) =>
      i === index ? { ...stage, ...updatedStage } : stage
    );
    setFormData({ ...formData, stages: updatedStages });
  };

  const removeStage = (index) => {
    const updatedStages = formData.stages.filter((_, i) => i !== index);
    setFormData({ ...formData, stages: updatedStages });
  };

  const handleImageUpload = async (file) => {
    setIsUploading(true);
    setUploadError(null);
    try {
      const imageUrl = await uploadImage(file);
      setFormData({ ...formData, image: imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleStageImageUpload = async (index, file) => {
    setIsUploading(true);
    setUploadError(null);
    try {
      const imageUrl = await uploadImage(file);
      updateStage(index, { imageUrl });
    } catch (error) {
      console.error("Error uploading stage image:", error);
      setUploadError("Failed to upload stage image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) {
      setUploadError("Please wait for all images to finish uploading.");
      return;
    }

    await onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-lg shadow-2xl w-11/12 max-w-3xl my-8 overflow-y-auto ml-32"
        style={{ maxHeight: "85vh" }}
      >
        <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-t-lg flex justify-between items-center">
          <h3 className="text-2xl font-bold text-white">
            {challenge ? "Edit Challenge" : "Create New Challenge"}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition duration-300"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-1"
            >
              Title (required)
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="E.g., 30-Day Fitness Challenge"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-1"
            >
              Description (required)
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Tell us about your challenge..."
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-28 resize-y"
              required
            />
          </div>

          {/* Target Value & Tooltip */}
          <div className="relative">
            <label
              htmlFor="targetValue"
              className="block text-gray-700 font-semibold mb-1"
            >
              Target Value (optional){" "}
              <FaInfoCircle
                className="inline-block ml-1 text-gray-500 cursor-pointer"
                onMouseEnter={() => setShowTargetTooltip(true)}
                onMouseLeave={() => setShowTargetTooltip(false)}
              />
            </label>
            {showTargetTooltip && (
              <div className="absolute z-10 bg-gray-800 text-white text-sm rounded-lg p-2 shadow-lg -left-20 top-8">
                E.g., Number of steps, miles, etc.
              </div>
            )}
            <input
              type="number"
              id="targetValue"
              name="targetValue"
              placeholder="E.g., 10000"
              value={formData.targetValue}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Discount Amount */}
            <div>
              <label
                htmlFor="discount.amount"
                className="block text-gray-700 font-semibold mb-1"
              >
                Discount Amount (optional)
              </label>
              <input
                type="number" // Use type="number" for number inputs
                id="discount.amount"
                name="discount.amount"
                placeholder="E.g., 10"
                value={formData.discount.amount}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Discount Code */}
            <div>
              <label
                htmlFor="discount.discountCode"
                className="block text-gray-700 font-semibold mb-1"
              >
                Discount Code (optional)
              </label>
              <input
                type="text"
                id="discount.discountCode"
                name="discount.discountCode"
                placeholder="E.g., SUMMER20"
                value={formData.discount.discountCode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Difficulty Level */}
          <div>
            <label
              htmlFor="difficultyLevel"
              className="block text-gray-700 font-semibold mb-1"
            >
              Difficulty Level
            </label>
            <select
              id="difficultyLevel"
              name="difficultyLevel"
              value={formData.difficultyLevel}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Participation Count */}
          <div>
            <label
              htmlFor="participationCount"
              className="block text-gray-700 font-semibold mb-1"
            >
              Expected Participants (optional)
            </label>
            <input
              type="number"
              id="participationCount"
              name="participationCount"
              placeholder="E.g., 100"
              value={formData.participationCount}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Stages Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-gray-700">
              Challenge Stages (optional)
            </h4>
            <AnimatePresence>
              {formData.stages.map((stage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 border border-gray-200 rounded-lg space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h5 className="text-lg font-semibold text-gray-700">
                      Stage {index + 1}
                    </h5>
                    <button
                      type="button"
                      onClick={() => removeStage(index)}
                      className="text-red-500 hover:text-red-700 transition duration-300 px-4 py-2"
                    >
                      <FaMinus size={20} /> {/* Smaller icon size */}
                    </button>
                  </div>
                  <input
                    type="number"
                    placeholder="Stage Number"
                    value={stage.stageNumber}
                    onChange={(e) =>
                      updateStage(index, { stageNumber: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Stage Description"
                    value={stage.stageDescription}
                    onChange={(e) =>
                      updateStage(index, {
                        stageDescription: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-20" // Reduced textarea height
                  />
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Stage Image (optional)
                    </label>
                    <ImageUpload
                      onUpload={(file) => handleStageImageUpload(index, file)}
                      imageUrl={stage.imageUrl}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <button
              type="button"
              onClick={handleAddStage}
              className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
            >
              <FaPlus className="mr-2" /> Add Stage
            </button>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Challenge Image (optional)
            </label>
            <ImageUpload
              onUpload={handleImageUpload}
              imageUrl={formData.image}
            />
          </div>

          {/* Upload Error Message */}
          {uploadError && (
            <div className="mt-2 text-red-500">
              <span>{uploadError}</span>
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-6 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-6 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition duration-300"
            >
              {challenge ? "Save Changes" : "Create Challenge"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ChallengeForm;
