import OrderItem from "../Components/OrderItem";
import FloatingCard from "./../Components/FloatingCard"
import Button from "../Components/Button";
import { MdOutlineDownloadDone } from "react-icons/md";
import './Checkout.css'

export default function Checkout(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        let user = {};
        for (let entry of form.entries()) {
            user[entry[0]] = entry[1];
        }
    }

    const orders = [{
        name: "iphone 13 pro max",
        price: "500",
        quantity: "20",
        image: "house.png"
    },{
        name: "Hot and juicy Pizza",
        price: "500",
        quantity: "20",
        image: "house.png"
    }];

    return (
        <>
            <div className="checkout-body">
                <form className="checkout-form" action="/" onSubmit={handleSubmit}>
                    <h1 className="checkout-title">Delivery info</h1>
                    <div className="checkout-form-div">
                        <input type="text" placeholder="City" name="city" required/>
                        <input type="text" placeholder="Address" name="address" required/>
                        <input type="number" placeholder="Phone" name="phone" required minLength="11" maxLength="11"/>
                    </div>
                    <h1 className="checkout-title">Payment info</h1>
                    <div className="checkout-form-div">
                        <input type="number" placeholder="Card number" name="cardNumber" required/>
                        <input type="number" placeholder="Card pin" name="cardPin" required/>
                    </div>
                    <Button type="submit" text="Submit" color="green" icon={MdOutlineDownloadDone}/>
                </form>
                <FloatingCard title="Order Summary"
                    total={
                        <div className="total-amount">
                            <p>Total Amount</p>
                            <p>200 EGP</p>
                        </div>
                    }
                    items={orders.map((item, index) => (
                            <OrderItem
                            key={index}
                            OrderItem_name={item.name}
                            OrderItem_price={item.price}
                            OrderItem_quantity={item.quantity}
                            OrderItem_image={item.image}
                            />
                    ))}
                />
            </div>
        </>
    );
}
