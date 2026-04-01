// components/Layout.jsx
import React from "react";
import Header from "./Header";
import Sidebar from "./Saidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="d-flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="p-4 flex-grow-1 bg-light">
          {children}
        </div>

        {/* Footer */}
        <Footer />

      </div>
    </div>
  );
};

export default Layout;