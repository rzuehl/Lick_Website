/* MenuBoard.js
 * React component rendering screen for menu board
 * Uses the following external custom comopnents:
 * - General Button
*/

import React from 'react';
import '../styles/index.css';
import { List } from 'react-bootstrap-icons';
import GeneralButton from '../components/GeneralButton';

function MenuBoard() {
    return (
        <div className="header-container">
            <nav>
                <List />
            </nav>
            <GeneralButton content="Translate" sidePadding={40} />
            <GeneralButton content="Login" sidePadding={25} />
            <GeneralButton content="Order" sidePadding={25} />
            <GeneralButton content="Options" sidePadding={25} />

        </div>
    );
};

export default MenuBoard;