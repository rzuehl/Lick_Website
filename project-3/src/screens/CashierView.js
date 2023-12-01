import React from 'react';
import { useState, useEffect } from "react";
import GeneralButton from '../components/GeneralButton';
import OptionsDropdown from '../components/OptionsDropdown';
import EmployeeButton from '../components/EmployeeButton.js';
import ScreenTitle from '../components/ScreenTitle';
import TableDropdown from '../components/TableDropdown.js';
import ManageOrderDialog from '../components/ManageOrderDialog.js';
import weatherLogo from '../assets/weather-icon.png';
import { Grid } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';

import { TableVirtuoso } from 'react-virtuoso';

import api from '../api/posts';

var isCategory = false;
var category = "";
var subtotal = 0;
var tax = 0;
var total = 0;
var orderItemList = [];
var selectedRows = [];
var clicked = false;
var orderID = -1;
var open = false;

function createOrderItem(index, foodName, cost) {
    return {index, foodName, cost };
}

function createDropdownOptions(index, optionName, optionFunction) {
  return {index, optionName, optionFunction};
}

const columns = [
    { width: '45%', label: 'Item', dataKey: 'foodName' },
    { width: '45%', label: 'Price', dataKey: 'cost', numeric: true },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />, 
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  TableFooter,
};


function CashierView() {

    var categoryItemArray = [];
    
    
    const [categoryItemArrayState, setCategoryItemArrayState] = useState(categoryItemArray);
    const [orderItemListState, setOrderItemListState] = useState(orderItemList);
    const [selectedRowsState, setSelectedRows] = useState(selectedRows);
    const [openState, setOpenState] = useState(open);
    const [orderIDState, setOrderIDState] = useState(orderID);

    const handleDialogClose = () => {
        open = false;
        setOpenState(open);
    }

    const handleConfirm = (values) => {
        orderID = values[0];
        setOrderIDState(values[0]);
        open = false;
        setOpenState(open);
    }

    const openDialog = () => {
        open = true;
        setOpenState(open);
    }

    const removeItems = () =>{
      const removedItemCosts = orderItemList.filter((item) => selectedRows.includes(item.index)).map((selectedItem) => selectedItem.cost);
      for(let i = 0; i < removedItemCosts.length; i++){
        subtotal -= removedItemCosts[i];
      }
      tax = subtotal * .05;
      total = subtotal + tax;
      document.getElementById('subtotal').innerText = subtotal.toFixed(2);
      document.getElementById('tax').innerText = tax.toFixed(2);
      document.getElementById('total').innerText = total.toFixed(2);
      orderItemList = orderItemList.filter((item) => !selectedRows.includes(item.index));
      
      setOrderItemListState(orderItemList);
      selectedRows = [];
      setSelectedRows([]);
    };

    const pay = () =>{
      //todo
      return 0;
    }

    const getPastOrder = async() =>{
      
      await openDialog();

      const waitForDialogClose = () => {
        return new Promise(resolve => {
          const checkCondition = () => {
                if (!open) {
                    resolve();
                }
                else {
                  setTimeout(checkCondition, 100);
              }
          }
          checkCondition();
        }
        )
      }

      await waitForDialogClose();
      const responseOrder = await api.get('/pastOrder', {params: {id: orderID}});
      const responseOrderStatus = await api.get('orderStatus', {params: {id: orderID}});
      orderItemList = [];
      subtotal = 0;
      for(let i = 0; i < responseOrder.data.length; i++){
        const responseCost = await api.get('/cost', {params: {foodName: responseOrder.data[i].food_name.replace(/'/g, "''"), foodType: responseOrder.data[i].food_type}});
        orderItemList.push(createOrderItem(orderItemList.length, responseOrder.data[i].food_name, responseCost.data[0].food_price));
        subtotal += responseCost.data[0].food_price;
      }
      tax = subtotal * .05;
      total = subtotal + tax;
      document.getElementById('subtotal').innerText = subtotal.toFixed(2);
      document.getElementById('tax').innerText = tax.toFixed(2);
      document.getElementById('total').innerText = total.toFixed(2);
      setOrderItemListState(orderItemList);
    };

    const changeOrderStatus = async() => {
      //todo
      return 0;
    };

    const submitCurrentOrder = async() => {
      //todo
      return 0;
    };

    var dropdownOptionsArray = [];
    dropdownOptionsArray.push(createDropdownOptions(0, "Remove Selected Items", removeItems));
    dropdownOptionsArray.push(createDropdownOptions(1, "Import Past Order", getPastOrder));
    dropdownOptionsArray.push(createDropdownOptions(2, "Change Order Status", changeOrderStatus));
    dropdownOptionsArray.push(createDropdownOptions(3, "Submit Current Order", submitCurrentOrder));

    const handleRowClick = (id) => {
      setSelectedRows((prevSelectedRows) => {
        if (id === -1) {
          selectedRows = (prevSelectedRows.includes(-1) && prevSelectedRows.length-1 === orderItemList.length) ? [] : [...orderItemList.map((_, index) => index), -1]
          return selectedRows;
        } else {
          if (prevSelectedRows.includes(id)) {
            selectedRows = prevSelectedRows.filter((rowId) => rowId !== id)
            return selectedRows;
          } else {
            selectedRows = [...prevSelectedRows, id];
            return selectedRows;
          }
        }
      });
    };
    
    const fixedHeaderContent = () => {

      const isSelected = selectedRowsState.includes(-1);

      return (
        <TableRow key={-1}>
          <TableCell
          variant="head"
          sx={{
            backgroundColor: 'background.paper',
          }}
          onClick={() => handleRowClick(-1)}
          >
            <input type="checkbox" checked={isSelected} readOnly/>
          </TableCell>
          {columns.map((column) => (
            <TableCell
              key={column.dataKey}
              variant="head"
              align={column.numeric || false ? 'right' : 'left'}
              style={{ width: column.width }}
              sx={{
                backgroundColor: 'background.paper',
              }}
            >
              {column.label}
            </TableCell>
          ))}
         </TableRow>
      );
    };
    
    const rowContent = (index, row) => {

      const isSelected = selectedRowsState.includes(row['index']);

      return (
        <React.Fragment key={row['index']}>
          <TableCell onClick={() => handleRowClick(row['index'])}>
            <input type="checkbox" checked={isSelected} readOnly/>
          </TableCell>
          {columns.map((column) => (
            <TableCell
              key={column.dataKey}
              align={column.numeric || false ? 'right' : 'left'}
            >
              {row[column.dataKey]}
            </TableCell>
          ))}

        </React.Fragment>
      );
    };

    const fixedFooterContent = () =>{
      return(
        <TableRow key={-2}>
          <TableCell 
          sx={{
              backgroundColor: 'background.paper',
            }}/>
          <TableCell
          sx={{
            backgroundColor: 'background.paper',
          }}
          align="right">
            Order ID: {orderIDState}
          </TableCell>
          <TableCell
            sx={{
              backgroundColor: 'background.paper',
              display: 'flex'
            }}
            align="right"
            >
            <Button id="basic-button" onClick={pay}>Pay</Button>
            <TableDropdown name="Options" options={dropdownOptionsArray}/>
            </TableCell>
        </TableRow>
      );
    };

    const handleCategoryItems = (event) => {
        
        let eventString = "";
        if(event != null){
            eventString = event.target.textContent;
        }
        const fetchCategories = async () => {
            try{
                if(event != null && !(eventString === "Back")){
                    const responseCost = await api.get('/cost', {params: {foodName: eventString.replace(/'/g, "''"), foodType: category}});
                    subtotal += responseCost.data[0].food_price;
                    tax = subtotal * .05;
                    total = subtotal + tax;
                    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
                    document.getElementById('tax').innerText = tax.toFixed(2);
                    document.getElementById('total').innerText = total.toFixed(2);
                    //document.getElementById('cashierText').innerText += eventString + " | " + responseCost.data[0].food_price + "\n";
                    orderItemList.push(createOrderItem(orderItemList.length, eventString, responseCost.data[0].food_price));
                    setOrderItemListState(orderItemList);
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
                categoryItemArray.unshift("Back");
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
        clicked = false;
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
            <ManageOrderDialog onClose={handleDialogClose} open={open} onConfirm={handleConfirm}></ManageOrderDialog>
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
                                    if(!clicked){
                                      clicked = true;
                                      handleCategoryItems(event);
                                    }
                                  }} 
                                content={categoryItem}
                                style={{ backgroundColor: categoryItem === "Back" ? "white" : "#FFC7C8" }}/>
                            </Grid>
                        ))}
                    </Grid> 
                    <Grid item xs={4}>
                    <Paper style={{ height: 400, width: '100%', marginBottom: '2%'}}>
                        <TableVirtuoso
                        data={orderItemListState}
                        components={VirtuosoTableComponents}
                        fixedHeaderContent={fixedHeaderContent}
                        itemContent={rowContent}
                        fixedFooterContent={fixedFooterContent}
                        followOutput
                        alignToBottom
                        /> 
                    </Paper>
                        <div className='checkout-container'>
                          <div className='checkout-info'>
                            <h2>Subtotal: </h2>
                            <h1 id="subtotal"></h1>
                          </div>
                          <div className='checkout-info'>
                              <h2>Tax: </h2>
                              <h1 id="tax"></h1>
                          </div>
                          <div className='checkout-info'>
                              <h2 className='order-total'>Total: </h2>
                              <h1 className='order-total' id = "total"></h1>
                          </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}



export default CashierView;