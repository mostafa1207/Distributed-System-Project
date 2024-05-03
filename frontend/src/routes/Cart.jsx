import React, { useState, useEffect } from 'react';
import CartItem from '../Components/CartItem';
import Summary from '../Components/summary';
import './cart.css';

const Cart = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'item 1',
            photo: ' https://via.placeholder.com/150',
            price: 5.40,
            seller: 'ahmed',
        },
        {
            id: 2,
            name: 'item 2',
            photo: 'https://via.placeholder.com/150',
            price: 10.20,
            seller: 'ali',
        },
        {
            id: 3,
            name: 'item 3',
            photo: ' https://via.placeholder.com/150',
            price: 7.50,
            seller: 'ahmed',
        },
    ]);

    useEffect(() => {
        const initialTotal = cartItems.reduce((acc, item) => acc + item.price, 0);
        setTotalAmount(initialTotal);
    }, [cartItems]);

    const updateTotalAmount = (amount) => {
        setTotalAmount(totalAmount + amount);
    };

    const deleteItem = (id, price) => {
        const itemExists = cartItems.some(item => item.id === id);
        if (itemExists) {
            setTotalAmount(totalAmount - price);
            setCartItems(cartItems.filter(item => item.id !== id));
        }
    };

    return (
        <div className="cart">
            <div className="cart-container">
                <div className="cart-wrapper">
                    <h1 style={{ marginLeft: "5%" }}>Shopping Cart</h1>
                    <hr></hr>
                    {cartItems.map(item => (
                        <CartItem key={item.id} item={item} updateTotal={updateTotalAmount} deleteItem={deleteItem} />
                    ))}
                </div>
            </div>
            <Summary totalAmount={totalAmount} />
        </div>
    );
}

export default Cart;
