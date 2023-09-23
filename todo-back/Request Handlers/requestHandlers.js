const services = require('../services/todoSvc');

async function ListTodos() {
    const result = await services.retrieveTodos();
    return result;
  }
async function DeleteTodo(todoId) {
    const result = await services.deleteTodo(todoId);
    return result;
  }
module.exports = {
    ListTodos,
    DeleteTodo  
} 

