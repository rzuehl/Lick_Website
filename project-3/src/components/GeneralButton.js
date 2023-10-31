/* GeneralButton.js
 * React component rendering general button
*/

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * GeneralButton is a custom component rendering basic buttons
 * @param {object} props - Javascript object containing passed in props into GeneralButton component
 * @property {string} props.content - string representing text content of button
 * @property {string} props.route - string representing content that routes to screen
 * @property {number} props.sidePadding - number setting side padding of button
 */
function GeneralButton(props) {
    const styles = {
        paddingLeft: props.sidePadding,
        paddingRight: props.sidePadding,
    };

    // uses react routing to route to next screen if route prop is provided
    if (props.route) {
        return (
            <Link to={props.route} className="buttonStyle" style={styles}>
                {props.content}
            </Link>
        );
    }
    else {
        return (
            <button className="buttonStyle" style={styles}>
                {props.content}
            </button>
        ); 
    }
}

export default GeneralButton;