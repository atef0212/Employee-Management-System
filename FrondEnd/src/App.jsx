import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import LogIn from './components/User/login'
import Dashboared from './components/Pages/Dashboared'
import Register from './components/User/Register'
import EditUsers from './components/Pages/EditUsers.jsx'
import ProfilePage from './components/Pages/Profilepage.jsx'

function App() {


  return (
    <>

<BrowserRouter>
  <Routes>
    <Route path='/' element={<Layout/>}/>
    <Route path='/login' element={<LogIn/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/profilePage' element={<ProfilePage/>}/>
    <Route path="/dashboard" element={<Dashboared />} />
          <Route path="/edit/:id" element={<EditUsers />} />
  </Routes>
</BrowserRouter>
    </>
  )
}

export default App
