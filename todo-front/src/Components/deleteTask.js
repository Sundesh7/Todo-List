const handleDelete = async ({ taskId, tasks, setTasks, apiUrl }) => {
  try {
    const jwtToken = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
    };
    const response = await fetch(`${apiUrl}/${taskId}`, {
      method: 'DELETE',
      headers: headers,
    });

    if (response.ok) {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } else {
      console.error('Error deleting task:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
export default handleDelete;