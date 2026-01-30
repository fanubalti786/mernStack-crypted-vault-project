require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const { userRouter } = require("./routes/authenticationRoute");

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

// Server
const PORT = process.env.PORT ;
// const PORT = 8000;
// console.log(process.env.port);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});
