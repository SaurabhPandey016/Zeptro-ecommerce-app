import { createContext, useState } from "react";
export const DataContext = createContext(null);
import { useContext } from "react";
import axios from "axios";

export const DataProvider = ({ children }) => {
    const[productData, setProductData] = useState();

    // Fetching all products from Fakestore api
    const fetchAllProducts = async ()=> {
        try {
            const res = await axios.get("http://localhost:3000/products")
            
            setProductData(res.data);
            // console.log(productData)
        } catch (error) {
            console.log(error);
        }
    }

    const getUniqueCategory = (productData) => {
        let categories = productData?.map((item) => {
            return item.category.name;
        })
        categories =  ["All", ...new Set(categories)];
        return categories;
    }

    const getUniqueCategoryId = (productData) => {
        let categories = productData?.map((item) => {
            return item.category.id;
        })
        categories =  [...new Set(categories)];
        return categories;
    }

    // as the aapi dont have brand property we are not using this function now
    // const getUniqueBrand = (productData) => {
    //     let categories = productData?.map((item) => {
    //         return item.category.name;
    //     })
    //     categories =  ["All", ...new Set(categories)];
    //     return categories;
    // }


    // // for getting only unique categories from the data
    const categoryOnlyData = getUniqueCategory(productData);
    const categoryOnlyId = getUniqueCategoryId(productData);
    return <DataContext.Provider value={{productData, setProductData, fetchAllProducts, categoryOnlyData, categoryOnlyId}}>
        {children}
    </DataContext.Provider>
}
export const getData = ()=> useContext(DataContext)