import { useState } from 'react';
import Logout from '../User/Logout.jsx';

function Dashboared() {
  // State to hold users data
  const [users, setUsers] = useState([]);

  // Function to fetch users
  const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.user); // Update users state with fetched data
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };
  getUsers()



  return (
    <>
      {/* Render Logout component */}
      <Logout />

      {/* Render fetched users data */}
      <div>
        {users.map(user => (
          <div key={user._id}>{/* Render user data here */}</div>
        ))}
      </div>
    </>
  );
}

export default Dashboared;
