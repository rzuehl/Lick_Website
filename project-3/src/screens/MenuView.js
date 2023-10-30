/* MenuView.js
 * React component rendering screen for customers
 * Uses the following external custom comopnents:
 * - General Button
 * - HamburgerButton
 * - ScreenTitle
*/

import React from 'react';
import GeneralButton from '../components/GeneralButton';
import ScreenTitle from '../components/ScreenTitle';
import weatherLogo from '../assets/weather-icon.png';
import menuBackground from '../assets/menu-background.png';


const MenuView = () => {
    return (
        <div>
            <div className="customer-header">
                <GeneralButton content="Translate" sidePadding={35} />
                <img className="weather-logo" src={weatherLogo} alt="Icon representing weather" />
                <ScreenTitle />
                <GeneralButton content="Login" sidePadding={20} />
                <GeneralButton content="Order" sidePadding={20} />
                <GeneralButton content="Options" sidePadding={20} />
            </div>
            <div className="menu-categories">
                <h2 id="sandwich-category">Sandwiches</h2>
                <h2 id="everyday-category">Everyday</h2>
                <h2 id="seasonal-category">Seasonal</h2>
                <h2 id="dairy-free-vegan-category">Dairy Free/Vegan</h2>
                <h2 id="beverages-category">Beverages</h2>
            </div>
            <img src={menuBackground} alt="menu background depicting ice cream cone pattern" className="testing" />
        </div>
    );
}

export default MenuView;