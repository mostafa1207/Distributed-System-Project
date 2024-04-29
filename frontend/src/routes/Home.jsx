import { useOutletContext } from "react-router-dom";
import CardCollection from '../Components/Collection';
import { ChoiceBox } from '../Components/ChoiceBox';
import { Card } from '../Components/Card';
import Button from './../Components/Button'
import { useEffect, useState } from "react";
import Spinner from "./../ui/Spinner"
import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { IoMdAdd } from "react-icons/io";

export default function Home(props) {

  const userType = useOutletContext();
  const { products, isFetching} = useContext(ProductsContext);

  return (
    <>
      <div className="main-container">
        <div className="options-buttons">
          {userType == "customer"? 
            <Button icon={IoMdAdd} text="Add Product" color="green" path="add"/>
            :
            <ChoiceBox />
          }
        </div>
        {isFetching ? <Spinner /> : <CardCollection cardData={products}/>}
      </div>
    </>
  );
}