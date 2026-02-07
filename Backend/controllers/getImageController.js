require("dotenv").config();
const axios = require("axios");
const { userModel } = require("../models/user");
const { decryptData } = require("../utils/fileDecryption");

const getImageController = async (req, res) => {
  const returnIpfsResponse = async (ipfsHash) => {
      const response = await axios(
        `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
      );
      return response.data;
    
  };

  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const userAddress = req.address;
    const Hashes = req.body.ipfsHashArray;

    if (!Array.isArray(Hashes)) {
      throw new Error("Invalid hashes");
    }

    const user = await userModel.findOne({ userAddress });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 1;
    if (pageNumber < 1 || limitNumber < 1) {
      throw new Error("Pagination Issue");
    }

    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;
    const currentHashes = Hashes.slice(
      startIndex,
      Math.min(Hashes.length, endIndex),
    );
    console.log(currentHashes);

    const decryptedImageArr = [];

    if (currentHashes.length !== 0) {
      const encryptedDataArr = await Promise.all(
        currentHashes.map(async (ipfsHash) => {
          const res = await returnIpfsResponse(ipfsHash);
          return res;
        }),
      );

      for (const img of encryptedDataArr) {
        const decryptedImgData = decryptData(
          img.encryptedData,
          img.iv,
          user.encryptionKey,
        );
        decryptedImageArr.push(decryptedImgData.toString("base64"));
      }
    }

    return res.status(200).json({
      success: true,
      decryptedImageArr: decryptedImageArr,
      message: "Image get successfully",
    });
  } catch (error) {
    console.error("Upload Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getImageController };
