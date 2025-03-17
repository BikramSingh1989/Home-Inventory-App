require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging requests

// ✅ Default Route to Prevent 404 on "/"
app.get("/", (req, res) => {
  res.send("🚀 Home Inventory API is running!");
});

// ✅ API Routes
app.use("/items", itemRoutes);
app.use("/auth", authRoutes);

// ✅ Handle Invalid Routes (404)
app.use((req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});

// ✅ MongoDB Connection (Fixed)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process on failure
  }
};
connectDB();

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
