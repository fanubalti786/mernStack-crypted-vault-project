require("dotenv").config();

const pinataSDK = require("@pinata/sdk");
const { userModel } = require("../models/user");
const { generateEncryptionKey } = require("../utils/generateKey");
const { encryptFile } = require("../utils/fileEncryption");

// ✅ create pinata ONCE (performance)
const pinata = new pinataSDK({
  pinataApiKey: process.env.PINATA_API_KEY,
  pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY,
});


// ✅ Verify only once at startup (NOT per request)
(async () => {
  try {
    await pinata.testAuthentication();
    console.log("✅ Pinata Connected");
  } catch (err) {
    console.error("❌ Pinata Auth Failed:", err.message);
  }
})();

const uploadToIpfsController = async (req, res) => {
  try {
    // ✅ file safety
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // ✅ later replace with req.user.address (auth)
    const userAddress = "0x07076d701275b618e2d08ebd959d8b6c7e0d4a2c";

    const user = await userModel.findOne({ userAddress });

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
    console.log("hello");
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
