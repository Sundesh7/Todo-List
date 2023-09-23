const { Pool } = require('pg');
const config = require('./config');

// PostgreSQL connection configuration
const pool = new Pool({
  connectionString: config.db_pgsql, // PostgreSQL connection string
});

// Attempt to connect to PostgreSQL and check for errors
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
    process.exit(1); // Exit the application or handle the error as needed
  } else {
    console.log('Connected to PostgreSQL');
  }
});

// Export the PostgreSQL connection pool
module.exports = pool;
