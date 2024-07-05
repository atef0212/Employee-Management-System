import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import LogIn from "./components/User/login";
import Dashboared from "./components/Pages/Dashboared";
import Register from "./components/User/Register";
import EditUsers from "./components/Pages/EditUsers.jsx";
import ProfilePage from "./components/Pages/Profilepage.jsx";
import JobOffers from "./components/Pages/JobOffers.jsx";
import Home from "./components/WorkersPages/Home.jsx";
import Comment from "./components/WorkersPages/Comment.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/:id" element={<Comment />} />
            <Route path="/homeWorker" element={<Home />} />
            <Route path="/profilePage" element={<ProfilePage />} />
          </Route>

       
          
          <Route path="/jobOffers" element={<JobOffers />} />
          <Route path="/dashboard" element={<Dashboared />} />
          <Route path="/edit/:id" element={<EditUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
