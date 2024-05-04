import { useOutletContext } from "react-router-dom";
import "./product.css";
import Button from "./../Components/Button";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Product(props) {
    const userType = useOutletContext();
    const product = {
        name: "iPhone",
        price: "$999",
        quantity: "4",
        seller: "Apple Inc.",
        description:"The iPhone is a line of smartphones designed and marketed by Apple Inc.",
        category: "Electronics"
    };

    return (
        <div className="product-container">
            <div className="top-container">
                <div className="product-image">
                    <img src="../../assets/house.png" alt="Product Image" />
                </div>
                <div className="product-details">
                    <h4 className ="product-name">NAME</h4>
                    <div className = "SQP">
                    <p className = "product-seller">Seller</p>
                    <p className = "product-quantity">Quantity : {product.quantity}</p>
                    <p className = "product-price">Price</p>
                    </div>
                    <div className = "product-counter">COUNTER</div>
                    <Button text="Add to Cart" icon={IoIosAddCircleOutline} color="green" />
                </div>
            </div>
            <div className="bottom-container">
                <div className="product-description">
                    <h3>Description</h3>
                    <p>{product.description}</p>
                    </div>
                <div className="product-category">
                    <h3>Category</h3>
                    <p>{product.category}</p>
                    </div>
            </div>
        </div>
    );
}
