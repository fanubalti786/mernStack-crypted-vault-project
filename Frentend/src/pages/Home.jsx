import React from 'react'
import { useWeb3Context } from '../contexts/useWeb3Context';
import UploadImage from '../components/UploadImage';
export default function Home() {
    // const {web3State} = useWeb3Context();
    // const {contractInstance,selectedAccount} = web3State
    // console.log("home",contractInstance,selectedAccount);
  return (
    <div>
        <UploadImage/>
    </div>
  )
}
