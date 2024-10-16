"use client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../../lib/firebase'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { Camera, Video, X } from 'lucide-react';

export default function CreateArticle() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    photos: [],  // Store photo URLs
    videos: [],  // Store video URLs
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Upload files to Firebase Storage and get the URLs
  const handleMediaUpload = async (files, folder) => {
    const uploadedURLs = [];
    for (const file of files) {
      const storageRef = ref(storage, `${folder}/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        uploadedURLs.push(downloadURL);  // Push the download URL to the array
      } catch (error) {
        console.error(`Error uploading ${folder}:`, error);
        setError(`Failed to upload ${folder}`);
        return [];
      }
    }
    return uploadedURLs;
  };

  // Handle file inputs (for photos and videos)
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files); // Get files array
    setForm({
      ...form,
      [e.target.name]: files, // Store file objects
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setUploading(true);

    try {
      // Upload photos and videos
      const uploadedPhotos = await handleMediaUpload(form.photos, "images");
      const uploadedVideos = await handleMediaUpload(form.videos, "videos");

      // Prepare the form data with media URLs
      const formData = {
        ...form,
        photos: uploadedPhotos,
        videos: uploadedVideos,
      };

      // Send the form data to your API
      const res = await axios.post("/api/admin/articles", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201) {
        setSuccess(res.data.message);
        toast.success('Article created successfully!');
        
        // Clear form fields on success
        setForm({
          title: "",
          description: "",
          category: "",
          photos: [],
          videos: [],
          
        });
        setPreviews({ photos: [], videos: [] });
      }
    } catch (error) {
      console.log("error", error.message);
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const [previews, setPreviews] = useState({ photos: [], videos: [] });

  const handleFileChange = useCallback((event) => {
    const { name, files } = event.target;
    handleMediaChange(event);

    const fileArray = Array.from(files);
    const newPreviews = fileArray.map(file => URL.createObjectURL(file));

    setPreviews(prev => ({
      ...prev,
      [name]: [...prev[name], ...newPreviews]
    }));
  }, [handleMediaChange]);

  const removePreview = useCallback((type, index) => {
    setPreviews(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  }, []);

  return (
    <div className="max-w-2xl p-8 mx-auto bg-white rounded-lg shadow-md">
      <ToastContainer />
      <h1 className="mb-6 text-3xl font-bold text-center text-green-900">Create a New Article</h1>
      
      {error && <p className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">{error}</p>}
      {success && <p className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-md">{success}</p>}
    
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            className="block w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            id="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="block w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            id="category"
            value={form.category}
            onChange={handleChange}
            className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="Sustainable Living">Sustainable Living</option>
            <option value="Recycling and Waste Management">Recycling and Waste Management</option>
            <option value="Environmental Education">Environmental Education</option>
            <option value="Organic Farming and Food">Organic Farming and Food</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="photos" className="block mb-1 text-sm font-medium text-gray-700">Photos</label>
          <div className="flex items-center px-3 py-2 mt-1 space-x-2 border border-gray-300 rounded-md">
            <Camera className="w-5 h-5 text-gray-400" />
            <input
              type="file"
              name="photos"
              id="photos"
              accept="image/*"
              onChange={handleFileChange}
              multiple
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          {previews.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {previews.photos.map((preview, index) => (
                <div key={index} className="relative">
                  <img src={preview} alt={`Preview ${index + 1}`} className="object-cover w-full h-24 rounded" />
                  <button
                    type="button"
                    onClick={() => removePreview('photos', index)}
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
          <label htmlFor="videos" className="block mb-1 text-sm font-medium text-gray-700">Videos</label>
          <div className="flex items-center px-3 py-2 mt-1 space-x-2 border border-gray-300 rounded-md">
            <Video className="w-5 h-5 text-gray-400" />
            <input
              type="file"
              name="videos"
              id="videos"
              accept="video/*"
              onChange={handleFileChange}
              multiple
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          {previews.videos.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {previews.videos.map((preview, index) => (
                <div key={index} className="relative">
                  <video src={preview} className="object-cover w-full h-24 rounded" controls />
                  <button
                    type="button"
                    onClick={() => removePreview('videos', index)}
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
          <svg className="inline w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Uploading media...
        </div>
      )}

        <button
          type="submit"
          className="block w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
        >
          Create Article
        </button>
      </form>
    </div>
  );
}
