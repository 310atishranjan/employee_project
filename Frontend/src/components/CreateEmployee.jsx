import {useState} from 'react'
import axios from "axios";
const CreateEmployee = () => {
    const [course,setcourse]=useState('');
    const [name,setname]=useState('');
    const [email,setemail]=useState('');
    const [mobileno,setmobileno]=useState('');
    const [designation,setdesignation]=useState('');
    const [gender,setgender]=useState('');
    const handleSubmit=async(e)=>{
        e.preventDefault();
      try{
        const response = await axios.post(
          "http://localhost:3000/api/v1/admin/employee-add",
          {name,email,mobileno,designation,gender,course},
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        if(response.ok){
            alert("New employee added")
            console.log(response);
        }
      }catch(err){
        console.log(err);
      }
    }
  return (
    <div className='m-10'>
    <form onSubmit={handleSubmit}>
    <div className='flex flex-col justify-center items-center gap-7 mb-10'>

        <div><h1 className='font-medium text-xl bg-gray-200 rounded-sm pl-5 pr-5'>Create Employee</h1></div> 
        <div><input value={name} onChange={(e)=>{setname(e.target.value)}} placeholder='Name' className='border-2 h-12 w-96 pl- pr- text-center rounded'></input></div>
        <div><input value={email} onChange={(e)=>{setemail(e.target.value)}} placeholder='Email' className='border-2 h-12 w-96 pl- pr- text-center rounded'></input></div>
        <div><input value={mobileno} onChange={(e)=>{setmobileno(e.target.value)}} type="number" placeholder='Phone-No' className='border-2 h-12 w-96 pl- pr- text-center rounded'></input></div>
        <div><input value={designation} onChange={(e)=>{setdesignation(e.target.value)}} placeholder='Designation' className='border-2 h-12 w-96 pl- pr- text-center rounded'></input></div>
        <div className="flex flex-col space-y-4">
  <div className="flex items-center gap-2">
    <input
      type="radio"
      name="gender"
      value="male"
      onChange={(e) => setgender(e.target.value)}
      className="h-5 w-5 border-gray-300 focus:ring-blue-500"
    />
    <label className="text-gray-700">
      Male
    </label>
  </div>
  <div className="flex items-center gap-2">
    <input
      type="radio"
      name="gender"
      value="female"
      onChange={(e) => setgender(e.target.value)}
      className="h-5 w-5 border-gray-300 focus:ring-pink-500"
    />
    <label className="text-gray-700">
      Female
    </label>
  </div>
</div>
<div className="flex flex-col items-center space-y-4">
  <h1 className="text-center">Courses</h1>
  <select value={course} 
    onChange={(e) => setcourse(e.target.value)}
    className="h-12 w-96 px-4 text-gray-700 rounded border border-gray-300 focus:ring focus:ring-blue-300"
  >
    <option value="">
      Select a course
    </option>
    <option value="MCA">MCA</option>
    <option value="BCA">BCA</option>
    <option value="BSc">BSc</option>
  </select>
</div>
        <div><button className='bg-red-300 w-44 p-2 rounded-md' type="submit">Create Employee</button></div>
        {console.log(gender)}
    </div>
    </form>
</div>
  )
}

export default CreateEmployee;