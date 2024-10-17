"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Camera, Video, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Modal from "../../../components/modal";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../lib/firebase";

const UpdateArticle = () => {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const [article, setArticle] = useState({});
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
  const [isVideo, setIsVideo] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    photos: [],
    videos: [],
  });

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        try {
          const res = await axios.get(`/api/articles/${id}`);
          setArticle(res.data.article);
          setForm({
            title: res.data.article.title,
            description: res.data.article.description,
            category: res.data.article.category,
            photos: res.data.article.photos || [],
            videos: res.data.article.videos || [],
          });
        } catch (error) {
          console.error("Error fetching article:", error);
          toast.error("Error fetching article. Please try again later.");
        }
      } else {
        setError("Article ID is missing.");
        toast.error("Article ID is missing.");
      }
    };

    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const filesArray = Array.from(files);

    for (const file of filesArray) {
      if (file.type.startsWith("image/")) {
        await handleImageUpload(file);
      } else if (file.type.startsWith("video/")) {
        await handleVideoUpload(file);
      }
    }

    setForm((prev) => ({
      ...prev,
      [name]: filesArray,
    }));
  };

  const handleImageUpload = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setForm((prevData) => ({
        ...prevData,
        photos: [...prevData.photos, downloadURL],
      }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    }
  };

  const handleVideoUpload = async (file) => {
    const storageRef = ref(storage, `videos/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setForm((prevData) => ({
        ...prevData,
        videos: [...prevData.videos, downloadURL],
      }));
      toast.success("Video uploaded successfully!");
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video.");
    }
  };

  const handlePreviewClick = (url, isVideo) => {
    setMediaUrl(url);
    setIsVideo(isVideo);
    setModalOpen(true);
  };

  const removePreview = (type, index) => {
    setForm((prev) => {
      const updatedFiles = [...prev[type]];
      updatedFiles.splice(index, 1);
      return { ...prev, [type]: updatedFiles };
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setMediaUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      await axios.put(`/api/admin/UpdateArticle/${id}`, form);
      toast.success("Article updated successfully!");
      router.push("/admin/Articles");
    } catch (error) {
      console.error("Error updating article:", error);
      toast.error("Error updating article. Please try again later.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl p-8 mx-auto bg-white rounded-lg shadow-md">
      <ToastContainer />
      <h1 className="mb-6 text-3xl font-bold text-center text-green-900">
        Update Article
      </h1>

      {error && (
        <p className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
          {error}
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
            className="block w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="block w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="news">News</option>
            <option value="tutorial">Tutorial</option>
            <option value="opinion">Opinion</option>
          </select>
        </div>

        <FileUpload
          label="Photos"
          name="photos"
          files={form.photos}
          handleFileChange={handleFileChange}
          removePreview={removePreview}
          handlePreviewClick={handlePreviewClick}
          accept="image/*"
        />

        <FileUpload
          label="Videos"
          name="videos"
          files={form.videos}
          handleFileChange={handleFileChange}
          removePreview={removePreview}
          handlePreviewClick={handlePreviewClick}
          accept="video/*"
        />

        <button
          type="submit"
          disabled={uploading}
          className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          {uploading ? "Updating..." : "Update Article"}
        </button>
      </form>

      <Modal open={modalOpen} onClose={closeModal}>
        {isVideo ? (
          <video src={mediaUrl} controls className="w-full" />
        ) : (
          <img src={mediaUrl} alt="Preview" className="w-full" />
        )}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </Modal>
    </div>
  );
};

const FileUpload = ({
  label,
  name,
  files,
  handleFileChange,
  removePreview,
  handlePreviewClick,
  accept,
}) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type="file"
      name={name}
      accept={accept}
      onChange={handleFileChange}
      multiple
      className="block w-full text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <div className="flex flex-wrap mt-2">
      {files.map((file, index) => (
        <div key={index} className="relative w-24 h-24 p-1 m-2 border rounded">
          {file.type.startsWith("image/") ? (
            <img
              src={file}
              alt="Preview"
              className="object-cover w-full h-full cursor-pointer"
              onClick={() => handlePreviewClick(file, false)}
            />
          ) : (
            <video
              src={file}
              className="object-cover w-full h-full cursor-pointer"
              onClick={() => handlePreviewClick(file, true)}
            />
          )}
          <button
            onClick={() => removePreview(name, index)}
            className="absolute top-1 right-1 text-red-500 hover:text-red-700"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default UpdateArticle;
