import { Card } from "../Components/Card";
import { Link } from "react-router-dom";
import "./Collection.css"
const CardCollection = ({ cardData }) => {
  return (
    <div className="card-collection">
      {cardData.map((card, index) => (
        <div className="card-container" key={index}>
          <Link to={card.name}>
            <Card
              imgSrc={card.imageUrl}
              itemName={card.name}
              price={card.price}
              sellerName={card.seller}
              Description={card.description}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CardCollection;