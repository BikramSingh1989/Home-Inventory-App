import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://home-inventory-app.onrender.com";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  // ✅ Listen for Dark Mode changes dynamically
  useEffect(() => {
    const handleStorageChange = () => {
      setIsDarkMode(localStorage.getItem("darkMode") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      window.location.href = "/";
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={containerStyle(isDarkMode)}>
      <div style={wrapperStyle(isDarkMode)}>
        <h2 style={titleStyle(isDarkMode)}>Login</h2>
        <form onSubmit={handleLogin} style={formStyle}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle(isDarkMode)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle(isDarkMode)}
          />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
        <p style={textStyle(isDarkMode)}>
          Don't have an account? <a href="/register" style={linkStyle}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

// ✅ Styles for Full-Screen Layout & Better Dark Mode
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
  minHeight: "350px", // ✅ Slightly bigger to maintain balance
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

const linkStyle = {
  color: "#007BFF",
  textDecoration: "none",
};

const textStyle = (darkMode) => ({
  marginTop: "10px",
  fontSize: "14px",
  color: darkMode ? "#ddd" : "#333",
});

const titleStyle = (darkMode) => ({
  color: darkMode ? "#fff" : "#000",
  marginBottom: "15px",
  fontSize: "24px",
  fontWeight: "bold",
});

export default Login;
