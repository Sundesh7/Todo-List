const handlers = require('../Request Handlers/requestHandlers.js')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const verifyToken = require('../middleware/auth.js');

router.get('/todos', verifyToken, async (req, res) => {
  try {
    let result = await handlers.ListTodos();
    res.status(200).json({ message: 'Tasks retrieved successfully', data: result });
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the tasks' });
  }
});

router.get('/todos/:id', verifyToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    let result = await handlers.ListTodo(taskId);
    res.status(200).json({ message: 'Task retrieved successfully', data: result });
  } catch (error) {
    console.error('Error retrieving task:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the task' });
  }
});
router.put('/todos/:id', verifyToken, async (req, res) => {
  try {

    const taskId = req.params.id;
    const { completed } = req.body;
    await handlers.UpdateCompleted(taskId, completed);
    res.status(200).json({ message: 'Task updated successfully' });

  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'An error occurred while updating the task' });
  }
});
router.put('/todo/:id', verifyToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const obj = req.body;
    await handlers.UpdateTask(obj, taskId);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'An error occurred while updating the task' });
  }
});
router.put('/todo', verifyToken, async (req, res) => {
  try {
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
    const obj = req.body;
    const userId = await handlers.signUp(obj);
    const token = jwt.sign({ userId: userId }, jwtSecret, {
      expiresIn: '1h',
    });
    if (userId === '23505') {
      res.status(400).json({ message: 'User already exists' })
    } else {
      res.status(200).json({ message: 'User added successfully', token: token });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/signin', async (req, res) => {
  try {
    const obj = req.body;
    const results = await handlers.signIn(obj);
    let token;
    if (results !== null) {
      token = jwt.sign({ userId: results.id }, jwtSecret, {
        expiresIn: '1h',
      })
    };
    if (results === null) {
      res.status(400).json({ message: 'Wrong Password' })
    } else if (results === 0) {
      res.status(404).json({ message: 'Wrong Email' })
    } else {
      res.status(200).json({ message: 'User logged in successfully', token: token });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/todos/:id', verifyToken, async (req, res) => {
  try {
    const todoId = req.params.id;
    let result = await handlers.DeleteTodo(todoId);
    if (result !== null) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.status(204).json({ msg: 'successfully deleted' });
  } catch {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'An error occurred while deleting the task ', body: req.body });
  }
})
module.exports = router;