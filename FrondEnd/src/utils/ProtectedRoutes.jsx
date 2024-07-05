import { Outlet, Navigate } from "react-router-dom"
import { AuthContext } from "../components/share/Context"
import { useContext } from "react"
function ProtectedRoutes() {
    const {user}=useContext(AuthContext)
  return  user ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoutes