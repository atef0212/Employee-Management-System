import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import JobOffers from './Pages/JobOffers.jsx'
import LogIn from './User/login.jsx'
function Layout() {
  return (
  <>
  <Header/>
  <JobOffers/>
  
    <Outlet/>
    <LogIn/>
  </>
  )
}

export default Layout