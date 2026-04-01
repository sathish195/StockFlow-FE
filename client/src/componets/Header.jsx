// components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigator = useNavigate();
const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigator("/")
    alert("Logged out successfully!");
    }
  return (
    <div className="bg-dark text-white p-3 shadow-sm px-4 py-2 d-flex justify-content-between align-items-center" >
      <h5 className="mb-0">StockFlow</h5>

      <div>
        <span className="me-3">My Store</span>
        <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Header;