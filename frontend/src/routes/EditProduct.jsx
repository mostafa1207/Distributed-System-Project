import { FormInput } from "../Components/FormInput";
import Button from "../Components/Button";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDownloadDone } from "react-icons/md";
import { useState, useEffect } from "react";
import { API_URL } from "../keys";
import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-hot-toast";
import Spinner from "../ui/Spinner";
import Cookies from "js-cookie"
import "./EditProduct.css"

export default function EditProduct(props) {

    const queryClient = useQueryClient();
    const nav = useNavigate();
    const { productId } = useParams();
    const [ productData, setProductData ] = useState({unset: true, category: [""]});
    const [isLoading , setIsLoading] = useState(false);
    const { data, status } = useQuery([`product_${productId}`], fetchProduct, {
        onSuccess: (data) => {
            setProductData(data);
        }
    });

    useEffect(() => {
        if (status == "success") {
            setProductData(data);
        }
    }, [])

    async function fetchProduct() {
        if (props.editOrAdd == "edit") {
            const res = await fetch(`${API_URL}/guest/product/${productId}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
            });
            const data = await res.json();
            return data.product;
        } else {
            return {category: [""]};
        }
    }

    const handleSubmit= (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        let product = {"category": []};
        for (let entry of form.entries()) {
            if (entry[0].includes("category_")) {
                product.category.push(entry[1]);
            } else {
                product[entry[0]] = entry[1];
            }
        }
        if (!product.file.name && props.editOrAdd == "add") {
            toast.error("please choose an image");
            return;
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
                setIsLoading(false);
                toast.success("product successfully edited");
                queryClient.removeQueries({ queryKey: ["products"] });
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
                setIsLoading(false);
                toast.success("product successfully added");
                queryClient.removeQueries({ queryKey: ["products"] });
                nav(`/store/product/${res.product._id}`)
            });
        }
    }

    const addCategory = (event) => {
        const form = new FormData(event.target.parentElement);
        let product = {"category": []};
        for (let entry of form.entries()) {
            if (entry[0].includes("category_")) {
                product.category.push(entry[1]);
            } else {
                product[entry[0]] = entry[1];
            }
        }
        product["category"].push("");
        setProductData(product);
    }

    const handleUploadImage = (event) => {
        document.getElementById("selectedFile").click();
    }

    return (
        <>
        {((status != "success" || productData.unset) && props.editOrAdd == "edit") ? <Spinner /> :
            <form className="product-form" onSubmit={handleSubmit}>
                <FormInput label="Product Name" name="name" defaultValue={productData.name} placeholder="Enter the name of the product" type="text" multiline={true}></FormInput>
                <FormInput label="Description" name="description" defaultValue={productData.description} placeholder="Enter details about the product" type="paragraph" multiline={true}></FormInput>
                <FormInput label="Price (EGP)" name="price" defaultValue={productData.price} placeholder="0" type="number"></FormInput>
                <FormInput label="Quantity" name="availableQuantity" defaultValue={productData.availableQuantity} placeholder="0" type="number"></FormInput>
                <input type="file" name="file" id="selectedFile" accept="image/*" style={{display: "none"}}/>
                <FormInput label="Upload an image" placeholder="2000" type="image" onClick={handleUploadImage}></FormInput>
                <label className="form-input-label">Categories</label>
                {productData.category.map((value, index) => {
                    return <input key={index} type="text" id={`category_${index}`} defaultValue={value} name={`category_${index}`} className="form-input-input" placeholder="Category" required/>
                })}
                <button className="form-input-input" onClick={addCategory}>Add Category</button>
                {props.editOrAdd == "edit" ? 
                    <Button isLoading={isLoading} type="submit" text="Save changes" color="green" icon={MdOutlineDownloadDone}></Button>
                    :
                    <Button isLoading={isLoading} type="submit" text="Add Product" color="green" icon={IoMdAdd}></Button>
                }
            </form>
        }
        </>
    );
}
