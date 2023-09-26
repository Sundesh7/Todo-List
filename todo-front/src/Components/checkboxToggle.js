const handleCheckboxToggle = async ({taskId,isChecked,tasks,setTasks,apiUrl}) => {
    // Find the task to update in the state
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        // Toggle the completed status based on isChecked
        return {
          ...task,
          completed: isChecked,
        };
      }
      return task;
    });

    // Update the state to reflect the new completion status immediately
    setTasks(updatedTasks);

    // Send a request to update the database with the new completion status
    try {
      updatedTasks.find((task) => task.id === taskId);
      const response = await fetch(`${apiUrl}/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: isChecked }), 
      });
      if (!response.ok) {
        console.error('Error updating task:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle the error (e.g., show an error message to the user or revert the change)
    }
  };
export default handleCheckboxToggle;