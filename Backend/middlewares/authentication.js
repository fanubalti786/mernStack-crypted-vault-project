require("dotenv").config();
const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const selectedAccount = req.body.selectedAccount;

    if (!token || !selectedAccount) {
      return res.status(400).json({
        success: false,
        message: "Missing token or account",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded.address.toLowerCase() !== selectedAccount.toLowerCase()) {
    console.log("hello")

      return res.status(400).json({        
        success: false,
        message: "Plz Use Authorize Address"
    })
    }

    req.address = decoded.address;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      token: false
    });
  }
};


module.exports = { authenticateToken };
