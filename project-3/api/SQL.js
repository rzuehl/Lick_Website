const { request } = require('.');

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

const orderTrends = (request, response) => {
  const query = "SELECT\n" +
  "i1.food_id AS item1_id,\n" +
  "i1.food_name AS item1_name,\n" +
  "i1.food_type AS item1_type,\n" +
  "i2.food_id AS item2_id,\n" +
  "i2.food_name AS item2_name,\n" +
  "i2.food_type AS item2_type,\n" +
  "COUNT(*) AS times_sold_together\n" +
  "FROM order_inventory_join o1\n" +
  "JOIN inventory i1 ON o1.food_id = i1.food_id\n" +
  "JOIN order_details od1 ON o1.order_id = od1.order_id\n" +
  "JOIN order_inventory_join o2 ON o1.order_id = o2.order_id AND o1.food_id < o2.food_id\n" +
  "JOIN inventory i2 ON o2.food_id = i2.food_id\n" +
  "JOIN order_details od2 ON o2.order_id = od2.order_id\n" +
  "WHERE\n" +
  "DATE(od1.timestamp) BETWEEN $1 AND $2 AND\n" +
  "DATE(od2.timestamp) BETWEEN $1 AND $2\n" +
  "GROUP BY item1_id, item1_name, item2_id\n" +
  "ORDER BY times_sold_together DESC, item1_id, item2_id;"

  pool.query(query, request.body, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const excessReport = (request, response) => {
  const query = "SELECT i.food_id, i.food_name, COUNT(oi.order_id) AS num_sales\n" +
  "FROM order_inventory_join oi\n" +
  "JOIN inventory i ON oi.food_id = i.food_id\n" +
  "JOIN order_details od ON oi.order_id = od.order_id\n" +
  "WHERE DATE(od.timestamp) >= $1\n" +
  "GROUP BY i.food_id, i.food_name\n" +
  "ORDER BY i.food_id;"

  pool.query(query, request.body, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const getCategories = (request, response) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT food_type FROM inventory GROUP BY food_type", (error, results) => {
      if(error){
        reject(error);
      }
      else{
        resolve(results.rows);
      }
    });
  });
}

const getFoodItems = (request, response, category) => {
  const query = "SELECT food_name FROM inventory WHERE food_type = '" + category + "'";
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if(error){
        reject(error);
      }
      else{
        resolve(results.rows);
      }
    });
  });
}

const getCost = (request, response, foodName, foodType) => {
  const query = "SELECT * FROM inventory WHERE food_name = '" + foodName + "' AND food_type = '" + foodType + "'";
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if(error){
        reject(error);
      }
      else{
        resolve(results.rows);
      }
    });
  });
}

const getPastOrder = (request, response, orderID) => {
  const query = "SELECT i.food_name, i.food_type " + 
  "FROM order_inventory_join oi " + 
  "JOIN inventory i ON oi.food_id = i.food_id " +
  "WHERE oi.order_id = " + orderID;
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if(error){
        reject(error);
      }
      else{
        resolve(results.rows);
      }
    });
  });
}

const getOrderStatus = (request, response, orderID) => {
  const query = "SELECT order_status FROM order_details WHERE order_id = " + orderID;
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if(error){
        reject(error);
      }
      else{
        resolve(results.rows);
      }
    });
  });
}

const addOrderItems = (request, response, orderID, items) => {
  
  const inClausePlaceholders = items.map((_, index) => `($${index * 3 + 2}, $${index * 3 + 3})`).join(',');

  const query = `

    WITH row_count AS (
      SELECT COALESCE(MAX(id), 0) + 1 AS count FROM order_inventory_join
    )

    INSERT INTO order_inventory_join (id, order_id, food_id)
    SELECT
        rc.count AS id,
        $1 AS order_id,
        i.food_id
    FROM
        row_count rc,
        inventory AS i
    WHERE
        (i.food_name, i.food_type) IN (${inClausePlaceholders})
  `;

  const values = items.reduce((acc, item) => {
    acc.push(orderID, item.foodName.replace(/'/g, "''"), item.foodType);
    return acc;
  }, []);

  //console.log('Generated Query:', query);
  //console.log('Values:', values);


  return new Promise((resolve, reject) => {
    pool.query(query, values, (error) => {
      if(error){
        reject(error);
      }
      else{
        resolve();
      }
      
    });
  });
}

const deleteOrderItems = (request, response, orderID, items) => {
  // Create placeholders for each item
  const inClausePlaceholders = items.map((_, index) => `($${index * 2 + 2}, $${index * 2 + 3})`).join(',');

  // Construct the main DELETE query
  const query = `
    DELETE FROM order_inventory_join
    WHERE
      order_id = $1
      AND food_id IN (
        SELECT i.food_id
        FROM inventory AS i
        WHERE (i.food_name, i.food_type) IN (${inClausePlaceholders})
      )
  `;

  // Flatten the items array into values
  const values = [orderID, ...items.reduce((acc, item) => {
    acc.push(item.foodName, item.foodType);
    return acc;
  }, [])];

  console.log('Generated Delete Query:', query);
  console.log('Values:', values);

  // Execute the DELETE query
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const addInventoryItem = (request, response) => {
  const query = "INSERT INTO inventory \n" +
  "OVERRIDING SYSTEM VALUE \n" +
  "VALUES ($1 , $2 , $3 , $4 , $5)"

  pool.query(query, request.body, (error, results) => {
     if (error) {
       throw error
     }
     response.status(200).json(results.rows)
   })
}

const maxFoodId = (request, response) => {
  const query = "SELECT MAX(food_id) FROM inventory;"

  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows[0].max)
  })
}

const setName = (request, response) => {
  const query = "UPDATE inventory SET food_name = $1 WHERE food_id = $2;"

  pool.query(query, request.body, (error, results) => {
     if (error) {
       throw error
     }
     response.status(200).json(results.rows)
   })
}

const setType = (request, response) => {
  const query = "UPDATE inventory SET food_type = $1 WHERE food_id = $2;"

  pool.query(query, request.body, (error, results) => {
     if (error) {
       throw error
     }
     response.status(200).json(results.rows)
   })
}

const setQuantity = (request, response) => {
  const query = "UPDATE inventory SET quantity = $1 WHERE food_id = $2;"

  pool.query(query, request.body, (error, results) => {
     if (error) {
       throw error
     }
     response.status(200).json(results.rows)
   })
}

const setPrice = (request, response) => {
  const query = "UPDATE inventory SET food_price = $1 WHERE food_id = $2;"

  pool.query(query, request.body, (error, results) => {
     if (error) {
       throw error
     }
     response.status(200).json(results.rows)
   })
}

const deleteItem = (request, response) => {
  const query = "DELETE FROM inventory WHERE food_id = $1;"

  pool.query(query, request.body, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getEmployee = (request, response) => {
  const query = "SELECT * FROM employee ORDER BY employee_id;"

  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addEmployee = (request, response) => {
  const query = "INSERT INTO employee OVERRIDING SYSTEM VALUE VALUES ($1 , $2 , $3 , $4 , $5);"

  pool.query(query, request.body, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const editEmployee = (request, response) => {
  if (request.body[0] === 'name') {
    const query = "UPDATE employee SET name = $1 WHERE employee_id = $2;"
  
    pool.query(query, [request.body[1], request.body[2]], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  else if (request.body[0] === 'address') {
    const query = "UPDATE employee SET address = $1 WHERE employee_id = $2;"
  
    pool.query(query, [request.body[1], request.body[2]], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  else if (request.body[0] === 'phoneNumber') {
    const query = "UPDATE employee SET phone_number = $1 WHERE employee_id = $2;"
  
    pool.query(query, [request.body[1], request.body[2]], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  else if (request.body[0] === 'position') {
    const query = "UPDATE employee SET position = $1 WHERE employee_id = $2;"
  
    pool.query(query, [request.body[1], request.body[2]], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
}

const deleteEmployee = (request, response) => {
  const query = "DELETE FROM employee WHERE employee_id = $1;"

  pool.query(query, request.body, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const maxEmployee = (request, response) => {
  const query = "SELECT MAX(employee_id) FROM employee;"

  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows[0].max)
  })
}

const getEmployeeManagerStatus = (request, response) => {
  // from employee table, see if 
  const query = `SELECT position FROM employee WHERE name = $1;`;
  // if response is m then return true, else return false
    pool.query(query, request.body, (error, results) => {
      if(error){
        reject(error);
      }
      else{
        response.status(200).json(results.rows)
      }
    });
}

        

module.exports = {
  getInventory,
  getCategories,
  getFoodItems,
  getSales,
  getCost,
  getPastOrder,
  getOrderStatus,
  addOrderItems,
  deleteOrderItems,
  restockReport,
  productUsage,
  orderTrends,
  excessReport,
  addInventoryItem,
  maxFoodId,
  setName,
  setType,
  setQuantity,
  setPrice,
  deleteItem,
  getEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
  maxEmployee,
  getEmployeeManagerStatus
};
