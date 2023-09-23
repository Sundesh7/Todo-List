import React, { useState, useEffect } from 'react';

function ApiData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = 'http://localhost:3030/';

    fetch(apiUrl)
      .then((response) => {
      console.log("responseeee",response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData)
        console.log("data2",jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  console.log("data",data)
  return (
    <div>
      <h1>API Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item._id}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p>Due Date: {item.dueDate}</p>
              <p>Completed: {item.completed ? 'Yes' : 'No'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ApiData;