import React, { useState } from 'react';
import SpinnerMini from '../ui/SpinnerMini';
import './CartItem.css';

const CartItem = ({ item, updateTotal, deleteItem, changeAmount }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const [waitForDelete, setWaitForDelete] = useState(false);

    const increaseQuantity = () => {
        changeAmount({ productId: item._id, quantity: quantity + 1 });
        setQuantity(quantity + 1);
        updateTotal(item.price);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            changeAmount({ productId: item._id, quantity: quantity - 1 });
            setQuantity(quantity - 1);
            updateTotal(-item.price);
        }
    };

    const getTotalPrice = () => {
        return (quantity * item.price).toFixed(2);
    };

    const handleDelete = () => {
        setWaitForDelete(true)
        deleteItem(item._id, item.price * quantity);
    };

    return (
        <div className="cart-item-row">
            <div className="right-details">
                <img className="item-image" src={`../../assets/${item.imageUrl}`} alt="" />
                <div className="item-info">
                    <div>
                        <p className="cart-item-name">{item.name}</p>
                        <p>Seller: {item.seller ? item.seller.username:null}</p>
                    </div>
                    <div className="quantity-button">
                        <span className="minus" onClick={decreaseQuantity}>-</span>
                        <span className="quantity">{quantity}</span>
                        <span className="plus" onClick={increaseQuantity}>+</span>
                    </div>
                </div>
            </div>
            <div className="left-details">
                <div><button className='remove-item' onClick={handleDelete}>{waitForDelete ? <SpinnerMini /> : "X"}</button></div>
                <div className="cart-item-total">{getTotalPrice()} EGP</div>
            </div>
        </div>
    );
}

export default CartItem;
