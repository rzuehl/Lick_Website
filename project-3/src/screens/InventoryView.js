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
import OptionsDropdown from '../components/OptionsDropdown';
import api from '../api/posts';
import AddItem from '../components/AddItem';


function InventoryView() {
    var buttonType = "manager";
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);

    const openDialogAdd = () => {
        setOpenAdd(true);
    }

    const closeDialogAdd = () => {
        setOpenAdd(false);
    }

    const confirmDialogAdd = async (values) => {
        try {
            let foodType = values[0];
            let foodName = values[1];
            let quantity = parseInt(values[2]);
            let foodPrice = parseFloat(values[3]).toFixed(2);
            const maxValue = await api.get('/maxFoodId');
    
            //Error Handling
            if (foodName === "") {setOpenAdd(false); return}
            if (isNaN(quantity)) {setOpenAdd(false); return}
            if (isNaN(foodPrice)) {setOpenAdd(false); return}
    
            let parameters = [maxValue.data + 1, foodType, foodName, quantity, foodPrice];
    
            api.post('/addInventoryItem', parameters);
            
            setOpenAdd(false);

        } catch (err) {
        console.log("FAIL");
        setOpenAdd(false);
        }
    }

    const handleViewInventory = async () => {
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

    const handleAddItem = () => {
        document.getElementById("ManagerText").innerText = "Add Item";
    }

    const handleEditItem = () => {
        document.getElementById("ManagerText").innerText = "Edit Item";
    }

    return (
        <div>
            <AddItem onClose={closeDialogAdd} open={openAdd} onConfirm={confirmDialogAdd}></AddItem>
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
                        <EmployeeButton employeeType= {buttonType} onClick={openDialogAdd} content="Add Item" />
                        </Grid>
                        <Grid item>
                            <EmployeeButton employeeType= {buttonType} onClick={handleEditItem} content="Edit Item" />
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                    <p id='ManagerText' className='employeeText'></p>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default InventoryView;