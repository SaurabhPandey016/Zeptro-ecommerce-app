// Import Product model for database queries
import Product from "../models/Product.js";

// Fetch all products from the database
// Used for displaying all products or for filtering/pagination on frontend
export const getAllProducts = async (req, res) => {
  // Query all products and return as JSON
  const products = await Product.find();
  res.json(products);
};

// Fetch a single product by MongoDB _id
// Returns 404 if product not found, 400 if invalid ID format
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

// Fetch products filtered by category slug (e.g., 'electronics', 'clothing')
export const getByCategory = async (req, res) => {
  const products = await Product.find({
    "category.slug": req.params.category
  });
  res.json(products);
};

// Fetch products filtered by category ID number
export const getByCategoryId = async (req, res) => {
  const products = await Product.find({
    "category.id": Number(req.params.id)
  });
  res.json(products);
};
