import React from "react";
import Signup from "./Pages/Signup/Signup";
import InterestModal from "./Components/InterestModal";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";


import Dashboard from "./Pages/Dashboard/Dashboard";
import Settings from "./Pages/Settings/Settings";
import MyArticle from "./Pages/MyArticle/Articles";


function App() {
    return (
        <div>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
    
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/my-articles" element={<MyArticle />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
