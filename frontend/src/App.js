import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inventory from "./pages/Inventory";
import Welcome from "./pages/Welcome";

const App = () => {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  // ✅ Sync dark mode across tabs
  useEffect(() => {
    const handleStorageChange = () => {
      setIsDarkMode(localStorage.getItem("darkMode") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Fetch user details on page load
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
    window.dispatchEvent(new Event("storage")); // ✅ Ensures global update
  };

  return (
    <Router>
      <div style={appContainerStyle(isDarkMode)}>
        {/* ✅ Navbar (Updated Layout) */}
        <header style={headerStyle(isDarkMode)}>
          <h2 style={logoStyle}>📦 Home Inventory</h2>

          {/* ✅ Dark Mode Toggle Under Logo */}
          <button onClick={toggleDarkMode} style={buttonStyle}>
            {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* ✅ Navigation Links */}
          <nav style={navLinks}>
            <Link to="/" style={navLinkStyle(isDarkMode)}>Welcome</Link>
            <Link to="/inventory" style={navLinkStyle(isDarkMode)}>Home</Link>
            <Link to="/register" style={navLinkStyle(isDarkMode)}>Register</Link>
          </nav>
        </header>

        {/* ✅ Routes */}
        <div style={contentWrapper}>
          <Routes>
            <Route path="/" element={<Welcome isDarkMode={isDarkMode} />} />
            <Route path="/inventory" element={user ? <Inventory isDarkMode={isDarkMode} user={user} /> : <Login isDarkMode={isDarkMode} setUser={setUser} />} />
            <Route path="/login" element={<Login isDarkMode={isDarkMode} setUser={setUser} />} />
            <Route path="/register" element={<Register isDarkMode={isDarkMode} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

// ✅ Global Styles
const appContainerStyle = (darkMode) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100vw", // ✅ Full-screen fix
  margin: "0",
  padding: "0",
  backgroundColor: darkMode ? "#121212" : "#f5f5f5",
  color: darkMode ? "#fff" : "#000",
  transition: "background-color 0.3s ease, color 0.3s ease",
});

const headerStyle = (darkMode) => ({
  display: "flex",
  flexDirection: "column", // ✅ Stack logo, button, and links
  alignItems: "center", // ✅ Keep everything centered
  padding: "20px",
  backgroundColor: darkMode ? "#222" : "#ddd",
  color: darkMode ? "#fff" : "#000",
  transition: "background-color 0.3s ease",
});

const logoStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "10px", // ✅ Adds spacing between title and button
};

const navLinks = {
  display: "flex",
  gap: "25px", // ✅ Increased spacing between links
  marginTop: "10px", // ✅ Adds space after dark mode button
};

const navLinkStyle = (darkMode) => ({
  textDecoration: "none",
  fontSize: "18px", // ✅ Increased font size
  fontWeight: "bold", // ✅ Made it bold
  color: darkMode ? "#8ab4f8" : "#007BFF",
  padding: "8px 12px",
  borderRadius: "5px",
  transition: "background-color 0.3s ease, color 0.3s ease",
});

const contentWrapper = {
  flex: 1, // Pushes content to fill screen
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "30px",
};

const buttonStyle = {
  padding: "10px 15px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "16px",
  marginTop: "5px", // ✅ Space between logo and button
};

export default App;
