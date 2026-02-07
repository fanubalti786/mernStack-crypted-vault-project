# 🔐 Crypted Vault — Decentralized Encrypted File Storage dApp

Crypted Vault is a **full-stack Web3 secure file storage application** that allows users to upload, store, and view images securely using Blockchain, IPFS, and AES encryption.

Instead of trusting centralized servers, files are:

Encrypt locally → Upload to IPFS → Store hash on Blockchain

This ensures **privacy, ownership, security, and decentralization**.

---

# 🚀 Live Concept

## Upload Flow
User → Encrypt → IPFS → Store Hash on Smart Contract

## View Flow
Fetch Hash → Download Encrypted Data → Decrypt → Display Image

✅ Only the file owner can decrypt and view their files.

---

# ✨ Features

## 🔐 Security
- Wallet signature authentication (no passwords)
- AES-256 encryption (client-side)
- IV-based cryptography
- User-specific encryption keys
- JWT protected backend APIs
- End-to-end encrypted file access

## 🌐 Web3
- MetaMask wallet connection
- ethers.js smart contract interaction
- Smart contract hash storage
- Sepolia testnet deployment
- Decentralized identity (wallet address)

## 📦 Storage
- IPFS (Pinata) decentralized storage
- No centralized file server
- Immutable content hashes
- Censorship-resistant storage

## 🎨 UI / UX
- Professional dashboard layout
- Upload panel
- Image gallery grid
- Pagination system
- Smooth loading states
- Toast notifications
- Responsive design
- Modern Tailwind styling

---

# 🛠 Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Context API
- Axios
- React Hot Toast

## Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Web3
- Solidity Smart Contracts
- ethers.js
- MetaMask
- Sepolia Testnet

## Storage & Encryption
- IPFS (Pinata)
- AES-256-CBC Encryption
- Node.js Crypto module

---

# 🧠 Architecture

The application follows a **Full-Stack + Web3 + Security architecture**.

### Frontend
- Handles wallet connection
- Encrypts files before upload
- Calls smart contract methods
- Communicates with backend APIs
- Displays gallery with pagination

### Backend
- Verifies JWT tokens
- Stores user encryption keys
- Fetches encrypted data from IPFS
- Decrypts securely
- Sends images to frontend

### Blockchain Layer
- Stores only IPFS hashes
- Links files to user wallet
- Ensures immutability

### Storage Layer
- IPFS stores encrypted files
- No raw file stored anywhere

---

# 📝 Implementation Details

## Upload Process
1. User selects image
2. File encrypted using AES-256
3. Encrypted data uploaded to IPFS
4. IPFS hash saved on smart contract

## View Process
1. Fetch hashes from contract
2. Download encrypted files
3. Decrypt with user key
4. Render in gallery

## Pagination
- Page-based image fetching
- Smooth loading without UI flicker
- Next / Previous navigation

---

# 🔐 Security Highlights

- Client-side encryption before upload
- Only encrypted data stored on IPFS
- Smart contract stores hashes only
- Wallet-based authentication (no passwords)
- JWT-secured backend
- Private user keys

---

# 📂 Project Structure

```
client/
  components/
  contexts/
  pages/
server/
  controllers/
  models/
  routes/
  utils/
contracts/
```

---

# 🏁 Getting Started

## 1 Clone repo
```bash
git clone <repo-url>
cd crypted-vault
```

## 2 Install dependencies
```bash
npm install
cd client && npm install
```

## 3 Setup .env
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PINATA_API_KEY=your_key
PINATA_API_SECRET=your_secret
```

## 4 Start backend
```bash
npm start
```

## 5 Start frontend
```bash
npm run dev
```

## 6 Connect MetaMask
- Switch to Sepolia
- Upload files
- View encrypted images

---

# 💼 Resume Description

Developed a full-stack decentralized encrypted file storage dApp using React, Node.js, Ethereum smart contracts, and IPFS. Implemented MetaMask wallet authentication, AES-256 client-side encryption, decentralized storage with Pinata, and smart contract-based hash management. Built secure JWT-protected APIs, pagination-based image retrieval, and a professional dashboard UI ensuring complete end-to-end encrypted file access.

---


# 📚 References

Ethereum Docs  
IPFS Pinata Docs  
ethers.js Docs  
Node Crypto Docs  

---

# 👨‍💻 Author

Irfan Haider  
Full Stack + Web3 Developer
