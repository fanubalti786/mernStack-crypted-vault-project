require("dotenv").config();
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user");
const { generateEncryptionKey } = require("../utils/generateKey");
const { encryptFile } = require("../utils/fileEncryption");
const {pinata} = require("../utils/pinataConnection");


const uploadToIpfsController = async (req, res) => {
  try {
    // ✅ file safety
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const userAddress = req.address;

    const user = await userModel.findOne({ userAddress });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ safer key init
    if (!user.encryptionKey) {
      user.encryptionKey = generateEncryptionKey(32);
      await user.save();
    }

    // ✅ encryption
    const { encryptedData, iv } = encryptFile(
      req.file.buffer,
      user.encryptionKey
    );
    
    // ✅ upload
    const result = await pinata.pinJSONToIPFS({ encryptedData, iv });

    // ✅ safety check
    if (!result?.IpfsHash) {
      throw new Error("IPFS upload failed");
    }

    return res.status(200).json({
      success: true,
      ipfsHash: result.IpfsHash,
      message: "Image uploaded successfully",
    });

  } catch (error) {
    console.error("Upload Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { uploadToIpfsController };
