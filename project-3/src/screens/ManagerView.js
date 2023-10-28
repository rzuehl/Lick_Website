/* ManagerView.js
 * React component rendering screen for managers
 * Uses the following external custom comopnents:
 * - General Button
 * - Manager Button
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

    const handleInventoryManagement = () => {
        document.getElementById("ManagerText").innerText = "Inventory Management";
    }

    const handleProductUsage = () => {
        document.getElementById("ManagerText").innerText = "Product Usage";
    }

    const handleSalesReport = () => {
        document.getElementById("ManagerText").innerText = "Sales Report";
    }

    const handleExcessReport = () => {
        document.getElementById("ManagerText").innerText = "Excess Report";
    }

    const handleRestockReport = () => {
        document.getElementById("ManagerText").innerText = "Restock Report";
    }

    const handleOrderTrends = () => {
        document.getElementById("ManagerText").innerText = "Order Trends";
    }

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
                            <ManagerButton onClick={handleInventoryManagement} content="Inventory Management" />
                        </Grid>
                        <Grid item xs={6}>
                            <ManagerButton onClick={handleProductUsage} content="Product Usage" />
                        </Grid>
                        <Grid item xs={6}>
                            <ManagerButton onClick={handleSalesReport} content="Sales Report" />
                        </Grid>
                        <Grid item xs={6}>
                            <ManagerButton onClick={handleExcessReport} content="Excess Report" />
                        </Grid>
                        <Grid item xs={6}>
                            <ManagerButton onClick={handleRestockReport} content="Restock Report" />
                        </Grid>
                        <Grid item xs={6}>
                            <ManagerButton onClick={handleOrderTrends} content="Order Trends" />
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <p id='ManagerText' className='ManagerText'>TEST</p>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default ManagerView;