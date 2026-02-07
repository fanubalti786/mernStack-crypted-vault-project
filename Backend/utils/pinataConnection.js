require("dotenv").config();
const pinataSDK = require("@pinata/sdk");
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

module.exports = {pinata};