// Import Cart model for database operations
import Cart from "../models/Cart.js";

// Retrieve all items currently in the user's shopping cart with product details
// The populate method fetches the full product information from the Product collection
export const getCart = async (req, res) => {
  const cart = await Cart.find().populate("productId");
  res.json(cart);
};

// Add a product to cart or increase its quantity if already present
// If product exists, increment quantity; otherwise create new cart item with quantity 1
export const addToCart = async (req, res) => {
  const { productId } = req.body;

  let item = await Cart.findOne({ productId });

  if (item) {
    item.quantity += 1;
    await item.save();
    return res.json(item);
  }

  const newItem = await Cart.create({ productId });
  res.json(newItem);
};

// Increment the quantity of a specific cart item by 1
export const increaseQty = async (req, res) => {
  const item = await Cart.findById(req.params.id);
  item.quantity += 1;
  await item.save();
  res.json(item);
};

// Decrease the quantity of a cart item by 1
// If quantity reaches 0, remove the item from cart entirely
export const decreaseQty = async (req, res) => {
  const item = await Cart.findById(req.params.id);

  if (item.quantity === 1) {
    await Cart.findByIdAndDelete(req.params.id);
    return res.json({ deleted: true });
  }

  item.quantity -= 1;
  await item.save();
  res.json(item);
};

// Completely remove a product from the shopping cart
// Used when user clicks delete or when quantity drops to 0
export const deleteItem = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
