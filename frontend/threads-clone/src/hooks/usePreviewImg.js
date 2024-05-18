import React, { useState } from "react";
import useShowToast from "./useShowToast";

function usePreviewImg() {
  const [imageUrl, setImageUrl] = useState("");
  const showToast = useShowToast();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Invalid file type", "Please select an image file", "error");
      setImageUrl(null);
    }
  };
  // console.log(imageUrl)
  return { handleImageChange, imageUrl, setImageUrl };
}

export default usePreviewImg;
