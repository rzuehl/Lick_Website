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
import ScreenTitle from '../components/ScreenTitle';
import lickLogo from '../assets/lick-honest-logo.png';
import weatherLogo from '../assets/weather-icon.png';

function LoginView() {
    return (
        <div>
            <div className="login-header">
                <Link to="/">
                    <img className="lick-logo" src={lickLogo} alt="Representing Lick Honest Icecream Customer Logo" />                
                </Link>
                <GeneralButton content="Translate" sidePadding={35} /> 
                <img className="weather-logo" src={weatherLogo} alt="Icon representing weather" />
                <ScreenTitle />
                <GeneralButton content="Login" sidePadding={20} route="/login" />
                <GeneralButton content="Order" sidePadding={20} route="/menu" />
                <GeneralButton content="Options" sidePadding={20} />
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