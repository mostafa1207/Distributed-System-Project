import { Card } from "../Components/Card";
import { Link } from "react-router-dom";
import "./Collection.css"

const CardCollection = ({ cardData }) => {
  return (
    <div className="card-collection">
      {cardData.map((card, index) => (
        <div className="card-wrapper" key={index}>
          <Link to={`product/${card._id}`}>
            <Card
              imgSrc={card.imageUrl}
              itemName={card.name}
              price={card.price}
              sellerName={card.seller ? card.seller.username : null}
              Description={card.description}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CardCollection;