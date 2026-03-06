// Import Mongoose for database schema definition
import mongoose from "mongoose";

// Define Product schema with fields for e-commerce product information
const productSchema = new mongoose.Schema({
  productId: Number,            // Unique identifier from external product source
  title: String,                  // Product name/title
  price: Number,                  // Product price in currency
  description: String,            // Detailed product description
  category: {                      // Product category information
    id: Number,
    name: String,                  // Category name (e.g., Electronics, Clothing)
    slug: String,                  // URL-friendly category identifier
  },
  images: [String],               // Array of image URLs for product
});

// Export Product model as default export for use in controllers and routes
export default mongoose.model("Product", productSchema);
