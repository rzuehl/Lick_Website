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
        if ((startDate == null || endDate == null) || (startDate == '' || endDate == '')){
            document.getElementById("ManagerText").innerText = "Please Enter a Valid Date Range";
            return;
        }
        
        const parameters = [startDate, endDate];
        api.post('/productUsage', parameters)
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

    const handleSalesReport = () => {
        if ((startDate == null || endDate == null) || (startDate == '' || endDate == '')){
            document.getElementById("ManagerText").innerText = "Please Enter a Valid Date Range";
            return;
        }
        
        const parameters = [startDate, endDate];
        api.post('/getSales', parameters)
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

    const handleExcessReport = () => {

    }

    const handleRestockReport = () => {
        api.get('/restockReport')
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

    const handleOrderTrends = () => {
        if ((startDate == null || endDate == null) || (startDate == '' || endDate == '')){
            document.getElementById("ManagerText").innerText = "Please Enter a Valid Date Range";
            return;
        }
        
        const parameters = [startDate, endDate];
        api.post('/orderTrends', parameters)
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
                <HamburgerButton />
                <GeneralButton content="Translate" sidePadding={35} />
                <img className="weather-logo" src={weatherLogo} alt="Icon representing weather"/>
                <ScreenTitle />
                <GeneralButton content="Logout" sidePadding={20} route="/"/>
                <GeneralButton content="Order" sidePadding={20} route="/menu"/>
                <GeneralButton content="Options" sidePadding={20} />
            </div>
            <div className='customer-header'>
                <p className='employeeText'>Current Date: {startDate} to {endDate}</p>
                <EmployeeButton employeeType= {buttonType} onClick={openDialog} content="Update Date range" />
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