import {useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [data, setData] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("details"));
  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem('details'); // Replace 'keyName' with your key
    if (storedData) {
      setData(storedData); // Update state with the retrieved data
    }
  }, []);
  const handlelogout=()=>{
    window.location.reload();
    setIsLoggedIn(false)
    localStorage.removeItem("details");
  }
  const nav=useNavigate();
  const handlelogin=()=>{
    nav('/');
  }
  return (
    <nav>
        <div className="">
        <div className="flex justify-around mt-5">
          <Link to="/">Home</Link>
          {isLoggedIn?<Link to="/emp-list">Employee List</Link>:""}
          <p>{data}</p>
          {!isLoggedIn?<button 
          className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600 transition" onClick={handlelogin}>
          Login
        </button>:
    <button 
    className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600 transition" onClick={handlelogout}>
    Logout
  </button>
    }
        </div>
        {isLoggedIn? <div className='flex float-right mr-10'><button className='bg-green-400 p-2 border-2 rounded-xl'>
         <Link to='/create-employee'>Create Employee</Link>
          </button>
          </div>:""}
    </div>
    </nav>
  )
}

export default Navbar