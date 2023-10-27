/* ManagerView.js
 * React component rendering screen for managers
 * Uses the following external custom comopnents:
 * - General Button
 * - ScreenTitle
*/

import React from 'react';
import GeneralButton from '../components/GeneralButton';
import ManagerButton from '../components/ManagerButton';
import HamburgerButton from '../components/HamburgerButton';
import ScreenTitle from '../components/ScreenTitle';
import weatherLogo from '../assets/weather-icon.png';
import { Grid } from '@mui/material';


function ManagerView() {
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
            <div className='ManagerUI'>
                <Grid container>
                    <Grid item xs={8} container spacing={8}>
                        <Grid item xs={6}>
                            <ManagerButton content="Inventory Management" />
                        </Grid>
                        <Grid item xs={6}>
                            <ManagerButton content="Product Usage" />
                        </Grid>
                        <Grid item xs={6}>
                            <ManagerButton content="Sales Report" />
                        </Grid>
                        <Grid item xs={6}>
                            <ManagerButton content="Excess Report" />
                        </Grid>
                        <Grid item xs={6}>
                            <ManagerButton content="Restock Report" />
                        </Grid>
                        <Grid item xs={6}>
                            <ManagerButton content="Order Trends" />
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

export default ManagerView;