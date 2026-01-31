const { ethers } = require("ethers");
const authController = async (req, res, next) => {
  try {
    const { signature } = req.body;
    const { address} = req.query;
    // console.log(address,typeof(address),name,typeof(name));
    if (!signature) {
      throw new Error("Error 400 Signatur is invalid ");
    }

    const message = "Wellcome To Crypto Vault site";
    const recoverAddress = ethers.utils.verifyMessage(message, signature);
    // console.log("recover", recoverAddress, typeof(recoverAddress));

    // if (
    //   ethers.utils.getAddress(address) ===
    //   ethers.utils.getAddress(recoverAddress)
    // ) {
    //   return res.status(200).json({
    //     message: "authentication successful",
    //   });
    // }

    if (address.toLowerCase() === recoverAddress.toLocaleLowerCase()) {
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
