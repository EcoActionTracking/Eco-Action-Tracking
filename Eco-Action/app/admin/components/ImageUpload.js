// ImageUpload.js
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

const ImageUpload = ({ onUpload, imageUrl }) => {
  const [previewImage, setPreviewImage] = useState(imageUrl);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} accept="image/*" />
      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          className="mt-2 max-w-40 h-auto"
        />
      )}
    </div>
  );
};

export default ImageUpload;
