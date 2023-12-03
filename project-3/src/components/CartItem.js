/* ShoppingCart.js
 * React component rendering cartItems
*/
import React, { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
/* Import PrimeReact styles */
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


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
    const [value, setValue] = useState(props.quantity);

    return(
        <div className='cart-item'>
            <img src={props.src} alt={props.alt} />
            <h1>{props.name}</h1>
            <div className='item-individual-price'>
                <h2>Each</h2>
                <h1>{`$${(props.price).toFixed(2)}`}</h1>
            </div>
            <div className="flex justify-content-center">
            <InputNumber value={value} onValueChange={(e) => setValue(e.value)} showButtons buttonLayout="horizontal" inputStyle={{width: '3rem', textAlign: 'center'}}
                    decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
            </div>
            <div className="item-total">
                <h2>Total</h2>
                <h1>{`$${total.toFixed(2)}`}</h1>
            </div>
        </div>
    );
};


export default CartItem;

