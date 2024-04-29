import React, { useState } from 'react';
import './CartItem.css';

const CartItem = () => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        return
    };

    const decreaseQuantity = () => {
        return
    };

    return (
        <div className="cart-container">
            <div className="cart-wrapper">
                <h1 className="">Cart</h1>
                <div className="cart-card">
                    <div className="cart-item-row">
                        <div className="cart-item">
                            <img className="item-iamge" src="https://www.jesrestaurantequipment.com/thumbnail.asp?file=assets/images/products/cbof-4_thumbnail.jpg&maxx=90&maxy=115" alt="" />
                            <div style={{ marginLeft: '50px' }}>
                                <p className="cart-item-name">item 1</p>
                                <p>Seller: ahmed</p>
                                <div className="quantity-button">
                                    <span className="minus" onClick={decreaseQuantity}>-</span>
                                    <span className="quantity">{quantity}</span>
                                    <span className="plus" onClick={increaseQuantity}>+</span>
                                </div>
                            </div>
                        </div>
                        <div className="left-details">
                            <div className="cart-item-total">5.40 EGP</div>
                            <div style={{ paddingBottom: '30px' }}><a href="#" className='remove-item'>X</a></div>
                        </div>
                    </div>
                    <div className="cart-item-row">
                        <div className="cart-item">
                            <img className="item-iamge" src="https://www.jesrestaurantequipment.com/thumbnail.asp?file=assets/images/products/cbof-4_thumbnail.jpg&maxx=90&maxy=115" alt="" />
                            <div style={{ marginLeft: '50px' }}>
                                <p className="cart-item-name">item 1</p>
                                <p>Seller: ahmed</p>
                                <div className="quantity-button">
                                    <span className="minus" onClick={decreaseQuantity}>-</span>
                                    <span className="quantity">{quantity}</span>
                                    <span className="plus" onClick={increaseQuantity}>+</span>
                                </div>
                            </div>
                        </div>
                        <div className="left-details">
                            <div className="cart-item-total">5.40 EGP</div>
                            <div style={{ paddingBottom: '30px' }}><a href="#" className='remove-item'>X</a></div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
}

export default CartItem;
