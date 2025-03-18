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
app.use("/api/auth", authRoutes);
app.use(cors({ origin: "*" })); 

// ✅ Default Route to Prevent 404 on "/"
app.get("/", (req, res) => {
  res.send("🚀 Home Inventory API is running!");
});

// ✅ FIXED API Routes
app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes); // ✅ FIXED PATH

// ✅ Handle Invalid Routes (404)
app.use((req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});

// ✅ FIXED MongoDB Connection (Retries on Failure)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    setTimeout(connectDB, 5000); // Retry after 5 seconds
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
