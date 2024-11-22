import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import usersData from "./data/user.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./components/singIn/signIn";
import Home from "./components/home/home";
import NavBar from "./components/NavBar/navBar";
import Dashboard from "./components/Dashboard/dashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Load user session from localStorage when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);


  // Handle form submission to sign in the user
  const handleSignIn = (e) => {
    e.preventDefault();
    const username = e.target.userName.value;
    const password = e.target.password.value;

    // Find user in the JSON data
    const user = usersData.find((u) => u.username === username && u.password === password);

    if (user && user.password === password) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard");

    } else {
      toast.error("Please check your username and password", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  // Handle sign out
  const handleSignOut = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/sign-in" element={<SignIn handleSignIn={handleSignIn} />} />
        <Route path="/dashboard" element={<Dashboard currentUser={currentUser} />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
