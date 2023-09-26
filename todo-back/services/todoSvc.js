const pool = require('../db');
const config = require('../config'); // Assuming you have a config file

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
async function retrieveTodo(taskId) {
  try {
    // Connect to the PostgreSQL database
    const client = await pool.connect();

    // Query to retrieve all todos from a "todos" table (replace with your actual table name)
    const query = 'SELECT * FROM tasks where id = $1';
    
    // Execute the query
    const result = await client.query(query,[taskId]);

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
async function deleteTodo(todoId){
  const client = await pool.connect();
  const query = 'Delete from tasks where id = $1';
  const results = await client.query(query,[todoId]);
  client.release();
  return results;
}


  module.exports = {
    retrieveTodos,
    deleteTodo,
    retrieveTodo,
    updateTask
  }
