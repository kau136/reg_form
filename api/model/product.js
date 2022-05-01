const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  code: String,
  title: String,
  mrp: Number,
  discountPercent:Number,
});

module.exports = mongoose.model("Product", productSchema);
