import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { connectWallet } from '../utils/connectWallet'
import { useWeb3Context } from '../contexts/useWeb3Context';
export default function Wallet() {
    const navigateTo = useNavigate();
    const {updateWeb3State,web3State} = useWeb3Context();
    const {selectedAccount} = web3State;

    const handleConnectWallet = async() => {
        const {contractInstance,selectedAccount} = await connectWallet();
        console.log(contractInstance,selectedAccount);
        updateWeb3State({contractInstance,selectedAccount});

    }

    useEffect(()=>{
      if(selectedAccount)
      {
        navigateTo('/home');
      }
    },[selectedAccount])
  return (
    <div className='h-screen flex justify-center items-center'>
      <button
        className='bg-blue-600 border-2 border-blue-800 text-white px-4 py-2 rounded'
        onClick={handleConnectWallet}
      >
        Connect Wallet
      </button>
      <div className='text-4xl'>
        {selectedAccount}
      </div>
    </div>
  )
}
