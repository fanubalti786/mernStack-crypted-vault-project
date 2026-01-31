require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("✅ Database Connected Successfully!");
    } catch (err) {
        console.error("❌ Error Connecting to Database:", err.message);
    }
};

module.exports = { connectDB };
