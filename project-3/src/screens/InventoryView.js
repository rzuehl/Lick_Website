/* InventoryView.js
 * React component rendering screen for the manager-side inventory view
 * Uses the following external custom comopnents:
 * - General Button
 * - Manager Button
 * - ScreenTitle
*/

import React from 'react';
import GeneralButton from '../components/GeneralButton';
import HamburgerButton from '../components/HamburgerButton';
import ScreenTitle from '../components/ScreenTitle';
import weatherLogo from '../assets/weather-icon.png';
import { Grid } from '@mui/material';
import ManagerButton from '../components/ManagerButton';


function InventoryView() {
    return (
        <div>
            <div className="customer-header">
                <HamburgerButton />
                <GeneralButton content="Translate" sidePadding={35} />
                <img className="weather-logo" src={weatherLogo} alt="Icon representing weather"/>
                <ScreenTitle />
                <GeneralButton content="Login" sidePadding={20} />
                <GeneralButton content="Order" sidePadding={20} />
                <GeneralButton content="Options" sidePadding={20} />
            </div>
            <div className='Inventory'>
                <Grid container>
                    <Grid container xs={8} spacing={4} alignItems="center" justifyContent="center" direction="column">
                        <Grid item>
                            <ManagerButton content="View Inventory" />
                        </Grid>
                        <Grid item>
                            <ManagerButton content="Add Item" />
                        </Grid>
                        <Grid item>
                            <ManagerButton content="Edit Item" />
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <p className='ManagerText'>TEST</p>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default InventoryView;