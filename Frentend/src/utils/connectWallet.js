import {ethers, Signature} from 'ethers'
import toast from "react-hot-toast";
import axios from 'axios'
import { abi,address } from './abiAndAddress';

export const connectWallet = async () => {
    if (!window.ethereum) return toast.error("Please install MetaMask!");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const selectedAccount = accounts[0];
      const signer = await provider.getSigner();
      const message = "Wellcome To Crypto Vault Website";
      const signature = await signer.signMessage("Wellcome To Crypto Vault site");
      console.log(signature);

      const dataSignature = {
        signature
      }
      const url = `http://localhost:8000/api/authentication?address=${selectedAccount}`
      const res = await axios.post(url,dataSignature)
      const data = res.data
      console.log("data",data);



      const contractInstance = new ethers.Contract(address, abi, signer);
      return {contractInstance,selectedAccount}
      
    } catch (err) {
       console.error(err);

    if (err.code === 4001) {
      toast.error("Connection rejected by user");
    } else {
      toast.error("Failed to connect wallet");
    }
    }
  };