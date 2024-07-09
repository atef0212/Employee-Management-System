import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../share/Context.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons/faHouseUser';
import { Link } from 'react-router-dom';
import url_Api from '../../api.js';

const UserProfile = () => {
  const [userd, setUser] = useState(null);
  const [editData, setEditData] = useState(null);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return; // Check if user is available
      try {
        const response = await fetch(`${url_Api}/api/users/${user.userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const profData = data.getUser;
        setUser(profData);
        console.log(profData);
      } catch (error) {
        console.error('There was an error fetching the user!', error);
      }
    };

    fetchUser();
  }, [user, token]); // Dependency array to avoid infinite loop

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url_Api}/api/users/edit/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });
      const data = await response.json();
      if (data.msg === 'User data updated successfully') {
        setUser(data.existingUser);
        alert(data.msg);
        setEditData(null);
      }
    } catch (error) {
      console.error('There was an error updating the user!', error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mt-10 sm:mt-20 absolute top-11 right-0">
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        {userd ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            {editData ? (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Name"
                />
                <input
                  type="number"
                  name="age"
                  value={editData.age}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Age"
                />
                <input
                  type="number"
                  name="tall"
                  value={editData.tall}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Tall"
                />
                <input
                  type="text"
                  name="land"
                  value={editData.land}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Land"
                />
                <select
                  name="gender"
                  value={editData.gender}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Email"
                />
                <div className="flex space-x-4">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditData(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img src={userd.avatarImg.url} alt="Profile Avatar" className="w-16 h-16 rounded-full" />
                  <div>
                    <p className="text-lg font-semibold">Name: {userd.name}</p>
                    <p>Age: {userd.age}</p>
                    <p>Tall: {userd.tall}</p>
                    <p>Land: {userd.land}</p>
                    <p>Gender: {userd.gender}</p>
                    <p>Email: {userd.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditData(userd)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
      <Link to="/homeWorker" className="absolute top-7 left-7">
        <FontAwesomeIcon icon={faHouseUser} size="2xl" style={{ color: "#74C0FC" }} />
      </Link>
    </>
  );
};

export default UserProfile;
