require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

//  Middleware
app.use(express.json());
app.use(cors());
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging requests

//  API Routes
app.use("/items", itemRoutes);
app.use("/auth", authRoutes);

//  Handle Invalid Routes
app.use((req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});

//  MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process on database failure
  }
};
connectDB();

//  Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

//  Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
