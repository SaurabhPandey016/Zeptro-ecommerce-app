import  { useContext } from "react";
import { DataContext } from "../context/DataContext.jsx";
import { useNavigate } from "react-router-dom";

const Category = () => {

  // when we want to fetch the data we should be using useContext and useEffect like in Carousel.
    const{categoryOnlyData, categoryOnlyId} = useContext(DataContext);

    // // for getting only unique categories from the data
    const navigate = useNavigate();
    
    // console.log(productData);
    
  return (

    <div className='bg-[#101829]'>
        <div className='max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4 '>
            {
                categoryOnlyData?.map((item, index)=>{
                    // index 0 is "All" (added in DataContext). categoryOnlyId has no "All" entry,
                    // so for other categories the corresponding id is at categoryOnlyId[index - 1]
                    const isAll = index === 0;
                    // console.log("this is isAll -> ", isAll);
                    const catId = !isAll ? categoryOnlyId?.[index - 1] : null;
                    // console.log("this -> category index - 1", categoryOnlyId?.[index - 1], "value of Index -> ", index)
                    return (
                      <div key={index}>
                        <button onClick={()=> {
                          if (isAll) {
                            // show all products
                            navigate('/products');
                            return;
                          }

                          if (catId != null) {
                            // navigate to the real category id (this will be the 20-24 ids or dynamic id that changes everyday)
                            navigate(`/category/${catId}`);
                          } else {
                            // fallback
                            console.warn('No category id found for index', index);
                          }
                        }} 
                        className='uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer'>
                          {item}
                        </button>
                      </div>
                    )
                })
            }
        </div>
    </div>
  )
};

export default Category;
