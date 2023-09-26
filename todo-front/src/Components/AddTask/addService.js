const addTodo = async ({task}) => {
    try {
      const response = await fetch(`http://localhost:3300/todo`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task), 
    });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      window.location.href = 'http://localhost:3000/'
      // Check if data has the expected properties before setting state
       
    } catch (error) {
      console.error('Error:', error);
    }
};
export default addTodo;