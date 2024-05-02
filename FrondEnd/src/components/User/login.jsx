import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../share/Context.jsx";







function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { state, dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {



      const response = await fetch('http://localhost:5000/api/users/login/', {
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
      
      const { user, token } = await response.json();
      dispatch({ type: 'LOGIN', payload: { user, token } });


  
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/jobOffers", { replace: true });
      }



    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password');
      setPassword('');
    }


     // Check if the user is already logged in
  if (state.isLoggedIn) {
    // Redirect to a default page if the user is already logged in
    navigate("/dashboard", { replace: true });
    return null; // Render nothing
  }
  }


  return (
    <>
      <form onSubmit={handleLogin} className="max-w-md mx-auto">
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
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


        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
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
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Log In
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <Link to="/register">SignUp</Link>
        </button>
        </div>


        
      </form>
    </>
  );
}

export default LogIn;
