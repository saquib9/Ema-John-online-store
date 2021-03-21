import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif' 

const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)

    const handlePlaceOrder = () =>{
        setCart([]);
        processOrder();
        setOrderPlaced(true)
    }

    const removeProduct = (proKey) => {
        const newCart = cart.filter(pd => pd.key !== proKey );
        setCart(newCart);
        removeFromDatabaseCart(proKey);
    }

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)

        const cartProducts = productKeys.map( key => {
            const product = fakeData.find( pd => pd.key === key );
            product.quantity = savedCart[key];
            return product;
        })
        //console.log(savedCart)
        //console.log(cartProducts)
        setCart(cartProducts)
    }, []);

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    }

    return (
        <div className='twin-container'>
            <div className='product-container'>
            {
                /* <h1>Cart Items : {cart.length}</h1> */
                cart.map(data => <ReviewItem 
                    key={data.key}
                    removeProduct = {removeProduct}
                    podo={data}
                    ></ReviewItem>)
            }     
            { thankYou }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className='main-button'>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;