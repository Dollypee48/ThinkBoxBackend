const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const mongoose = require("mongoose"); 
const corsOption = require("./config/corsOptions");

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/problems", require("./routes/problemRoutes"));

app.get("/", (req, res) => {
  res.send("ThinkBox backend is running ✅");
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
