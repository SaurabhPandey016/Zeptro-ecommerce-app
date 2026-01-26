import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: Number,
  title: String,
  price: Number,
  description: String,
  category: {
    id: Number,
    name: String,
    slug: String,
  },
  images: [String],
});

export default mongoose.model("Product", productSchema);
