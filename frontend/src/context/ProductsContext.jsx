import { createContext, useState, useEffect } from "react";
import { API_URL } from "../keys";
import Cookies from "js-cookie"

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    useEffect(() => {
        setIsFetching(true);
        fetch(`${API_URL}/customer/products`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token")}`
                },
            })
            .then((res) => res.json())
            .then((res) => {
                setProducts(res.products);
                setIsFetching(false);
            });
    }, []);
    return (
        <ProductsContext.Provider value={{ products, isFetching }}>
            {children}
        </ProductsContext.Provider>
    );
};
