// Import Product model for database operations
import Product from "../models/Product.js";

// Seed the database with initial product data from external API
// This endpoint fetches products from Escuela JS API and populates the MongoDB collection
// Useful for initial setup or resetting product data
export const seedProducts = async (req, res) => {
  // Fetch product data from external third-party API
  const response = await fetch("https://api.escuelajs.co/api/v1/products");
  const data = await response.json();

  // Clear all existing products from database to avoid duplicates
  await Product.deleteMany();

  // Transform API response data to match our Product schema structure
  const formatted = data.map(item => ({
    productId: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    category: {
      id: item.category.id,
      name: item.category.name,
      slug: item.category.slug,
    },
    images: item.images,
  }));

  await Product.insertMany(formatted);

  res.json({
    message: "Products seeded successfully",
    count: formatted.length
  });
};
