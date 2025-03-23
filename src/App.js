import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Search from "./pages/search/search";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./state/AuthContext";
import Likes from "./pages/likes/Likes";


function App() {
  const{user} = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/"/> :<Login />} />
        <Route path="/register" element={user ? <Navigate to= "/"/> : <Register />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/likes" element={<Likes />} />
      </Routes>
    </Router>
  );


}

export default App;
