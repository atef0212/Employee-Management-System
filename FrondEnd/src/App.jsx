import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import LogIn from './login'

function App() {

  return (
    <>

<BrowserRouter>
  <Routes>
    <Route path='/' element={<Layout/>}/>
    <Route path='/login' element={<LogIn/>}/>
  </Routes>
</BrowserRouter>
    </>
  )
}

export default App
