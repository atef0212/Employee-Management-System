import { useEffect, useState } from 'react';
import Logout from '../User/Logout.jsx';



function Dashboared() {
const [users, setUsers]=useState([])
 

    
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        const usersDa=data.users
        setUsers(usersDa); // Assuming the API response has a 'users' field
        console.log(usersDa.salary[0])
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    getUsers(); // Fetch users when component mounts

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE'
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
  
      // Optionally, you can remove the user from the state after successful deletion
    //  setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  }
  

    return (
      <>
      {/* <div>
        {
          users.map(user => (
            <div key={user._id}>{user.name}</div>
          ))
    
        }
      </div> */}

<div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Land</th>
            <th className="px-4 py-2">contract Limit</th>
       
            <th className="px-4 py-2">salary</th>
            <th className="px-4 py-2">vacationDays</th>
            <th className="px-4 py-2">department</th>


        
           
           
            
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}  className="border-b border-gray-200">
              <td className="px-4 py-2">{index}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.age}</td>
              <td className="px-4 py-2">{user.land}</td>
              <td className="px-4 py-2">{user.contractLimit}</td>
             
              
            
              <td className="px-4 py-2">{user.salary}$</td>
              
              <td className="px-4 py-2">{user.vacationDays}</td>
              <td className="px-4 py-2">{user.department}</td>
              <td className="px-4 py-2">
              <div>
         
              {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
               onClick={()=>navigate("updateUser",{state:user} )} >
                  Edit
                </button> */}
      
         <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteUser(user._id)}
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

         <div><Logout/></div>
      </>
     
    )
  }

export default Dashboared;
