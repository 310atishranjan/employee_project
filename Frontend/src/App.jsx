import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './index.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import { useState } from 'react';
function App() {
  return (
    <>
   
      <Router>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/emp-list' element={<EmployeeList/>}></Route>
          <Route path='/create-employee' element={<CreateEmployee/>}></Route>
        </Routes>
      </Router>
    </>
  )
}
export default App