import { useOutletContext } from "react-router-dom";
import CardCollection from '../Components/Collection';
import { ChoiceBox } from '../Components/ChoiceBox';
import Button from './../Components/Button'
import Spinner from "./../ui/Spinner"
import { IoMdAdd } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../keys";

export default function Home(props) {

  const { data, status } = useQuery(["products"], fetchProducts);
  const userType = useOutletContext();
  
  async function fetchProducts() {
    const res = await fetch(`${API_URL}/guest/products`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data.productWithSellerUsername;
  }

  return (
    <>
      <div className="main-container">
        <div className="options-buttons">
          {userType == "seller"? 
            <Button icon={IoMdAdd} text="Add Product" color="green" path="add"/>
            :
            <ChoiceBox />
          }
        </div>
        {status != "success" ? <Spinner /> : <CardCollection cardData={data}/>}
      </div>
    </>
  );
}