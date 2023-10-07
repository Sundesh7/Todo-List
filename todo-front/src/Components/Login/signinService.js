const registerUser = async (obj) => {
  try {
    const response = await fetch(`http://localhost:3300/signin`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('token', token);
      window.location.href = 'http://localhost:3000/home'
    } else {
      return response.status;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
export default registerUser;