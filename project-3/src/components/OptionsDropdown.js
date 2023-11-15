/* OptionsDropdown.js
 * React component implementing GeneralDropdown with options specific to the Options menu
*/

import React from 'react';
import GeneralButton from "../components/GeneralButton";
import GeneralDropdown from '../components/GeneralDropdown';
import { toggleStyle } from "../App"

/**
 * OptionsDropdown is a custom component implementing GeneralDropdown with options specific to the Options menu
 * @param {object} props - Javascript object containing passed in props into OptionsDropdown component
 * @property {number} props.sidePadding - number setting side padding of button
 */
function OptionsDropdown(props) {
    return (
        <GeneralDropdown content="Options" sidePadding={props.sidePadding} 
            menu={[
                <GeneralButton onClick={toggleStyle} content="High Contrast Mode" />
            ]}
        />
    );
}

export default OptionsDropdown;