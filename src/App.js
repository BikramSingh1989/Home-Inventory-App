import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import Register from "./Register";
import Inventory from "./Inventory";

const API_URL = "https://home-inventory-app.onrender.com"; 

const App = () => {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <Router>
      <div style={appContainerStyle(isDarkMode)}>
        <header style={headerStyle}>
          <h2>📦 Home Inventory</h2>
          <button onClick={toggleDarkMode} style={buttonStyle}>
            {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>

        <Routes>
          <Route path="/" element={user ? <Inventory user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

// ✅ Footer Component
const Footer = () => {
  return (
    <footer style={footerStyle}>
      App created by <strong>Bikram Singh</strong> © {new Date().getFullYear()}
    </footer>
  );
};

// ✅ Styles
const appContainerStyle = (darkMode) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  fontFamily: "Arial, sans-serif",
  backgroundColor: darkMode ? "#333" : "#f5f5f5",
  color: darkMode ? "#fff" : "#000",
});

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
};

const footerStyle = {
  textAlign: "center",
  padding: "10px",
  fontSize: "14px",
  color: "#666",
  backgroundColor: "#f1f1f1",
  position: "relative",
  bottom: "0",
  width: "100%",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#222",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "1em",
  margin: "5px 0",
};

export default App;
