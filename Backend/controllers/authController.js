const { ethers } = require("ethers");
const {userModel} = require('../models/user')
const authController = async (req, res, next) => {
  try {
    const { signature } = req.body;
    const { address} = req.query;
    console.log("address",address,typeof(address));
    if (!signature) {
      throw new Error("Error 400 Signatur is invalid ");
    }

    const message = "Wellcome To Crypto Vault site";
    console.log(signature)
    const recoverAddress = ethers.utils.verifyMessage(message, signature);
    console.log("recover", recoverAddress, typeof(recoverAddress));

    // if (
    //   ethers.utils.getAddress(address) ===
    //   ethers.utils.getAddress(recoverAddress)
    // ) {
    //   return res.status(200).json({
    //     message: "authentication successful",
    //   });
    // }
    console.log("hello")
    if (address.toLowerCase() === recoverAddress.toLowerCase()) {
      const walletAddress = recoverAddress.toLowerCase();
      console.log("hello")
      let user = await userModel.findOne({userAddress:walletAddress})
      console.log("buy");
      if(!user)
      {
        user = await userModel.create({userAddress:address});
        console.log(user);
      }
      res.status(200).json({
        message: "authentication successful",
      });
    }else
    {
      res.status(400).json({
        message: "authentication failed 400"
      })
    }
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { authController }; // single export
