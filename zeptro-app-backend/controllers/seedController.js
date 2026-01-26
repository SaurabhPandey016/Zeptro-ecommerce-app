import Product from "../models/Product.js";

export const seedProducts = async (req, res) => {
  const response = await fetch("https://api.escuelajs.co/api/v1/products");
  const data = await response.json();

  await Product.deleteMany();

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
