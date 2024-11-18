import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [empdata, setempdata] = useState([]);
  const [load, setload] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/admin/get-details");
        if (response.ok) {
          const data = await response.json();
          setempdata(data.fetchData);
          setload(true);
        } else {
          console.log(response);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);

  const deleteDetails = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/admin/delete-route/${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      // Remove the deleted employee from the state
      setempdata((prev) => prev.filter((employee) => employee._id !== id));
      alert("Employee deleted successfully!");
    } catch (err) {
      console.error("Error deleting employee:", err);
      alert("Failed to delete employee. Please try again.");
    }
  };

  const handleEdit = (employee) => {
    setEditMode(true);
    setEditEmployee(employee);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/admin/update-details/${editEmployee._id}`,
        editEmployee,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        
        setempdata((prev) =>
          prev.map((emp) => (emp._id === editEmployee._id ? editEmployee : emp))
        );
        setEditMode(false);
        alert("Employee updated successfully!");
      }
    } catch (err) {
      console.error("Error updating employee:", err);
      alert("Failed to update employee. Please try again.");
    }
  };

  return (
    <div className="p-4">
      {!load ? (
        <h1 className="text-center text-xl font-semibold">Loading...</h1>
      ) : editMode ? (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4 p-4">
          <h1 className="text-lg font-bold">Edit Employee</h1>
          <input
            type="text"
            value={editEmployee?.name || ""}
            onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })}
            placeholder="Name"
            className="border p-2 rounded"
          />
          <input
            type="email"
            value={editEmployee?.email || ""}
            onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })}
            placeholder="Email"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={editEmployee?.mobileno || ""}
            onChange={(e) => setEditEmployee({ ...editEmployee, mobileno: e.target.value })}
            placeholder="Phone"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={editEmployee?.designation || ""}
            onChange={(e) => setEditEmployee({ ...editEmployee, designation: e.target.value })}
            placeholder="Designation"
            className="border p-2 rounded"
          />
          <select
            value={editEmployee?.gender || ""}
            onChange={(e) => setEditEmployee({ ...editEmployee, gender: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select
            value={editEmployee?.course || ""}
            onChange={(e) => setEditEmployee({ ...editEmployee, course: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Course</option>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="BSc">BSc</option>
          </select>
          <div className="flex gap-4">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="overflow-x-auto relative top-10">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Designation</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Gender</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Course</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {empdata.map((item, index) => (
                <tr key={item._id || index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.mobileno}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.designation}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.gender}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.course}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteDetails(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
