"use client";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useCallback, useEffect } from "react";
import { Camera, Video, X } from "lucide-react";

export default function ArticleForm({ article, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    photos: [],
    videos: [],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState({ photos: [], videos: [] });

  // Initialize form with article data if editing
  useEffect(() => {
    if (article) {
      setForm({
        title: article.title || "",
        description: article.description || "",
        category: article.category || "",
        photos: article.photos || [],
        videos: article.videos || [],
      });

      // Set previews for existing media
      setPreviews({
        photos: article.photos || [],
        videos: article.videos || [],
      });
    }
  }, [article]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleMediaUpload = async (files, folder) => {
    const uploadedURLs = [];
    for (const file of files) {
      const storageRef = ref(storage, `${folder}/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        uploadedURLs.push(downloadURL);
      } catch (error) {
        console.error(`Error uploading ${folder}:`, error);
        setError(`Failed to upload ${folder}`);
        return [];
      }
    }
    return uploadedURLs;
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setForm({
      ...form,
      [e.target.name]: files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setUploading(true);

    try {
      // Upload new media files to Firebase
      const newPhotos =
        form.photos instanceof FileList || Array.isArray(form.photos)
          ? await handleMediaUpload(form.photos, "images")
          : form.photos;
      const newVideos =
        form.videos instanceof FileList || Array.isArray(form.videos)
          ? await handleMediaUpload(form.videos, "videos")
          : form.videos;

      const formData = {
        title: form.title,
        description: form.description,
        category: form.category,
        media: {
          photos: newPhotos,
          videos: newVideos,
        },
      };

      if (article?._id) {
        formData._id = article._id;
      }

      const response = await fetch("/api/admin/articles", {
        method: article ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong!");
      }

      toast.success(
        article
          ? "Article updated successfully!"
          : "Article created successfully!"
      );
      onSave && onSave(data);
      onClose && onClose();
    } catch (error) {
      console.error("error", error.message);
      toast.error(error.message);
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  // Update the useEffect hook to handle the media structure
  useEffect(() => {
    if (article) {
      setForm({
        title: article.title || "",
        description: article.description || "",
        category: article.category || "",
        photos: article.media?.photos || [],
        videos: article.media?.videos || [],
      });

      // Set previews for existing media
      setPreviews({
        photos: article.media?.photos || [],
        videos: article.media?.videos || [],
      });
    }
  }, [article]);

  const handleFileChange = useCallback((event) => {
    const { name, files } = event.target;
    handleMediaChange(event);

    const fileArray = Array.from(files);
    const newPreviews = fileArray.map((file) => URL.createObjectURL(file));

    setPreviews((prev) => ({
      ...prev,
      [name]: [...prev[name], ...newPreviews],
    }));
  }, []);

  const removePreview = useCallback((type, index) => {
    setPreviews((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));

    // Also remove from form data
    setForm((prev) => ({
      ...prev,
      [type]: Array.from(prev[type]).filter((_, i) => i !== index),
    }));
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 max-w-4xl my-8">
        <div className="bg-green-600 p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            {article ? "Edit Article" : "Create New Article"}
          </h1>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition duration-300"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <ToastContainer />
          {error && (
            <p className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
              {error}
            </p>
          )}
          {success && (
            <p className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-md">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={form.title}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="block w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                value={form.category}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Sustainable Living">Sustainable Living</option>
                <option value="Recycling and Waste Management">
                  Recycling and Waste Management
                </option>
                <option value="Environmental Education">
                  Environmental Education
                </option>
                <option value="Organic Farming and Food">
                  Organic Farming and Food
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="photos"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Photos
              </label>
              <div className="flex items-center px-3 py-2 mt-1 space-x-2 border border-gray-300 rounded-md">
                <Camera className="w-5 h-5 text-gray-400" />
                <input
                  type="file"
                  name="photos"
                  id="photos"
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>
              {previews.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {previews.photos.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="object-cover w-full h-24 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removePreview("photos", index)}
                        className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="videos"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Videos
              </label>
              <div className="flex items-center px-3 py-2 mt-1 space-x-2 border border-gray-300 rounded-md">
                <Video className="w-5 h-5 text-gray-400" />
                <input
                  type="file"
                  name="videos"
                  id="videos"
                  accept="video/*"
                  onChange={handleFileChange}
                  multiple
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>
              {previews.videos.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {previews.videos.map((preview, index) => (
                    <div key={index} className="relative">
                      <video
                        src={preview}
                        className="object-cover w-full h-24 rounded"
                        controls
                      />
                      <button
                        type="button"
                        onClick={() => removePreview("videos", index)}
                        className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {uploading && (
              <div className="p-3 mb-4 text-sm text-blue-700 bg-green-100 rounded-md">
                <svg
                  className="inline w-4 h-4 mr-2 animate-spin"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Uploading media...
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none disabled:opacity-50"
              >
                {uploading
                  ? "Saving..."
                  : article
                  ? "Save Changes"
                  : "Create Article"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
