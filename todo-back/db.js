const pgp = require('pg-promise')();
const config = require('./config');
const dbConfig = {
  host: config.db_host,   
  port: config.db_port,            
  database: config.db_name,
  user: config.db_user,   
  password: config.db_pass,  
};

const db = pgp(dbConfig);
// Attempt to connect to PostgreSQL and check for errors
db.connect()
  .then(obj => {
    console.log('Connected to the pgsql database:');
    obj.done(); // Release the connection pool
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the application on connection error
  });


// Export the PostgreSQL connection pool
module.exports = db;
