// Import context hooks and icons
import { useFavorites } from "../context/FavoriteContext";  // Favorites context
import { useCart } from "../context/CartContext";           // Cart context
import { FaRegTrashAlt } from "react-icons/fa";            // Trash icon
import { IoCartOutline } from "react-icons/io5";           // Cart icon
import { useNavigate } from "react-router-dom";             // Navigation
import emptyCart from "../assets/empty-cart.png"           // Empty state image

const Favorites = () => {
  // Get favorites operations and items from context
  const { favorites, removeFromFavorites, removeByProductId } = useFavorites();
  
  // Get cart operations from context
  const { addToCart } = useCart();
  
  // Hook for page navigation
  const navigate = useNavigate();

  return (
    <div className='mt-20 max-w-6xl mx-auto mb-5 px-4 md:px-0'>
      {/* Wishlist header with item count */}
      <h1 className='font-bold text-2xl'>My Wishlist ({favorites.length})</h1>
      
      {/* Show favorites list if items exist, otherwise show empty state */}
      {
        favorites.length > 0
        ?
        // Favorites list - show all favorite items
        (

        <div>
          {/* Map through all favorite items */}
          {favorites.map(item => (
            <div key={item._id} className='bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full'>
              {/* Product image and details */}
              <div>
                <img src={item.productId.images[0]} alt='' className='w-20 h-20 rounded-md'
                />
                <div>
                          <h1 className='w-full md:w-[300px] line-clamp-2 '>{item.productId.title}</h1>
                  <p className='text-red-500 font-semibold text-lg'>${item.productId.price}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(item.productId._id);
                  removeByProductId(item.productId._id);
                }}
                className='bg-red-500 px-3 py-2 text-lg rounded-md text-white cursor-pointer flex gap-2 items-center justify-center font-semibold'><IoCartOutline className='w-6 h-6' /> Add to Cart</button>

            {/* Delete from favorites button */}
            <button onClick={() => removeFromFavorites(item._id)} className='hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl'>
            <FaRegTrashAlt className='text-red-500 text-2xl cursor-pointer' />
            </button>
          </div>
        ))}
        </div>
        )
        : 
        (
        <div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
          {/* Empty state message */}
          <h1 className='text-red-500/80 font-bold text-5xl text-muted'>Oh no! Your Favourites is empty</h1>
          
          {/* Empty state illustration */}
          <img src={emptyCart} alt="" className='w-full max-w-[400px]'/>
          
          {/* Button to navigate back to products */}
          <button onClick={()=>navigate('/products')} className='bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer '>Continue Shopping</button>
        </div>
        )
      }
    </div>
  );
};

export default Favorites;
