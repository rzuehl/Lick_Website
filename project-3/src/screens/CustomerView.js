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
import ImageSlider from '../components/ImageSlider';
import ScreenTitle from '../components/ScreenTitle';
import weatherLogo from '../assets/weather-icon.png';
import pumpkinImage from '../assets/pumpkin-pic.png';
import cowImage from '../assets/cow-pic.png';
import storeImage from '../assets/store-pic.png';

function CustomerView() {
    const slides = [
        {image: pumpkinImage, textContent: "Fall Specials", altText: "Image of several pumpkins with icecream."},
        {image: cowImage, textContent: "KNOW WHAT YOUR LICKING", altText: "Image of various cows"},
        {image: storeImage, textContent: "Come visit us!", altText: "Image of Lick Honest Ice Cream College Station location"}
    ]



    return (
        <div>
            <div className="customer-header">
                <HamburgerButton />
                <GeneralButton content="Translate" sidePadding={35} />
                <img className="weather-logo" src={weatherLogo} alt="Icon representing weather"/>
                <ScreenTitle />
                <GeneralButton content="Login" sidePadding={20} />
                <GeneralButton content="Order" sidePadding={20} />
                <GeneralButton content="Options" sidePadding={20} />
            </div>
            <ImageSlider slides={slides} />
        </div>
    );
};

export default CustomerView;