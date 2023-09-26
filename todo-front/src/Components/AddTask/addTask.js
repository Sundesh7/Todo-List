import React, { useState, useEffect } from 'react';
import '../../App.css';

const AddTask = () => {
  
  // Initialize task state with default values
  const [task, setTask] = useState({  
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    completed: true,
  });
  
  // Function to handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle checkbox separately
    if (type === 'checkbox') {
      setTask({
        ...task,
        [name]: checked,
      });
    } else {
      setTask({
        ...task,
        [name]: value,
      });
    }
  };

  return (
    <div className="App">
      <h2 className='edit'>Add Task</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Due Time</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="description"
                value={task.description}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="time"
                name="dueTime"
                value={task.dueTime}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="completed"
                checked={task.completed}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <button  className='button' style={{color:'white'}}>シ Add</button>
    </div>
  );
};

export default AddTask;
