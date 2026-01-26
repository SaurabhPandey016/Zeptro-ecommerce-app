import express from "express";
import {
  getCart,
  addToCart,
  increaseQty,
  decreaseQty,
  deleteItem
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.patch("/increase/:id", increaseQty);
router.patch("/decrease/:id", decreaseQty);
router.delete("/:id", deleteItem);

export default router;
