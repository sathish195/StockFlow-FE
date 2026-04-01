// components/Header.jsx
import React from "react";

const Header = () => {
  return (
    <div className="bg-white shadow-sm px-4 py-2 d-flex justify-content-between align-items-center">
      <h5 className="mb-0">StockFlow</h5>

      <div>
        <span className="me-3">My Test Store</span>
        <button className="btn btn-sm btn-outline-danger">Logout</button>
      </div>
    </div>
  );
};

export default Header;