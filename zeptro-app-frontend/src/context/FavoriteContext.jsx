import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const FavoriteContext = createContext();
const API = "http://localhost:3000/favorites";

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setFavorites(data);
  };

  const addToFavorites = async (productId) => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    toast.success("Product is added to Favorites!")
    fetchFavorites();
  };

  const removeFromFavorites = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    toast.success("Product is deleted from Favorites!")
    fetchFavorites();
  };

  const removeByProductId = async (productId) => {
    await fetch(`${API}/product/${productId}`, { method: "DELETE" });
    toast.success("Product moved to Cart!")
    fetchFavorites();
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, removeByProductId }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
