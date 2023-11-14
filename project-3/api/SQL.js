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

module.exports = {
  getInventory,
  getSales
};