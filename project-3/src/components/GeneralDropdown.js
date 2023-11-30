/* GeneralDropdown.js
 * React component rendering general button
*/

import React from 'react';
import GeneralButton from "../components/GeneralButton";

/**
 * GeneralDropdown is a custom component rendering a dropdown menu that expands from a GeneralButton
 * @param {object} props - Javascript object containing passed in props into GeneralDropdown component
 * @property {string} props.content - string representing text content of button
 * @property {content_array} props.menu - array of contents to be displayed in the dropdown menu
 * @property {number} props.sidePadding - number setting side padding of button
 */
function GeneralDropdown(props) {
    const styles = {
        paddingLeft: props.sidePadding,
        paddingRight: props.sidePadding,
    };

    var [optionsOpen, setOptionsOpen] = React.useState(false);

    const handleOptionsOpen = () => {
        console.log("handling options open: " + !optionsOpen);
        setOptionsOpen(!optionsOpen);
    }
    
    return (
        <Dropdown 
            open={optionsOpen} 
            trigger={<GeneralButton onClick={handleOptionsOpen} content={props.content} sidePadding={props.sidePadding} />}
            menu={props.menu}
        />
    );
}

const Dropdown = ({open, trigger, menu}) => {
    return (
        <div className="dropdown" >
            {trigger}
            {open ? 
            <ul className="dropdown-content">
                {menu.map((menuItem, index) => (
                    <li key={index} className="menu-item">{menuItem}</li>
                ))}
            </ul>
            : null}
        </div>
    )
}

export default GeneralDropdown;