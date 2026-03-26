import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import MidBanner from '../components/MidBanner'
import  Features  from '../components/Features.jsx'
import axios from 'axios'


const Home = () => {
  // const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://zeptro-ecommerce-app.onrender.com/products");
        if(res.status === 200) {
          setIsDataLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
        <Carousel/>
        <MidBanner/>
        <Features/>
    </div>
  )
}

export default Home
