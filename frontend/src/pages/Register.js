import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://home-inventory-app.onrender.com/api/auth/register";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    const handleStorageChange = () => {
      setIsDarkMode(localStorage.getItem("darkMode") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(API_URL, formData);
      alert(response.data.message);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={containerStyle(isDarkMode)}>
      <div style={wrapperStyle(isDarkMode)}>
        <h2 style={titleStyle(isDarkMode)}>Register</h2>
        {error && <p style={errorStyle}>{error}</p>}

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            style={inputStyle(isDarkMode)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={inputStyle(isDarkMode)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={inputStyle(isDarkMode)}
          />
          <button type="submit" style={buttonStyle}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

// ✅ Styles for Full-Screen Layout & Dark Mode Fixes
const containerStyle = (darkMode) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  width: "100vw",
  margin: "0",
  padding: "0",
  backgroundColor: darkMode ? "#121212" : "#f5f5f5",
  color: darkMode ? "#fff" : "#000",
  transition: "background-color 0.3s ease, color 0.3s ease",
});

const wrapperStyle = (darkMode) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "30px",
  backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
  borderRadius: "8px",
  boxShadow: darkMode ? "0px 4px 10px rgba(255, 255, 255, 0.1)" : "0px 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  width: "100%",
  maxWidth: "400px",
  minHeight: "350px", // ✅ Slightly larger for balance
});

const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "300px",
};

const inputStyle = (darkMode) => ({
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  border: darkMode ? "1px solid #444" : "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: darkMode ? "#333" : "#fff",
  color: darkMode ? "#fff" : "#000",
  transition: "background-color 0.3s ease, border 0.3s ease, color 0.3s ease",
});

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  marginTop: "10px",
  fontSize: "16px",
};

const errorStyle = {  
  color: "#ff4d4d",
  fontSize: "14px",
  textAlign: "center",
  marginBottom: "10px",
};

const titleStyle = (darkMode) => ({
  color: darkMode ? "#fff" : "#000", 
  marginBottom: "15px",
  fontSize: "24px",
  fontWeight: "bold",
});

export default Register;
