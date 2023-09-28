import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, useParams, useNavigate } from 'react-router-dom'; // Import useParams
import '../../App.css';
import EditTask from '../UpdateTask/updateTask';
import handleDelete from '../deleteTask';
import handleCheckboxToggle from '../checkboxToggle';
import AddTask from '../AddTask/addTask';

const apiUrl = 'http://localhost:3300/todos';

function Home() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem('token');
    console.log(jwtToken)
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    fetch(apiUrl, {
      headers: headers, // Include the headers in the request
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  console.log(tasks);
  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div className="App">
      <h1 className="heading">Things To Do シ</h1>
      <Routes>
        <Route
          path="/edit/:taskId"
          element={<EditTask apiUrl={apiUrl} />}
        />
        <Route
          path="/addTask"
          element={<AddTask apiUrl={apiUrl} />}
        />
      </Routes>
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

            <tr key={task.id}>
              <td className={task.completed ? 'completed' : ''} onClick={scrollToTop}>
                <Link to={`/edit/${task.id}`} style={{ textDecoration: 'none', color: 'darkblue' }}>
                  {task.title}
                </Link>
              </td>
              <td className={task.completed ? 'completed' : ''}>{task.description}</td>
              <td className={task.completed ? 'completed' : ''}>
                {new Date(task.due_date).toLocaleDateString()}
              </td>
              <td className={task.completed ? 'completed' : ''}>{task.due_time}</td>
              <td>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(event) => handleCheckboxToggle({ taskId: task.id, isChecked: event.target.checked, tasks: tasks, setTasks: setTasks, apiUrl: apiUrl })}
                />
              </td>
              <td>
                <button onClick={() => handleDelete({ taskId: task.id, tasks: tasks, setTasks: setTasks, apiUrl: apiUrl })} className='xbutton'>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='button' onClick={() => navigate('/addTask')}>
        Add Task
      </button>
    </div>
  );
}

export default Home;
