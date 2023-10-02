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
db.connect()
  .then(obj => {
    console.log('Connected to the pgsql database:');
    obj.done();
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });

module.exports = db;
