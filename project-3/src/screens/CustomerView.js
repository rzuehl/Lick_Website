/* CustomerView.js
 * React component rendering screen for customers
 * Uses the following external custom comopnents:
 * - General Button
 * - HamburgerButton
 * - ScreenTitle
*/

import React from 'react';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import OptionsDropdown from '../components/OptionsDropdown';
import ImageSlider from '../components/ImageSlider';
import WeatherIcon from '../components/WeatherIcon';
import ScreenTitle from '../components/ScreenTitle';
import TranslateWindow from '../components/TranslateWindow';
// import lickLogo from '../assets/lick-honest-logo.png';
// import weatherLogo from '../assets/weather-icon.png';
import pumpkinImage from '../assets/pumpkin-pic.png';
import cowImage from '../assets/cow-pic.png';
import storeImage from '../assets/store-pic.png';

function CustomerView(props) {
    const slides = [
        { image: pumpkinImage, textContent: "Fall Specials", altText: "Image of several pumpkins with icecream." },
        { image: cowImage, textContent: "KNOW WHAT YOUR LICKING", altText: "Image of various cows" },
        { image: storeImage, textContent: "Come visit us!", altText: "Image of Lick Honest Ice Cream College Station location" }
    ]

    return (
        <div className={props.className}>
            <div className="customer-header">
                <WeatherIcon />
                <GeneralButton content="Login" sidePadding={20} route="/login" />
                <ScreenTitle />
                <GeneralButton content="Order" sidePadding={20} route="/menu" />
                <OptionsDropdown sidePadding={20}/>
                <TranslateWindow />
            </div>
            <div>
                <ImageSlider slides={slides} />
            </div>
            <div className="about-us-container">
                <div className="about-us-intro">
                    <div className="about-us-header">
                        <h2>About</h2>
                        <h2>Us</h2>
                    </div>
                    <p>KNOW WHAT YOUR LICKING!</p>
                </div>
                <div className="vertical-line"></div>
                <div className="about-us-text">
                    <p>
                        To us, "honest" simply means we use the purest ingredients we can find in our artisanal ice creams. What doesn’t go into our ice creams
                         is just as important as what does. We never use artificial colors or flavors, high fructose corn syrup or preservatives, ever! We can 
                         trace every single ingredient we use to its source. Ice cream shouldn’t just taste good — we believe it should also be good.
                    </p>
                    <p>
                        We take great pride in witnessing our milk and cream as it journeys from the cow to your scoop. All of the milk and cream used to make 
                        our ice creams comes from single herd, family-owned farms where the welfare of their grass-fed cows is the highest priority. All of our 
                        sauces, cookie crumbles and inclusions are made in house, by hand. We churn every batch and hand pack each pint by hand in our kitchen. 
                        We roll each waffle cone made from our homemade recipe in our shops every single day. All in an effort to serve up the freshest, most honest ice creams possible. 
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomerView;