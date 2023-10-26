/* GeneralButton.js
 * React component rendering general button
*/

import React from 'react';
import '../styles/index.css';
/**
 * GeneralButton is a custom component rendering basic buttons
 * @param {object} props - Javascript object containing passed in props into GeneralButton component
 * @property {string} props.content - string representing text content of button
 * @property {string} props.reference - string representing content that button references to
 * @property {number} props.sidePadding - number setting side padding of button
 */
function GeneralButton(props) {
const styles = {
    paddingLeft: props.sidePadding,
    paddingRight: props.sidePadding,
};

    return (
        <button className="buttonStyle" style={styles}>
            {props.content}
        </button>
    );
};

export default GeneralButton;