import React from 'react'
import { useWeb3Context } from '../contexts/useWeb3Context';
export default function Home() {
    const {web3State} = useWeb3Context();
    const {contractInstance,selectedAccount} = web3State
    console.log("home",contractInstance,selectedAccount);
    // console.log("random",random);
  return (
    <div>
      Home 
    </div>
  )
}
