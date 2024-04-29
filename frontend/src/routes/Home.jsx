import { useOutletContext } from "react-router-dom";
import CardCollection from '../Components/Collection';
import { ChoiceBox } from '../Components/ChoiceBox';
import { Card } from '../Components/Card';
import Button from './../Components/Button'
import { useEffect, useState } from "react";
import Spinner from "./../ui/Spinner"
import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

export default function Home(props) {

  const userType = useOutletContext();
  const { products, isFetching} = useContext(ProductsContext);

  return (
    <>
      <div className="main-container">{userType} </div>
      {userType == "seller"? <Button text="Add Product"/> : <ChoiceBox />}
      {isFetching ? <Spinner /> : <CardCollection cardData={products}/>}
    </>
  );
}