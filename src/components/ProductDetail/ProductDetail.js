import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams()
    const product = fakeData.find(pp => pp.key === productKey)    // fakeData[] ekta array.

    return (
        <div>
            <h2>Your product details</h2>
            <Product 
            showAddToCart = {false}
            prod={product} 
            ></Product>
        </div>
    );
};

export default ProductDetail;<h1>Product detail coming sooooooooon.</h1>