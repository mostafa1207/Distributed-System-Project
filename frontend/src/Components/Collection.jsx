import { Card } from "../Components/Card";
import { Link } from "react-router-dom";
import "./Collection.css"

const CardCollection = ({ cardData, userType }) => {
  return (
    <>
      {cardData.length ?
        <div className="card-collection">
          {cardData.map((card, index) => (
            <div className="card-wrapper" key={index}>
              <Link to={`product/${card._id}`}>
                <Card
                  imgSrc={card.imageUrl}
                  itemName={card.name}
                  price={card.price}
                  sellerName={card.sellerUsername}
                  Description={card.description}
                  />
              </Link>
            </div>
          ))}
        </div>
      :
        <div className="no-products">
          {userType == "seller" ? "You don't have any products yet." : "There are no products to show."}
        </div>
      }
    </>
  );
};

export default CardCollection;