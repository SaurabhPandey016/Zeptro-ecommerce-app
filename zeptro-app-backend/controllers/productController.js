import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

export const getByCategory = async (req, res) => {
  const products = await Product.find({
    "category.slug": req.params.category
  });
  res.json(products);
};

export const getByCategoryId = async (req, res) => {
  const products = await Product.find({
    "category.id": Number(req.params.id)
  });
  res.json(products);
};
