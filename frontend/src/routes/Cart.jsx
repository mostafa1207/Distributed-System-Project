import React, { useState, useEffect } from 'react';
import CartItem from '../Components/CartItem';
import FloatingCard from '../Components/FloatingCard';
import Button from '../Components/Button';
import { MdShoppingCartCheckout } from "react-icons/md";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../keys';
import Cookies from "js-cookie"
import Spinner from '../ui/Spinner';
import './cart.css';

const Cart = () => {
    
    const queryClient = useQueryClient();
    const { data: cart, status: cartStatus } = useQuery(["cart"], fetchCart);
    const [totalAmount, setTotalAmount] = useState(0);
    
    const { mutate: updateCart, status: updateStatus } = useMutation({
        mutationFn: async ({ productId, quantity }) => {
            console.log({quantity})
            const res = await fetch(`${API_URL}/customer/changeQuantity/${productId}`, {
                method: "PUT",
                body: JSON.stringify({ quantity }),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: ` Bearer ${Cookies.get("token")} `,
                },
            });
            const data = await res.json()
        }
    });
    
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
        if (cartStatus == "success") {
            const initialTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotalAmount(initialTotal);
        }
    }, [cart]);

    const updateTotalAmount = (amount) => {
        setTotalAmount(totalAmount + amount);
    };

    const deleteItem = (id, price) => {
        const itemExists = cart.some(item => item._id === id);
        if (itemExists) {
            setTotalAmount(totalAmount - price);
            updateCart({ productId: id, quantity: 0 });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
    };

    return (
        <div className="cart">
            <div className="cart-container">
                <h1 style={{ marginLeft: "5%" }}>Shopping Cart</h1>
                <hr></hr>
                {cartStatus != "success" ? <Spinner /> : 
                <>{
                    cart.map((item, index) => (
                        <CartItem key={index} item={item} changeAmount={updateCart} updateTotal={updateTotalAmount} deleteItem={deleteItem} />
                    ))
                }</>
                }
            </div>
            <FloatingCard title="Order Summary"
                total={
                    <div className="order-summary">
                        <h3>Total Amount</h3>
                        <hr></hr>
                        <p>{totalAmount.toFixed(2)} EGP</p>
                        <Button text="Checkout" color="green" path="/user/checkout" icon={MdShoppingCartCheckout}/>
                    </div>
                }
            />
        </div>
    );
}

export default Cart;
