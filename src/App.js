import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inventory from "./pages/Inventory";

const API_URL = "https://home-inventory-app.onrender.com";

const App = () => {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  // ✅ Fetch user details on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data); // Store user details
      })
      .catch(() => {
        localStorage.removeItem("token"); // Remove invalid token
        setUser(null);
      });
    }
  }, []);

  // ✅ Redirect to Inventory after login
  useEffect(() => {
    if (user) {
      window.location.href = "/";
    }
  }, [user]);

  // ✅ Toggle Dark Mode
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

          <div style={headerButtons}>
            <button onClick={toggleDarkMode} style={buttonStyle}>
              {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>

            {user ? (
              <button onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
                window.location.href = "/login";
              }} style={authButtonStyle}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button style={authButtonStyle}>Login</button>
                </Link>
                <Link to="/register">
                  <button style={authButtonStyle}>Register</button>
                </Link>
              </>
            )}
          </div>
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

const headerButtons = {
  display: "flex",
  gap: "10px",
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

const authButtonStyle = {
  padding: "10px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "1em",
  margin: "5px",
  textDecoration: "none",
};

export default App;
