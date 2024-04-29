import CartItem from "../Components/CartItem";
import Summary from "../Components/summary";
import React from 'react';
import './cart.css';

export default function Cart() {


    return (
        <div className="cart">
            <CartItem></CartItem>
            <Summary></Summary>
        </div>
    );
}
