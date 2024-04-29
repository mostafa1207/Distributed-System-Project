import React from 'react';
import './summary.css';

const Summary = () => {
    return(
        <div className='summary'>
            <h1>Order Summary</h1>
            <div className='order-summary'>
                <h3>Total Amount</h3>
                <hr style={{marginTop: '10px', marginBottom: '10px' }}></hr>
                <p>200 EGP</p>
            </div>

        </div>
    );
}

export default Summary;