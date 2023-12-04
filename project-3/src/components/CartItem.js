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
 * @property {function} props.changeParentQuantity - function that alters parent's array containing cartItem data
 * */

const CartItem = (props) => {
    const [quantity, setItemQuantity] = useState(props.quantity);
    const [ total, setTotal ] = useState(props.price * props.quantity);

    // function responsible for updating values upon item quantity changing
    const handleInputChange = (e) => {
        const newQuantity = e.target.value;
        if (newQuantity >= 0) {
            setItemQuantity(newQuantity);
            setTotal(props.price * newQuantity);
            props.changeParentQuantity(props.name, newQuantity);
        }
    };

    return (
        <div className='cart-item'>
            <div className='item-information'>
                <img src={props.src} alt={props.alt} />
                <h1>{props.name}</h1>
            </div>
            <div className='item-individual-price'>
                <h2>Each</h2>
                <h1>{`$${(props.price).toFixed(2)}`}</h1>
            </div>
            <div className="flex justify-content-center plus-minus-input">
            <InputNumber min={0} value={quantity} onValueChange={(e) => handleInputChange(e)} showButtons buttonLayout="horizontal" inputStyle={{width: '3rem', textAlign: 'center'}}
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

