/* ShoppingCart.js
 * React component rendering cartItems
*/
import React from 'react';
import SelectAutoWidth from '../components/SelectAutoWidth';

/**
 * component responsible for rendering cartItem
 * @param {object} props - js object containing react props
 * @property {string} props.src - src for image to render for cart item
 * @property {string} props.alt - alt text to include within the rendered cart item
 * @property {string} props.name - string showing name of the cart item
 * @property {number} props.price - string showing price of individual item
 * @property {number} props.quantity - number of items user wants to order
 * */
const CartItem = (props) => {
    const total = props.price * props.quantity;

    return(
        <div className='cart-item'>
            <img src={props.src} alt={props.alt} />
            <h1>{props.name}</h1>
            <div className='item-individual-price'>
                <h2>Each</h2>
                <h2>{`$${props.price}`}</h2>
            </div>
            <div className='item-quantity'>
                <SelectAutoWidth />
            </div>
            <div className="item-total">
                <h2>Total</h2>
                <h2>{`$${total}`}</h2>
            </div>
        </div>
    );
};


export default CartItem;