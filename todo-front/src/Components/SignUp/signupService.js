const registerUser = async (obj) => {
    try {
      console.log(obj.Email,obj.Password,obj.Name);
      const response = await fetch(`http://localhost:3300/signup`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj), 
    });
    console.log(response.status);
        if(response.status === 200){
        window.alert("Registered Successfully");
        const data = await response.json();
        const token = data.token; 
        localStorage.setItem('token', token);
        window.location.href = 'http://localhost:3000/home' 
      }else if (response.status === 400) {
        window.alert("User already exists");
      }else if(!response.ok){
        throw new Error('Network response was not ok');
      }
      //Check if data has the expected properties before setting state
       
    } catch (error) {
      console.error('Error:', error);
    }
};
export default registerUser;