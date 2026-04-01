import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/componets/Login";
import Signup from "../src/componets/Signup";
import Dashboard from "./componets/Dasbord";
import Products from "./componets/products/products";
import AddProduct from "./componets/products/Addproducts";
import EditProduct from "./componets/products/Editproducts";
import Layout from "./componets/Layout";
import ProtectedRoute from "./componets/Protect";
import StockUpdate from "./componets/products/Stockupdate";
import "./App.css";
// ✅ Toast import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <Router>
        {/* ✅ Add this */}
        <ToastContainer 
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
  
        {/* 🔐 Protected */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path = "/update-stock/:id" element={<StockUpdate />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;