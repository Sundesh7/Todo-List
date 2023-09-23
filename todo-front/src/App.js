import React, { useEffect, useState } from 'react';
import './App.css';
const apiUrl = 'http://localhost:3300/todos';
function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Define the API URL for your PostgreSQL server

    // Use the fetch method to make a GET request to retrieve tasks
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCheckboxToggle = async (taskId, isChecked) => {
    // Find the task to update in the state
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        console.log(taskId,isChecked)
        // Toggle the completed status based on isChecked
        return {
          ...task,
          completed: isChecked,
        };
      }
      return task;
    });

    // Update the state to reflect the new completion status immediately
    setTasks(updatedTasks);

    // Send a request to update the database with the new completion status
    try {
      updatedTasks.find((task) => task.id === taskId);
      const response = await fetch(`http://localhost:3300/todos/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { completed: isChecked },
      });

      if (!response.ok) {
        console.error('Error updating task:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle the error (e.g., show an error message to the user or revert the change)
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`${apiUrl}/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted task from the state
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      } else {
        console.error('Error deleting task:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="App">
      <h1 className="heading">To Do List</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className={task.completed ? 'completed' : ''}>{task.title}</td>
              <td className={task.completed ? 'completed' : ''}>{task.description}</td>
              <td className={task.completed ? 'completed' : ''}>
                {new Date(task.due_date).toLocaleDateString()}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(event) => handleCheckboxToggle(task.id, event.target.checked)}
                />
              </td>
              <td>
                <button onClick={() => handleDelete(task.id)} className='button'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
