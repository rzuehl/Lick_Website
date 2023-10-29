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
 * @property {string} props.employeeType - string representing the type of the button (cashier/manager)
 */
function EmployeeButton(props) {
const styles = {
};
    let className = "employeeButton " + props.employeeType; 
    return (
        <button onClick={props.onClick} className= {className} style={styles}>
            {props.content}
        </button>
    );
}

export default EmployeeButton;