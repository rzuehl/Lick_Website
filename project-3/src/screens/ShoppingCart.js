/* ShoppingCart.js
 * React component rendering clients current shopping cart
 * Uses the following external custom comopnents:
 * - General Button
 * - HamburgerButton
 * - ScreenTitle
 * - MenuTile
 * - CartItem
 */

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import GeneralButton from "../components/GeneralButton";
import OptionsDropdown from '../components/OptionsDropdown';
import WeatherIcon from '../components/WeatherIcon';
import ScreenTitle from "../components/ScreenTitle";
import CartItem from "../components/CartItem";
import { BsCartXFill } from "react-icons/bs";


const ShoppingCart = (props) => {

  // getting passed in params passed in from menuView to shopping cart component
  const location = useLocation();
  const data = location.state;

  const [cartItems, setCartItems] = useState(data);
  const [cartSubtotal, setCartSubtotal] = useState(0);

  // computing subtotal from data
  const computeSubtotal = () => {
    let subtotalSum = 0;
    for (let item of data) {
        subtotalSum += item.quantity * item.price;
    }
    setCartSubtotal(subtotalSum);
  };

  // function responsible for updating cartItems array when items are altered in shopping cart screen
  const alterCartItems = (cartItemName, newCartItemQuantity) => {
    const newCartItemArray = [...cartItems];
    const index = newCartItemArray.findIndex((item) => item.name === cartItemName);
    if (index !== -1) {
        newCartItemArray[index].quantity = newCartItemQuantity;
      setCartItems(newCartItemArray);
    }
    else {
      console.log("Error: array element not found when altering cart Items function is executed");
    }
  };

  // utilizing useEffect to render cartItems upon component mount
  useEffect(() => {
    // computing cart subtotal and setting subtotal state
    computeSubtotal();
  }, []);

  useEffect(() => {
    computeSubtotal();
  }, [cartItems])



  return (
    <div>
      <div className="customer-header">
        <WeatherIcon />
        <GeneralButton content="Login" sidePadding={20} route="/login" />
        <ScreenTitle />
        <GeneralButton content="Order" sidePadding={20} route="/menu" />
        <OptionsDropdown sidePadding={20}/>
      </div>
      <div className="cart-info">
        <div>
          <div>
            {cartItems.length > 0 &&
              cartItems.map((item, index) => {
                return (
                  <CartItem
                    key={index}
                    src={item.image}
                    alt={item.description}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    changeParentQuantity={alterCartItems}
                    toppings={item.itemToppings}
                  />
                );
              })}
            {cartItems.length === 0 && (
              <div className='cart-item empty-cart-container'>
                  <div className='empty-cart-message'>
                    <BsCartXFill style={{color: 'black', fontSize: '3rem'}} />
                    <h1>Your Cart is Currently Empty!</h1>
                  </div>
              </div>
            )}
          </div>
        </div>
        <div className="checkout-right-container">
          <div className="checkout-container">
            <div className="checkout-info">
              <h2>Subtotal: </h2>
              <h1>{`$${cartSubtotal.toFixed(2)}`}</h1>
            </div>
            <div className="checkout-info">
              <h2>Tax: </h2>
              <h1>{`$${(cartSubtotal * 0.0625).toFixed(2)}`}</h1>
            </div>
            <div className="checkout-info">
              <h2 className="order-total">Total: </h2>
              <h1 className="order-total">{`$${(cartSubtotal + (cartSubtotal * 0.0625)).toFixed(2)}`}</h1>
            </div>
          </div>
          <div>
              <GeneralButton 
                content="Checkout"
                sidePadding={75}
                route={'/menu'}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
