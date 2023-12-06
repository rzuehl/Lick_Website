/* MenuTile.js
 * React component rendering tile for menu board
*/

import React, { useState, useEffect } from 'react';
import GeneralButton from '../components/GeneralButton';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoCloseSharp } from "react-icons/io5";

/**
 * The MenuTile component is responsible for rendering an interactive tile
 * @param {object} props - Javascript object containing passed in props into GeneralButton component
 * @property {string} props.alt - String serving as alternate text for image of tile
 * @property {string} props.src - String containing source image to use for tile
 * @property {string} props.header - String uses as the header of the tile
 * @property {string} props.description - String used to present additional information when hovered on tile
 * @property {number} props.itemPrice - number representing price of item
 * @property {function} props.buttonFunction - function to be executed when add item button is pressed
 * @property {Array} props.toppingsArray - array holding all available topping data
 * @property {function} props.sendToParent - function sends data to parent component
 * 
 */
const MenuTile = (props) => {
    const [open, setOpen] = React.useState(false);

    const [selectedToppings, setSelectedToppings] = useState([]);

    const handleCheckboxChange = (toppingItem) => {
        // toggling topping in selectedToppings array
        setSelectedToppings((prevSelectedToppings) => prevSelectedToppings.includes(toppingItem) ? prevSelectedToppings.filter((selectedTopping) => selectedTopping !== toppingItem) : [...prevSelectedToppings, toppingItem]);
    };


    const handleOpen = () => {
      setOpen((prevState) => {
        //props.modelActive(!prevState);
        return !prevState;
      })
    }
    const handleClose = () => {
      setOpen(prevState => {
        //props.modelActive(!prevState);
        return !prevState;
      });
    };

    const handleSubmit = () => {
        handleClose();
        const itemObject = {
            image: props.src,
            description: props.description,
            name: props.header,
            price: props.itemPrice,
            quantity: 1,
            itemToppings: selectedToppings,
        };
        props.buttonFunction(itemObject);
    }

    const handleAddItemButton = () => {
        if (props.toppingsArray) {
            handleOpen();
        }
        else {
            const itemObject = {
                image: props.src,
                description: props.description,
                name: props.header,
                price: props.itemPrice,
                quantity: 1,
                itemToppings: selectedToppings,
            };
            props.buttonFunction(itemObject);
        }
    }

    return (
            <div className="tile">
                <img src={props.src} alt={props.alt} />
                <div className="tile-intro">
                    <div className='tile-header'>
                        <h1>{props.header}</h1>
                        <h1>{props.itemPrice}</h1>
                    </div>
                    <p>{props.description}</p>
                    <section className='tile-add-item'>
                        <GeneralButton 
                            content='Add Item'
                            sidePadding={20}
                            removeShadow={true}
                            onClick={handleAddItemButton}
                        />
                        {props.toppingsArray && <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box className="topping-modal">
                            <div className="topping-content-container">
                                <IoCloseSharp className="modal-button-position" onClick={handleClose} />
                                <div className="modal-content-container">
                                    <h1 className="modal-title">Select Desired Toppings</h1>
                                    <div className="modal-options">
                                        <form style={{ display: 'flex', flexDirection: 'row', flexWrap: "wrap", }} >
                                            {
                                                props.toppingsArray && (props.toppingsArray.map((toppingItem, index) => (
                                                    <div key={index} style={{flexBasis: '35%', margin: '10px',}} >
                                                        <input
                                                          type="checkbox"
                                                          id={toppingItem.food_name}
                                                          value={toppingItem.food_name}
                                                          checked={selectedToppings.includes(toppingItem)}
                                                          onChange={() => handleCheckboxChange(toppingItem)}
                                                        />
                                                        <label htmlFor={toppingItem.food_name}>{toppingItem.food_name}</label>
                                                    </div>
                                                )))
                                            }
                                        </form>
                                        <div className="modal-button">
                                            <GeneralButton content="Add Toppings" sidePadding={75} onClick={handleSubmit} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </Box>
                        </Modal>}
                    </section>
                </div>
            </div>
    );
}

export default MenuTile;