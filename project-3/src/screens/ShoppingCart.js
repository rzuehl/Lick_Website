/* ShoppingCart.js
 * React component rendering clients current shopping cart
 * Uses the following external custom comopnents:
 * - General Button
 * - HamburgerButton
 * - ScreenTitle
 * - MenuTile
 * - CartItem
*/

import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import ScreenTitle from '../components/ScreenTitle';
import weatherLogo from '../assets/weather-icon.png';
import CartItem from '../components/CartItem';
import lickLogo from '../assets/lick-honest-logo.png';

import applePie from '../assets/menu-pictures/seasonal_apple_pie.png';


const ShoppingCart = () => {
    // cartItems is an array of objects of the form
    /* {
        itemImage,
        itemPrice, 
        itemID,
        itemName,
        }
    */
    const [cartItems, setCartItems] = useState([]); 

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
                        <CartItem 
                            src={applePie} 
                            alt={'A yummy applie pie'} 
                            name={'apple pie'} 
                            price={15.99}
                            quantity={4}
                        />
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