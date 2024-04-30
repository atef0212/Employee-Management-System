import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import LogIn from './login'
import JobOffers from './components/Pages/JobOffers'
function App() {

  return (
    <>

<BrowserRouter>
  <Routes>
    <Route path='/' element={<Layout/>}/>
    <Route path='/login' element={<LogIn/>}/>
    <Route path='/jobOffers' element={<JobOffers/>}/>
  </Routes>
</BrowserRouter>
    </>
  )
}

export default App
