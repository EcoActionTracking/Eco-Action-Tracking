"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { FaSearch, FaBox, FaDollarSign, FaTrashAlt } from "react-icons/fa";
import { MdEdit, MdAdd, MdCategory } from "react-icons/md";
import { BsInboxesFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { uploadImage } from "@/utils/uploadImage";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [editingProduct, setEditingProduct] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const formRef = useRef(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
    stock_quantity: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/admin/products");
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching products");
      setLoading(false);
    }
  };

  const handleFileChange = useCallback(e => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }, []);

  const handleImageUpload = useCallback(async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadError("");

    try {
      const downloadURL = await uploadImage(file);
      setImageUrl(downloadURL);
      // Reset the form
      if (formRef.current) {
        formRef.current.reset();
      }
      setFile(null);

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError("Failed to upload image. Please try again.");
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, [file]);

  const handleAddProduct = async () => {
    if (!validateProductData(newProduct)) return;

    try {
      if (file) {
        const imageUrl = await handleImageUpload();
        newProduct.images = [imageUrl];
      }

      await axios.post("/api/admin/products", newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        images: [],
        stock_quantity: "",
      });
      setAddingProduct(false);
      fetchProducts();
      Swal.fire({
        title: "Product added!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#2F855A",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add the product.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#2F855A",
      });
    }
  };

  const handleEditProduct = async () => {
    if (!validateProductData(editingProduct)) return;

    try {
      if (file) {
        const imageUrl = await handleImageUpload();
        editingProduct.images = [imageUrl];
      }

      await axios.put(
        `/api/admin/products/${editingProduct._id}`,
        editingProduct
      );
      setEditingProduct(null);
      fetchProducts();
      Swal.fire({
        title: "Product updated!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#2F855A",
      });
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update the product.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#2F855A",
      });
    }
  };

  const handleDeleteProduct = async _id => {
    try {
      await axios.delete(`/api/admin/products/${_id}`);
      fetchProducts();
      Swal.fire({
        title: "Product deleted!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#2F855A",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the product.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#2F855A",
      });
    }
  };

  const validateProductData = product => {
    const requiredFields = [
      "name",
      "description",
      "price",
      "category",
      "stock_quantity",
    ];
    for (let field of requiredFields) {
      if (!product[field]) {
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-teal-50"
    >
      <div className="container mx-auto bg-white p-8 rounded-2xl shadow-lg border border-green-200">
        <h2 className="text-4xl font-bold mb-8 text-green-800 text-center">
          Product Management
        </h2>

        <div className="mb-8 flex justify-between items-center">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full p-4 pl-12 border-2 border-green-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute top-5 left-4 text-green-500 text-xl" />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAddingProduct(true)}
            className="py-2 px-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center"
          >
            <MdAdd className="mr-2" />
            Add New Product
          </motion.button>
        </div>

        {loading ? (
          <div className="text-center text-xl text-green-700">
            Loading products...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-xl">{error}</div>
        ) : (
          <>
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
                    {currentProducts.length > 0 ? (
                      currentProducts.map(product => (
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
                                onClick={() => setEditingProduct(product)}
                                className="text-blue-500 hover:text-blue-700 transition duration-300"
                              >
                                <MdEdit className="text-2xl" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDeleteProduct(product._id)}
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
                          colSpan="5"
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

            <div className="flex items-center justify-center mt-8 space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                className="py-2 px-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                First
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="py-2 px-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </motion.button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                page => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(page)}
                    className={`py-2 px-4 rounded-full shadow-lg transition duration-300 ${
                      currentPage === page
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-green-600  hover:bg-green-500 hover:text-white"
                    }`}
                  >
                    {page}
                  </motion.button>
                )
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="py-2 px-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
                className="py-2 px-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Last
              </motion.button>
            </div>
          </>
        )}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
            <h3 className="text-2xl font-bold mb-4">Edit Product</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={e =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={e =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={e =>
                    setEditingProduct({
                      ...editingProduct,
                      price: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  value={editingProduct.category}
                  onChange={e =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Stock Quantity</label>
                <input
                  type="number"
                  value={editingProduct.stock_quantity}
                  onChange={e =>
                    setEditingProduct({
                      ...editingProduct,
                      stock_quantity: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Image</label>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {editingProduct.images && editingProduct.images.length > 0 && (
                  <img
                    src={editingProduct.images[0]}
                    alt="Current product image"
                    className="mt-2 max-w-xs h-auto"
                  />
                )}
              </div>
              <button
                type="button"
                onClick={handleEditProduct}
                className="py-2 px-4 mr-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {addingProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
            <h3 className="text-2xl font-bold mb-4">Add New Product</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={e =>
                    setNewProduct({
                      ...newProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={e =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={e =>
                    setNewProduct({
                      ...newProduct,
                      price: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={e =>
                    setNewProduct({
                      ...newProduct,
                      category: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Stock Quantity</label>
                <input
                  type="number"
                  value={newProduct.stock_quantity}
                  onChange={e =>
                    setNewProduct({
                      ...newProduct,
                      stock_quantity: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Image</label>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              <button
                type="button"
                onClick={handleAddProduct}
                className="py-2 px-4 mr-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => setAddingProduct(false)}
                className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
            </form>
            {uploadError && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{uploadError}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductManagement;