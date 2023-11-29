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
    const results = await sql.getCost(request, response, foodName)
    console.log('Results:', results);
    response.status(200).json(results);
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

//export API to vercel server
module.exports = app;