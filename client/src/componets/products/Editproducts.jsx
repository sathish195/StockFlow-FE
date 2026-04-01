import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../../api";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";



const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();


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

  // ✅ handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ fetch product data
  const fetchProduct = async () => {
    try {
   
      let res = location.state?.product;
      if (!res) {
            res = await apiRequest({
        endpoint: `/products/${id}`,
        token: localStorage.getItem("token"), 
      });
      res = res.data; 
      }
      if (!res) {
        throw new Error("Product not found");
      }

      console.log("Fetched Product:", res);

      setForm({
        name: res.name || "",
        sku: res.sku || "",
        description: res.description || "",
        quantity: res.quantity || "",
        costPrice: res.costPrice || "",
        sellingPrice: res.sellingPrice || "",
        lowStockThreshold: res.lowStockThreshold || "",
      });

    } catch (err) {
      console.log(err);
      setError("Failed to load product");
    }
  };

  // ✅ load on mount
  useEffect(() => {
    fetchProduct();
  }, [id]);

  // ✅ update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await apiRequest({
        endpoint: `/products/${id}`,
        method: "PUT",
        body: {
          ...form,
          quantity: Number(form.quantity),
          costPrice: Number(form.costPrice),
          sellingPrice: Number(form.sellingPrice),
          lowStockThreshold: Number(form.lowStockThreshold),
        },
        token: localStorage.getItem("token"), // ✅ include token if required
      });

    //   alert("Product updated successfully");
      toast.success( "Product updated successfully ✅");

      navigate("/products");

    } catch (err) {
      setError(err.message);
      const message =
      err?.response?.data?.message ||
      err?.message ||
      "products updated failed ❌";

    setError(message);
    toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Edit Product</h3>

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

        <button className="btn btn-warning w-100" disabled={loading}>
          {loading ? "Updating..." : "Update Product"}
        </button>

        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default EditProduct;