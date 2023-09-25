// EditTask.js
import React from 'react';
import './App.css';
const EditTask = () => {
  return (
    <div className="App">
      
      {/* Add your edit task form or content here */}
      <h2 className='edit'>Edit Task</h2>
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
              <td>sdsd </td>
              <td>sds</td>
              <td>sds</td>
              <td>sds</td>
              <td>
                <button className='button'>Delete</button>
                &nbsp;
                <a className='button'>
                  Update
                </a>
              </td>

        </tbody>
      </table>
      {/* Your edit task form components go here */}
    </div>
  );
}

export default EditTask;
