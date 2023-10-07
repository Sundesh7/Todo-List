const handleCheckboxToggle = async ({ taskId, isChecked, tasks, setTasks, apiUrl }) => {
  const jwtToken = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json',
  };
  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        completed: isChecked,
      };
    }
    return task;
  });

  setTasks(updatedTasks);

  try {
    updatedTasks.find((task) => task.id === taskId);
    const response = await fetch(`${apiUrl}/${taskId}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ completed: isChecked }),
    });
    if (!response.ok) {
      console.error('Error updating task:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating task:', error);
  }
};
export default handleCheckboxToggle;