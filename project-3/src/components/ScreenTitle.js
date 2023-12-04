/* ScreenTitle.js
 * Renders screen title of screen
*/

import React from 'react';
import { Link } from 'react-router-dom';

function ScreenTitle() {
    return (
        <Link to="/" className="screen-title-container">
            <h1>LICK HONEST</h1>
            <h1>ICE CREAM</h1>
        </Link>
    );
}

export default ScreenTitle;