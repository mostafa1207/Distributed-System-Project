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
            <div className="card-Container">
                {imgSrc && (<img src={`../../assets/${imgSrc}`} alt="Card Image"></img>)}
                <div className="hBox">
                    {itemName && <h5 className="text" id="Itemname">{itemName}</h5>}
                    {price && <h5 className="text" id="price">{price}EGP</h5>}
                </div>
                {sellerName &&<h6 className="text" id="sellerName">Seller : {sellerName}</h6>}
                {Description && <p className="text" id="Description">Description: {Description}</p>}
            </div>
        </>
    );
}
