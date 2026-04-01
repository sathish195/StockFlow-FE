// components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <h5 className="text-center mb-4">Menu</h5>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard">
            📊 Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/products">
            📦 Products
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/settings">
            ⚙️ Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;