import React, { useState } from "react";
import axios from "axios";
export default function UploadImage() {
    const [image,setImage] = useState(null);
    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('file',image)
        const url = "http://localhost:8000/api/uploadImage";
        const res = await axios.post(url,formData);
        console.log(res);
    }
    console.log(image);
  return (
      <div className="h-screen flex justify-center items-center gap-1">
        <input 
        className="bg-gray-600 border-2 border-gray-800 px-4 py-2 w-[200px] cursor-pointer"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}>
        </input>
        <button
          className="bg-blue-600 border-2 border-blue-800 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleImageUpload}
        >
          Upload Image
        </button>
      </div>
  );
}
