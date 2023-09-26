const express = require('express');
const app = express()
const db = require('./db');
const config = require('./config');
const port = config.SERVER_PORT;
const Routes = require('./routes/index');
const cors = require('cors');
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(Routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;