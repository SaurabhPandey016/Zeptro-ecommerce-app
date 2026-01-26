import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  const cart = await Cart.find().populate("productId");
  res.json(cart);
};

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

export const increaseQty = async (req, res) => {
  const item = await Cart.findById(req.params.id);
  item.quantity += 1;
  await item.save();
  res.json(item);
};

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

export const deleteItem = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
