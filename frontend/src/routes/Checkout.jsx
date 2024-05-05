import OrderItem from "../Components/OrderItem";
import FloatingCard from "./../Components/FloatingCard"
import Button from "../Components/Button";
import { useState, useEffect } from "react";
import { MdOutlineDownloadDone } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../keys';
import { useQueryClient } from '@tanstack/react-query';
import { useUserData } from "./../features/user/useUserData";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie"
import Spinner from '../ui/Spinner';
import SpinnerMini from "../ui/SpinnerMini";
import './Checkout.css'

export default function Checkout(props) {

    const queryClient = useQueryClient();
    const { data, status } = useQuery(["cart"], fetchCart);
    const [totalAmount, setTotalAmount] = useState(0); 
    const [ isSending, setIsSending]  = useState(false);
    const { isLoading, user: { city, address, phone } = {} } = useUserData();    
    
    async function fetchCart() {
      const res = await fetch(`${API_URL}/customer/cart`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("token")}`
        },
      });
      const data = await res.json();
      const cart = [];
      for (let product of data.cart) {
        const res = await fetch(`${API_URL}/guest/product/${product.productId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        cart.push({...data.product, quantity: product.quantity});
      }
      return cart;
    }

    useEffect(() => {
        if (status == "success") {
            const initialTotal = data.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotalAmount(initialTotal);
        }
    }, [data]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        let checkoutData = {};
        for (let entry of form.entries()) {
            checkoutData[entry[0]] = entry[1];
        }
        if (checkoutData.phone.length != 11) {
            toast.error("please phone number of 11 digits")
            return;
        }
        if (checkoutData.cardNumber.length != 16) {
            toast.error("please input card number of 12 digits")
            return;
        }
        if (checkoutData.cardPin.length != 4) {
            toast.error("please input card pin of 4 digits")
            return;
        }
        setIsSending(true)
        fetch(`${API_URL}/customer/order`, {
            method: "POST",
            body: JSON.stringify(checkoutData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            },
        })
        .then((res) => res.json())
        .then((res) => {
            setIsSending(false)
            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        });
    }

    return (
        <>
            {(status != "success" || isLoading) ? <Spinner /> : 
                <div className="checkout-body">
                    <form className="checkout-form" action="/" onSubmit={handleSubmit}>
                        <h1 className="checkout-title">Delivery info</h1>
                        <div className="checkout-form-div">
                            <input type="text" placeholder="City" name="city" defaultValue={city} required/>
                            <input type="text" placeholder="Address" name="address" defaultValue={address} required/>
                            <input type="number" placeholder="Phone" name="phone" defaultValue={phone} required minLength="11" maxLength="11"/>
                        </div>
                        <h1 className="checkout-title">Payment info</h1>
                        <div className="checkout-form-div">
                            <input type="number" placeholder="Card number" name="cardNumber" required/>
                            <input type="number" placeholder="Card pin" name="cardPin" required/>
                        </div>
                        <Button type="submit" isLoading={isSending} text="Submit" color="green" icon={MdOutlineDownloadDone}/>
                    </form>
                    <FloatingCard title="Order Summary"
                        total={
                            <div className="total-amount">
                                <p>Total Amount</p>
                                <p>{totalAmount.toFixed(2)} EGP</p>
                            </div>
                        }
                        items={data.map((item, index) => (
                                <OrderItem
                                key={index}
                                OrderItem_name={item.name}
                                OrderItem_price={item.price}
                                OrderItem_quantity={item.quantity}
                                OrderItem_image={item.imageUrl}
                                />
                        ))}
                    />
                </div>
            }
        </>
    );
}
