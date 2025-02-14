import './App.css'
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Main from "./pages/Main.jsx";
import Nav from "./assets/Nav.jsx"
import Profile from "./pages/Profile.jsx"

const App = () => (
    <>
        <Nav />
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </>
);

export default App;
