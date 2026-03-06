// Import Favorite model for database operations
import Favorite from "../models/Favorite.js";

// Retrieve all favorite products for the user with full product details
// The populate method fetches complete product information for each favorite
export const getFavorites = async (req, res) => {
  const favs = await Favorite.find().populate("productId");
  res.json(favs);
};

// Add a product to favorites list
// If product already exists in favorites, return existing record; otherwise create new
export const addToFavorites = async (req, res) => {
  const { productId } = req.body;

  const exists = await Favorite.findOne({ productId });
  if (exists) return res.json(exists);

  const fav = await Favorite.create({ productId });
  res.json(fav);
};

// Remove a product from favorites using its favorite document ID
export const removeFromFavorites = async (req, res) => {
  await Favorite.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

// Remove a product from favorites using the Product ID reference
// Useful for operations where we have the product ID but not the favorite document ID
export const removeByProductId = async (req, res) => {
  await Favorite.findOneAndDelete({ productId: req.params.productId });
  res.json({ success: true });
};
