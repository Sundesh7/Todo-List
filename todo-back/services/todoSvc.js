const { Pool } = require('pg');
const config = require('../config'); // Assuming you have a config file

// PostgreSQL connection configuration
const pool = new Pool({
  connectionString: config.db_pgsql, // PostgreSQL connection string
});

pool.on('error', (err, client) => {
  console.error('Error occurred in PostgreSQL client:', err);
});

// Function to retrieve todos
async function retrieveTodos() {
  try {
    // Connect to the PostgreSQL database
    const client = await pool.connect();

    // Query to retrieve all todos from a "todos" table (replace with your actual table name)
    const query = 'SELECT * FROM tasks';

    // Execute the query
    const result = await client.query(query);

    // Release the client back to the pool
    client.release();

    // Process the retrieved rows
    return result.rows;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}
async function updateTask(){
  try {
    // Connect to the PostgreSQL database
    const client = await pool.connect();

    // Query to retrieve all todos from a "todos" table (replace with your actual table name)
    const query = 'SELECT * FROM tasks';

    // Execute the query
    const result = await client.query(query);

    // Release the client back to the pool
    client.release();

    // Process the retrieved rows
    return result.rows;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}

module.exports = retrieveTodos;
