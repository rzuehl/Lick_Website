//main file for node backend
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.get('/api/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

const sql = require("./SQL")
app.get('/api/inventory', sql.getInventory)
app.get('/api/category', async(request, response) => {
  try{
    const results = await sql.getCategories(request,response);
    //console.log('Results:', results);
    response.status(200).json(results);
  } 
  catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/foodItems', async(request, response) => {
  try{
    const category = request.query.category;
    const results = await sql.getFoodItems(request, response, category)
    //console.log('Results:', results);
    response.status(200).json(results);
  }
  catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/cost', async(request, response) => {
  try{
    const foodName = request.query.foodName;
    const foodType = request.query.foodType;
    const results = await sql.getCost(request, response, foodName, foodType);
    //console.log('Results:', results);
    response.status(200).json(results);
  }
  catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/pastOrder', async(request, response) => {
  try{
    const orderID = request.query.id;
    const results = await sql.getPastOrder(request, response, orderID);
    //console.log('Results:', results);
    response.status(200).json(results);
  }
  catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/orderStatus', async(request, response) => {
  try{
    const orderID = request.query.id;
    const results = await sql.getOrderStatus(request, response, orderID);
    //console.log('Results:', results);
    response.status(200).json(results);
  }
  catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/addOrderItems', async(request, response) => {
  try{
    const {id, items } = request.body;
    //console.log(items);
    await sql.addOrderItems(request, response, id, items);
    response.status(200).send('Items added successfully');
  }
  catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/deleteOrderItems', async(request, response) => {
  try{
    const {id, items } = request.body;
    //console.log(items);
    await sql.deleteOrderItems(request, response, id, items);
    response.status(200).send('Items deleted successfully');
  }
  catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


app.get('/api/inventory', sql.getInventory)
app.post('/api/getSales', sql.getSales)
app.get('/api/restockReport', sql.restockReport)
app.post('/api/productUsage', sql.productUsage)
app.post('/api/orderTrends', sql.orderTrends)
app.post('/api/excessReport', sql.excessReport)
app.post('/api/addInventoryItem', sql.addInventoryItem)
app.get('/api/maxFoodId', sql.maxFoodId)
app.post('/api/setName', sql.setName)
app.post('/api/setType', sql.setType)
app.post('/api/setQuantity', sql.setQuantity)
app.post('/api/setPrice', sql.setPrice)
app.post('/api/deleteItem', sql.deleteItem)
app.get('/api/getEmployee', sql.getEmployee)
app.post('/api/addEmployee', sql.addEmployee)
app.post('/api/editEmployee', sql.editEmployee)
app.post('/api/deleteEmployee', sql.deleteEmployee)
app.get('/api/maxEmployee', sql.maxEmployee)
app.post('/api/employeeManagerStatus', sql.getEmployeeManagerStatus)

//export API to vercel server
module.exports = app;