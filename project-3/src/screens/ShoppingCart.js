/* ShoppingCart.js
 * React component rendering clients current shopping cart
 * Uses the following external custom comopnents:
 * - General Button
 * - HamburgerButton
 * - ScreenTitle
 * - MenuTile
 * - CartItem
*/

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import ScreenTitle from '../components/ScreenTitle';
import weatherLogo from '../assets/weather-icon.png';
import CartItem from '../components/CartItem';
import lickLogo from '../assets/lick-honest-logo.png';


const ShoppingCart = () => {
    // getting passed in params passed in from menuView to shopping cart component
    const { userSelectedItems } = useParams();

    const [ cartItems, setCartItems ] = useState([]); 
    const [ cartSubtotal, setCartSubtotal ] = useState(0);
    const [ cartTax, setCartTax ] = useState(0);
    const [ cartTotal, setCartTotal ] = useState(0);

    // // function handling render of cartItems content upon component mount
    // const renderCartItems = () => {
        
    // }

    // utilizing useEffect to render cartItems upon component mount
    useEffect(() => {
         for(let i of userSelectedItems) {
            console.log(i);
         }
    }, []);

    return (
        <div>
            <div className="customer-header">
                <Link to="/">
                    <img className="lick-logo" src={lickLogo} alt="Representing Lick Honest Icecream Customer Logo" />                
                </Link>
                <GeneralButton content="Translate" sidePadding={35} />
                <img className="weather-logo" src={weatherLogo} alt="Icon representing weather" />
                <ScreenTitle />
                <GeneralButton content="Login" sidePadding={20} route="/login" />
                <GeneralButton content="Menu" sidePadding={20} route="/menu" />
                <GeneralButton content="Options" sidePadding={20} />
            </div>
            <div className='cart-info'>
                <div className='cart-items'>
                    <div>
                        {cartItems.length > 0 && (
                            cartItems.map((item, index) => {
                                return (
                                    <CartItem 
                                        key={index}
                                        src={item.image}
                                        alt={item.description}
                                        name={item.name}
                                        price={item.price}
                                        quantity={item.quantity}
                                    />
                                )
                            })
                        )}
                        {cartItems.length === 0 && (
                            <h1>
                                Cart is empty
                            </h1>
                        )}

                    </div>
                </div>
                <div className='checkout-container'>
                    <div className='checkout-info'>
                        <h2>Subtotal: </h2>
                        <h1>$40</h1>
                    </div>
                    <div className='checkout-info'>
                        <h2>Tax: </h2>
                        <h1>$10</h1>
                    </div>
                    <div className='checkout-info'>
                        <h2 className='order-total'>Total: </h2>
                        <h1 className='order-total'>$50</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart;