"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageUpload from "./ImageUpload";
import { uploadImage } from "@/utils/uploadImage";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";

const ChallengeForm = ({ challenge, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    challenge || {
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
      image: null,
      isDeleted: false,
    }
  );

  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
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
        className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl my-8 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-white">
            {challenge ? "Edit Challenge" : "Add New Challenge"}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition duration-300"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter challenge title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            {/* Target Value */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Target Value
              </label>
              <input
                type="number"
                name="targetValue"
                placeholder="Enter target value"
                value={formData.targetValue}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter challenge description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Discount Amount */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Discount Amount
              </label>
              <input
                type="number"
                name="discount.amount"
                placeholder="Enter discount amount"
                value={formData.discount.amount}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Discount Code */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Discount Code
              </label>
              <input
                type="text"
                name="discount.discountCode"
                placeholder="Enter discount code"
                value={formData.discount.discountCode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Difficulty Level */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Difficulty Level
              </label>
              <select
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
          </div>

          {/* Participation Count */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Participation Count
            </label>
            <input
              type="number"
              name="participationCount"
              placeholder="Enter participation count"
              value={formData.participationCount}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Stages Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-gray-700">
              Challenge Stages
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
                      <FaMinus size={25} />
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
                      updateStage(index, { stageDescription: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-24"
                  />
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Stage Image
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

          {/* Image Upload Section (Main Challenge Image) */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Challenge Image
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

          {/* Form Buttons */}
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
              {challenge ? "Save Changes" : "Add Challenge"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ChallengeForm;
