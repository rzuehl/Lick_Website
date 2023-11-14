const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'csce315_907_03user',
    host: 'csce-315-db.engr.tamu.edu',
    database: "csce315_907_03db",
    password: 'GMV36DzB',
    port: 5432,
    ssl: {rejectUnauthorized: false},
});

const getInventory = (request, response) => {
  pool.query('SELECT * FROM inventory ORDER BY food_id', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
  })
}

const getSales = (request, response) => {
  const query = "SELECT i.food_name, i.food_type, COUNT(oi.order_id) AS num_sales\n" + //
  "FROM order_inventory_join oi\n" + //
  "JOIN inventory i ON oi.food_id = i.food_id\n" + //
  "JOIN order_details od ON oi.order_id = od.order_id\n" + //
  "WHERE od.timestamp BETWEEN $1 AND DATE($2) + interval '1 day'\n" + //
  "GROUP BY oi.food_id, i.food_name, i.food_type\n" + //
  "ORDER BY oi.food_id;";

  pool.query(query, request.body, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const restockReport = (request, response) => {
  const query = "SELECT food_name, food_type, quantity FROM inventory\n" +
  "WHERE quantity <= 50\n" +
  "ORDER BY food_type;";

  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const productUsage = (request, response) => {
  const query = "SELECT DATE(timestamp) AS date, COUNT(i.food_price) AS products_sold\n" + //
  "FROM order_details od\n" + //
  "INNER JOIN order_inventory_join oij ON od.order_id=oij.order_id\n" + //
  "INNER JOIN inventory i ON oij.food_id=i.food_id\n" + //
  "WHERE DATE(od.timestamp) BETWEEN $1 AND $2\n" + //
  "GROUP BY DATE(od.timestamp);";

  pool.query(query, request.body, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getInventory,
  getSales,
  restockReport,
  productUsage
};