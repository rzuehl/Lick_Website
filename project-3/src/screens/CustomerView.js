/* CustomerView.js
 * React component rendering screen for customers
 * Uses the following external custom comopnents:
 * - General Button
 * - HamburgerButton
 * - ScreenTitle
*/

import React from 'react';
import GeneralButton from '../components/GeneralButton';
import HamburgerButton from '../components/HamburgerButton';
import ScreenTitle from '../components/ScreenTitle';
import weatherLogo from '../assets/weather-icon.png';

function CustomerView() {
    return (
        <div className="customer-header">
            <HamburgerButton />
            <GeneralButton content="Translate" sidePadding={35} />
            <img className="weather-logo" src={weatherLogo} alt="Icon representing weather"/>
            <ScreenTitle />
            <GeneralButton content="Login" sidePadding={20} />
            <GeneralButton content="Order" sidePadding={20} />
            <GeneralButton content="Options" sidePadding={20} />

        </div>
    );
};

export default CustomerView;