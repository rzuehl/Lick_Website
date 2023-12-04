/* CustomerView.js
 * React component rendering screen for customers/employees/managers to login
 * Uses the following external custom comopnents:
 * - General Button
 * - HamburgerButton
 * - ScreenTitle
 * - GeneralInput
*/

import React from 'react';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
import GeneralInput from '../components/GeneralInput';
import OptionsDropdown from '../components/OptionsDropdown';
import ScreenTitle from '../components/ScreenTitle';
import WeatherIcon from '../components/WeatherIcon';
// import lickLogo from '../assets/lick-honest-logo.png';
// import weatherLogo from '../assets/weather-icon.png';

function LoginView() {
    return (
        <div>
            <div className="login-header">
            <WeatherIcon />
                <GeneralButton content="Login" sidePadding={20} route="/login" />
                <ScreenTitle />
                <GeneralButton content="Order" sidePadding={20} route="/menu" />
                <OptionsDropdown sidePadding={20}/>
            </div>

            <div className="login-main">
                <div className="log-text">
                    <h1>Sign In</h1>
                </div>
                <div className="log-body">
                    <div className="log-body-content">
                        <GeneralInput content="Email Address/Username" sidePadding={60} type="text" />
                        <GeneralInput content="Password" sidePadding={60} type="password" />
                        <GeneralButton content="Login Cashier" sidePadding={60} route="/cashier"/>
                        <GeneralButton content="Login Manager" sidePadding={60} route="/manager"/>
                    </div>
                </div>
            </div>
            {/*
            <div className="login-body">
                <GeneralInput content="Email Address/Username" sidePadding={20} type="text" />
                <GeneralInput content="Password" sidePadding={20} type="password" />
                <GeneralButton content="Login" sidePadding={20} />
            </div>

            <div className="login-text">
                Sign In
            </div>
            */}
        </div>
    );
};

export default LoginView;