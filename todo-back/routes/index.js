const handlers = require('../Request Handlers/requestHandlers.js')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config'); // Replace with your secret key
const verifyToken = require('../middleware/auth.js');

// Define a route handler for the root URL
router.get('/todos', verifyToken,async (req, res) => {
  try{
    let result = await handlers.ListTodos();
    console.log(result)
    res.status(200).json({ message: 'Tasks retrieved successfully', data: result });
    }catch (error){
      console.error('Error retrieving tasks:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the tasks' });
    }
  });

router.get('/todos/:id', async (req, res) => {
    try{
      const taskId = req.params.id;
      let result = await handlers.ListTodo(taskId);
      res.status(200).json({ message: 'Task retrieved successfully', data: result });
    }catch(error) {
      console.error('Error retrieving task:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the task' });
    }
  });
  router.put('/todos/:id', async (req, res) => {
      try {

        const taskId = req.params.id;
        const { completed } = req.body;
        await handlers.UpdateCompleted(taskId,completed);
        res.status(200).json({ message: 'Task updated successfully' });

      } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'An error occurred while updating the task' });
      }
    });
    router.put('/todo/:id', async (req, res) => {
      try {
        const taskId = req.params.id;
        const obj = req.body;
        await handlers.UpdateTask(obj,taskId);
        res.status(200).json({ message: 'Task updated successfully' });
      } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'An error occurred while updating the task' });
      }
    });
    router.put('/todo', async (req, res) => {
      try {
        console.log('body',req.body)
        const obj = req.body;
        await handlers.AddTask(obj);
        res.status(200).json({ message: 'Task updated successfully' });
      } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'An error occurred while updating the task' });
      }
    });

    router.put('/signup', async (req, res) => {
      try {
        console.log('body',req.body)
        const obj = req.body;
        const userId =  await handlers.signUp(obj);
        console.log('results',results)
        const token = jwt.sign({ userId: userId }, jwtSecret, {
          expiresIn: '1h',
        });
        console.log('results',results)
        if (results === '23505'){
          res.status(400).json({ message: 'User already exists' })
        }else{
          res.status(200).json({ message: 'User added successfully',token:token});
        }
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    router.put('/signin', async (req, res) => {
      try {
        console.log('body',req.body)
        const obj = req.body;
        const results =  await handlers.signIn(obj);
        const token = jwt.sign({ userId: results.id }, jwtSecret, {
          expiresIn: '1h',
        });
        console.log(token)
        if (results === null){
          res.status(400).json({ message: 'Wrong Email/Password' })
        }else{
          console.log(token)
          res.status(200).json({ message: 'User logged in successfully',token:token});
        }
      }catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

  router.delete('/todos/:id',verifyToken,async (req, res) => {
    try{
      const todoId = req.params.id;
      let result = await handlers.DeleteTodo(todoId);
      console.log(result)
      if (result !== null) {
        return res.status(404).json({ error: 'Task not found' });
      }
      return res.status(204).json({msg:'successfully deleted'});
    }catch{
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'An error occurred while deleting the task ',body: req.body });
    }
  })
module.exports = router;