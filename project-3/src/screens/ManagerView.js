/* ManagerView.js
 * React component rendering screen for managers
 * Uses the following external custom comopnents:
 * - General Button
 * - Manager Button
 * - ScreenTitle
*/

import React from 'react';
import GeneralButton from '../components/GeneralButton';
import OptionsDropdown from '../components/OptionsDropdown';
import EmployeeButton from '../components/EmployeeButton';
// import HamburgerButton from '../components/HamburgerButton';
import ScreenTitle from '../components/ScreenTitle';
import WeatherIcon from '../components/WeatherIcon';
// import weatherLogo from '../assets/weather-icon.png';
import { Grid, TextField } from '@mui/material';
import api from '../api/posts';
import ManagerDialog from '../components/ManagerDialog';


function ManagerView() {
    var buttonType = "manager"; 
    let mode = 0;
    const [open, setOpen] = React.useState(false);
    const [startDate, setStart] = React.useState('NULL');
    const [endDate, setEnd] = React.useState('NULL');
    const [managerText, setManagerText] = React.useState('');
    
    const handleInventoryManagement = async () => {
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

    const handleProductUsage = async () => {
        if ((startDate == "NULL" || endDate == "NULL") || (startDate == '' || endDate == '')){
            document.getElementById("ManagerText").innerText = "Please Enter a Valid Date Range";
            return;
        }

        const parameters = [startDate, endDate];
        await api.post('/productUsage', parameters)
        .then((response) => {
            let output = "";
            for (let index = 0; index < Object.keys(response.data).length; index++) {
                let tempString = response.data[index].date.substring(0,10) + " " + response.data[index].products_sold + "\n";
                output += tempString;
            }
            document.getElementById("ManagerText").innerText = output;
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleSalesReport = async () => {
        if ((startDate == "NULL" || endDate == "NULL") || (startDate == '' || endDate == '')){
            document.getElementById("ManagerText").innerText = "Please Enter a Valid Date Range";
            return;
        }
        
        const parameters = [startDate, endDate];
        await api.post('/getSales', parameters)
        .then((response) => {
            let output = "";
            for (let index = 0; index < Object.keys(response.data).length; index++) {
                let tempString = response.data[index].food_name + " " + response.data[index].food_type + " Was sold " + response.data[index].num_sales + " times.\n";
                output += tempString;
            }
            document.getElementById("ManagerText").innerText = output;
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleExcessReport = async () => {
        if (startDate == "NULL"|| startDate == ''){
            document.getElementById("ManagerText").innerText = "Please Enter a Valid Date Range";
            return;
        }
        
        try {
            //response returns a JSON format which can be accessed by response.data
            const response1 = await api.post('/excessReport', [startDate]);
            const response2 = await api.get('/inventory');

            let output = "";
            const inventory = new Map();
            //populate inventory map with food_id, quantity
            for (let index = 0; index < Object.keys(response2.data).length; index++) {
                inventory.set(response2.data[index].food_id, response2.data[index].quantity);
            }
            
            for (let index = 0; index < Object.keys(response1.data).length; index++) {
                //if num_sales / numsales + currQuantity < .10
                if (parseInt(response1.data[index].num_sales) / (parseInt(response1.data[index].num_sales) + parseInt(inventory.get(response1.data[index].food_id))) < .10) {
                    output += response1.data[index].food_name + "\n";
                }
            }

                document.getElementById("ManagerText").innerText = output;

            } catch (err) {
                console.log("FAIL");
            }
    }

    const handleRestockReport = async () => {
        await api.get('/restockReport')
        .then((response) => {
            let output = "";
            for (let index = 0; index < Object.keys(response.data).length; index++) {
                let tempString = response.data[index].food_type + " " + response.data[index].food_name + " " + response.data[index].quantity + "\n";
                output += tempString
            }
            document.getElementById("ManagerText").innerText = output;
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleOrderTrends = async () => {
        if ((startDate == "NULL" || endDate == "NULL") || (startDate == '' || endDate == '')){
            document.getElementById("ManagerText").innerText = "Please Enter a Valid Date Range";
            return;
        }
        
        const parameters = [startDate, endDate];
        await api.post('/orderTrends', parameters)
        .then((response) => {
            let output = "";
            for (let index = 0; index < 10; index++) {
                let tempString = response.data[index].item1_name + " and " + response.data[index].item2_name + " were sold together " + response.data[index].times_sold_together + " times.\n";
                output += tempString
            }
            document.getElementById("ManagerText").innerText = output;
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleDialogClose = () => {
        setOpen(false);
    }

    const handleConfirm = (values) => {
        setStart(values[0]);
        setEnd(values[1]);
        setOpen(false);
    }

    const openDialog = () => {
        setOpen(true);
    }

    return (
        <div>
            <ManagerDialog onClose={handleDialogClose} open={open} onConfirm={handleConfirm}></ManagerDialog>
            <div className="customer-header">
                <WeatherIcon />
                <GeneralButton content="Logout" sidePadding={20} route="/" />
                <ScreenTitle />
                <GeneralButton content="Order" sidePadding={20} route="/menu" />
                <OptionsDropdown sidePadding={20}/>
            </div>
            <div className='customer-header'>
                <p className='employeeText'>Current Date: {startDate} to {endDate}</p>
                <EmployeeButton employeeType= {buttonType} onClick={openDialog} content="Update Date Range" />
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
                        <p id='ManagerText' className='employeeText'>{managerText}</p>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default ManagerView;