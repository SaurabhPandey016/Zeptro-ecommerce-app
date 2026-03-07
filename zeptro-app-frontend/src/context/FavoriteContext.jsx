// Import React hooks for state management and context API
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Create Favorite context for global favorite/wishlist state
const FavoriteContext = createContext();

// API endpoint for favorite operations
const API = "https://zeptro-ecommerce-app.onrender.com/favorites";

/**
 * Favorite Provider Component
 * Manages user's favorite/wishlist items
 * - Fetch favorites from backend
 * - Add/remove favorite items
 * - Handle favorite state globally
 */
export const FavoriteProvider = ({ children }) => {
  // Store array of favorite product objects
  const [favorites, setFavorites] = useState([]);

  /**
   * Fetch all favorite products from backend API
   * Retrieves favorites with full product details populated
   */
  const fetchFavorites = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setFavorites(data);
  };

  /**
   * Add product to favorites list
   * If product already favorited, backend returns existing record
   * @param {string} productId - MongoDB product ID
   */
  const addToFavorites = async (productId) => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    toast.success("Product is added to Favorites!")
    fetchFavorites();
  };

  /**
   * Remove favorite using its favorite document ID
   * @param {string} id - Favorite document ID in database
   */
  const removeFromFavorites = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    toast.success("Product is deleted from Favorites!")
    fetchFavorites();
  };

  /**
   * Remove favorite using product ID
   * Used when we have product ID but not the favorite document ID
   * @param {string} productId - MongoDB product ID
   */
  const removeByProductId = async (productId) => {
    await fetch(`${API}/product/${productId}`, { method: "DELETE" });
    // toast.success("Product moved to Cart!")
    fetchFavorites();
  };

  // Load favorite items on component mount
  useEffect(() => {
    fetchFavorites();
  }, []);

  // Provide favorite state and actions to all child components
  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, removeByProductId }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

// Custom hook to use Favorite context in any component
// Import and use: const { favorites, addToFavorites } = useFavorites();
export const useFavorites = () => useContext(FavoriteContext);
