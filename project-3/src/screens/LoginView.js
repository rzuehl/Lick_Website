/* CustomerView.js
 * React component rendering screen for customers/employees/managers to login
 * Uses the following external custom comopnents:
 * - General Button
 * - HamburgerButton
 * - ScreenTitle
*/

import React from 'react';
import GeneralButton from '../components/GeneralButton';
import HamburgerButton from '../components/HamburgerButton';

function LoginView() {
    return (
        <div>
            <div className="customer-header">
                <HamburgerButton />
                <GeneralButton content="Color" sidePadding={20} />
                {/* <GeneralButton content="Translate" sidePadding={35} /> */}
                {/* <GeneralButton content="Login" sidePadding={20} /> */}
                {/* <GeneralButton content="Options" sidePadding={20} /> */}
            </div>
        </div>
    );
};

export default LoginView;