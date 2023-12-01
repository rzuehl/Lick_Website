import React from 'react';
import { useState, useEffect } from "react";
import GeneralButton from '../components/GeneralButton';
import OptionsDropdown from '../components/OptionsDropdown';
import EmployeeButton from '../components/EmployeeButton.js';
import ScreenTitle from '../components/ScreenTitle';
// import weatherLogo from '../assets/weather-icon.png';
import WeatherIcon from '../components/WeatherIcon.js';
import { Grid } from '@mui/material';
import api from '../api/posts';
var isCategory = false;
var category = "";
var subtotal = 0;
var tax = 0;
var total = 0;
function CashierView() {
    
    
    
    var categoryItemArray = [];
    const [categoryItemArrayState, setCategoryItemArrayState] = useState(categoryItemArray);

    const handleCategoryItems = (event) => {
        let eventString = "";
        if(event != null){
            eventString = event.target.textContent;
        }
        const fetchCategories = async () => {
            try{
                if(event != null){
                    const responseCost = await api.get('/cost', {params: {foodName: eventString.replace(/'/g, "''"), foodType: category}});
                    subtotal += responseCost.data[0].food_price;
                    tax = subtotal * .05;
                    total = subtotal + tax;
                    document.getElementById('cashierText').innerText += eventString + " | " + responseCost.data[0].food_price + "\n";
                    document.getElementById('subtotal').innerText = "Subtotal: " + subtotal.toFixed(2);
                    document.getElementById('tax').innerText = "Tax: " + tax.toFixed(2);
                    document.getElementById('total').innerText = "Total: " + total.toFixed(2);
                }
                const responseCategories = await api.get('/category');
                categoryItemArray = responseCategories.data.map(item => item.food_type);
                setCategoryItemArrayState(categoryItemArray);
            }
            catch (err) {
                console.log(err);
            }
        }
        const fetchItems = async () => {
            category = eventString;
            try{
                const responseItems = await api.get('/foodItems', {params: {category: eventString}});
                categoryItemArray = responseItems.data.map(item => item.food_name);
                setCategoryItemArrayState(categoryItemArray);
 
            }
            catch (err) {
                console.log(err);
            }
        }
        if(isCategory){
            fetchItems();
            isCategory = false;
        }
        else{
            fetchCategories();
            isCategory = true;
        }
    };

    useEffect(() => {
        if(isCategory){
           isCategory = false; 
        }
        handleCategoryItems(null);
    }, []);

    var buttonType = "cashier";

    return (
        <>
            <div className="customer-header">
                <WeatherIcon />
                <GeneralButton content="Logout" sidePadding={20} route="/" />
                <ScreenTitle />
                <GeneralButton content="Order" sidePadding={20} route="/menu" />
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
                        <p id='cashierText' className='employeeText'>Order: <br></br></p>
                        <p id='subtotal' style={{textAlign: 'center', color: 'black'}}>Subtotal: </p>
                        <p id='tax' style={{textAlign: 'center', color: 'black'}}>Tax: </p>
                        <p id='total' style={{textAlign: 'center', color: 'black'}}>Total: </p>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default CashierView;