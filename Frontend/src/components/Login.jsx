import { useState } from "react";
import axios from "axios";
function Login() {
  const [username,setusername]=useState('');
  const [password,setpassword]=useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response =await axios.post (
        "http://localhost:3000/api/v1/admin/login",
        { username, password },
        {
          method: 'POST',
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      localStorage.setItem("details", response.data.name);
      setusername('');
      setpassword('');
      window.location.reload();
      // navigate("/"); // Navigate to home page
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
  <form className="flex flex-col w-full max-w-sm space-y-4 bg-gray-100 p-6 rounded-md shadow-lg">
    <input 
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
      value={username}
      onChange={(e)=>setusername(e.target.value)}
      placeholder="Username" 
    />
    <input 
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
      value={password}
      onChange={(e)=>setpassword(e.target.value)}
      placeholder="Password" 
      type="password"
    />
    <button 
      className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600 transition" onClick={handleSubmit}>
      Login</button>
  </form>
</div>

  )
}

export default Login