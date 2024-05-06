import { useOutletContext } from "react-router-dom";
import CardCollection from '../Components/Collection';
import { ChoiceBox } from '../Components/ChoiceBox';
import Button from './../Components/Button'
import Spinner from "./../ui/Spinner"
import { IoMdAdd } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../keys";
import Cookies from "js-cookie"
import { useEffect, useState } from "react";

export default function Home(props) {

  const { userType, keyword } = useOutletContext();
  const { data, status } = useQuery(["products"], fetchProducts);
  const [ products, setProducts ] = useState(null)
  const [ sort, setSort ] = useState(null);
  
  async function fetchProducts() {
    const res = await fetch(`${API_URL}/guest/products`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    let products = data.productsWithSellerUsername;
    if (userType == "seller") {
      const sellerID = Cookies.get("userID");
      products = products.filter((product) => product.sellerId == sellerID);
    }
    return products;
  }

  useEffect(() => {
    if (status == "success") {
      let filteredProducts = JSON.parse(JSON.stringify(data))
      if (keyword) {
        filteredProducts = filteredProducts.filter((product) => {
          let productName = product.name.toLowerCase();
          return productName.includes(keyword.toLowerCase());
        });
      }
      let sortedProducts;
      if (sort == "price") {
        sortedProducts = filteredProducts.sort((a, b) => (a.price < b.price ? -1 : 1));
      } else if (sort == "name") {
        sortedProducts = filteredProducts.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
      } else if (sort == "seller") {
        sortedProducts = filteredProducts.sort((a, b) => (a.sellerUsername.toLowerCase() < b.sellerUsername.toLowerCase() ? -1 : 1));
      } else {
        sortedProducts = filteredProducts;
      }
      setProducts(sortedProducts)

    }
  }, [data, keyword, sort])

  return (
    <>
      <div className="main-container">
        <div className="options-buttons">
          {userType == "seller"? 
            <Button icon={IoMdAdd} text="Add Product" color="green" path="add"/>
            :
            <ChoiceBox handleSort={setSort}/>
          }
        </div>
        {!products ? <Spinner /> : <CardCollection cardData={products}/>}
      </div>
    </>
  );
}