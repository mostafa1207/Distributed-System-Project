import React, { useState } from 'react';
import './CartItem.css';

const CartItem = ({ item, updateTotal, deleteItem }) => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
        updateTotal(item.price);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            updateTotal(-item.price);
        }
    };

    const getTotalPrice = () => {
        return (quantity * item.price).toFixed(2);
    };

    const handleDelete = () => {
        deleteItem(item.id, item.price * quantity);
    };

    return (
        <div className="cart-item-row">
            <div className="right-details">
                <img className="item-image" src={item.photo} alt="" />
                <div className="item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p>Seller: {item.seller}</p>
                </div>
            </div>
            <div className="quantity-button">
                <span className="minus" onClick={decreaseQuantity}>-</span>
                <span className="quantity">{quantity}</span>
                <span className="plus" onClick={increaseQuantity}>+</span>
            </div>
            <div className="left-details">
                <div><button className='remove-item' onClick={handleDelete}>X</button></div>
                <div className="cart-item-total">{getTotalPrice()} EGP</div>
            </div>
        </div>
    );
}

export default CartItem;
