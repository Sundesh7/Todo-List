import { Route, Routes, Navigate } from 'react-router-dom';
import "./App.css";
import Login from "./Components/Login/signIn";
import Home from "./Components/Home/home";
import AddTask from './Components/AddTask/addTask';
import EditTask from "./Components/UpdateTask/updateTask";
import SignUp from "./Components/SignUp/signUp";
function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/*" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      <Route path="/addTask" element={isAuthenticated ? <AddTask /> : <Navigate to="/login" />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" /> : <SignUp />} />
      <Route
        path="/edit/:taskId"
        element={isAuthenticated ? <EditTask /> : <Navigate to="/login" />}
      />
      <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;