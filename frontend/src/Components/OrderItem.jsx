import "./OrderItem.css"

import "./OrderItem.css"

export default function OrderItem(props) {


    return(
        <>
        <div className="container">
      <div className="image">
        <img src={`../../assets/${props.OrderItem_image}`} alt="Image" />
      </div>
      <div className="header">
        <h1>{props.OrderItem_name}</h1>
        <h2>{props.OrderItem_price} EGP</h2>
        <h3>Quantity: {props.OrderItem_quantity}</h3>
      </div>
    </div>
        </>
    );
}