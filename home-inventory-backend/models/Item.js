const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

module.exports = mongoose.model("Item", ItemSchema);
