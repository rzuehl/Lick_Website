import React from 'react';
import GeneralButton from '../components/GeneralButton';
import EmployeeButton from '../components/EmployeeButton.js';
import HamburgerButton from '../components/HamburgerButton';
import ScreenTitle from '../components/ScreenTitle';
import weatherLogo from '../assets/weather-icon.png';
import { Grid } from '@mui/material';


function CashierView() {
    let category_items = ["Everyday", "Seasonal", "Dairy Free/Vegan", "Sandwiches", "Toppings", "Beverages"];

    const handleCategoryItems = (event) => {
        document.getElementById("cashierText").innerText = event.target.textContent;
    }
    
    let num_category_items = category_items.length;
    var buttonType = "cashier";

    return (
        <>
            <div className="customer-header">
                <GeneralButton content="Translate" sidePadding={35} />
                <img className="weather-logo" src={weatherLogo} alt="Icon representing weather"/>
                <ScreenTitle />
                <GeneralButton content="Logout" sidePadding={20} />
                <GeneralButton content="Options" sidePadding={20} />
            </div>
            <div className='employeeUI'>
                <Grid container>
                    <Grid item xs={8} container spacing={8}>
                        {category_items.map((category_items) => (
                            <Grid item xs={4} key = {category_items}> 
                                <EmployeeButton employeeType = {buttonType} onClick ={handleCategoryItems} content={category_items}/>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item xs={4}>
                        <p id='cashierText' className='employeeText'>TEST</p>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default CashierView;