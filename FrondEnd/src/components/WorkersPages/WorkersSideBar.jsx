import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../share/Context";
import url_Api from "../../api";
function WorkersSideBar() {
    const { token } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            const response = await fetch(`${url_Api}users`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            const usersData = data.users;
            console.log("user", usersData);
            setUsers(usersData);
        };
        getAllUsers();
    }, [token]);

    return (
        <div className=" lg:w-1/5 sm:w-1/3 p-4 bg-gray-100 h-fit mt-4 relative">
            <div className="space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
                        <img src={user.avatarImg.url} alt="Profile Avatar" className="w-16 h-16 rounded-full object-cover" />
                        <div>
                            <p className="text-lg font-semibold">{user.name}</p>
                            <p className="text-lg font-semibold">{user.age}</p>
                            <p className="text-lg font-semibold">{user.land}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkersSideBar;
