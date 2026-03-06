// Import Mongoose for database operations
import mongoose from "mongoose";

// Define Favorite/Wishlist schema for storing user's favorite products
const favoriteSchema = new mongoose.Schema({
  productId: {                             // Reference to the Product document
    type: mongoose.Schema.Types.ObjectId,  // MongoDB ObjectId type
    ref: "Product",                        // Reference to Product model
    required: true,                         // Must be provided when adding to favorites
    unique: true                           // Each product can only appear once in favorites
  }
});

// Export Favorite model as default export
export default mongoose.model("Favorite", favoriteSchema);
