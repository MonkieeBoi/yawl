import './App.css'
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Main from "./pages/Main.jsx";

const App = () => (
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
    </Routes>
);

export default App;
