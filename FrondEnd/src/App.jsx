import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import LogIn from './components/User/login'
import JobOffers from './components/Pages/JobOffers'
import Dashboared from './components/Pages/Dashboared'
import Register from './components/User/Register'
//import UpdateUserForm from './components/Pages/EditUsers.jsx'
import UploadImage from './components/User/UploadImage.jsx'

function App() {


  return (
    <>

<BrowserRouter>
  <Routes>
    <Route path='/' element={<Layout/>}/>
    <Route path='/login' element={<LogIn/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/jobOffers' element={<JobOffers/>}/>
    <Route path='/dashboard' element={<Dashboared/>}/>
    {/* <Route path='/edit/:id' element={<UpdateUserForm/>}/> */}
    <Route path='/uploadImg/:id' element={<UploadImage/>}/>
  </Routes>
</BrowserRouter>
    </>
  )
}

export default App
