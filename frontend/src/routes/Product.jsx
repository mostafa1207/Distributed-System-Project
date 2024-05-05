import { useOutletContext } from "react-router-dom";
import Button from "./../Components/Button";
import Spinner from "../ui/Spinner";
import { IoMdAdd } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom"
import { API_URL } from "../keys";
import { useQueryClient } from '@tanstack/react-query';
import { toast } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import Cookies from "js-cookie"
import "./product.css";
import { useState } from "react";


export default function Product(props) {

    const queryClient = useQueryClient();
    const nav = useNavigate();
    const { productId } = useParams();
    const userType = useOutletContext();
    const { data: product, status } = useQuery([`product_${productId}`], fetchProduct);
    const [ isSending, setIsSending ] = useState(false);

    async function fetchProduct() {
        const res = await fetch(`${API_URL}/guest/product/${productId}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        return data.product;
    }

    const addToCart = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        let quantity;
        for (let entry of form.entries()) {
            quantity = entry[1];
        }
        setIsSending(true);
        fetch(`${API_URL}/customer/cart/${productId}`, {
            method: "PUT",
            body: JSON.stringify({ quantity }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            },
        })
        .then((res) => res.json())
        .then((res) => {
            setIsSending(false);
            toast.success("product added to cart successfully");
            queryClient.removeQueries({ queryKey: ["cart"] });
        });
    }

    const handleDelete = async () => {
        setIsSending(true);
        const res = await fetch(`${API_URL}/seller/product/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            },
        });
        const data = await res.json();
        setIsSending(false);
        console.log(data);
        toast.success("product deleted successfully");
        queryClient.removeQueries({ queryKey: ["products"] });
        nav("/store")
    }

    return (
        <>
            {status != "success" ? <Spinner /> :
                <div className="product-container">
                    <div className="top-container">
                        <div className="product-image">
                            <img src={`../../assets/${product.imageUrl}`} alt="Product Image" />
                        </div>
                        <div className="product-details">
                            {userType == "seller" && <Button path="edit" text="Edit product" icon={IoMdAdd} color="orange" />}
                            <div>
                                <h1 className ="product-name">{product.name}</h1>
                                <hr></hr>
                            </div>
                            <div className = "SQP">
                                {userType == "customer" && <p className = "product-seller">Seller: {product.sellerUsername}</p>}
                                <p className = "product-quantity">Available quantity: {product.availableQuantity}</p>
                                <p className = "product-price">Price: {product.price} EGP</p>
                            </div>
                            {userType == "customer" && <form action="" onSubmit={addToCart}>
                                <div className="quantity-input">
                                    <p>Quantity:</p>
                                    <input type="number" name="quantity" defaultValue="1" max={product.availableQuantity}/>
                                </div>
                                <Button type="submit" isLoading={isSending} text="Add to cart" icon={IoMdAdd} color="green" />
                            </form>
                            }
                        </div>
                    </div>
                    <div className="bottom-container">
                        <div className="bottom-section">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>
                        <div className="bottom-section">
                            <h3>Categories</h3>
                            {product.category.map((category, index) => <p key={index}>{category}</p>)}
                        </div>
                        {userType == "seller" && <Button handler={handleDelete} isLoading={isSending} color="red" text="Delete product" icon={MdDelete}/>}
                    </div>
                </div>
            }
        </>
    );
}
