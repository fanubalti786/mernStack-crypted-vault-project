import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { useWeb3Context } from "../contexts/useWeb3Context";
import axios from "axios";

export default function GetImage() {
  const { web3State,refreshImages } = useWeb3Context();
  const { selectedAccount, contractInstance } = web3State;

  const [currentPage, setCurrentPage] = useState(1);
  const [imagePerPage, setImagePerPage] = useState(6);
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getImageHashes = async () => {
    try {
      setLoading(true); // ✅ moved here

      const files = await contractInstance.viewFiles();
      const ipfsHashArray = Object.values(files);
      console.log("hashes", ipfsHashArray);
      if (ipfsHashArray.length === 0) {
        return;
      }

      setTotal(ipfsHashArray.length);

      const object = {
        ipfsHashArray,
        selectedAccount,
      };

      const url = `http://localhost:8000/api/getImage/?page=${currentPage}&limit=${imagePerPage}`;

      const token = localStorage.getItem("token");

      const headers = {
        headers: {
          Authorization: token,
        },
      };

      const res = await axios.post(url, object, headers);

      if (res.data.success) {
        setImages(res.data.decryptedImageArr);
        toast.success(res.data.message, { position: "top-left" });
      } else {
        toast.error(res.data.message, { position: "top-right" });
      }
    } catch (error) {
      console.log("getImageError", error);
      toast.error(error.message); // ✅ fixed
    } finally {
      setLoading(false); // ✅ correct place
    }
  };

  const pagination = (pageNumer) => {
    setCurrentPage(pageNumer);
  };

  useEffect(() => {
    if (contractInstance) {
      getImageHashes();
    }
  }, [contractInstance, selectedAccount, currentPage, imagePerPage,refreshImages]);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl mt-10">
      <h2 className="text-xl font-semibold mb-6 text-gray-200">Your Images</h2>

      {/* ALWAYS SHOW IMAGES */}
      {loading ? (
        <p className="text-gray-400 text-center">Loading images...</p>
      ) : images.length === 0 ? (
        <p className="text-gray-400 text-center">No images found</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {images.map((imgData, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden border border-white/10 hover:scale-105 transition"
              >
                <img
                  src={`data:image/*;base64,${imgData}`}
                  alt=""
                  className="w-full h-70 object-cover"
                />
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              disabled={loading || currentPage === 1}
              onClick={() => pagination(currentPage - 1)}
              className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition disabled:opacity-40"
            >
              <CircleArrowLeft className="w-8 h-8 opacity-80" />
            </button>

            <button
              disabled={
                loading || currentPage >= Math.ceil(total / imagePerPage)
              }
              onClick={() => pagination(currentPage + 1)}
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-40"
            >
              <CircleArrowRight className="w-8 h-8 opacity-80" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
