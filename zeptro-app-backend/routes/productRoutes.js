import express from "express";
import { getAllProducts, getByCategory, getByCategoryId, getSingleProduct } from "../controllers/productController.js";
import { seedProducts } from "../controllers/seedController.js";

const router = express.Router();

// router.get("/seed", seedProducts); 

router.get("/", getAllProducts);

// ✅ SINGLE PRODUCT BY MONGODB _id
router.get("/single/:id", getSingleProduct);

// category routes AFTER specific routes
router.get("/category/:id", getByCategoryId);
router.get("/:category", getByCategory);

export default router;
