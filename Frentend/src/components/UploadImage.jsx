import React, { useState,useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ImageUp } from "lucide-react";
import { ethers } from "ethers";
import { useNavigate } from 'react-router-dom';
import { useWeb3Context } from "../contexts/useWeb3Context";
export default function UploadImage() {
  const navigateTo = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { web3State, updateWeb3State,setRefreshImages} = useWeb3Context();
  const { selectedAccount, contractInstance } = web3State;

  const uploadImageHash = async (_ipfsHash) => {
    try {
      if (!contractInstance) throw new Error("Contract not loaded");

      // ✅ Send tx
      const tx = await contractInstance.uploadFile(_ipfsHash);
      console.log("Transaction sent:", tx.hash);

      // ✅ Wait for mining
      const receipt = await tx.wait();
      console.log("Transaction mined:", receipt);

      
    } catch (err) {
      console.error("Upload hash error:", err);
      throw err;
    }
  };

  const handleImageUpload = async () => {
    try {
      console.log(selectedAccount);
      setLoading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("selectedAccount", selectedAccount);
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      console.log("hy")
      const url = "http://localhost:8000/api/uploadImage";
      const res = await axios.post(url, formData, headers);
      console.log(res.data.message)
      if (res.data.success) {
      console.log("hash", res.data.ipfsHash);
        await uploadImageHash(res.data.ipfsHash);
        setRefreshImages(prev => !prev);
        toast.success(res.data.message, {
          position: "top-left",
        });
      } else {
        toast.error(res.data.message, {
          position: "top-left",
        });
      }
    } catch (err) {
      console.log("hello",err);
      toast.error(err.message, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!contractInstance)
    {
      navigateTo('/')
    }
  },[])

  useEffect(() => {
    if (!window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);

    const syncWallet = async () => {
      const accounts = await provider.send("eth_accounts", []);
      if (accounts.length === 0) {
        updateWeb3State({
        selectedAccount: null,
      });
      }

      updateWeb3State({
        selectedAccount: accounts[0],
      });

      // const network = await provider.getNetwork();
      // setNetworkName(network.name);
      // setChainIdNumber(Number(network.chainId));

      // const signer = await provider.getSigner();
      // const myContract = new ethers.Contract(erc721Address, erc721Abi, signer);
      // setContract(myContract);

      // const owner = await myContract.owner();
      // setOwnerAddress(owner);
    };

    // initial load
    // syncWallet();

    // account change (NO reload)
    window.ethereum.on("accountsChanged", syncWallet);

    // network change (MetaMask reload behavior)
    // window.ethereum.on("chainChanged", () => {
    //   window.location.reload();
    // });

    return () => {
      window.ethereum.removeListener("accountsChanged", syncWallet);
      // window.ethereum.removeListener("chainChanged", () =>
      //   window.location.reload(),
      // );
    };
  }, []);

return (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">

    <h2 className="text-xl font-semibold mb-6 text-gray-200">
      Upload Image 🔐
    </h2>

    <div className="flex flex-col sm:flex-row gap-4 items-center">

      <input
        disabled={loading}
        accept=".jpg, .jpeg, .png"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="flex-1 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer text-sm text-gray-300"
      />

      {image && (
        <button
          disabled={loading}
          onClick={handleImageUpload}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      )}
    </div>
  </div>
);


}
