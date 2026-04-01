import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../api";

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    sku: "",
    description: "",
    quantity: "",
    costPrice: "",
    sellingPrice: "",
    lowStockThreshold: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await apiRequest({
        endpoint: "/products",
        method: "POST",
        body: form,
        token: localStorage.getItem("token"), // ✅ include token if required
      });

      alert("Product added successfully");
      navigate("/products");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Product</h3>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          className="form-control mb-3"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="sku"
          className="form-control mb-3"
          placeholder="SKU"
          value={form.sku}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          className="form-control mb-3"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="quantity"
          type="number"
          className="form-control mb-3"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <input
          name="costPrice"
          type="number"
          className="form-control mb-3"
          placeholder="Cost Price"
          value={form.costPrice}
          onChange={handleChange}
        />

        <input
          name="sellingPrice"
          type="number"
          className="form-control mb-3"
          placeholder="Selling Price"
          value={form.sellingPrice}
          onChange={handleChange}
        />

        <input
          name="lowStockThreshold"
          type="number"
          className="form-control mb-3"
          placeholder="Low Stock Threshold"
          value={form.lowStockThreshold}
          onChange={handleChange}
        />

        <button className="btn btn-success w-100" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>

        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default AddProduct;