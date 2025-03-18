import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  // ✅ Listen for Dark Mode changes dynamically
  useEffect(() => {
    const handleStorageChange = () => {
      setIsDarkMode(localStorage.getItem("darkMode") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div style={containerStyle(isDarkMode)}>
      <div style={contentStyle}>
        <h1 style={titleStyle(isDarkMode)}>Welcome to Home Inventory 📦</h1>
        <p style={descriptionStyle(isDarkMode)}>
          The place that helps you keep track of your items</p>

        <div style={buttonContainer}>
          <Link to="/inventory" style={linkStyle}>
            <button style={buttonStyle}>Go to Inventory</button>
          </Link>
          <Link to="/register" style={linkStyle}>
            <button style={buttonStyle}>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// ✅ Styles with Dark Mode & Full-Screen Fix
const containerStyle = (darkMode) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", // Centers vertically
  alignItems: "center", // Centers horizontally
  minHeight: "100vh",
  width: "100vw",
  margin: "0",
  padding: "0",
  backgroundColor: darkMode ? "#121212" : "#f5f5f5",
  color: darkMode ? "#fff" : "#000",
  transition: "background-color 0.3s ease, color 0.3s ease",
  position: "relative",
});

const contentStyle = {
  flex: 1, // Ensures content pushes footer down
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "30px",
  maxWidth: "600px",
};

const titleStyle = (darkMode) => ({
  fontSize: "32px",
  fontWeight: "bold",
  color: darkMode ? "#fff" : "#000",
  marginBottom: "15px",
});

const descriptionStyle = (darkMode) => ({
  fontSize: "18px",
  color: darkMode ? "#bbb" : "#333",
  marginBottom: "25px",
});

const buttonContainer = {
  display: "flex",
  gap: "15px",
  marginTop: "20px",
};

const linkStyle = {
  textDecoration: "none",
};

const buttonStyle = {
  padding: "14px 24px",
  fontSize: "18px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

export default Welcome;
