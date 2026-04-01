import React, { useEffect, useState } from "react";
import { apiRequest } from "../../api";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StockUpdate = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(location.state?.product || null);
  let [qty, setQty] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch product if page refreshed
  const fetchProduct = async () => {
    try {
      const res = await apiRequest({
        endpoint: `/products/${id}`,
        token: localStorage.getItem("token"),
      });
    console.log("Fetched Produc-----t:", res);
      setProduct(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!product) {
      fetchProduct();
    }
  }, []);

  // ✅ Handle stock update
  const handleStock = async (type) => {
 
    // ------


    if (!qty) return alert("Enter quantity");
    if (type === "remove") {

        // Convert qty to number once
        qty = Number(qty);
      
        // Validate removing more than available stock
        if (qty > product.quantity) {
          return alert("Cannot remove more than current stock");
        }
      
        // Ensure qty is always positive
        if (qty > 0) {
          qty = -qty;
        }
      }
      

    // =====

    try {
      setLoading(true);

      await apiRequest({
        endpoint: `/products/${product.id}/adjust-stock`,
        method: "PATCH",
        token: localStorage.getItem("token"),
        body: {
          type,
          change: Number(qty),
        },
      });

    //   alert("Stock updated ✅");
      toast.success("Stock updated successfully ✅");

      // ✅ Redirect back
      navigate("/products");

    } catch (err) {
      console.log(err);
      alert("Failed to update stock");
      toString.error("Failed to update stock ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Prevent crash while loading
  if (!product) return <p className="p-3">Loading...</p>;

  return (
    <div className="container mt-4">
      <h3>Update Stock</h3>

      <div className="card p-3 mt-3" style={{ maxWidth: "400px" }}>
        <h5>{product.name}</h5>
        <p>Current Qty: {product.quantity}</p>

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Enter quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        <div className="d-flex gap-2">
          <button
            className="btn btn-success w-50"
            onClick={() => handleStock("add")}
            disabled={loading}
          >
            Add
          </button>

          <button
            className="btn btn-danger w-50"
            onClick={() => handleStock("remove")}
            disabled={loading}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockUpdate;