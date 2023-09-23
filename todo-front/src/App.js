import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Define the API URL for your PostgreSQL server
    const apiUrl = 'http://localhost:3030/';

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

  const handleCheckboxToggle = (taskId, isChecked) => {
    // Find the task to update in the state
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
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
      const updatedTask = updatedTasks.find((task) => task.id === taskId);
      fetch(`http://localhost:3030/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: isChecked }),
      });
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle the error (e.g., show an error message to the user or revert the change)
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
