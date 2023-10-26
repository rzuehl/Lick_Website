/* HamburgerButton.js
 * Renders hamburger button uses to toggle navigation
*/

import React from 'react';
import { List } from 'react-bootstrap-icons';

/**
 * Renders hamburger button to be used within nav
 */
function HamburgerButton() {
    return (
        <List className="hamburger-button" />
    );
};

export default HamburgerButton;