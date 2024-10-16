"use client";

import React, { useEffect, useState } from "react";
import ProductList from "../components/productList";
import ProductForm from "../components/productForm";
import SearchBar from "../components/searchbar";
import Pagination from "../components/pagintaion";
import { fetchProducts } from "@/utils/api";
import Swal from "sweetalert2";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Error fetching products: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        setProducts([...products, addedProduct]);
        setAddingProduct(false);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product added successfully!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Failed to add the product.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Failed to add the product.",
      });
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to edit this product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#116A7B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `/api/admin/products/${updatedProduct._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          }
        );

        if (response.ok) {
          const updatedProducts = products.map((p) =>
            p._id === updatedProduct._id ? updatedProduct : p
          );
          setProducts(updatedProducts);
          setEditingProduct(null);
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Product updated successfully!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Failed to update the product.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Failed to update the product.",
        });
      }
    }
  };

  const handleDeleteProduct = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#116A7B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/admin/products/${_id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const updatedProducts = products.filter((p) => p._id !== _id);
          setProducts(updatedProducts);
          Swal.fire("Deleted!", "The product has been deleted.", "success");
        } else {
          Swal.fire(
            "Error!",
            "Something went wrong. The product could not be deleted.",
            "error"
          );
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          "Something went wrong. The product could not be deleted.",
          "error"
        );
      }
    }
  };

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredProducts = currentProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#116A7B] to-[#2F8F9D]">
      <div className="container mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-[#116A7B] text-center">
          Product Management
        </h2>

        <div className="mb-6 flex justify-between items-center">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button
            onClick={() => setAddingProduct(true)}
            className="py-2 px-4 bg-[#116A7B] text-white rounded-lg shadow hover:bg-opacity-90 transition"
          >
            Add New Product
          </button>
        </div>

        {loading ? (
          <div className="text-center text-xl text-[#116A7B]">
            Loading products...
          </div>
        ) : error ? (
          <div className="text-center text-red-600 text-xl">{error}</div>
        ) : (
          <>
            <ProductList
              products={filteredProducts}
              onDelete={handleDeleteProduct}
              onEdit={setEditingProduct}
            />

            {/* Pagination Controls */}
            {products.length > productsPerPage && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleEditProduct}
        />
      )}

      {addingProduct && (
        <ProductForm
          onClose={() => setAddingProduct(false)}
          onSave={handleAddProduct}
        />
      )}
    </div>
  );
};

export default ProductManagement;
