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
app.get('/api/category', sql.getCategories)
app.get('/api/foodItems', (request, response) => {
  const category = request.query.category.replace(/_/g, ' '); // Retrieve the category from query parameters
  sql.getFoodItems(request, response, category);
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

//export API to vercel server
module.exports = app;