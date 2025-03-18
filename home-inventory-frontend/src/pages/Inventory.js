import React, { useEffect, useState } from "react";

const Inventory = () => {
  // ✅ Use localStorage to track dark mode
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  // ✅ Listen for dark mode changes dynamically
  useEffect(() => {
    const handleStorageChange = () => {
      setIsDarkMode(localStorage.getItem("darkMode") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div style={containerStyle(isDarkMode)}>
      {/* ✅ Navbar with Dark Mode Toggle */}
      <header style={headerStyle(isDarkMode)}>
        <h2>📦 Home Inventory</h2>
        <button onClick={() => {
          const newMode = !isDarkMode;
          setIsDarkMode(newMode);
          localStorage.setItem("darkMode", newMode);
          window.dispatchEvent(new Event("storage")); // ✅ Ensures global update
        }} style={buttonStyle}>
          {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* ✅ Main Content */}
      <div style={contentWrapper}>
        <h1 style={titleStyle(isDarkMode)}>Your Inventory 📦</h1>
        <p style={descriptionStyle(isDarkMode)}>Track all your items efficiently.</p>
      </div>

      {/* ✅ Footer Now Stays at the Bottom */}
      <footer style={footerStyle(isDarkMode)}>
        App created by <strong>Bikram Singh</strong> © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

// ✅ Styles with Full-Page Fix
const containerStyle = (darkMode) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh", // Ensures full height
  width: "100vw", // ✅ Ensures full width to remove white edges
  margin: "0", // ✅ Removes default margin that may cause white edges
  padding: "0", // ✅ Ensures no extra padding
  backgroundColor: darkMode ? "#121212" : "#f5f5f5",
  color: darkMode ? "#fff" : "#000",
  transition: "background-color 0.3s ease, color 0.3s ease",
});

const headerStyle = (darkMode) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "20px",
  backgroundColor: darkMode ? "#222" : "#ddd",
  color: darkMode ? "#fff" : "#000",
  transition: "background-color 0.3s ease",
});

const contentWrapper = {
  flex: 1, // Ensures content expands fully
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center", // Vertically center the content
  textAlign: "center",
  width: "100%", // ✅ Ensures full width
  padding: "20px",
  transition: "padding 0.3s ease",
};

const titleStyle = (darkMode) => ({
  fontSize: "32px", // ✅ Slightly bigger for better appearance
  fontWeight: "bold",
  color: darkMode ? "#fff" : "#000",
  transition: "color 0.3s ease",
});

const descriptionStyle = (darkMode) => ({
  fontSize: "18px",
  color: darkMode ? "#bbb" : "#333",
  marginBottom: "20px",
  transition: "color 0.3s ease",
});

const buttonStyle = {
  padding: "12px 18px",
  fontSize: "16px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  transition: "background-color 0.3s ease",
};

const footerStyle = (darkMode) => ({
  textAlign: "center",
  padding: "10px",
  fontSize: "14px",
  color: darkMode ? "#fff" : "#000",
  backgroundColor: darkMode ? "#333" : "#f1f1f1",
  width: "100%",
  position: "fixed", // ✅ Keeps the footer at the bottom
  bottom: "0",
  left: "0",
  transition: "background-color 0.3s ease, color 0.3s ease",
});

export default Inventory;
