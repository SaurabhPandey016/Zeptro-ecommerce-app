import { useFavorites } from "../context/FavoriteContext";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { favorites, removeFromFavorites, removeByProductId } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className='mt-20 max-w-6xl mx-auto mb-5 px-4 md:px-0'>

      <h1 className='font-bold text-2xl'>My Wishlist ({favorites.length})</h1>
      {
        favorites.length > 0
        ?
        <div>

          {favorites.map(item => (
            <div key={item._id} className='bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full'>

              <div>
                <img src={item.productId.images[0]} alt='' className='w-20 h-20 rounded-md'
                />
                <div>
                  <h1 className='md:w-[300px] line-clamp-2 '>{item.productId.title}</h1>
                  <p className='text-red-500 font-semibold text-lg'>${item.productId.price}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(item.productId._id);
                  removeByProductId(item.productId._id);
                }}
                className='bg-red-500 px-3 py-2 text-lg rounded-md text-white cursor-pointer flex gap-2 items-center justify-center font-semibold'><IoCartOutline className='w-6 h-6' /> Add to Cart</button>

              <button onClick={() => removeFromFavorites(item._id)} className='hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl'>
              <FaRegTrashAlt className='text-red-500 text-2xl cursor-pointer' />
              </button>
        </div>
      ))}

        </div>
        :
        <div>
  
        </div>
      }
    </div>
  );
};

export default Favorites;
