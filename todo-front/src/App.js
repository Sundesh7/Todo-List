import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom'; // Import useParams
import './App.css';
import EditTask from './Components/UpdateTask/updateTask';
import handleDelete from './Components/deleteTask'
import handleCheckboxToggle from './Components/checkboxToggle';
import AddTask from './Components/AddTask/addTask';

const apiUrl = 'http://localhost:3300/todos';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };
  return (
    <Router>
    <Routes>
      <Route path="/edit/:taskId" element={<EditTask apiUrl={apiUrl} />} />
      <Route path="/addTask" element={<AddTask apiUrl={apiUrl} />} />
    </Routes>
      <div className="App">
      <h1 className="heading">To Do List</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Due Time</th>
            <th>Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
             console.log(tasks),
            <tr key={task.id}>
              <td className={task.completed ? 'completed' : ''} onClick={scrollToTop}> <Link to={`/edit/${task.id}`} style={{ textDecoration: 'none', color: 'blue' }}> {task.title}
                </Link> </td>
              <td className={task.completed ? 'completed' : ''}>{task.description}</td>
              <td className={task.completed ? 'completed' : ''}>
                {new Date(task.due_date).toLocaleDateString()}
              </td>
              <td className={task.completed ? 'completed' : ''}>{task.due_time}</td>
              <td>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(event) => handleCheckboxToggle({taskId:task.id,isChecked:event.target.checked,tasks:tasks,setTasks:setTasks,apiUrl:apiUrl})}
                />
              </td>
              <td>
                <button onClick={() => handleDelete({taskId:task.id,tasks:tasks,setTasks:setTasks,apiUrl:apiUrl})} className='xbutton'>X</button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='button' onClick={scrollToTop}> <Link to={`/addTask`} style={{ textDecoration: 'none', color: 'white' }} > Add Task </Link></button>
    </div>
    </Router>
  );
}

export default App;
