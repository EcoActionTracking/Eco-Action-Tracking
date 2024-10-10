// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [{ type: String }],

  isDeleted: { type: Boolean, default: false },
  stock_quantity: {
    type: Number,
    default: 0, // Default stock quantity
    min: 0, // Ensuring stock cannot be negative
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
