import React from 'react';
import { useState } from "react";
import GeneralButton from '../components/GeneralButton';
import EmployeeButton from '../components/EmployeeButton.js';
import ScreenTitle from '../components/ScreenTitle';
import weatherLogo from '../assets/weather-icon.png';
import { Grid } from '@mui/material';
import api from '../api/posts';
var category = false;
function CashierView() {
    
    var categoryItemArray = ["Test"];
    const [categoryItemArrayState, setCategoryItemArrayState] = useState(categoryItemArray);

    const handleCategoryItems = (event) => {
        let eventString = event.target.textContent;
        const fetchCategory = () => {
                let tempCategortItemArray = [];
                api.post('/category')
                .then((response) => {
                        for (let index = 0; index < Object.keys(response.data).length; index++) {
                            tempCategortItemArray[index] = response.data[index].food_type;
                        }
                        categoryItemArray = tempCategortItemArray;
                    })
                .catch((error) => {
                    console.log(error);
                });
        }
        const fetchItems = () => {
                let tempCategortItemArray = [];
                api.post('/foodItems', [eventString])
                .then((response) => {
                        for (let index = 0; index < Object.keys(response.data).length; index++) {
                            tempCategortItemArray[index] = response.data[index].food_name;
                        }
                        categoryItemArray = tempCategortItemArray;
                    })
                .catch((error) => {
                    console.log(error);
                });
        }
        if(category){
            fetchItems();
            category = false;
            console.log("fetchItems()")
        }
        else{
            fetchCategory();
            category = true;
            console.log("fetchCategory()")
        }
        for(let i = 0; i<categoryItemArray.length; i++){
            console.log(categoryItemArray[i]);
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
                <GeneralButton content="Options" sidePadding={20} />
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