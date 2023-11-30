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
import { Grid, private_createTypography } from '@mui/material';
import EmployeeButton from '../components/EmployeeButton';
import OptionsDropdown from '../components/OptionsDropdown';
import api from '../api/posts';
import AddItem from '../components/AddItem';
import EditItem from '../components/EditItem';
import InventoryTable from '../components/InventoryTable';


function InventoryView() {
    var buttonType = "manager";
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [items, setItems] = React.useState([]);

    const openDialogAdd = () => {
        setOpenAdd(true);
    }

    const openDialogEdit = async () => {
        try {
            const itemList = await api.get('/inventory');

            let itemMap = [];
    
            for (let i = 0; i < Object.keys(itemList.data).length; i++) {
                itemMap.push({label: itemList.data[i].food_name + " (" + itemList.data[i].food_type + ")", id: itemList.data[i].food_id});
            }
    
            setItems(itemMap);
            
            setOpenEdit(true);
        } catch(err) {
            document.getElementById("ManagerText").innerText = "ERROR";
            console.log("FAIL");
            setOpenEdit(false);
        }
    }

    const closeDialogAdd = () => {
        setOpenAdd(false);
    }

    const closeDialogEdit = () => {
        setOpenEdit(false);
    }

    function invalidDetails () {
        setOpenAdd(false);
        document.getElementById("ManagerText").innerText = "Invalid Details";
    }

    const confirmDialogAdd = async (values) => {
        try {
            let foodType = values[0];
            let foodName = values[1];
            let quantity = parseInt(values[2]);
            let foodPrice = parseFloat(values[3]).toFixed(2);
            const maxValue = await api.get('/maxFoodId');
    
            //Error Handling
            if (foodName === "") {invalidDetails(); return}
            if (isNaN(quantity)) {invalidDetails(); return}
            if (isNaN(foodPrice)) {invalidDetails(); return}
    
            let parameters = [maxValue.data + 1, foodType, foodName, quantity, foodPrice];
    
            api.post('/addInventoryItem', parameters);
            
            setOpenAdd(false);

        } catch (err) {
            document.getElementById("ManagerText").innerText = "Invalid Details";
            console.log("FAIL");
            setOpenAdd(false);
        }
    }

    const confirmDialogEdit = async (values) => {
        //food id, quantity, price
        try {
            let foodId = values[0];
            let quantity = parseInt(values[1]);
            let foodPrice = parseFloat(values[2]).toFixed(2);

            if (!isNaN(quantity)) {
                let parameters = [quantity, foodId];
                await api.post('/setQuantity', parameters);
            }
            if (!isNaN(foodPrice)) {
                let parameters = [foodPrice, foodId];
                await api.post('/setPrice', parameters);
            }
        } catch(err) {
            document.getElementById("ManagerText").innerText = "Invalid Details";
            console.log("FAIL");
            setOpenAdd(false);
        }

        


        setOpenEdit(false);
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

    return (
        <div>
            <AddItem onClose={closeDialogAdd} open={openAdd} onConfirm={confirmDialogAdd}></AddItem>
            <EditItem onClose={closeDialogEdit} open={openEdit} onConfirm={confirmDialogEdit} foods={items}></EditItem>
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
                            <EmployeeButton employeeType= {buttonType} onClick={openDialogEdit} content="Edit Item" />
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <InventoryTable></InventoryTable>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default InventoryView;