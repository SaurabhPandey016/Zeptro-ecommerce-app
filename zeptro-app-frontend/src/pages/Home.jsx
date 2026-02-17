import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import MidBanner from '../components/MidBanner'
import  Features  from '../components/Features.jsx'
import axios from 'axios'
import Loading from "../assets/Loading4.webm";


const Home = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

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

  // Show loading until data is loaded
  if(!isDataLoaded) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
    )
  }

  // Show components only after data is loaded
  return (
    <div>
        <Carousel/>
        <MidBanner/>
        <Features/>
    </div>
  )
}

export default Home
