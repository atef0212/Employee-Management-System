import { useContext, useEffect, useState } from 'react';
import Logout from '../User/Logout.jsx';
import { AuthContext } from '../share/Context.jsx';
//import UpdateUserForm from './EditUsers.jsx';
import {  useNavigate } from 'react-router-dom';

function Dashboared() {
  const [loading, setLoading] = useState(true);
  const {token, userId}=useContext(AuthContext)
const [users, setUsers]=useState([])

const navigate=useNavigate()

    console.log(userId)
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        const usersDa=data.users
        setUsers(usersDa); // Assuming the API response has a 'users' field
        setLoading(false)
        console.log(usersDa.salary[0])
      } catch (error) {
        console.error('Error fetching users:', error.message);
        if (error.message === 'Unauthorized') {
          navigate('/login');
        }
        setLoading(false);
      }
    };

    getUsers(); // Fetch users when component mounts

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]); 

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE'
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      console.log(users)
      // Optionally, you can remove the user from the state after successful deletion
  setUsers(users.filter(user => user._id !== userId));
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

      <div>
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Land</th>
                <th className="px-4 py-2">Contract Limit</th>
                <th className="px-4 py-2">Salary</th>
                <th className="px-4 py-2">Vacation Days</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Actions</th>
              
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.avatarImg && <img className='w-11 h-12 rounded-sm' src={user.avatarImg.url} alt="Avatar" />}</td>

                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.age}</td>
                  <td className="px-4 py-2">{user.land}</td>
                  <td className="px-4 py-2">{user.contractLimit}</td>
                  <td className="px-4 py-2">{user.salary}</td>
                  <td className="px-4 py-2">{user.vacationDays}</td>
                  <td className="px-4 py-2">{user.department}</td>

                  <td className="px-4 py-2">
                   {/* <UpdateUserForm userId={user._id} /> */}
                    {/* <Link to={`/edit/${user._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</Link>  */}
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
   
    </div>

         <div><Logout/></div>
      </>
     
    )
  }

export default Dashboared;
