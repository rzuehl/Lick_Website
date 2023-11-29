/* MenuTile.js
 * React component rendering tile for menu board
*/

import React from 'react';
import GeneralButton from '../components/GeneralButton';

/**
 * The MenuTile component is responsible for rendering an interactive tile
 * @param {object} props - Javascript object containing passed in props into GeneralButton component
 * @property {string} props.alt - String serving as alternate text for image of tile
 * @property {string} props.src - String containing source image to use for tile
 * @property {string} props.header - String uses as the header of the tile
 * @property {string} props.description - String used to present additional information when hovered on tile
 * @property {number} props.itemPrice - number representing price of item
 */
const MenuTile = (props) => {
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
                        />
                    </section>
                </div>
            </div>
    );
}

export default MenuTile;