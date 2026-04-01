import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 API Call
  useEffect(() => {
    const fetchDashboard = async () => {
      try {

        const res = await apiRequest({
            endpoint: "/dashboard",
            token: localStorage.getItem("token"),
          });
        // const res = await axios.get("http://localhost:5000/api/dashboard"); // change URL if needed
        setData(res.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // ⏳ Loading
  if (loading) {
    return <h4 className="text-center mt-5">Loading...</h4>;
  }

  // ❌ No data
  if (!data) {
    return <h4 className="text-center mt-5">No data found</h4>;
  }

  const { totalProducts, totalQuantity, lowStockItems } = data;

  return (
    <div className="container mt-4">
      
      {/* 🔷 Cards */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card bg-primary text-white shadow">
            <div className="card-body">
              <h5>Total Products</h5>
              <h3>{totalProducts}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card bg-success text-white shadow">
            <div className="card-body">
              <h5>Total Quantity</h5>
              <h3>{totalQuantity}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* 🔻 Table */}
      <div className="card shadow">
        <div className="card-header bg-danger text-white">
          Low Stock Items
        </div>

        <div className="card-body">
          {lowStockItems.length === 0 ? (
            <p>No low stock items 🎉</p>
          ) : (
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Quantity</th>
                  <th>Threshold</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.sku}</td>
                    <td className="text-danger fw-bold">
                      {item.quantity}
                    </td>
                    <td>{item.lowStockThreshold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;