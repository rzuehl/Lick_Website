/* ManagerButton.js
 * React component rendering manager button
*/

import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ManagerButton is a custom component rendering buttons for the manager page
 * @param {object} props - Javascript object containing passed in props into GeneralButton component
 * @property {string} props.content - string representing text content of button
 * @property {string} props.reference - string representing content that button references to
 * @property {number} props.sidePadding - number setting side padding of button
 */
function EmployeeButton(props) {
    var tempStyle = {};

    if (!(props.style === undefined)) {
        tempStyle = props.style;
    }

    const styles = {
        ...tempStyle,
        textDecoration: props.textDecoration,
    }; 

    let className = "employeeButton " + props.employeeType; 

    if (props.route) {
        return (
            <Link to={props.route} className={className} style={{alignItems: 'center', display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                {props.content}
            </Link>
        );   
    }
    else {
    
        let className = "employeeButton " + props.employeeType; 
        return (
            <button onClick={props.onClick} className= {className} style={styles}>
                {props.content}
            </button>
        );
    }

}

export default EmployeeButton;