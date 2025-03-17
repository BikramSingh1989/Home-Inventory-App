import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://home-inventory-app.onrender.com"; 

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [editingItem, setEditingItem] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // ✅ Prevent infinite redirect loop on login page
  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;

    if (!token && currentPath !== "/login") {
      window.location.href = "/login";
    }
  }, []);

  // ✅ Fetch inventory items (Only if logged in)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.get(`${API_URL}/items`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => setItems(response.data))
      .catch(error => console.error("Error fetching items:", error));
    }
  }, []);

  // ✅ Add a new item
  const addItem = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to add an item.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/items`, 
        { name, location, quantity: Number(quantity) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setItems([...items, response.data]);
      setName(""); setLocation(""); setQuantity(1);
    } catch (error) {
      alert("Error adding item!");
    }
  };

  // ✅ Edit item
  const startEditing = (item) => {
    setEditingItem(item);
    setName(item.name);
    setLocation(item.location);
    setQuantity(item.quantity);
  };

  // ✅ Update item
  const updateItem = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to update an item.");
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/items/${editingItem._id}`,
        { name, location, quantity: Number(quantity) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setItems(items.map(item => (item._id === editingItem._id ? response.data : item)));
      setEditingItem(null);
      setName(""); setLocation(""); setQuantity(1);
    } catch (error) {
      alert("Error updating item!");
    }
  };

  // ✅ Delete item
  const deleteItem = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to delete an item.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${API_URL}/items/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setItems(items.filter(item => item._id !== id)); // Remove from UI
      } catch (error) {
        alert("Error deleting item!");
      }
    }
  };

  // ✅ Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <div style={appContainerStyle(isDarkMode)}>
      
      {/* ✅ Main Content Wrapper */}
      <main style={{ flex: "1" }}>
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "1.5em" }}>📦 Home Inventory</h2>
            <button onClick={toggleDarkMode} style={buttonStyle}>
              {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          <form onSubmit={editingItem ? updateItem : addItem} style={formStyle}>
            <input type="text" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" required />
            <button type="submit">{editingItem ? "✅ Update Item" : "➕ Add Item"}</button>
            {editingItem && <button onClick={() => setEditingItem(null)}>❌ Cancel</button>}
          </form>

          <h3>📋 Inventory List</h3>
          <div style={tableContainerStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle(isDarkMode)}>📦 Item</th>
                  <th style={tableHeaderStyle(isDarkMode)}>📍 Location</th>
                  <th style={tableHeaderStyle(isDarkMode)}>🔢 Qty</th>
                  <th style={tableHeaderStyle(isDarkMode)}>⚙️ Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id}>
                    <td style={tableCellStyle}>{item.name}</td>
                    <td style={tableCellStyle}>{item.location}</td>
                    <td style={tableCellStyle}>{item.quantity}</td>
                    <td style={actionCellStyle}>
                      <button onClick={() => startEditing(item)}>✏️ Edit</button>
                      <button onClick={() => deleteItem(item._id)}>🗑 Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ✅ Footer Stays at Bottom */}
      <Footer />
    </div>
  );
}

// ✅ Footer Component
const Footer = () => {
  return (
    <footer style={footerStyle}>
      App created by <strong>Bikram Singh</strong> © {new Date().getFullYear()}
    </footer>
  );
};

// ✅ Fixed Missing Styles
const appContainerStyle = (darkMode) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  fontFamily: "Arial, sans-serif",
  backgroundColor: darkMode ? "#333" : "#f5f5f5",
  color: darkMode ? "#fff" : "#000",
});

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

export default App;
