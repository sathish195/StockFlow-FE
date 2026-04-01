// pages/Products.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../../api";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await apiRequest({
        endpoint: "/products",
        token: localStorage.getItem("token"),
      });
      console.log("Fetched Products:", res);
      setProducts(res.data || []); // Adjust based on actual response structure
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await apiRequest({
        endpoint: `/products/${id}`,
        method: "DELETE",
        token: localStorage.getItem("token")
      });

      fetchProducts(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Products</h3>
        <Link to="/add-product" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>costPrice</th>
            <th>SellingPrice</th>
            <th>LowStockThreshold</th>
            <th>Description</th>


            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>{p.quantity}</td>
                <td>{p.costPrice}</td>
                <td>{p.sellingPrice}</td>
                <td>{p.lowStockThreshold}</td>
                <td>{p.description}</td>


              <td>
                <Link
                  to={`/edit-product/${p.id}`}
                  state={{ product: p }}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;