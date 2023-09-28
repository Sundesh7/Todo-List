const handleDelete = async ({ taskId, tasks, setTasks, apiUrl }) => {
  try {
    const jwtToken = localStorage.getItem('token');
    console.log(jwtToken)
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
    };
    const response = await fetch(`${apiUrl}/${taskId}`, {
      method: 'DELETE',
      headers: headers,
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
export default handleDelete;