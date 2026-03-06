// Import Mongoose for database operations
import mongoose from "mongoose";

// Define Cart schema to store user's shopping cart items
const cartSchema = new mongoose.Schema({
  productId: {                             // Reference to the Product document
    type: mongoose.Schema.Types.ObjectId,  // MongoDB ObjectId type
    ref: "Product",                        // Reference to Product model
    required: true,                         // Must be provided when creating cart item
    unique: true                           // Each product can only appear once in cart
  },
  quantity: {                              // Number of units of this product
    type: Number,
    default: 1                             // Defaults to 1 if not specified
  }
});

// Export Cart model as default export
export default mongoose.model("Cart", cartSchema);