const db = require('../db');

// Function to retrieve todos
async function retrieveTodos() {
  const query = 'SELECT * FROM tasks';
  try {

    const result = await db.many(query);
    return result;

  } catch (error) {
    throw error;
  }
}
async function retrieveTodo(taskId) {
  const query = 'SELECT * FROM tasks where id = $1';
  try {
    
    const result = await db.one(query,[taskId]);
    return result;
  
  } catch (error) {
    throw error;
  }
}

async function updateTask(obj,taskId){
  const {title, completed, due_date, due_time, description} = obj;
  const updateTaskQuery = 'UPDATE tasks SET title=$1, completed = $2, due_date = $3, due_time = $4, description = $5 WHERE id = $6';
  try {

    await db.none(updateTaskQuery,[title, completed, due_date, due_time, description,taskId]);
    return;

  } catch (error) {
    throw error;
  }
}
async function deleteTodo(todoId){
  const query = 'Delete from tasks where id = $1';
  try{
    
    const results = await db.none(query,[todoId]);
    return results;
  
  }catch(error){
    throw error;
  }

}

async function updateCompleted(taskId,completed){

  const query = 'UPDATE tasks SET completed = $1 WHERE id = $2';
  try{
  const results = await db.none(query,[completed,taskId]);
  return results;
  }catch(error){
    throw error;
  }
 
}

async function addTask(obj){
  const {title, completed, due_date, due_time, description} = obj;
  const updateTaskQuery = `INSERT INTO tasks (title, description, due_date, due_time, completed)
          VALUES ($1, $2, $3, $4, $5)`;
  try {

    await db.none(updateTaskQuery,[title, description, due_date, due_time, completed]);
    return;

  }catch(error){
    throw error;
  }
}

  module.exports = {
    retrieveTodos,
    deleteTodo,
    retrieveTodo,
    updateTask,
    updateCompleted,
    addTask,
  }
