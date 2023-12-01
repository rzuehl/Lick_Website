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
import HamburgerButton from '../components/HamburgerButton';
import ScreenTitle from '../components/ScreenTitle';
import weatherLogo from '../assets/weather-icon.png';
import { Grid } from '@mui/material';
import api from '../api/posts';
import ManagerDialog from '../components/ManagerDialog';
import InventoryTable from '../components/InventoryTable';


function ManagerView() {
    var buttonType = "manager"; 
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState('Start');
    const [startDate, setStart] = React.useState('Enter Start Date');
    const [endDate, setEnd] = React.useState('Enter End Date');
    const [tableData, setTableData] = React.useState([
        {key: "Please Enter a Valid Date Range for Analysis"}
    ])
    const [tableColumns, setTableColumns] = React.useState(["key"]);
    const [tableHeader, setTableHeader] = React.useState([]);

    const invalidRange = () => {
        setTableData([
            {key: "Please Enter a Valid Date Range for Analysis"}
        ]);
        setTableColumns(["key"]);
        setTableHeader([]);
    }

    const handleProductUsage = async () => {
        if ((startDate === "Enter Start Date" || endDate === "Enter End Date") || (startDate === '' || endDate === '')){
            invalidRange();
            return;
        }

        const parameters = [startDate, endDate];
        await api.post('/productUsage', parameters)
        .then((response) => {
            setTableHeader(["Date", "Items Sold"])
            setTableColumns(["date", "products_sold"]);
            let tempData = [];
            for (let index = 0; index < Object.keys(response.data).length; index++) {
                tempData.push({date: response.data[index].date.substring(0,10), products_sold: response.data[index].products_sold});
            }
            setTableData(tempData);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleSalesReport = async () => {
        if ((startDate === "Enter Start Date" || endDate === "Enter End Date") || (startDate === '' || endDate === '')){
            invalidRange();
            return;
        }
        
        const parameters = [startDate, endDate];
        await api.post('/getSales', parameters)
        .then((response) => {
            setTableHeader(["Food Name", "Food Type", "Sales"])
            setTableColumns(["food_name", "food_type", "num_sales"]);
            let tempData = [];
            for (let index = 0; index < Object.keys(response.data).length; index++) {
                tempData.push(response.data[index]);
            }
            setTableData(tempData);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleExcessReport = async () => {
        if (startDate === "Enter Start Date"|| startDate ===''){
            invalidRange();
            return;
        }
        
        try {
            //response returns a JSON format which can be accessed by response.data
            const response1 = await api.post('/excessReport', [startDate]);
            const response2 = await api.get('/inventory');

            setTableHeader(["Items in Excess"])
            setTableColumns(["food_name"]);
            let tempData = [];
            const inventory = new Map();
            //populate inventory map with food_id, quantity
            for (let index = 0; index < Object.keys(response2.data).length; index++) {
                inventory.set(response2.data[index].food_id, response2.data[index].quantity);
            }
            
            for (let index = 0; index < Object.keys(response1.data).length; index++) {
                //if num_sales / numsales + currQuantity < .10
                if (parseInt(response1.data[index].num_sales) / (parseInt(response1.data[index].num_sales) + parseInt(inventory.get(response1.data[index].food_id))) < .10) {
                    tempData.push(response1.data[index]);
                }
            }
            setTableData(tempData);
            } catch (err) {
                console.log("FAIL");
            }
    }

    const handleRestockReport = async () => {
        await api.get('/restockReport')
        .then((response) => {
            setTableHeader(["Food Type", "Item to be Restocked", "Current Quantity"])
            setTableColumns(["food_type", "food_name", "quantity"]);
            let tempData = [];
            for (let index = 0; index < Object.keys(response.data).length; index++) {
                tempData.push(response.data[index]);
            }
            setTableData(tempData);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleOrderTrends = async () => {
        if ((startDate === "Enter Start Date" || endDate === "Enter End Date") || (startDate === '' || endDate === '')){
            invalidRange();
            return;
        }
        
        const parameters = [startDate, endDate];
        await api.post('/orderTrends', parameters)
        .then((response) => {
            setTableHeader(["Item 1", "Item 2", "Times Sold Together"])
            setTableColumns(["item1_name", "item2_name", "times_sold_together"]);
            let tempData = [];
            for (let index = 0; index < 10; index++) {
                tempData.push(response.data[index]);
            }
            setTableData(tempData);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleDialogClose = () => {
        setOpen(false);
    }

    const handleConfirm = (value) => {
        if (value === '') {
            return;
        }
        if (date === 'Start') {
            setStart(value);
        }
        else {
            setEnd(value);
        }
        setOpen(false);
    }

    const openDialogStart = () => {
        setDate('Start');
        setOpen(true);
    }

    const openDialogEnd = () => {
        setDate('End');
        setOpen(true);
    }

    return (
        <div>
            <ManagerDialog onClose={handleDialogClose} open={open} onConfirm={handleConfirm} date={date}></ManagerDialog>
            <div className="customer-header">
                <HamburgerButton />
                <GeneralButton content="Translate" sidePadding={35} />
                <img className="weather-logo" src={weatherLogo} alt="Icon representing weather"/>
                <ScreenTitle />
                <GeneralButton content="Logout" sidePadding={20} route="/"/>
                <GeneralButton content="Order" sidePadding={20} route="/menu"/>
                <OptionsDropdown sidePadding={20}/>
            </div>
            <div className='customer-header' style={{backgroundColor: '#FFC7C8', color: 'black', fontSize: 30, fontWeight: 'bold', height: 200}}>
                <p>Current Date: 
                    <EmployeeButton employeeType= {buttonType} onClick={openDialogStart} content={startDate} textDecoration={'underline'}/>
                    To
                    <EmployeeButton employeeType= {buttonType} onClick={openDialogEnd} content={endDate} textDecoration={'underline'}/>
                </p>
            </div>
            <body style={{margin: 0, display: 'flex', height: "90vh"}}>
                <div style={{display: 'flex', flexDirection: 'column', marginLeft:100, marginRight: 100, marginTop: 50, marginBottom: 50}}>
                    <EmployeeButton employeeType= {buttonType}  route="/inventory" content="Inventory Management" />    
                    <br/>
                    <EmployeeButton employeeType= {buttonType} onClick={handleProductUsage} content="Product Usage" />
                    <br/>
                    <EmployeeButton employeeType= {buttonType} onClick={handleSalesReport} content="Sales Report" />
                    <br/>
                    <EmployeeButton employeeType= {buttonType} onClick={handleExcessReport} content="Excess Report" />
                    <br/>
                    <EmployeeButton employeeType= {buttonType} onClick={handleRestockReport} content="Restock Report" />
                    <br/>
                    <EmployeeButton employeeType= {buttonType} onClick={handleOrderTrends} content="Order Trends" />
                </div>
                <div style={{flex: 1, marginRight: 50}}>
                    <InventoryTable foodData={tableData} columns={tableColumns} columnHeader={tableHeader}></InventoryTable>
                </div>
            </body>
        </div>
    );
};

export default ManagerView;