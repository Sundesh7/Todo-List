import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useParams } from 'react-router-dom';
import UpdateTodo from './updateService';

const EditTask = () => {
  const { taskId } = useParams();
  
  // Initialize task state with default values
  const [task, setTask] = useState({  
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    completed: true,
  });

  // Use a separate useEffect for component initialization
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3300/todos/${taskId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Check if data has the expected properties before setting state
        if (
          'title' in data[0] &&
          'description' in data[0] &&
          'due_date' in data[0] &&
          'due_time' in data[0] &&
          'completed' in data[0]
        ) {
          setTask(data[0]);
        } else {
          console.error('Data from API does not have expected properties:', data[0]);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [taskId]);
  
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
      <h2 className='edit'>Edit Task</h2>
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
      <button onClick={()=>UpdateTodo({taskId:task.id,task:task})} className='button'>Update</button>
    </div>
  );
};

export default EditTask;
