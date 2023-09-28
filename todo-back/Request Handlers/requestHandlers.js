const todoServices = require('../services/todoSvc');
const userServices = require('../services/userSvc');

async function ListTodos() {
  const result = await todoServices.retrieveTodos();
  return result;
}
async function ListTodo(taskId) {

  const result = await todoServices.retrieveTodo(taskId);
  return result;
}
async function DeleteTodo(todoId) {
  const result = await todoServices.deleteTodo(todoId);
  return result;
}
async function UpdateCompleted(taskId, completed) {
  await todoServices.updateCompleted(taskId, completed);
  return;
}
async function UpdateTask(obj, taskId) {
  await todoServices.updateTask(obj, taskId);
  return
}
async function AddTask(obj) {
  await todoServices.addTask(obj);
  return
}
async function signUp(obj) {
  const results = await userServices.userRegister(obj);
  console.log('results rh', results)
  return results;
}
async function signIn(obj) {
  const results = await userServices.userSignin(obj);
  return results;
}
module.exports = {
  ListTodos,
  DeleteTodo,
  ListTodo,
  UpdateCompleted,
  UpdateTask,
  AddTask,
  signUp,
  signIn,
}

