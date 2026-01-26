import React, { useEffect, useState } from "react";
import { getData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import Loading from "../assets/Loading4.webm";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notFound from "../assets/notfound.json"

const Products = () => {
  // Process for fetching and importindg data from context
  const { productData, fetchAllProducts } = getData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);

  // Now we go for pagination
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // console.log(productData);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    // console.log(category)
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    // window.scrollTo(0,0)
  };

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

  const dynamicPage = Math.ceil(filteredData?.length / 6);

  return (
    <div>
      {/* Left Section */}
      <div className="max-w-6xl mx-auto px-4 mb-10 mt-4.5">
        {productData?.length > 0 ? (
          <>
            <div className="flex gap-8">
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
                  <div className="grid grid-cols-3 gap-7 m-10">
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
                  <Lottie animationData={notFound} classID='w-[500px]'/>
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
