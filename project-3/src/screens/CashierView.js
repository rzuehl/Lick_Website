import React from 'react';
import { useState } from "react";
import GeneralButton from '../components/GeneralButton';
import OptionsDropdown from '../components/OptionsDropdown';
import EmployeeButton from '../components/EmployeeButton.js';
import HamburgerButton from '../components/HamburgerButton';
import ScreenTitle from '../components/ScreenTitle';
import weatherLogo from '../assets/weather-icon.png';
import { Grid } from '@mui/material';

function CashierView() {
    
    var categoryItemArray = ["Everyday", "Seasonal", "Dairy Free/Vegan", "Sandwiches", "Toppings", "Beverages"];
    const [categoryItemArrayState, setCategoryItemArrayState] = useState(categoryItemArray);


    const handleCategoryItems = (event) => {
        let eventString = event.target.textContent;
        if(eventString === "Everyday"){
            document.getElementById("cashierText").innerHTML = eventString;
            categoryItemArray = ["Caramel Salt Lick", 
            "Coffee with Cream",
            "Dark Chocolate, Olive Oil & Sea Salt", 
            "Fresh Mint & Chocolate Chunk", 
            "Goat Cheese, Thyme & Honey", 
            "Hill Country Honey & Vanilla Bean", 
            "Roasted Beets & Fresh Mint",
            "Milk Chocolate", 
            "Texas Sheet Cake"];
        }
        else if(eventString === "Seasonal"){
            categoryItemArray = ["Hazel's Pumpkin Pie", "Caramel Apple Cake", "Date Pudding Cake (v)"];
        }
        else if(eventString === "Dairy Free/Vegan"){
            categoryItemArray = ["Honey Sunbutter", "NEW! Vanilla Pear Cake"];
        }
        else if(eventString === "Sandwiches"){
            categoryItemArray = ["Caramel Salt Lick", "Hill Country Honey & Vanilla Bean", "Vegan Vanilla", "Dark Chocolate, Olive Oil & Sea Salt"];
        }
        else if(eventString === "Toppings"){
            categoryItemArray = ["Chocolate Sauce", 
            "Caramel Sauce", 
            "Toasted Texas Pecans", 
            "Chocolate Cookie Crumble", 
            "Rainbow Sprinkles", 
            "Strawberry", 
            "Whipped Cream"];
        }
        else if(eventString === "Beverages"){
            categoryItemArray = ["Southside Craft Soda", "Cold Brew High Brew Coffee", "Nitro Coffee High Brew Coffee", "Richard’s Rainwater"];
        }
        else{
            document.getElementById("cashierText").innerHTML = eventString;
            categoryItemArray = ["Everyday", "Seasonal", "Dairy Free/Vegan", "Sandwiches", "Toppings", "Beverages"];
        }
    };

    var buttonType = "cashier";

    return (
        <>
            <div className="customer-header">
                <GeneralButton content="Translate" sidePadding={35} />
                <img className="weather-logo" src={weatherLogo} alt="Icon representing weather"/>
                <ScreenTitle />
                <GeneralButton content="Logout" sidePadding={20} route="/"/>
                <OptionsDropdown sidePadding={20}/>
            </div>
            <div className='employeeUI'>
                <Grid container>
                    <Grid item xs={8} container spacing={8}>
                        {categoryItemArrayState.map((categoryItem) => (
                            <Grid item xs={4} key = {categoryItem}> 
                                <EmployeeButton 
                                employeeType = {buttonType} 
                                onClick ={(event) => {
                                    handleCategoryItems(event);
                                    setCategoryItemArrayState(categoryItemArray);
                                  }} 
                                content={categoryItem}/>
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