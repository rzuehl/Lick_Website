/* MenuTile.js
 * React component rendering tile for menu board
*/

import React from 'react';

/**
 * The MenuTile component is responsible for rendering an interactive tile
 * @param {object} props - Javascript object containing passed in props into GeneralButton component
 * @property {string} props.alt - String serving as alternate text for image of tile
 * @property {string} props.src - String containing source image to use for tile
 * @property {string} props.header - String uses as the header of the tile
 * @property {string} props.description - String used to present additional information when hovered on tile
 */
const MenuTile = (props) => {
    return (
            <div className="tile">
                <img src={props.src} alt={props.alt} />
                <div class="tile-intro">
                    <h1>{props.header}</h1>
                    <p>{props.description}</p>
                </div>
            </div>
    );
}

export default MenuTile;