import styled from "styled-components";
import { FormInput } from "../Components/FormInput";
import Button from "../Components/Button";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDownloadDone } from "react-icons/md";
import { useState, useEffect } from "react";
import { API_URL } from "../keys";
import Cookies from "js-cookie"
import { useParams, useNavigate } from "react-router-dom"
import Spinner from "../ui/Spinner";


export default function EditProduct(props) {
    const nav = useNavigate();
    const { productId } = useParams();
    const [ productData, setProductData ] = useState({categories: [""]});
    const [isFetching, setIsFetching] = useState(true);
    const [isLoading , setIsLoading] = useState(false);

    useEffect(() => {
        if(props.editOrAdd == "edit") {   
            setIsFetching(true);
            fetch(`${API_URL}/guest/product/${productId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token")}`
                },
            })
            .then((res) => res.json())
            .then((res) => {
                res.product["categories"] = [res.product["category"]];
                setProductData(res.product);
                setIsFetching(false);
            });
        } else {
            setIsFetching(false);
        }
        }, []);

    const handleSubmit= (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        let product = {};
        for (let entry of form.entries()) {
            if (entry[0].includes("category_")) {
                product["category"] = entry[1];
            } else {
                product[entry[0]] = entry[1];
            }
        }
        setIsLoading(true)
        if (props.editOrAdd == "edit") {    
            fetch(`${API_URL}/seller/product/${productId}`, {
                method: "PUT",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token")}`
                },
            })
            .then((res) => res.json())
            .then((res) => {
                setIsLoading(false)
                console.log(res)
                nav(`/store/product/${res.product._id}`)
            });
        } else if (props.editOrAdd == "add") {
            fetch(`${API_URL}/seller/product`, {
                method: "POST",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token")}`
                },
            })
            .then((res) => res.json())
            .then((res) => {
                setIsLoading(false)
                console.log(res)
                nav(`/store/product/${res.product._id}`)
            });
        }
    }

    const addCategory = (event) => {
        const form = new FormData(event.target.parentElement);
        let product = {"categories": []};
        for (let entry of form.entries()) {
            if (entry[0].includes("category_")) {
                product["categories"].push(entry[1]);
            } else {
                product[entry[0]] = entry[1];
            }
        }
        product["categories"].push("");
        setProductData(product);
        console.log(product)
    }

    const Container = styled.form`
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        min-width: 50rem;
        padding: 6rem 1rem;

        & button:last-child {
            align-self: ${props.editOrAdd == "edit" ? "start" : "end"};
        }
    `

    return (
        <>
        {isFetching ? <Spinner /> :
            <Container onSubmit={handleSubmit}>
                <FormInput label="Product Name" name="name" defaultValue={productData.name} placeholder="Enter the name of the product" type="text" multiline={true}></FormInput>
                <FormInput label="Description" name="description" defaultValue={productData.description} placeholder="Enter details about the product" type="paragraph" multiline={true}></FormInput>
                <FormInput label="Price (EGP)" name="price" defaultValue={productData.price} placeholder="0" type="number"></FormInput>
                <FormInput label="Quantity" name="availableQuantity" defaultValue={productData.availableQuantity} placeholder="0" type="number"></FormInput>
                <FormInput label="Upload an image" placeholder="2000" type="image"></FormInput>
                <label className="form-input-label">Categories</label>
                {productData.categories.map((value, index) => {
                    return <input key={index} type="text" id={`category_${index}`} defaultValue={value} name={`category_${index}`} className="form-input-input" placeholder="Category"/>
                })}
                <button className="form-input-input" onClick={addCategory}>Add Category</button>
                {props.editOrAdd == "edit" ? 
                    <Button isLoading={isLoading} text="Save changes" color="green" icon={MdOutlineDownloadDone}></Button>
                    :
                    <Button isLoading={isLoading} type="submit" text="Add Product" color="green" icon={IoMdAdd}></Button>
                }
            </Container>
        }
        </>
    );
}
