const authController = async (req,res,next) => {
  const {signature} = req.body;
  if(!signature)
  {
    throw new Error("Signatur is invalid");
  }

  const recoverAddress = ethers.utils.verifyMessage("Wellcome To Crypto Vault site");
  console.log(recoverAddress);
  res.send("hello bro")
};

module.exports = {authController}; // single export
