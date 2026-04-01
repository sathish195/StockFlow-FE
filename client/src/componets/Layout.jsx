// components/Layout.jsx
import React from "react";
import Header from "./Header";
import Sidebar from "./Saidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <div className="d-flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-grow-1 d-flex flex-column">

        <Header />

        {/* 🔥 THIS IS REQUIRED */}
        <div className="p-4 flex-grow-1 bg-light">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;