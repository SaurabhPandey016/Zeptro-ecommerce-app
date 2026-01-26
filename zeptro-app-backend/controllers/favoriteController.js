import Favorite from "../models/Favorite.js";

export const getFavorites = async (req, res) => {
  const favs = await Favorite.find().populate("productId");
  res.json(favs);
};

export const addToFavorites = async (req, res) => {
  const { productId } = req.body;

  const exists = await Favorite.findOne({ productId });
  if (exists) return res.json(exists);

  const fav = await Favorite.create({ productId });
  res.json(fav);
};

export const removeFromFavorites = async (req, res) => {
  await Favorite.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

export const removeByProductId = async (req, res) => {
  await Favorite.findOneAndDelete({ productId: req.params.productId });
  res.json({ success: true });
};
