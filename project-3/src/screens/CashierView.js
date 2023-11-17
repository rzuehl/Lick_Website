import React from 'react';
import { useState, useEffect } from "react";
import GeneralButton from '../components/GeneralButton';
import OptionsDropdown from '../components/OptionsDropdown';
import EmployeeButton from '../components/EmployeeButton.js';
import ScreenTitle from '../components/ScreenTitle';
import weatherLogo from '../assets/weather-icon.png';
import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from '../api/posts';
import { TableVirtuoso } from 'react-virtuoso';
var isCategory = false;
var category = "";
var subtotal = 0;
var tax = 0;
var total = 0;
var orderItemList = [];

function createOrderItem(index, foodName, cost) {
    return {index, foodName, cost };
}

const columns = [
    { width: '50%', label: 'Item', dataKey: 'foodName' },
    { width: '50%', label: 'Price', dataKey: 'cost' },
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
};

function fixedHeaderContent() {
  return (
    <TableRow>
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
}

function rowContent(index, row) {
  return (
    <React.Fragment key={index}>
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
}

function CashierView() {
    
    var categoryItemArray = [];
    
    const [categoryItemArrayState, setCategoryItemArrayState] = useState(categoryItemArray);
    const [orderItemListState, setOrderItemListState] = useState(orderItemList);

    const handleCategoryItems = (event) => {
        let eventString = "";
        if(event != null){
            eventString = event.target.textContent;
        }
        const fetchCategories = async () => {
            try{
                if(event != null){
                    const responseCost = await api.get('/cost', {params: {foodName: eventString.replace(/'/g, "''"), foodType: category}});
                    subtotal += responseCost.data[0].food_price;
                    tax = subtotal * .05;
                    total = subtotal + tax;
                    //document.getElementById('cashierText').innerText += eventString + " | " + responseCost.data[0].food_price + "\n";
                    orderItemList.push(createOrderItem(orderItemList.length, eventString, responseCost.data[0].food_price));
                    setOrderItemListState(orderItemList);
                    document.getElementById('subtotal').innerText = "Subtotal: " + subtotal.toFixed(2);
                    document.getElementById('tax').innerText = "Tax: " + tax.toFixed(2);
                    document.getElementById('total').innerText = "Total: " + total.toFixed(2);
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
                                    handleCategoryItems(event);
                                  }} 
                                content={categoryItem}/>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item xs={4}>
                    <Paper style={{ height: 400, width: '100%' }}>
                        <TableVirtuoso
                        data={orderItemListState}
                        components={VirtuosoTableComponents}
                        fixedHeaderContent={fixedHeaderContent}
                        itemContent={rowContent}
                        />
                    </Paper>
                        <p id='subtotal' style={{textAlign: 'center', color: 'black'}}>Subtotal: </p>
                        <p id='tax' style={{textAlign: 'center', color: 'black'}}>Tax: </p>
                        <p id='total' style={{textAlign: 'center', color: 'black'}}>Total: </p>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default CashierView;