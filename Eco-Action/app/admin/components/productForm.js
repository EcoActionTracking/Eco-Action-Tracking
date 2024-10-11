import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import ImageUpload from "./ImageUpload";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { uploadImage } from "@/utils/uploadImage";

const ProductForm = ({ product, onClose, onSave }) => {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [category, setCategory] = useState(product?.category || "");
  const [stockQuantity, setStockQuantity] = useState(
    product?.stock_quantity || ""
  );
  const [images, setImages] = useState(product?.images || []);
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
      setImages(product.images);
    }
  }, [product]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsUploading(true);
    setUploadError(null);

    let imageUrl = images[0]; // Use existing image if available

    if (file) {
      try {
        imageUrl = await uploadImage(file);
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
      images: [imageUrl],
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
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 overflow-hidden">
      <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 h-32 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="bg-white p-8 rounded-lg shadow-lg w-2/3 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
          <h3 className="text-2xl font-bold mb-4">
            {product ? "Edit Product" : "Add New Product"}
          </h3>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <Input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Price</label>
              <Input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Category</label>
              <Input
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Stock Quantity</label>
              <Input
                type="number"
                value={stockQuantity}
                onChange={e => setStockQuantity(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Image</label>
              <ImageUpload
                images={images}
                setImages={setImages}
                setFile={setFile}
              />
            </div>
            {uploadError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{uploadError}</AlertDescription>
              </Alert>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2 px-4 mr-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                disabled={isUploading}
              >
                {isUploading
                  ? "Saving..."
                  : product
                  ? "Save Changes"
                  : "Add Product"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
