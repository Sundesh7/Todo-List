const express = require('express');
const db = require('./db'); // Import the MongoDB connection module
const results = require('./services/todoSvc');
const app = express();
const config = require('./config');
const port = config.SERVER_PORT;
const cors = require('cors');

// Apply CORS middleware at the beginning
app.use(cors({ origin: 'http://localhost:3000' }));

// Define a route handler for the root URL
app.get('/', async (req, res) => {
  let result2 = await someFunction();
  console.log(result2)
  res.json(result2);
});
app.put('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    console.log(req.body)
    //const { completed } = req.body;
    //console.log(req)
    // Update the task in the database
    const updateTaskQuery = 'UPDATE tasks SET completed = $1 WHERE id = $2';
    await pool.query(updateTaskQuery, [completed, taskId]);

    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'An error occurred while updating the task' });
  }
});

async function someFunction() {
  const result = await results();
  return result;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
