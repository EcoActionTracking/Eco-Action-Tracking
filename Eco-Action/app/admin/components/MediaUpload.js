"use client";

import React, { useState, useCallback } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { Camera, Video, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export const MediaUpload = ({
  maxFiles = 5,
  maxFileSize = 5,
  initialPhotos = [],
  initialVideos = [],
  onMediaChange,
}) => {
  const [previews, setPreviews] = useState({
    photos: initialPhotos.map((url) => ({ url, isExisting: true })),
    videos: initialVideos.map((url) => ({ url, isExisting: true })),
  });
  const [files, setFiles] = useState({ photos: [], videos: [] });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileChange = useCallback(
    (event) => {
      const { name, files: selectedFiles } = event.target;
      const fileList = Array.from(selectedFiles);

      if (fileList.some((file) => file.size > maxFileSize * 1024 * 1024)) {
        setUploadError(`Files must be smaller than ${maxFileSize}MB`);
        return;
      }

      if (previews[name].length + fileList.length > maxFiles) {
        setUploadError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      setUploadError("");

      const newPreviews = fileList.map((file) => ({
        url: URL.createObjectURL(file),
        isExisting: false,
      }));

      setPreviews((prev) => ({
        ...prev,
        [name]: [...prev[name], ...newPreviews],
      }));

      setFiles((prev) => ({
        ...prev,
        [name]: [...prev[name], ...fileList],
      }));

      onMediaChange?.({ ...files, [name]: [...files[name], ...fileList] });
    },
    [maxFiles, maxFileSize, files, previews, onMediaChange]
  );

  const removeFile = useCallback(
    (type, index) => {
      setPreviews((prev) => ({
        ...prev,
        [type]: prev[type].filter((_, i) => i !== index),
      }));

      setFiles((prev) => ({
        ...prev,
        [type]: prev[type].filter((_, i) => i !== index),
      }));

      onMediaChange?.({
        ...files,
        [type]: files[type].filter((_, i) => i !== index),
      });
    },
    [files, onMediaChange]
  );

  const uploadAllFiles = async () => {
    setIsUploading(true);
    setUploadError("");

    try {
      const uploadPromises = {
        photos: [],
        videos: [],
      };

      for (const type of ["photos", "videos"]) {
        for (const file of files[type]) {
          const storageRef = ref(storage, `${type}/${Date.now()}-${file.name}`);
          uploadPromises[type].push(
            uploadBytes(storageRef, file).then((snapshot) =>
              getDownloadURL(snapshot.ref)
            )
          );
        }
      }

      const [photoURLs, videoURLs] = await Promise.all([
        Promise.all(uploadPromises.photos),
        Promise.all(uploadPromises.videos),
      ]);

      const existingPhotos = previews.photos
        .filter((p) => p.isExisting)
        .map((p) => p.url);
      const existingVideos = previews.videos
        .filter((v) => v.isExisting)
        .map((v) => v.url);

      return {
        photos: [...existingPhotos, ...photoURLs],
        videos: [...existingVideos, ...videoURLs],
      };
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadError("Failed to upload files. Please try again.");
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const resetMedia = useCallback(() => {
    setPreviews({ photos: [], videos: [] });
    setFiles({ photos: [], videos: [] });
    setUploadError("");
    setIsUploading(false);
  }, []);

  const renderInputs = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Photos ({previews.photos.length}/{maxFiles})
        </label>
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-gray-400" />
          <Input
            type="file"
            name="photos"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        {previews.photos.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {previews.photos.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview.url}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-24 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeFile("photos", index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Videos ({previews.videos.length}/{maxFiles})
        </label>
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-gray-400" />
          <Input
            type="file"
            name="videos"
            accept="video/*"
            multiple
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        {previews.videos.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {previews.videos.map((preview, index) => (
              <div key={index} className="relative">
                <video
                  src={preview.url}
                  className="object-cover w-full h-24 rounded"
                  controls
                />
                <button
                  type="button"
                  onClick={() => removeFile("videos", index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return {
    previews,
    isUploading,
    uploadError,
    handleFileChange,
    removeFile,
    uploadAllFiles,
    resetMedia,
    renderInputs,
    files,
  };
};
