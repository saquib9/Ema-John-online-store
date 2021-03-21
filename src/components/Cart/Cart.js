import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    //console.log(cart)
    //const total = cart.reduce( (total, prd) => total + prd.price, 0)     // 'reduce' er kaaj shikhlam

    let total = 0
    for(let i=0; i < cart.length; i++){
        const product = cart[i]
        total = total + product.price * product.quantity
        //debugger;
    }

    let shipping = 0;
    if(total > 35){
        shipping = 0
    }
    else if(total > 15){
        shipping = 4.99
    }
    else if(total > 0){
        shipping = 12.99
    }

    let tax = total / 10;

    let grandTotal = total + shipping + tax;

    const formatNumber = num => {
        const precision = num.toFixed(2)
        return Number(precision);
    }

    return (
        <div>
            <h4>Order summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product price: {total}</p>
            <p><small>Shipping Cost: {formatNumber(shipping)}</small></p>
            <p><small>Tax + VAT: {formatNumber(tax)}</small></p>
            <p>Total: {formatNumber(grandTotal)}</p>
            
            {/* <Link to='/review'>
             <button className='main-button'>Review Order</button>
            </Link> */}

            {
                props.children
            }


        </div>
    );
};

export default Cart;