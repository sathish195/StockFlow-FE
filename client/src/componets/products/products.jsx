import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../../api";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ start true

  const fetchProducts = async () => {
    setLoading(true); // ✅ start loading

    try {
      const res = await apiRequest({
        endpoint: "/products",
        token: localStorage.getItem("token"),
      });

      console.log("Fetched Products:", res);
      setProducts(res.data || []);

    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch products ❌");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    

    try {
      setLoading(true); // ✅ show loading while deleting

      await apiRequest({
        endpoint: `/products/${id}`,
        method: "DELETE",
        token: localStorage.getItem("token"),
      });

      toast.success("Product deleted successfully ✅");
      fetchProducts(); // refresh

    } catch (err) {
      console.log(err);
      toast.error("Failed to delete product ❌");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ⏳ Single loading UI
  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Products</h3>
        <Link to="/add-product" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <h5 className="text-center">No products found</h5>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Quantity</th>
              <th>Cost Price</th>
              <th>Selling Price</th>
              <th>Low Stock</th>
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

                  {/* ❗ FIXED ROUTE */}
                  <Link
                    to={`/update-stock/${p.id}`}
                    state={{ product: p }}
                    className="btn btn-sm btn-info me-2"
                  >
                    Update Stock
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
      )}
    </div>
  );
};

export default Products;