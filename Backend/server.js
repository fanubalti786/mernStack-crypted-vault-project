require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const {connectDB} = require('./database/db')
const { userRouter } = require("./routes/authenticationRoute");
const {uploadImageRouter} = require('./routes/uploadToipfsRoute');
const { getImageRouter } = require("./routes/getImageRoute");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

app.use("/api", userRouter);
app.use('/api', uploadImageRouter);
app.use('/api', getImageRouter);


// Server
const PORT = process.env.PORT ;
// const PORT = 8000;
// console.log(process.env.port);

const connetServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});
}

connetServer();


