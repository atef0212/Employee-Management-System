import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import JobOffers from './Pages/JobOffers.jsx'
function Layout() {
  return (
  <>
  <Header/>
  <JobOffers/>
    <Outlet/>
  </>
  )
}

export default Layout