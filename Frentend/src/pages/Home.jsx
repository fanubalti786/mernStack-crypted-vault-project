import React from 'react'
import { useWeb3Context } from '../contexts/useWeb3Context';
import UploadImage from '../components/UploadImage';
import GetImage from '../components/GetImage';
export default function Home() {
    // const {web3State} = useWeb3Context();
    // const {contractInstance,selectedAccount} = web3State
    // console.log("home",contractInstance,selectedAccount);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0b1220] to-[#070b18] text-white p-6">

      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          <span className='text-white'>🔐</span> Full Stack Crypted Vault | Secure File Storage Dashboard
        </h1>

        <UploadImage />
        <GetImage />

      </div>
    </div>
  );
}



