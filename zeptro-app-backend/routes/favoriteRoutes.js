import express from "express";
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  removeByProductId
} from "../controllers/favoriteController.js";

const router = express.Router();

router.get("/", getFavorites);
router.post("/", addToFavorites);
router.delete("/:id", removeFromFavorites);
router.delete("/product/:productId", removeByProductId);

export default router;