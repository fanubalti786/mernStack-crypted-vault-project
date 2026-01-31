require("dotenv").config();
const { ethers } = require("ethers");
const { userModel } = require("../models/user");
const { generateEncryptionKey } = require("../utils/generateKey");
const { encryptFile } = require("../utils/fileEncryption");
const uploadToIpfsController = async (req, res, next) => {
  try {
    console.log(req.file.buffer)
    const address = "0x07076d701275b618e2D08eBd959d8B6c7e0d4A2C";
    const userAddress = address.toLowerCase();
    const user = await userModel.findOne({ userAddress: userAddress });
    if (!user) {
      throw new Error("user does not exist");
    }
    if (user.encryptionKey === null) {
      const encryptionKey = generateEncryptionKey(32);
      user.encryptionKey = encryptionKey;
      await user.save();
    }

    const { encryptedData, iv } = encryptFile(
      req.file.buffer,
      user.encryptionKey,
    );
    const pinataSDK = require("@pinata/sdk");
    const pinata = new pinataSDK({
      pinataApiKey: process.env.PINATA_API_KEY,
      pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY,
    });

    await pinata.testAuthentication();
    const resPinata = await pinata.pinJSONToIPFS({ encryptedData, iv });
    console.log(resPinata);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Server Error 500",
    });
  }
};

module.exports = { uploadToIpfsController }; // single export
