// EditUser.jsx
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../share/Context.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons/faHouseUser';
import url_Api from '../../api.js';
function EditUser() {
  const { id } = useParams(); // Get the user ID from the URL parameters
  const { state } = useContext(AuthContext);
  const { token } = state;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${url_Api}/api/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url_Api}/api/users/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      alert("User data updated successfully")
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating user:', error.message);
      setError('Failed to update user');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
 <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Land</label>
        <input
          type="text"
          name="email"
          value={user.land}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">gender</label>
        <input
          type="text"
          name="gender"
          value={user.gender}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Save Changes
      </button>
    </form>

<Link
                    to="/homeWorker"
                    className="absolute top-7 left-7"
                  >
                <FontAwesomeIcon icon={faHouseUser} size="2xl" style={{color: "#74C0FC",}} />
                  </Link>
    </>
   
  );
}

export default EditUser;