"use client";

import React, { useEffect, useState } from "react";
import ArticleList from "../components/ArticleList";
import ArticleForm from "../components/ArticleForm";
import SearchBar from "../components/searchbar";
import Pagination from "../components/pagintaion";
import { fetchArticles } from "@/utils/api";
import Swal from "sweetalert2";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

const ArticleManagement = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [addingArticle, setAddingArticle] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (err) {
        setError("Error fetching articles: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);

  // Handle media upload to Firebase
  const handleMediaUpload = async (files, folder) => {
    console.log("before Return: ", files);
    if (!files || files.length === 0) return [];
    console.log("after Return: ", files);
    const uploadedURLs = [];
    for (const file of files) {
      const storageRef = ref(storage, `${folder}/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        console.log(`Uploaded ${folder}:`, downloadURL);
        uploadedURLs.push(downloadURL);
      } catch (error) {
        console.error(`Error uploading ${folder}:`, error);
        throw new Error(`Failed to upload ${folder}`);
      }
    }
    return uploadedURLs;
  };

  const handleAddArticle = async newArticle => {
    try {
      // Upload photos and videos to Firebase
      console.log("newArticle: ", newArticle);
      const uploadedPhotos = await handleMediaUpload(
        newArticle.media.photos,
        "images"
      );
      const uploadedVideos = await handleMediaUpload(
        newArticle.media.videos,
        "videos"
      );

      // Prepare the article data with media URLs in the correct structure
      const articleData = {
        title: newArticle.title,
        description: newArticle.description,
        category: newArticle.category,
        media: {
          photos: uploadedPhotos,
          videos: uploadedVideos,
        },
      };
      console.log(articleData);
      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        const addedArticle = await response.json();
        setArticles([...articles, addedArticle]);
        setAddingArticle(false);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Article added successfully!",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add article");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Failed to add the article.",
      });
    }
  };

  const handleEditArticle = async updatedArticle => {
    try {
      // Upload new media if provided
      let photoUrls = updatedArticle.media?.photos || [];
      let videoUrls = updatedArticle.media?.videos || [];

      if (updatedArticle.newPhotos?.length > 0) {
        const newPhotoUrls = await handleMediaUpload(
          updatedArticle.newPhotos,
          "images"
        );
        photoUrls = [...photoUrls, ...newPhotoUrls];
      }
      if (updatedArticle.newVideos?.length > 0) {
        const newVideoUrls = await handleMediaUpload(
          updatedArticle.newVideos,
          "videos"
        );
        videoUrls = [...videoUrls, ...newVideoUrls];
      }

      // Prepare the article data with media URLs in the correct structure
      const articleData = {
        title: updatedArticle.title,
        description: updatedArticle.description,
        category: updatedArticle.category,
        media: {
          photos: photoUrls,
          videos: videoUrls,
        },
        _id: updatedArticle._id,
      };

      const response = await fetch(`/api/admin/articles/${articleData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        const updatedArticleData = await response.json();
        const updatedArticles = articles.map(a =>
          a._id === updatedArticleData._id ? updatedArticleData : a
        );
        setArticles(updatedArticles);
        setEditingArticle(null);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Article updated successfully!",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update article");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Failed to update the article.",
      });
    }
  };

  const handleDeleteArticle = async _id => {
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
        const response = await fetch(`/api/admin/articles/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const updatedArticles = articles.filter(a => a._id !== _id);
          setArticles(updatedArticles);
          Swal.fire("Deleted!", "The article has been deleted.", "success");
        } else {
          const errorData = await response.json();
          Swal.fire(
            "Error!",
            errorData.error || "Failed to delete the article.",
            "error"
          );
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the article.", "error");
      }
    }
  };

  // Pagination Logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const filteredArticles = currentArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#116A7B] to-[#2F8F9D]">
      <div className="container mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-[#116A7B] text-center">
          Article Management
        </h2>

        <div className="mb-6 flex justify-between items-center">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button
            onClick={() => setAddingArticle(true)}
            className="py-2 px-4 bg-[#116A7B] text-white rounded-lg shadow hover:bg-opacity-90 transition"
          >
            Add New Article
          </button>
        </div>

        {loading ? (
          <div className="text-center text-xl text-[#116A7B]">
            Loading articles...
          </div>
        ) : error ? (
          <div className="text-center text-red-600 text-xl">{error}</div>
        ) : (
          <>
            <ArticleList
              articles={filteredArticles}
              onDelete={handleDeleteArticle}
              onEdit={setEditingArticle}
            />

            {articlesPerPage && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>

      {editingArticle && (
        <ArticleForm
          article={editingArticle}
          onClose={() => setEditingArticle(null)}
          onSave={handleEditArticle}
        />
      )}

      {addingArticle && (
        <ArticleForm
          onClose={() => setAddingArticle(false)}
          onSave={handleAddArticle}
        />
      )}
    </div>
  );
};

export default ArticleManagement;
