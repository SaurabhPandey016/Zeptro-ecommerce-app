// Import required dependencies
import React, { useEffect, useState } from 'react'  
import axios from 'axios'                           // HTTP client for API requests
import { useNavigate, useParams } from 'react-router-dom' // Navigation and URL parameters
import Loading from "../assets/Loading4.webm"     // Loading animation
import { ChevronLeft } from 'lucide-react'         // Back arrow icon
import ProductListView from '../components/ProductListView' // Product list display component

const CategoryProduct = () => {
// Get category name from URL parameters
  const prodId = useParams().category;

  // Store filtered products for the selected category
  const [searchData, setSearchData] = useState([])
  
  // Hook for navigation (back button)
  const navigate = useNavigate();
  
  
  // Fetch products filtered by category slug when component mounts or category changes
  useEffect(() => {
    // Async function to fetch category-filtered products from backend
    const getFilteredData = async () => {
      
      try {
        const res = await axios.get(
          // `http://localhost:3000/products/category/${prodId}`
          `https://zeptro-ecommerce-app.onrender.com/products/category/${prodId}`
        );
        setSearchData(res.data || []);
      } catch (err) {
        console.error('failed to fetch category products', err);
        
      } 
    };
    getFilteredData();
  }, [prodId]);

  // console.log(searchData);
  return (
    <div className=''>
      {/* Show products if data is loaded, otherwise show loading animation */}
      { 
      
      searchData.length > 0 ? (
          <div className='max-w-6xl mx-auto mt-20 mb-10 px-4 mt-5'>
             {/* Back button to return to home */}
             <button onClick={()=>navigate('/')} className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeft/> Back</button>
             
             {/* Map and display all products in the category */}
             {
              searchData.map((product, index) =>{
                return <ProductListView key={index} product={product}/>
              })
             }
          </div>
        ) : (
          <div className='flex items-center justify-center h-[400px]'>
             {/* Loading state: show video animation while fetching data */}
             <video muted autoPlay loop>
              <source src={Loading} type='video/webm'/>
             </video>
          </div>
        )

      }
    </div>
  );
};

export default CategoryProduct;
