import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../share/Context.jsx";
import Logout from "../User/Logout.jsx";
function ProfilePage() {
  const { user, token }  = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null); // Change to null for better initial state handling

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${user.userId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        const profData=data.getUser
        setProfileData(profData); // Set the received data to state
        console.log(data)
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user, token]);

  if (!profileData) {
    return <div>Loading...</div>; // Show loading state until data is fetched
  }
  console.log(profileData)

  return (
  <>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Profile</h1>
      <div className="flex justify-center mb-4">
        <img className="w-24 h-24 rounded-full object-cover border-2 border-gray-300" src={profileData.avatarImg.url} alt="Profile Avatar"/>
      </div>
      <div className="mb-4">
        <strong className="text-gray-700">Name:</strong> <span className="text-gray-900">{profileData.name}</span>
      </div>
      <div className="mb-4">
        <strong className="text-gray-700">Tall:</strong> <span className="text-gray-900">{profileData.tall}</span>
      </div>
      <div className="mb-4">
        <strong className="text-gray-700">Age:</strong> <span className="text-gray-900">{profileData.age}</span>
      </div>
      <div className="mb-4">
        <strong className="text-gray-700">Gender:</strong> <span className="text-gray-900">{profileData.gender}</span>
      </div>
      <div className="mb-4">
        <strong className="text-gray-700">Land:</strong> <span className="text-gray-900">{profileData.land}</span>
      </div>
      <div className="mb-4">
        <strong className="text-gray-700">salary:</strong> <span className="text-gray-900">{profileData.salary}</span>
      </div>
     
    </div>
  </div>
  <div className=" absolute top-0"><Logout/></div>
  </>
  
  );
}

export default ProfilePage;
