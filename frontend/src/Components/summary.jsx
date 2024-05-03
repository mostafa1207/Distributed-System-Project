import React from 'react';
import './summary.css';

const Summary = ({ totalAmount }) => {
    return (
        <div className='summary-wrapper'>
            <div className='order-summary'>
                <h1>Order Summary</h1>
                <h3>Total Amount</h3>
                <hr style={{ marginTop: '10px', marginBottom: '10px' }}></hr>
                <p>{totalAmount.toFixed(2)} EGP</p>
            </div>
        </div>
    );
}

export default Summary;
