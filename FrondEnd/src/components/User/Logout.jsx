import { useNavigate} from "react-router-dom";
import { AuthContext } from "../share/Context";
import { useContext } from "react";

function Logout() {
const {dispatch}=useContext(AuthContext)

const navigate=useNavigate()
  const handleLogout = async (e) => {
   
    e.preventDefault();


   dispatch({type:"LOGOUT"})
        navigate("/login",{replace:true})

  };

  return (
   <>
 <button className="relative left-[1%] bg-black text-white w-20 hover:text-blue-600"  onClick={handleLogout}>Logout</button>

   </>
  )
}

export default Logout