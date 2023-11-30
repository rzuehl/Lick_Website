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
import DeleteItem from '../components/DeleteItem';


function InventoryView() {
    var buttonType = "manager";
    const [firstOpen, setFirstOpen] = React.useState(true);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [foodData, setFoodData] = React.useState([]);
    const columns = ["food_id", "food_name", "food_type", "quantity", "food_price"];
    const columnHeader = ["Food Id", "Food Name", "Food Type", "Quantity", "Food Price"];

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
            console.log("FAIL");
            setOpenEdit(false);
        }
    }

    const openDialogDelete = async () => {
        try {
            const itemList = await api.get('/inventory');

            let itemMap = [];
    
            for (let i = 0; i < Object.keys(itemList.data).length; i++) {
                itemMap.push({label: itemList.data[i].food_name + " (" + itemList.data[i].food_type + ")", id: itemList.data[i].food_id});
            }
    
            setItems(itemMap);
            
            setOpenDelete(true);
        } catch(err) {
            console.log("FAIL");
            setOpenDelete(false);
        }
    }

    const closeDialogAdd = () => {
        setOpenAdd(false);
    }

    const closeDialogEdit = () => {
        setOpenEdit(false);
    }

    const closeDialogDelete = () => {
        setOpenDelete(false);
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
    
            await api.post('/addInventoryItem', parameters);
            handleViewInventory();
        } catch (err) {
            console.log("FAIL");
            setOpenAdd(false);
        }
        setOpenAdd(false);
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
            handleViewInventory();
        } catch(err) {
            console.log("FAIL");
            setOpenEdit(false);
        }
        setOpenEdit(false);
    }

    const confirmDialogDelete = async (values) =>{
        try {
            await api.post('/deleteItem', values);
            handleViewInventory();
        } catch(err) {
            console.log("FAIL");
            setOpenDelete(false);
        }
        setOpenDelete(false);
    }

    const handleViewInventory = async () => {
        try {
            //response returns a JSON format which can be accessed by response.data
            const response = await api.get('/inventory');
            let tempData = [];
            for (let index = 0; index < Object.keys(response.data).length; index++) {
                tempData.push(response.data[index]);
            }
            setFoodData(tempData);
        } catch (err) {
            console.log("FAIL");
        }
    }

    if (firstOpen) {
        handleViewInventory();
        setFirstOpen(false);
    }

    return (
        <div>
            <AddItem onClose={closeDialogAdd} open={openAdd} onConfirm={confirmDialogAdd}></AddItem>
            <EditItem onClose={closeDialogEdit} open={openEdit} onConfirm={confirmDialogEdit} foods={items}></EditItem>
            <DeleteItem onClose={closeDialogDelete} open={openDelete} onConfirm={confirmDialogDelete} foods={items}></DeleteItem>
            <div className="customer-header">
                <HamburgerButton />
                <GeneralButton content="Translate" sidePadding={35} />
                <img className="weather-logo" src={weatherLogo} alt="Icon representing weather"/>
                <ScreenTitle />
                <GeneralButton content="Login" sidePadding={20} />
                <GeneralButton content="Order" sidePadding={20} />
                <OptionsDropdown sidePadding={20}/>
            </div>
            <body style={{margin: 0, display: 'flex', height: "100vh"}}>
                <div style={{display: 'flex', flexDirection: 'column', margin:10}}>
                    <EmployeeButton employeeType= {buttonType} onClick={handleViewInventory} content="View Inventory" />
                    <br/>
                    <EmployeeButton employeeType= {buttonType} onClick={openDialogAdd} content="Add Item" />
                    <br/>
                    <EmployeeButton employeeType= {buttonType} onClick={openDialogEdit} content="Edit Item" />
                    <br/>
                    <EmployeeButton employeeType= {buttonType} onClick={openDialogDelete} content="Delete Item" />
                </div>
                <div style={{flex: 1}}>
                    <InventoryTable foodData={foodData} columns={columns} columnHeader={columnHeader}></InventoryTable>
                </div>
            </body>
        </div>
    );
};

export default InventoryView;