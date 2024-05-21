import { useNavigate} from "react-router-dom";
import { AuthContext } from "../share/Context";
import { useContext } from "react";

function Logout() {
const {dispatch}=useContext(AuthContext)

const navigate=useNavigate()
  const handleLogout = async (e) => {
   
    e.preventDefault();


   dispatch({type:"LOGOUT"})
        navigate("/",{replace:true})

  };

  return (
   <>
 <button className=" bg-black text-white w-20 hover:text-blue-600 absolute right-10 top-8"  onClick={handleLogout}>Logout</button>

   </>
  )
}

export default Logout