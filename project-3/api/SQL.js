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

const getCategories = (request, response) => {
  pool.query("SELECT food_type FROM inventory GROUP BY food_type", (error, results) => {
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })

}

const getFoodItems = (request, response) => {
  pool.query("SELECT food_name FROM inventory WHERE food_type = '$1'", (error, results) => {
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getInventory,
  getCategories,
  getFoodItems
};
