/* GeneralButton.js
 * React component rendering general input
*/

/**
 * 
 * @param {object} props - Javascript object containing passed in props into GeneralButton component
 * @property {string} props.content - String containing placeholder content of text input
 * @property {number} props.sidePadding - number setting side padding of textinput
 * @property {string} props.type - string depicting the input type
*/
const GeneralInput = (props) => {
    const styles = {
        paddingLeft: props.sidePadding,
        paddingRight: props.sidePadding,
    };

    return (
        <input className="input-style" placeholder={props.content} style={styles} type={props.type} />
    )
}

export default GeneralInput;