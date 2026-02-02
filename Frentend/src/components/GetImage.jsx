import React from 'react'

export default function GetImage() {
    const handleImageView = async () => {
    console.log(contractInstance, selectedAccount);
    // ✅ Read back uploaded files
    const files = await contractInstance.viewFiles();
    console.log("My files:", files);
  };
  return (
    <div className='text-center mt-5'>
      <button
            onClick={handleImageView}
            className="bg-green-600 border-2 border-green-800 text-white px-4 py-2 rounded cursor-pointer"
          >
            View Images
          </button>
    </div>
  )
}
