export const address = "0x6942859aE31883a7EC197bf3665C23B1328E3cC1";
export const abi = [
  {
    inputs: [],
    name: "debug",
    outputs: [
      { internalType: "address", name: "userAddress", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_ipfsHash", type: "string" }],
    name: "uploadFile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "viewFiles",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
];
