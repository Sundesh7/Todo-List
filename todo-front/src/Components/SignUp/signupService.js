const registerUser = async (obj) => {
  try {
    const response = await fetch(`http://localhost:3300/signup`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    if (response.status === 200) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('token', token);
      window.location.href = 'http://localhost:3000/home'
    } else if (response.status === 400) {
      return response.status;
    } else if (!response.ok) {
      throw new Error('Network response was not ok');
    }


  } catch (error) {
    console.error('Error:', error);
  }
};
export default registerUser;