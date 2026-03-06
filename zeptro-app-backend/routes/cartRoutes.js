// Import Express and cart controller functions
import express from "express";
import {
  getCart,
  addToCart,
  increaseQty,
  decreaseQty,
  deleteItem
} from "../controllers/cartController.js";

// Initialize router for cart-related operations
const router = express.Router();

// GET - Retrieve all items in the shopping cart
router.get("/", getCart);

// POST - Add a new product to the cart
router.post("/", addToCart);

// PATCH - Increase quantity of a specific product in cart
router.patch("/increase/:id", increaseQty);

// PATCH - Decrease quantity of a specific product in cart
router.patch("/decrease/:id", decreaseQty);

// DELETE - Remove a product from the cart completely
router.delete("/:id", deleteItem);

export default router;
