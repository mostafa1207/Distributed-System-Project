import { API_URL } from "../keys";
import "./Card.css"
export const Card = ({
    imgSrc,
    itemName,
    price,
    sellerName,
    Description
}
) =>{
    return (
        <>
            <div className="card-container">
                <img src={`../../assets/${imgSrc}`} alt="Card Image"></img>
                <div className="card-text-container">
                    <div className="title-and-price">
                        <h5 className="item-name">{itemName}</h5>
                        <h5 className="price">{price} EGP</h5>
                    </div>
                    <h6 className="seller-name">Seller : {sellerName}</h6>
                    <p className="description">Description: {Description}</p>
                </div>
            </div>
        </>
    );
}
