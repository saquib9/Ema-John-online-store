import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.podo;
    const reviewItemStyle = {
        borderBottom : '1px solid lightGray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft: '200px'
    }
    return (
        <div style={reviewItemStyle}>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity: {quantity}</p>
            <br/>
            <p><small>${price}</small></p>
            <button 
                onClick={() => props.removeProduct(key)}
                className='main-button'
            >Remove</button>
        </div>
    );
};

export default ReviewItem;