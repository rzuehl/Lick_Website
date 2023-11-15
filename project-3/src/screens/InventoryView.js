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
import EmployeeButton from '../components/EmployeeButton';


function InventoryView() {
    var buttonType = "manager"; 

    const handleViewInventory = () => {
        document.getElementById("ManagerText").innerText = "View Inventory";
    }

    const handleAddItem = () => {
        document.getElementById("ManagerText").innerText = "Add Item";
    }

    const handleEditItem = () => {
        document.getElementById("ManagerText").innerText = "Edit Item";
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
                <OptionsDropdown sidePadding={20}/>
            </div>
            <div className='Inventory'>
                <Grid container>
                    <Grid container xs={8} spacing={4} alignItems="center" justifyContent="center" direction="column">
                        <Grid item>
                            <EmployeeButton employeeType= {buttonType} onClick={handleViewInventory} content="View Inventory" />
                        </Grid>
                        <Grid item>
                            <EmployeeButton employeeType= {buttonType} onClick={handleAddItem} content="Add Item" />
                        </Grid>
                        <Grid item>
                            <EmployeeButton employeeType= {buttonType} onClick={handleEditItem} content="Edit Item" />
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

export default InventoryView;