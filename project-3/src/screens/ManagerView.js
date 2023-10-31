/* ManagerView.js
 * React component rendering screen for managers
 * Uses the following external custom comopnents:
 * - General Button
 * - Manager Button
 * - ScreenTitle
*/

import React from 'react';
import GeneralButton from '../components/GeneralButton';
import EmployeeButton from '../components/EmployeeButton';
import HamburgerButton from '../components/HamburgerButton';
import ScreenTitle from '../components/ScreenTitle';
import weatherLogo from '../assets/weather-icon.png';
import { Grid } from '@mui/material';
import api from '../api/posts';


function ManagerView() {
    // Connect to database here
    // const { Client } = require('pg')
    // const client = new Client({
    // user: 'csce315_907_03user',
    // host: 'csce-315-db.engr.tamu.edu',
    // database: 'csce315_907_03userdb',
    // password: 'GMV36DzB',
    // port: 5432,
    // })
    // client.connect(function(err) {
    // if (err) throw err;
    // console.log("Connected!");
    // });

    var buttonType = "manager"; 

    const handleInventoryManagement = () => {
        // document.getElementById("ManagerText").innerText = "Inventory Management";
        // const res =  client.query("SELECT * FROM inventory");
        // console.log(res);
        const fetchInventory = async () => {
            try {
                //response returns a JSON format which can be accessed by response.data
                const response = await api.get('/inventory');
                let output = "";
                for (let index = 0; index < Object.keys(response.data).length; index++) {
                    let tempString = response.data[index].food_id + " " + response.data[index].food_type + " " + response.data[index].food_name + " " + response.data[index].quantity + " " + response.data[index].food_price + "\n";
                    output += tempString;
                }
                document.getElementById("ManagerText").innerText = output;
            } catch (err) {
                console.log("FAIL");
            }
        }
        fetchInventory();
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
                <GeneralButton content="Logout" sidePadding={20} route="/"/>
                <GeneralButton content="Order" sidePadding={20} />
                <GeneralButton content="Options" sidePadding={20} />
            </div>
            <div className='employeeUI'>
                <Grid container>
                    <Grid item xs={8} container spacing={8}>
                        <Grid item xs={6}>
                            <EmployeeButton employeeType= {buttonType}  onClick={handleInventoryManagement} content="Inventory Management" />
                        </Grid>
                        <Grid item xs={6}>
                            <EmployeeButton employeeType= {buttonType} onClick={handleProductUsage} content="Product Usage" />
                        </Grid>
                        <Grid item xs={6}>
                            <EmployeeButton employeeType= {buttonType} onClick={handleSalesReport} content="Sales Report" />
                        </Grid>
                        <Grid item xs={6}>
                            <EmployeeButton employeeType= {buttonType} onClick={handleExcessReport} content="Excess Report" />
                        </Grid>
                        <Grid item xs={6}>
                            <EmployeeButton employeeType= {buttonType} onClick={handleRestockReport} content="Restock Report" />
                        </Grid>
                        <Grid item xs={6}>
                            <EmployeeButton employeeType= {buttonType} onClick={handleOrderTrends} content="Order Trends" />
                        </Grid> 
                    </Grid> 
                    <Grid item xs={4}>
                        <p id='ManagerText' className='employeeText'>TEST</p>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default ManagerView;