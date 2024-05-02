import "./OrderItem.css"

export default function OrderItem(props) {


    return(
      <>
        <div className="order-item-container">
          <div className="order-item-image">
            <img src={`../../assets/${props.OrderItem_image}`} alt="Image" />
          </div>
          <div className="order-item-header">
            <h1>{props.OrderItem_name}</h1>
            <div>
              <h2>{props.OrderItem_price} EGP</h2>
              <h3>Quantity: {props.OrderItem_quantity}</h3>
            </div>
          </div>
        </div>
        <hr className="order-item-horizontal-line"/>
      </>
    );
}