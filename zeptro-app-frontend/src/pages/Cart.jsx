// Import React and necessary dependencies
import React from 'react'
import { useCart } from '../context/CartContext'  // Custom hook to access cart state
import { FaRegTrashAlt } from 'react-icons/fa';   // Trash icon for delete button
import { LuNotebookText } from 'react-icons/lu';  // Receipt icon
import { MdDeliveryDining } from 'react-icons/md'; // Delivery icon
import { GiShoppingBag } from 'react-icons/gi';   // Shopping bag icon
import emptyCart from "../assets/empty-cart.png" // Empty state image
import { useNavigate } from 'react-router-dom';   // Navigation hook


const Cart = () => {
  // Get cart operations and items from context
  const{cartItem, increaseQty, decreaseQty, deleteItem} = useCart();
  const navigate = useNavigate();

  // Calculate total price of all items in cart
  // Multiply each item's price by its quantity and sum them up
  const totalPrice = cartItem.reduce(
  (sum, item) => sum + item.productId.price * item.quantity,
  0
  );

  return (

    <div className='mt-20 max-w-6xl mx-auto mb-5 px-4 md:px-0' >

      {/* Conditionally render cart contents or empty state */}
      {
        cartItem.length > 0
        ? 
        // CART HAS ITEMS - Display cart with products and checkout form
        (
          <div>
            {/* Cart Header with item count */}
            <h1 className='font-bold text-2xl'>My Cart ({cartItem.length})</h1>

            {/* Map through all cart items and display each one */}
            <div className='mt-10'>

              {
                cartItem.map((item , index) => {
                  // Render individual cart item with product info and quantity controls
                  return (
                    
                    // Cart item row: displays product image, name, price, qty controls, and delete button
                    <div key = {item._id} className='bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full'>

                      {/* Product image and details section */}
                      <div className='flex items-center gap-4'>
                        <img src={item.productId.images[0]} alt='' className='w-20 h-20 rounded-md'/>
                        
                        {/* Product name and price */}
                        <div>
                          <h1 className='md:w-[300px] line-clamp-2 '>{item.productId.title}</h1>
                          <p className='text-red-500 font-semibold text-lg'>${item.productId.price}</p>
                        </div>
                      </div>

                      {/* Quantity control buttons (increase/decrease) */}
                      <div className='bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl'>
                        <button 
                        onClick={() => decreaseQty(item._id)}
                        className='cursor-pointer'>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                        onClick={() => increaseQty(item._id)}
                        className='cursor-pointer'>
                          +
                        </button>
                      </div>
                      {/* Delete/trash button to remove item from cart */}
                      <span onClick={() => deleteItem(item._id)} className='hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl'>
                        <FaRegTrashAlt className='text-red-500 text-2xl cursor-pointer' />
                      </span>
                    </div>
                  )
                })
              }
            </div>

            {/* Checkout section with delivery form and bill details */}
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-20'>
              {/* Delivery Information Form */}
              <div className='bg-gray-100 rounded-md p-7 mt-4 space-y-2'>
                <h1 className='text-gray-800 font-bold text-xl'>Delivery Info</h1>

                {/* User name input */}
                <div className='flex flex-col space-y-1'>
                  <label htmlFor="">Full Name</label>
                  <input type="text" placeholder='Enter your name' className='p-2 rounded-md' />
                </div>

                {/* Delivery address input */}
                <div className='flex flex-col space-y-1'>
                  <label htmlFor="">Address</label>
                  <input type="text" placeholder='Enter your address' className='p-2 rounded-md' />
                </div>

                {/* State and postal code inputs */}
                <div className='flex w-full gap-5'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="">State</label>
                    <input type="text" placeholder='Enter your state' className='p-2 rounded-md w-full' value={location?.state}/>
                  </div>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="">PostCode</label>
                    <input type="text" placeholder='Enter your postcode' className='p-2 rounded-md w-full' value={location?.postcode}/>
                  </div>
                </div>

                {/* Country and phone number inputs */}
                <div className='flex w-full gap-5'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="">Country</label>
                    <input type="text" placeholder='Enter your country' className='p-2 rounded-md w-full' />
                  </div>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label htmlFor="">Phone No</label>
                    <input type="text" placeholder='Enter your Number' className='p-2 rounded-md w-full' />
                  </div>
                </div>

                {/* Submit delivery information button */}
                <button className='bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer'>Submit</button>
              </div>

              {/* Bill Details Section */}
                <div className='bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max'>

                  <h1 className='text-gray-800 font-bold text-xl'>Bill details</h1>

                  {/* Total Items */}
                  <div className='flex justify-between items-center'>
                    <h1 className='flex gap-1 items-center text-gray-700'><span><LuNotebookText /></span>Items total</h1>
                    <p>${totalPrice}</p>
                  </div>

                  {/* Delivery */}
                  <div className='flex justify-between items-center'>
                    <h1 className='flex gap-1 items-center text-gray-700'><span><MdDeliveryDining /></span>Delivery Charge</h1>
                    <p className='text-red-500 font-semibold'><span className='text-gray-600 line-through'>$25</span> FREE</p>
                  </div>

                {/* Handling */}
                  <div className='flex justify-between items-center'>
                    <h1 className='flex gap-1 items-center text-gray-700'><span><GiShoppingBag /></span>Handling Charge</h1>
                    <p className='text-red-500 font-semibold'>$5</p>
                  </div>

                  {/* Horizontal rule */}
                  <hr  className='text-gray-200 mt-2'/>

                  <div className='flex justify-between items-center'>
                    <h1 className='font-semibold text-lg'>Grand total</h1>
                    <p className='font-semibold text-lg'>${totalPrice + 5}</p>
                  </div>

                  {/* Promo Code */}
                  <div>
                    <h1 className='font-semibold text-gray-700 mb-3 mt-7'>Apply Promo Code</h1>
                    <div className='flex gap-3'>
                      <input type="text" placeholder='Enter code' className='p-2 rounded-md w-full'/>
                      <button className='bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md'>Apply</button>
                    </div>
                  </div>

                  {/* Button Proceed */}
                  <button className='bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3'>Proceed to Checkout</button>
                </div>
            </div>
          </div>
        ) 

        : 
        // else Show this
        (
          <div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
          <h1 className='text-red-500/80 font-bold text-5xl text-muted'>Oh no! Your cart is empty</h1>
          <img src={emptyCart} alt="" className='w-full max-w-[400px]'/>
          <button onClick={()=>navigate('/products')} className='bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer '>Continue Shopping</button>
        </div>
        ) 
        
      }

    </div>
    

  )
}

export default Cart
