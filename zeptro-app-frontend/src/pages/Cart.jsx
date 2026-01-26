import React from 'react'
import { useCart } from '../context/CartContext'
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuNotebookText } from 'react-icons/lu';
import { MdDeliveryDining } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import emptyCart from "../assets/empty-cart.png"
import { useNavigate } from 'react-router-dom';


const Cart = () => {

  const{cartItem, increaseQty, decreaseQty, deleteItem} = useCart();
  const navigate = useNavigate()

  const totalPrice = cartItem.reduce(
  (sum, item) => sum + item.productId.price * item.quantity,
  0
);

  return (

    <div className='mt-20 max-w-6xl mx-auto mb-5 px-4 md:px-0' >

      {
        cartItem.length > 0
        ? 
        // If Items is in Cart So show this
        (
          <div>

            {/* HEading For my Cart */}
            <h1 className='font-bold text-2xl'>My Cart ({cartItem.length})</h1>

            {/* Division For all the Items in Map */}
            <div className='mt-10'>

              {
                cartItem.map((item , index) => {
                  // console.log(cartItem)
                  return (
                    
                    // for Mapping
                    <div key = {item._id} className='bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full'>

                      {/* Images and Detailed Section */}
                      <div className='flex items-center gap-4'>
                        <img src={item.productId.images[0]} alt='' className='w-20 h-20 rounded-md'/>

                        {/* // now div for details */}
                        <div>
                          <h1 className='md:w-[300px] line-clamp-2 '>{item.productId.title}</h1>
                          <p className='text-red-500 font-semibold text-lg'>${item.productId.price}</p>
                        </div>
                      </div>

                      {/* Now Buttons For Increment decrement */}
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
                      <span onClick={() => deleteItem(item._id)} className='hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl'>
                        <FaRegTrashAlt className='text-red-500 text-2xl cursor-pointer' />
                      </span>
                    </div>
                  )
                })
              }
            </div>

            {/* Now Division For Check Out Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-20'>
              <div className='bg-gray-100 rounded-md p-7 mt-4 space-y-2'>
                <h1 className='text-gray-800 font-bold text-xl'>Delivery Info</h1>

                <div className='flex flex-col space-y-1'>
                  <label htmlFor="">Full Name</label>
                  <input type="text" placeholder='Enter your name' className='p-2 rounded-md' />
                </div>

                <div className='flex flex-col space-y-1'>
                  <label htmlFor="">Address</label>
                  <input type="text" placeholder='Enter your address' className='p-2 rounded-md' />
                </div>

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

                {/* Division for Country and Phone Number */}
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

                {/* Button For Submit */}
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
          <img src={emptyCart} alt="" className='w-[400px]'/>
          <button onClick={()=>navigate('/products')} className='bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer '>Continue Shopping</button>
        </div>
        ) 
        
      }

    </div>
    

  )
}

export default Cart
