import { ethers } from "ethers";
import toast from "react-hot-toast";
import axios from "axios";
import { abi, address } from "./abiAndAddress";

export const connectWallet = async () => {
  if (!window.ethereum) {
    toast.error("Please install MetaMask!");
    return null;
  }


  try {
    const provider = new ethers.BrowserProvider(window.ethereum);

    const accounts = await provider.send("eth_requestAccounts", []);
    const selectedAccount = accounts[0];

    const signer = await provider.getSigner();

    // ✅ same message everywhere
    const message = "Wellcome To Crypto Vault site";
    const signature = await signer.signMessage(message);

    const url = `http://localhost:8000/api/authentication?address=${selectedAccount}`;
    const res = await axios.post(url, { signature });
    console.log("hlloed")

    const data = res.data;

    if (!data.success) {
      toast.error(data.message);
      return null;
    }

    localStorage.setItem("token", data.token);

    toast.success(data.message);
    console.log(data.token);
    console.log(data.address);

    const contractInstance = new ethers.Contract(address, abi, signer);

    return { contractInstance, selectedAccount, address };

  } catch (err) {
    console.error(err);

    if (err.code === 4001) {
      toast.error("Connection rejected by user");
    } else {
      toast.error("Failed to connect wallet");
    }

    return null;
  }
};
