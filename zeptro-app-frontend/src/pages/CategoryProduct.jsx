import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from "../assets/Loading4.webm"
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../components/ProductListView'

const CategoryProduct = () => {
  const prodId = useParams().category;

  
  const [searchData, setSearchData] = useState([])
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const getFilteredData = async () => {
      
      try {
        const res = await axios.get(`http://localhost:3000/products/category/${prodId}`);
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
      {
        searchData.length > 0 ? (
          <div className='max-w-6xl mx-auto mt-20 mb-10 px-4 mt-5'>
             <button onClick={()=>navigate('/')} className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeft/> Back</button>
             {
              searchData.map((product, index) =>{
                return <ProductListView key={index} product={product}/>
              })
             }
          </div>
        ):(
          <div className='flex items-center justify-center h-[400px]'>
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
