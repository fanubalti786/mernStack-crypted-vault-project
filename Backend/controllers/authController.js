const { ethers } = require("ethers");
const jwt = require("jsonwebtoken");
const {userModel} = require('../models/user')
const authController = async (req, res, next) => {
  try {
    const { signature } = req.body;
    const { address} = req.query;
  
    if (!signature) {
      throw new Error("Error 400 Signatur is invalid ");
    }

    const message = "Wellcome To Crypto Vault site";
    const recoverAddress = ethers.utils.verifyMessage(message, signature);
    // if (
    //   ethers.utils.getAddress(address) ===
    //   ethers.utils.getAddress(recoverAddress)
    // ) {
    //   return res.status(200).json({
    //     message: "authentication successful",
    //   });
    // }
    if (address.toLowerCase() === recoverAddress.toLowerCase()) {
      const walletAddress = recoverAddress.toLowerCase();
      let user = await userModel.findOne({userAddress:walletAddress})
      if(!user)
      {
        user = await userModel.create({userAddress:address});
        console.log(user);
      }

      const token = jwt.sign({
        address
      },process.env.JWT_SECRET_KEY)
      res.status(200).json({
        success: true,
        message: "authentication successful",
        address: address,
        token
      });
    }else
    {
      res.status(400).json({
        success: false,
        message: "authentication failed 400"
      })
    }
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { authController }; // single export
