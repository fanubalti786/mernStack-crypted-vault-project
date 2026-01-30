import React, { useState } from 'react'
import { Web3Context } from './createWeb3Context'

export default function Web3Provider({children}) {
    const [web3State,setWeb3State] = useState({
        contractInstance: null,
        selectedAccount: null,
    })

    const updateWeb3State = (newValue) => {
        setWeb3State((prev) => ({
            ...prev,
            ...newValue
        }))
    }
  return (
    <Web3Context.Provider value={{web3State,updateWeb3State}}>
        {children}
    </Web3Context.Provider>
  )
}
