/* ManagerButton.js
 * React component rendering manager button
*/

import React from 'react';

/**
 * ManagerButton is a custom component rendering buttons for the manager page
 * @param {object} props - Javascript object containing passed in props into GeneralButton component
 * @property {string} props.content - string representing text content of button
 * @property {string} props.reference - string representing content that button references to
 * @property {number} props.sidePadding - number setting side padding of button
 */
function ManagerButton(props) {
const styles = {
};

    return (
        <button onClick={props.onClick} className="managerButton" style={styles}>
            {props.content}
        </button>
    );
}

export default ManagerButton;