import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    //console.log(props)
    const { img, name, seller, price, stock, key } = props.prod
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4><Link to={'/product/'+key}>{name}</Link></h4>
                <br/>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left in the stock - order soon</small></p>
                { props.showAddToCart && <button className='main-button' onClick={() => props.handleAddProduct(props.prod)} >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    add to cart</button>}
            </div>
        </div>
    );
};

export default Product;