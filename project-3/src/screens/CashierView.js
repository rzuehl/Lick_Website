import React from 'react';
import { useState, useEffect } from "react";
import { useContext } from 'react';
import { NameContext } from '../contexts/NameContext';
import GeneralButton from '../components/GeneralButton';
import OptionsDropdown from '../components/OptionsDropdown';
import EmployeeButton from '../components/EmployeeButton.js';
import ScreenTitle from '../components/ScreenTitle';
import WeatherIcon from '../components/WeatherIcon.js';
import TableDropdown from '../components/TableDropdown.js';
import ManageOrderDialog from '../components/ManageOrderDialog.js';
import ViewAllOrdersDialog from '../components/ViewAllOrdersDialog.js';
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

import differenceWith from 'lodash/differenceWith.js';

import api from '../api/posts';

var isCategory = false;
var category = "";
var subtotal = 0;
var tax = 0;
var total = 0;
var retrievedOrderItemList = [];
var orderItemList = [];
var selectedRows = [];
var clicked = false;
var orderID;
var retrievedOrderStatus = "Pending";
var orderStatus = "Pending";
var open = false;
var tableOpen = false;
var isDelete = false;
var deleteOrderID;
var customerName = "Guest";
var retrievedCustomerName = "Guest";

function createOrderItem(index, foodName, cost, foodType) {
    const numFoodID = orderItemList.filter(item => item.foodName === foodName).length;
    return {index, foodName, cost, foodType, numFoodID};
}

/*function createTableData(order_id, customer_name, employee_id, timestamp, order_status){
   return {};
}*/

function createDropdownOptions(index, optionName, optionFunction, disabled) {
  return {index, optionName, optionFunction, disabled};
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
    var dropdownOptionsArray = [];
    
    const [categoryItemArrayState, setCategoryItemArrayState] = useState(categoryItemArray);
    const [orderItemListState, setOrderItemListState] = useState(orderItemList);
    const [orderItemListModified, setOrderItemListModified] = useState("");
    const [selectedRowsState, setSelectedRows] = useState(selectedRows);
    const [openState, setOpenState] = useState(open);
    const [tableOpenState, setTableOpenState] = useState(tableOpen);
    const [orderIDState, setOrderIDState] = useState(orderID);
    const [orderStatusState, setOrderStatusState] = useState(orderStatus);
    const [customerNameState, setCustomerNameState] = useState(customerName);
    const [retrievedOrderStatusState, setRetrievedOrderStatusState] = useState(retrievedOrderStatus);
    const [retrievedCustomerNameState, setRetrievedCustomerNameState] = useState(retrievedCustomerName);
    const [orderStatusModified, setOrderStatusModified] = useState("");
    const [customerNameModified, setCustomerNameModified] = useState("");
    const [disableInputState, setDisableInputState] = useState([-1]);
    const [dropdownOptionsArrayState, setDropdownOptionsArrayState] = useState(dropdownOptionsArray);
    const [tableData, setTableData] = useState([]);
    const { name } = useContext(NameContext);

    const getMaxOrderID = async() => {
      const maxOrderID = await api.get('/maxIDOrderDetails');
      orderID = maxOrderID.data[0].max + 1;
      setOrderIDState(orderID);
    };

    const handleDialogClose = () => {
        open = false;
        setOpenState(open);
    }

    const handleTableDialogClose = () => {
      tableOpen = false;
      setTableOpenState(tableOpen);
    }

    const handleConfirm = async(values) => {
        if(!isDelete){
          await getMaxOrderID();
          if(values[0] <= orderID){
            orderID = values[0];
          }
          setOrderIDState(orderID);
        }
        else{
          deleteOrderID = values[0];
          isDelete = false;
        }
        orderStatus = values[1];
        setOrderStatusState(values[1]);
        customerName = values[2];
        setCustomerNameState(customerName);
        open = false;
        setOpenState(open);
    }

    const openDialog = () => {
        open = true;
        setOpenState(open);
    }

    const openTableDialog = () => {
      tableOpen = true;
      setTableOpenState(tableOpen);
    }


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

    

    const isEqualOrderItemArray = (arrItem, valuesItem) => {
      return arrItem.foodName === valuesItem.foodName && arrItem.cost === valuesItem.cost && arrItem.numFoodID === valuesItem.numFoodID;
    };

    const updateOrderItems = (removedIndex) => {

      if (removedIndex !== -1) {
          const removedOrderItem = orderItemList.find(item => item.index === removedIndex);;
    
          orderItemList.forEach(item => {
              if (item.foodName === removedOrderItem.foodName && item.numFoodID > removedOrderItem.numFoodID) {
                  item.numFoodID -= 1;
              }
          });
      }
    };

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
      const removedItemsIndexList = orderItemList.filter((item) => selectedRows.includes(item.index)).map((selectedItem) => selectedItem.index);
      for(let i = 0; i <removedItemsIndexList.length; i++){
        updateOrderItems(removedItemsIndexList[i]);
      }
      orderItemList = orderItemList.filter((item) => !selectedRows.includes(item.index));
      if(!(differenceWith(orderItemList, retrievedOrderItemList, isEqualOrderItemArray).length === 0) || !(differenceWith(retrievedOrderItemList, orderItemList, isEqualOrderItemArray) === 0)){
        setOrderItemListModified("(M)");
      }
      else{
        setOrderItemListModified("");
      }
      setOrderItemListState(orderItemList);
      selectedRows = [];
      setSelectedRows([]);
    };

    const getPastOrder = async() =>{
      
      let prevOrderID = orderID;
      setDisableInputState([1, 2]);

      await openDialog();

      await waitForDialogClose();
      if(!(prevOrderID===orderID)){
        const responseOrder = await api.get('/pastOrder', {params: {id: orderID}});
        setOrderItemListModified("");
        
        const responseOrderStatus = await api.get('/orderStatus', {params: {id: orderID}});
        if(responseOrderStatus.data.length !== 0){
          orderStatus = responseOrderStatus.data[0].order_status;
          retrievedOrderStatus = orderStatus;
          setRetrievedOrderStatusState(retrievedOrderStatus);
          setOrderStatusState(orderStatus);
          setOrderStatusModified("");
          if(orderStatus === "Fulfilled"){
            console.log("Fulfilled");
            dropdownOptionsArray[0].disabled = true;
            dropdownOptionsArray[2].disabled = true;
            dropdownOptionsArray[3].disabled = true;
            dropdownOptionsArray[4].disabled = true;
          }
          else if(orderStatus === "Cancelled"){
            console.log("Cancelled");
            dropdownOptionsArray[0].disabled = true;
            dropdownOptionsArray[2].disabled = false;
            dropdownOptionsArray[3].disabled = false;
            dropdownOptionsArray[4].disabled = false;
          }
          else if(orderStatus === "Pending"){
            console.log("Pending");
            dropdownOptionsArray[0].disabled = false;
            dropdownOptionsArray[2].disabled = false;
            dropdownOptionsArray[3].disabled = false;
            dropdownOptionsArray[4].disabled = false;
          }
          setDropdownOptionsArrayState(dropdownOptionsArray);
        }

        const responseOrderCustomerName = await api.get('/orderCustomerName', {params: {id: orderID}});
        if(responseOrderCustomerName.data.length !== 0){
          customerName = responseOrderCustomerName.data[0].customer_name;
          console.log(customerName);
          retrievedCustomerName = customerName;
          setRetrievedCustomerNameState(retrievedCustomerName);
          setCustomerNameState(customerName);
          setOrderStatusModified("");
        }

        orderItemList = [];
        subtotal = 0;
        for(let i = 0; i < responseOrder.data.length; i++){
          const responseCost = await api.get('/cost', {params: {foodName: responseOrder.data[i].food_name.replace(/'/g, "''"), foodType: responseOrder.data[i].food_type}});
          orderItemList.push(createOrderItem(orderItemList.length, responseOrder.data[i].food_name, responseCost.data[0].food_price, responseOrder.data[i].food_type));
          subtotal += responseCost.data[0].food_price;
        }
        retrievedOrderItemList = [...orderItemList];
        tax = subtotal * .05;
        total = subtotal + tax;
        document.getElementById('subtotal').innerText = subtotal.toFixed(2);
        document.getElementById('tax').innerText = tax.toFixed(2);
        document.getElementById('total').innerText = total.toFixed(2);
        setOrderItemListState(orderItemList);
      }
    };

    const changeOrderStatus = async() => {
      //todo
      setDisableInputState([0, 2]);
      await openDialog();
      await waitForDialogClose();
      if(retrievedOrderStatus !== orderStatus){
        setOrderStatusModified("(M)");
      }
      else{
        setOrderStatusModified("");
      }
    };

    const submitCurrentOrder = async() => {
      //todo
      const maxOrderID = await api.get('/maxIDOrderDetails');
      console.log(maxOrderID.data[0].max);
      if(maxOrderID.data[0].max === (orderID - 1)){
        let employeeName = "John";
        if(name !== null){
          employeeName = name;
        }
        await api.post('/createNewOrder', {id: orderID, customerName: customerName, employeeName: employeeName, orderStatus: orderStatus});
      }

      let itemsAdded = differenceWith(orderItemList, retrievedOrderItemList, isEqualOrderItemArray);
      let itemsDeleted = differenceWith(retrievedOrderItemList, orderItemList, isEqualOrderItemArray);
      //console.log(itemsAdded);
      if(itemsAdded.length !== 0){
        await api.post('/addOrderItems', {id: orderID, items: itemsAdded});
      }
      if(itemsDeleted.length !== 0){
        await api.post('/deleteOrderItems', {id: orderID, items: itemsDeleted});
      }

      if(retrievedOrderStatus !== orderStatus){
        await api.post('/changeOrderStatus', {id: orderID, orderStatus: orderStatus});
        if(orderStatus === "Fulfilled"){
          console.log("Fulfilled");
          dropdownOptionsArray[0].disabled = true;
          dropdownOptionsArray[2].disabled = true;
          dropdownOptionsArray[3].disabled = true;
          dropdownOptionsArray[4].disabled = true;
        }
        else if(orderStatus === "Cancelled"){
          console.log("Cancelled");
          dropdownOptionsArray[0].disabled = true;
          dropdownOptionsArray[2].disabled = false;
          dropdownOptionsArray[3].disabled = false;
          dropdownOptionsArray[4].disabled = false;
        }
        else if(orderStatus === "Pending"){
          console.log("Pending");
          dropdownOptionsArray[0].disabled = false;
          dropdownOptionsArray[2].disabled = false;
          dropdownOptionsArray[3].disabled = false;
          dropdownOptionsArray[4].disabled = false;
        }
        setDropdownOptionsArrayState(dropdownOptionsArray);
      }

      if(retrievedCustomerName !== customerName){
        await api.post('/changeOrderCustomerName', {id: orderID, customerName: customerName});
      }

      retrievedCustomerName = customerName;
      retrievedOrderStatus = orderStatus;
      setRetrievedOrderStatusState(retrievedOrderStatus);
      setOrderStatusModified("");
      setOrderItemListModified("");
      setCustomerNameModified("");
    };

    const deleteOrder = async() => {
      setDisableInputState([1, 2]);
      isDelete = true;
      await openDialog();
      await waitForDialogClose();
      await api.post('/deleteOrder', {id: deleteOrderID});
      if(deleteOrderID === orderID){
        createNewOrder();
      }
    }

    const createNewOrder = async() => {
      await getMaxOrderID();
      orderItemList = [];
      retrievedOrderItemList = [];
      orderStatus = "Pending";
      retrievedOrderStatus = "Pending";
      setOrderStatusModified("");
      setOrderItemListModified("");
      setOrderItemListState(orderItemList);
      setOrderStatusState(orderStatus);
      setRetrievedOrderStatusState(retrievedOrderStatus);
      document.getElementById('subtotal').innerText = "";
      document.getElementById('tax').innerText = "";
      document.getElementById('total').innerText = "";
    }

    const pay = () =>{
      createNewOrder(); //flextape solution rn
      return 0;
    }

    const changeCustomerName = async() => {
      setDisableInputState([0, 1]);
      await openDialog();
      await waitForDialogClose();
      if(retrievedCustomerName !== customerName){
        setCustomerNameModified("(M)");
      }
      else{
        setCustomerNameModified("");
      }
    }

    const viewAllOrders = async() => {
      const responseOrders = await api.get('/allOrders');
      let tempData = [];
      for (let index = 0; index < Object.keys(responseOrders.data).length; index++) {
          tempData.push(responseOrders.data[index]);
      }
      setTableData(tempData);
      await openTableDialog();

    }

    dropdownOptionsArray.push(createDropdownOptions(0, "Remove Selected Items", removeItems, false));
    dropdownOptionsArray.push(createDropdownOptions(1, "Import Past Order", getPastOrder, false));
    dropdownOptionsArray.push(createDropdownOptions(2, "Change Order Status", changeOrderStatus, false));
    dropdownOptionsArray.push(createDropdownOptions(3, "Change Customer Name", changeCustomerName, false));
    dropdownOptionsArray.push(createDropdownOptions(4, "Submit Changes to Current Order", submitCurrentOrder, false));
    dropdownOptionsArray.push(createDropdownOptions(5, "Delete Order", deleteOrder, false));
    dropdownOptionsArray.push(createDropdownOptions(6, "Create New Order", createNewOrder, false));
    dropdownOptionsArray.push(createDropdownOptions(7, "View All Orders", viewAllOrders, false));
    

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
              {column.label == 'Item' ? `${column.label} ${orderItemListModified}` : column.label}
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
        <>
          <TableRow key={-3}>
            <TableCell 
            sx={{
                backgroundColor: 'background.paper',
              }}/>
            <TableCell
            sx={{
              backgroundColor: 'background.paper',
            }}
            align="left">
              Order ID: {orderIDState} <br/> Order Status: {orderStatusState} {orderStatusModified} <br/> Customer Name: {customerNameState} {customerNameModified} <br/> Employee Name: {name}
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: 'background.paper',

              }}
              align="right"
              >
              <Button id="basic-button" onClick={pay}>Pay</Button>
              <TableDropdown name="Options" options={dropdownOptionsArrayState}/> 
              </TableCell>
          </TableRow>
        </>
      );
    };

    const handleCategoryItems = (event) => {
        
        let eventString = "";
        if(event !== null){
            eventString = event.target.textContent;
        }
        const fetchCategories = async () => {
            try{
                if(event !== null && !(eventString === "Back") && !(orderStatus === "Fulfilled" || orderStatus === "Cancelled")){
                    const responseCost = await api.get('/cost', {params: {foodName: eventString.replace(/'/g, "''"), foodType: category}});
                    subtotal += responseCost.data[0].food_price;
                    tax = subtotal * .05;
                    total = subtotal + tax;
                    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
                    document.getElementById('tax').innerText = tax.toFixed(2);
                    document.getElementById('total').innerText = total.toFixed(2);
                    //document.getElementById('cashierText').innerText += eventString + " | " + responseCost.data[0].food_price + "\n";
                    orderItemList.push(createOrderItem(orderItemList.length, eventString, responseCost.data[0].food_price, category));
                    setOrderItemListState(orderItemList);
                    if(!(differenceWith(orderItemList, retrievedOrderItemList, isEqualOrderItemArray).length === 0)){
                      setOrderItemListModified("(M)");
                    }
                    else{
                      setOrderItemListModified("");
                    }
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
        getMaxOrderID();
    }, []);

    var buttonType = "cashier";

    return (
        <>
            <ViewAllOrdersDialog onClose={handleTableDialogClose} open={tableOpenState} tableData = {tableData} columns = {["order_id", "customer_name", "employee_id", "timestamp", "order_status"]} columnHeader = {["Order ID", "Customer Name", "Employee ID", "Timestamp", "Order Status"]}/>
            <ManageOrderDialog onClose={handleDialogClose} open={openState} disable={disableInputState} onConfirm={handleConfirm} status={retrievedOrderStatusState} orderID={orderIDState} customerName={retrievedCustomerNameState}></ManageOrderDialog>
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
                                    if(!clicked){
                                      clicked = true;
                                      handleCategoryItems(event);
                                    }
                                  }} 
                                content={categoryItem}
                                style={{ backgroundColor: categoryItem === "Back" ? "black" : "#ff657f" }}/>
                            </Grid>
                        ))}
                    </Grid> 
                    <Grid item xs={4}>
                    <Paper style={{ height: 425, width: '110%', marginBottom: '2%'}}>
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
                        <div className='checkout-container' style={{width: '110%'}}>
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