import { useContext, useEffect, useState } from 'react';
import Logout from '../User/Logout.jsx';
import { AuthContext } from '../share/Context.jsx';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const { state } = useContext(AuthContext);
  const { token } = state;
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.users); // Assuming the API response has a 'users' field
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error.message);
        if (error.message === 'Unauthorized') {
          navigate('/login');
        }
        setLoading(false);
      }
    };

    getUsers(); // Fetch users when component mounts
  }, [token, navigate]);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers(users.filter(user => user._id !== userId)); // Remove deleted user from state
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow ">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 ">
          <h1 className="text-3xl font-bold text-gray-900  border-black border-0">Dashboard</h1>
        
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-4 text-center">User List</h2>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 border-b-2 border-gray-200">Id</th>
                    <th className="px-4 py-2 border-b-2 border-gray-200">Image</th>
                    <th className="px-4 py-2 border-b-2 border-gray-200">Name</th>
                    <th className="px-4 py-2 border-b-2 border-gray-200">Email</th>
                    <th className="px-4 py-2 border-b-2 border-gray-200">Age</th>
                    <th className="px-4 py-2 border-b-2 border-gray-200">Land</th>
                    <th className="px-4 py-2 border-b-2 border-gray-200">Contract Limit</th>
                    <th className="px-4 py-2 border-b-2 border-gray-200">Salary</th>
                    <th className="px-4 py-2 border-b-2 border-gray-200">Vacation Days</th>
                    <th className="px-4 py-2 border-b-2 border-gray-200">Department</th>
                    <th className="px-4 py-2 border-b-2 border-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id} className="border-b border-gray-200">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">
                        {user.avatarImg && <img className="w-11 h-12 rounded-sm" src={user.avatarImg.url} alt="Avatar" />}
                      </td>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.age}</td>
                      <td className="px-4 py-2">{user.land}</td>
                      <td className="px-4 py-2">{user.contractLimit}</td>
                      <td className="px-4 py-2">{user.salary}</td>
                      <td className="px-4 py-2">{user.vacationDays}</td>
                      <td className="px-4 py-2">{user.department}</td>
                      <td className="px-4 py-2 space-x-2">
                        <Link to={`/edit/${user._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</Link>
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
      </main>
 <Logout />
    </div>
  );
}

export default Dashboard;
