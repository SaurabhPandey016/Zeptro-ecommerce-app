// Import required dependencies
import React, { useEffect, useState } from "react";
import { getData } from "../context/DataContext";  // Custom hook to fetch product data
import FilterSection from "../components/FilterSection"; // Filter UI component
import Loading from "../assets/Loading4.webm";    // Loading animation
import ProductCard from "../components/ProductCard";  // Product card component
import Pagination from "../components/Pagination";    // Pagination component
import Lottie from "lottie-react";                     // Animation library
import notFound from "../assets/notfound.json"     // Not found animation

const Products = () => {
  // Fetch product data from context
  const { productData, fetchAllProducts } = getData();
  
  // State for search input
  const [search, setSearch] = useState("");
  
  // State for category filter
  const [category, setCategory] = useState("All");
  
  // State for price range filter
  const [priceRange, setPriceRange] = useState([0, 5000]);

  // Current page number for pagination
  const [page, setPage] = useState(1);

  // Fetch all products when component mounts
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // console.log(productData);

  // Handle category filter change - reset to page 1 when filter changes
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    // console.log(category)
  };

  // Handle pagination page change
  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    // window.scrollTo(0,0)
  };

  // Filter products based on search, category, and price range
  const filteredData = productData?.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "All" || item.category.name === category;
    const matchesPrice =
      item.price >= priceRange[0] && item.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Calculate dynamic page count based on filtered results (6 items per page)
  const dynamicPage = Math.ceil(filteredData?.length / 6);

  return (
    <div>
      {/* Left Section */}
      <div className="max-w-6xl mx-auto px-4 mb-10 mt-4.5">
        {productData?.length > 0 ? (
          <>
            <div className="flex flex-col md:flex-row gap-8">
              <FilterSection
                search={search}
                setSearch={setSearch}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category}
                setCategory={setCategory}
                handleCategoryChange={handleCategoryChange}
              />

              {filteredData?.length > 0 ? 
              (
                <div className='flex flex-col justify-center items-center'>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 m-10">
                    {filteredData
                      ?.slice(page * 6 - 6, page * 6)
                      .map((product, index) => {
                        return <ProductCard key={index} product={product} />;
                      })}
                  </div>
                  <Pagination
                    page={page}
                    pageHandler={pageHandler}
                    dynamicPage={dynamicPage}
                  />
                </div>
              ) : 
              (
                <div className='flex justify-center items-center md:h-[600px] md:w-[900px] mt-10'>
                  <Lottie animationData={notFound} className='w-full max-w-[500px]'/>
                </div>
              )}
            </div>
            
          </>
        ) : (

          // Else Loading Video
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
