const addTodo = async ({ task }) => {
  const jwtToken = localStorage.getItem('token');
  console.log(jwtToken)
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await fetch(`http://localhost:3300/todo`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    window.location.href = 'http://localhost:3000/home'

  } catch (error) {
    console.error('Error:', error);
  }
};
export default addTodo;