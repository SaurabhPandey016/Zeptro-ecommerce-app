import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

const API = "http://localhost:3000/cart";
export const CartProvider = ({ children }) => {
  
  const [cartItem, setCartItem] = useState([]);

  const fetchCart = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setCartItem(data);
  };

    const addToCart = async (productId) => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    toast.success("Product is added to Cart!")
    fetchCart();
  };

  const increaseQty = async (id) => {
    await fetch(`${API}/increase/${id}`, { method: "PATCH" });
    toast.success("Quantity increased!")
    fetchCart();
  };

  const decreaseQty = async (id) => {
    await fetch(`${API}/decrease/${id}`, { method: "PATCH" });
    toast.success("Quantity Decreased!")
    fetchCart();
  };

  const deleteItem = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    toast.success("Product is deleted from Cart!")
    fetchCart();
  };

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

  return <CartContext.Provider value = {{cartItem, setCartItem, addToCart, increaseQty,decreaseQty, deleteItem}}>
    {children}
  </CartContext.Provider>
};

export const useCart = () => useContext(CartContext);