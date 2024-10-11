import React from "react";
import { Input } from "@/components/ui/input";

const ImageUpload = ({ images, setImages, setFile }) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      // Create a local preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages([event.target.result]);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} accept="image/*" />
      {images && images.length > 0 && (
        <img src={images[0]} alt="Preview" className="mt-2 max-w-xs h-auto" />
      )}
    </div>
  );
};

export default ImageUpload;
