/* OptionsDropdown.js
 * React component implementing GeneralDropdown with options specific to the Options menu
*/

import React from 'react';
import GeneralDropdown from '../components/GeneralDropdown';
import { toggleStyle } from "../App"
import { useState } from 'react';

/**
 * OptionsDropdown is a custom component implementing GeneralDropdown with options specific to the Options menu
 * @param {object} props - Javascript object containing passed in props into OptionsDropdown component
 * @property {number} props.sidePadding - number setting side padding of button
 */
function OptionsDropdown(props) {
    // const [inputText, setInputText] = useState('');
    // const [targetLanguage, setTargetLanguage] = useState('es'); // Default: Spanish

    // const handleTranslate = async () => {
    //     if (inputText) {
    //         const translatedText = await translateText(inputText, targetLanguage);
    //         console.log("translated text: " + translatedText);
    //         // Do something with the translatedText, e.g., display it on the page.
    //     }
    // };

    const google = window.google;

    return (
        <GeneralDropdown content="Options" sidePadding={props.sidePadding} 
            menu={[
                <OptionButton onclick={toggleStyle} content="High Contrast Mode" />,
                
            ]}
        />
    );
}

// Translate API key:
// AIzaSyAjsTytVyEbN9Ap81tqiuW8zVcoycN_oP4

const OptionButton = ({onclick, content}) => {
    return (
        <a onClick={onclick}>{content}</a>
    )
}

export default OptionsDropdown;