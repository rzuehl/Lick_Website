/* CustomerView.js
 * React component rendering screen for customers/employees/managers to login
 * Uses the following external custom comopnents:
 * - General Button
 * - HamburgerButton
 * - ScreenTitle
*/

import React from 'react';
import GeneralButton from '../components/GeneralButton';
// import HamburgerButton from '../components/HamburgerButton';
import ScreenTitle from '../components/ScreenTitle';

function LoginView() {
    return (
        <div>
            <div className="login-header">
                {/* <HamburgerButton /> */}
                <GeneralButton content="Translate" sidePadding={35} /> 
                <ScreenTitle />
                <GeneralButton content="Color" sidePadding={20} />
            </div>

            <div className="login-body">
                <GeneralButton content="Email Address/Username" sidePadding={20} />
                <GeneralButton content="Password" sidePadding={20} />
                <GeneralButton content="Login" sidePadding={20} />
            </div>

            <div className="login-text">
                Sign In
            </div>
        </div>
    );
};

export default LoginView;