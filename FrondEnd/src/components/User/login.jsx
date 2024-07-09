import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../share/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
//import url_Api from "../../api";

function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://employee-management-s.onrender.com/api/users/login/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      const { user, accessToken } = await response.json();

      auth.dispatch({ type: 'LOGIN', payload: { user, token: accessToken } });

      if (user.role === 'admin') {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/homeWorker", { replace: true });
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password');
      setPassword('');
    }
  };

  const handleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div onClick={handleSideBar} className="fixed top-8 left-[13%] z-50">
        <FontAwesomeIcon icon={faUserPlus} size="xl" style={{ color: "#74C0FC" }} />
      </div>
      <div className={`fixed top-0 left-0 h-full transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-[250px] bg-gray-900 text-white`}>
        <form onSubmit={handleLogin} className="p-4">
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="mb-4 mt-16 text-center">
            <label htmlFor="email" className="block text-gray-400 text-sm font-bold mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6 text-center">
            <label htmlFor="password" className="block text-gray-400 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex justify-around">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Log In
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <Link to="/register">SignUp</Link>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LogIn;
