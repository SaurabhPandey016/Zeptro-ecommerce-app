// Import Express and route handlers from product controller
import express from "express";
import { getAllProducts, getByCategory, getByCategoryId, getSingleProduct } from "../controllers/productController.js";
import { seedProducts } from "../controllers/seedController.js";

// Initialize router for product-related routes
const router = express.Router();

// GET all products - initially used for seeding database with external API data
// Currently disabled (commented out) to prevent accidental data reset
// Uncomment to use: router.get("/seed", seedProducts); 

// GET - Fetch all products from database
router.get("/", getAllProducts);

// GET - Fetch single product by MongoDB _id
// Uses 'single' prefix to differentiate from category routes (must come before category routes)
router.get("/single/:id", getSingleProduct);

// Category routes placed after specific routes to ensure correct route matching
// GET - Fetch products filtered by category ID (numeric identifier)
router.get("/category/:id", getByCategoryId);

// GET - Fetch products filtered by category slug (string identifier like 'electronics')
// Placed last as it's a catch-all route
router.get("/:category", getByCategory);

export default router;
