import React, { useState,useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ImageUp } from "lucide-react";
import { ethers } from "ethers";
import { useNavigate } from 'react-router-dom';
import { useWeb3Context } from "../contexts/useWeb3Context";
export default function UploadImage() {
  const navigateTo = useNavigate();
  const [token, setToken] = useState(true);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { web3State, updateWeb3State } = useWeb3Context();
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

      // // ✅ Read back uploaded files
      // const files = await contractInstance.viewFiles();
      // console.log("My files:", files);
    } catch (err) {
      console.error("Upload hash error:", err);
      throw err;
    }
  };

  const handleImageUpload = async () => {
    try {
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
      console.log(res);
      console.log(res.data.message)
      if (res.data.success) {
      console.log("hash", res.data.ipfsHash);
        await uploadImageHash(res.data.ipfsHash);
        toast.success(res.data.message, {
          position: "top-left",
        });
      } else {
        setToken(res.data.token)
        toast.error(res.data.message, {
          position: "top-left",
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!contractInstance || !token)
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
    <>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0b1220]/80 to-[#070b18] p-6">
      <div className="max-w-7xl mx-auto"></div>
    <div className="max-w-7xl mx-auto">
    <header className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4 sm:gap-0">
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Mernstack Crypted Vault Project
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Sepolia Testnet • NFT Demo
            </p>
          </div>

          {!selectedAccount ? (
            <button
              
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur rounded-xl px-4 py-2 border border-white/10 text-xs text-gray-300">
              {"Sepolia"} ({1111555}) • {selectedAccount.slice(0, 6)}…
              {selectedAccount.slice(-4)}
            </div>
          )}
        </header>
        <div className=" flex flex-col w-[700px] mx-auto justify-center items-center gap-4">
      <h1>{selectedAccount}</h1>
      <h1 className="text-2xl font-bold">Upload file with Web3 security</h1>

      {/* File Input */}
      <input
        disabled={loading}
        accept=".jpg, .jpeg, .png"
        type="file"
        className="bg-gray-600 border-2 border-gray-800 px-4 py-2 w-[220px] cursor-pointer"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {/* Buttons OR Message */}
      {image ? (
        <>
          {/* Upload */}
          <button
            disabled={loading}
            onClick={handleImageUpload}
            className="flex items-center gap-2 bg-blue-600 border-2 border-blue-800 text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50"
          >
            <ImageUp />
            {loading ? "Uploading..." : "Upload"}
          </button>
        </>
      ) : (
        <p className="text-gray-400">Choose a file to upload</p>
      )}
    </div>
        </div>
        </div>
    
    </>
  );
}
