// Import Express and favorite controller functions
import express from "express";
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  removeByProductId
} from "../controllers/favoriteController.js";

// Initialize router for favorite/wishlist operations
const router = express.Router();

// GET - Retrieve all products in the user's favorites/wishlist
router.get("/", getFavorites);

// POST - Add a product to the user's favorites
router.post("/", addToFavorites);

// DELETE - Remove a favorite item using its favorite document ID
router.delete("/:id", removeFromFavorites);

// DELETE - Remove a favorite using the product ID reference
// Allows deletion directly by product ID without needing the favorite document ID
router.delete("/product/:productId", removeByProductId);

export default router;