const handlers = require('../Request Handlers/requestHandlers.js')
const express = require('express');
const router = express.Router();
const pool = require('../db');


// Define a route handler for the root URL
router.get('/todos', async (req, res) => {
    let result = await handlers.ListTodos();
    console.log(result)
    res.json(result);
  });

router.get('/todos/:id', async (req, res) => {
    let result = await handlers.ListTodo(req.params.id);
    console.log(result)
    res.json(result);
  });
  router.put('/todos/:id', async (req, res) => {
      try {
        const taskId = req.params.id;
        //console.log('body',req.body)
        const { completed } = req.body;
        //console.log(req)
        //Update the task in the database
        const updateTaskQuery = 'UPDATE tasks SET completed = $1 WHERE id = $2';
        await pool.query(updateTaskQuery, [completed, taskId]);
        res.status(200).json({ message: 'Task updated successfully' });
      } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'An error occurred while updating the task' });
      }
    });
    router.put('/todo/:id', async (req, res) => {
      try {
        const taskId = req.params.id;
        console.log('body',req.body)
        const { title,description,due_date,due_time,completed } = req.body;
        console.log(title,description,due_date,due_time,completed)
        //Update the task in the database
        const updateTaskQuery = 'UPDATE tasks SET title=$1, completed = $2, due_date = $3, due_time = $4, description = $5 WHERE id = $6';
        await pool.query(updateTaskQuery, [title,completed,due_date,due_time,description, taskId]);
        res.status(200).json({ message: 'Task updated successfully' });
      } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'An error occurred while updating the task' });
      }
    });
    router.put('/todo', async (req, res) => {
      try {
        const taskId = req.params.id;
        console.log('body',req.body)
        //const { title,description,due_date,due_time,completed } = req.body;
        //console.log(title,description,due_date,due_time,completed)
        //Update the task in the database
        //const updateTaskQuery = 'UPDATE tasks SET title=$1, completed = $2, due_date = $3, due_time = $4, description = $5 WHERE id = $6';
        //await pool.query(updateTaskQuery, [title,completed,due_date,due_time,description, taskId]);
        res.status(200).json({ message: 'Task updated successfully' });
      } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'An error occurred while updating the task' });
      }
    });
  router.delete('/todos/:id',async (req, res) => {
    try{
      const todoId = req.params.id;
      let result = await handlers.DeleteTodo(todoId);
      console.log(result)
      if (result.rowCount === 0) {
        // The item was not found in the database
        return res.status(404).json({ error: 'Task not found' });
      }
      return res.status(204).json({msg:'successfully deleted'});
    }catch{
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'An error occurred while deleting the task ',body: req.body });
    }
  })
module.exports = router;