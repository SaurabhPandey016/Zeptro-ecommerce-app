// Import React hooks for state management and context API
import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

// Create Cart context for global state management
export const CartContext = createContext(null);

// API endpoint for cart operations deployed on Render
const API = "https://zeptro-ecommerce-app.onrender.com/cart";

/**
 * Cart Provider Component
 * Manages shopping cart state and provides cart operations
 * - Fetch cart items from backend
 * - Add/remove products
 * - Modify quantities
 */
export const CartProvider = ({ children }) => {
  // Store cart items as array of product objects with quantities
  const [cartItem, setCartItem] = useState([]);

  /**
   * Fetch cart items from backend API
   * Retrieves all items with populated product details
   */
  const fetchCart = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setCartItem(data);
  };

  /**
   * Add product to cart via backend API
   * If product exists, backend increments quantity automatically
   * Shows success toast notification
   * @param {string} productId - MongoDB product ID
   */
  const addToCart = async (productId) => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    toast.success("Product is added to Cart!")
    fetchCart();
  };

  /**
   * Increase quantity of existing cart item
   * Makes PATCH request to backend
   * @param {string} id - Cart item ID
   */
  const increaseQty = async (id) => {
    await fetch(`${API}/increase/${id}`, { method: "PATCH" });
    toast.success("Quantity increased!")
    fetchCart();
  };

  /**
   * Decrease quantity of cart item
   * If quantity reaches 0, backend removes item automatically
   * @param {string} id - Cart item ID
   */
  const decreaseQty = async (id) => {
    await fetch(`${API}/decrease/${id}`, { method: "PATCH" });
    toast.success("Quantity Decreased!")
    fetchCart();
  };

  /**
   * Delete product from cart completely
   * Makes DELETE request to backend
   * @param {string} id - Cart item ID
   */
  const deleteItem = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    toast.success("Product is deleted from Cart!")
    fetchCart();
  };

  // Load cart items on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  // const addToCart = (product) => {

  //   console.log(product);
  //   // If Item Already Exist or not
  //   const itemInCart = cartItem.find((item) => item._id === product._id)
  //       if (itemInCart) {
  //           // Increase quantity if already in cart
  //           const updatedCart = cartItem.map((item) =>
  //               item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
  //           );
  //           setCartItem(updatedCart)
  //           toast.success("Product is added to cart!")
  //       } else {
  //           //Add new ietm with quantity 1
  //           setCartItem([...cartItem, { ...product, quantity: 1 }])
  //           toast.success("Product is added to cart!")

  //       }
  // }

  // const updateQuantity = (cartItem, productId, action) => {
  //   setCartItem( cartItem.map((item) => {

  //     // first check
  //     console.log(item._id,  " --> ", productId);
  //     if(item._id === productId) {
  //       let newUnit = item.quantity;

  //       if(action === "decrease") {
  //         newUnit -= 1;
  //         toast.success("Quantity is decreased!")
  //       } else if(action === "increase") {
  //         newUnit += 1;
  //         toast.success("Quantity is increased!")
  //       }

  //       return newUnit > 0 ? {...item, quantity : newUnit} : null
  //     }
  //     return item;
  //   }).filter((item) => item != null)
  //   )
  // }

  // const deleteItem = (productId) => {
  //     setCartItem(cartItem.filter(item => item._id !== productId))
  //     toast.success("Product is deleted from cart!")
  // }

  // Provide cart state and actions to all child components
  return <CartContext.Provider value = {{cartItem, setCartItem, addToCart, increaseQty,decreaseQty, deleteItem}}>
    {children}
  </CartContext.Provider>
};

// Custom hook to use Cart context in any component
// Import and use: const { cartItem, addToCart } = useCart();
export const useCart = () => useContext(CartContext);