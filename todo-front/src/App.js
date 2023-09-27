import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/signIn"; 
import Home from "./Components/Home/home";
import AddTask from './Components/AddTask/addTask';
import EditTask from "./Components/UpdateTask/updateTask";
import SignUp from "./Components/SignUp/signUp";
function App() {
  return (
    <Routes>
      <Route path="/addTask" element={<AddTask />} />
      <Route path='/*' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/edit/:taskId' element={<EditTask/>} />
      <Route path='/home' element={<Home/>} />
    </Routes>
  );
}
 
export default App;