import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const getLinkClass = ({ isActive }) =>
    isActive
      ? "nav-link text-warning fw-bold"
      : "nav-link text-white";

  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <h5 className="text-center mb-4">Menu</h5>

      <ul className="nav flex-column">

        {/* Dashboard */}
        <li className="nav-item mb-2">
          <NavLink to="/dashboard" className={getLinkClass}>
            📊 Dashboard
          </NavLink>
        </li>

        {/* Products */}
        <li className="nav-item mb-2">
          <NavLink to="/products" className={getLinkClass}>
            📦 Products
          </NavLink>
        </li>

        {/* Add Product */}
        <li className="nav-item mb-2">
          <NavLink to="/add-product" className={getLinkClass}>
            ➕ Add Product
          </NavLink>
        </li>

        {/* Settings */}
        <li className="nav-item">
          <NavLink to="/settings" className={getLinkClass}>
            ⚙️ Settings
          </NavLink>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;