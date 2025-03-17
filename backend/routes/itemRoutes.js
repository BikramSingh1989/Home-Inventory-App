const express = require("express");
const Item = require("../models/Item");
const jwt = require("jsonwebtoken");

const router = express.Router();

// 🔹 Middleware to Verify Token
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied, no token provided" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// 🔹 Add Item (User-Specific)
router.post("/", authMiddleware, async (req, res) => {
  const { name, location, quantity } = req.body;

  if (!name || !location || quantity === undefined) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newItem = new Item({ name, location, quantity, user: req.user.userId });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Get All Items for Logged-in User
router.get("/", authMiddleware, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.userId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Update Item (Only by Owner)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, user: req.user.userId });
    if (!item) return res.status(404).json({ error: "Item not found or unauthorized" });

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Delete an Item (Only by Owner)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, user: req.user.userId });
    if (!item) return res.status(404).json({ error: "Item not found or unauthorized" });

    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

console.log("✅ Item Routes Loaded");

module.exports = router;
