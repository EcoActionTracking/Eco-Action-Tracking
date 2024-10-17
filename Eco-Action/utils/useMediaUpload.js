import { useState, useCallback } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase";
import { toast } from "react-toastify";

export const useMediaUpload = (options = { maxPhotos: 5, maxPhotoSize: 5 }) => {
  const [mediaFiles, setMediaFiles] = useState({ photos: [], videos: [] });
  const [previews, setPreviews] = useState({ photos: [], videos: [] });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

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
        throw new Error(`Failed to upload ${folder}`);
      }
    }
    return uploadedURLs;
  };

  const handleFileChange = useCallback(
    (e) => {
      const { name, files } = e.target;
      const fileArray = Array.from(files);

      if (name === "photos") {
        // Check photo limit
        if (fileArray.length + previews.photos.length > options.maxPhotos) {
          toast.error(`You can only upload up to ${options.maxPhotos} photos`);
          return;
        }

        // Validate photo size
        const maxPhotoSize = options.maxPhotoSize * 1024 * 1024; // Convert to bytes
        const oversizedPhotos = fileArray.filter(
          (file) => file.size > maxPhotoSize
        );
        if (oversizedPhotos.length > 0) {
          toast.error(
            `Some photos exceed the ${options.maxPhotoSize}MB size limit`
          );
          return;
        }
      }

      // Update files
      setMediaFiles((prev) => ({
        ...prev,
        [name]: [...prev[name], ...fileArray],
      }));

      // Create and update previews
      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => ({
        ...prev,
        [name]: [...prev[name], ...newPreviews],
      }));
    },
    [options.maxPhotos, options.maxPhotoSize, previews.photos.length]
  );

  const removeFile = useCallback(
    (type, index) => {
      // Revoke the URL to prevent memory leaks
      if (previews[type][index].startsWith("blob:")) {
        URL.revokeObjectURL(previews[type][index]);
      }

      // Remove the file and preview
      setMediaFiles((prev) => ({
        ...prev,
        [type]: prev[type].filter((_, i) => i !== index),
      }));

      setPreviews((prev) => ({
        ...prev,
        [type]: prev[type].filter((_, i) => i !== index),
      }));
    },
    [previews]
  );

  const uploadAllFiles = async () => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const uploadedPhotos = await handleMediaUpload(
        mediaFiles.photos,
        "images"
      );
      const uploadedVideos = await handleMediaUpload(
        mediaFiles.videos,
        "videos"
      );

      return {
        photos: uploadedPhotos,
        videos: uploadedVideos,
      };
    } catch (error) {
      setUploadError(error.message);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const resetMedia = useCallback(() => {
    // Cleanup existing preview URLs
    [...previews.photos, ...previews.videos].forEach((url) => {
      if (url.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    });

    setMediaFiles({ photos: [], videos: [] });
    setPreviews({ photos: [], videos: [] });
    setUploadError(null);
  }, [previews]);

  return {
    mediaFiles,
    previews,
    isUploading,
    uploadError,
    handleFileChange,
    removeFile,
    uploadAllFiles,
    resetMedia,
  };
};
