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

  // Fetch items from backend
  useEffect(() => {
    axios.get(`${API_URL}/items`)
      .then(response => setItems(response.data))
      .catch(error => console.error("Error fetching items:", error));
  }, []);

  // Add a new item
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/items`, { name, location, quantity: Number(quantity) });
      setItems([...items, response.data]);
      setName(""); setLocation(""); setQuantity(1);
    } catch (error) {
      alert("Error adding item!");
    }
  };

  // Edit item
  const startEditing = (item) => {
    setEditingItem(item);
    setName(item.name);
    setLocation(item.location);
    setQuantity(item.quantity);
  };

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/items/${editingItem._id}`, {
        name, location, quantity: Number(quantity)
      });
      setItems(items.map(item => (item._id === editingItem._id ? response.data : item)));
      setEditingItem(null);
      setName(""); setLocation(""); setQuantity(1);
    } catch (error) {
      alert("Error updating item!");
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${API_URL}/items/${id}`);
        setItems(items.filter(item => item._id !== id)); // Remove from UI
      } catch (error) {
        alert("Error deleting item!");
      }
    }
  };

  // Toggle Dark Mode and Save Preference
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <div style={{
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: isDarkMode ? "#333" : "#f5f5f5",
      color: isDarkMode ? "#fff" : "#000",
      minHeight: "100vh"
    }}>
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
      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle(isDarkMode)}>📦 Item Name</th>
              <th style={tableHeaderStyle(isDarkMode)}>📍 Location</th>
              <th style={tableHeaderStyle(isDarkMode)}>🔢 Quantity</th>
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
                  <button onClick={() => deleteItem(item._id)} style={{ marginLeft: "5px" }}>🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Styles for Responsive Design
const buttonStyle = {
  padding: "10px",
  backgroundColor: "#222",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "1em",
  margin: "5px 0"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "400px",
  margin: "10px auto"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center",
  minWidth: "600px"
};

const tableHeaderStyle = (darkMode) => ({
  padding: "10px",
  border: "1px solid black",
  textAlign: "center",
  fontWeight: "bold",
  backgroundColor: darkMode ? "#555" : "#ddd",
  color: darkMode ? "#fff" : "#000"
});

const tableCellStyle = {
  padding: "10px",
  border: "1px solid black",
  textAlign: "center",
  fontWeight: "bold"
};

const actionCellStyle = {
  padding: "10px",
  border: "1px solid black",
  textAlign: "center"
};

export default App;
