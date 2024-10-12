"use client"; // This indicates client-side rendering for Next.js

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import ImageUpload from "./ImageUpload";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { uploadImage } from "@/utils/uploadImage";
import { FaTimes } from "react-icons/fa";

const ProductForm = ({ product, onClose, onSave }) => {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [category, setCategory] = useState(product?.category || "");
  const [stockQuantity, setStockQuantity] = useState(
    product?.stock_quantity || ""
  );
  const [imageUrl, setImageUrl] = useState(product?.images?.[0] || "");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStockQuantity(product.stock_quantity);
      setImageUrl(product.images?.[0] || "");
    }
  }, [product]);

  const handleImageUpload = file => {
    setFile(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsUploading(true);
    setUploadError(null);

    let updatedImageUrl = imageUrl;

    if (file) {
      try {
        updatedImageUrl = await uploadImage(file);
      } catch (error) {
        console.error("Error uploading image:", error);
        setUploadError("Failed to upload image. Please try again.");
        setIsUploading(false);
        return;
      }
    }

    const productData = {
      name,
      description,
      price,
      category,
      stock_quantity: stockQuantity,
      images: [updatedImageUrl],
    };

    try {
      if (product) {
        await onSave({ ...productData, _id: product._id });
      } else {
        await onSave(productData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      setUploadError("Failed to save product. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 max-w-4xl my-8 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-white">
            {product ? "Edit Product" : "Add New Product"}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition duration-300"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-y"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-gray-700 font-semibold mb-2"
              >
                Price
              </label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-gray-700 font-semibold mb-2"
              >
                Category
              </label>
              <Input
                id="category"
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Stock Quantity */}
          <div>
            <label
              htmlFor="stockQuantity"
              className="block text-gray-700 font-semibold mb-2"
            >
              Stock Quantity
            </label>
            <Input
              id="stockQuantity"
              type="number"
              value={stockQuantity}
              onChange={e => setStockQuantity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Image
            </label>
            <ImageUpload onUpload={handleImageUpload} imageUrl={imageUrl} />
          </div>

          {/* Upload Error Message */}
          {uploadError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{uploadError}</AlertDescription>
            </Alert>
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
              className="py-2 px-6 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition duration-300"
              disabled={isUploading}
            >
              {isUploading
                ? "Saving..."
                : product
                ? "Save Changes"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
