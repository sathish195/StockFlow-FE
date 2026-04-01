import React, { useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Correct API calling
  const handleSubmit = async (e) => {
    e.preventDefault(); // ❗ important

    setLoading(true);
    setError("");

    try {
      const data = await apiRequest({
        endpoint: "/auth/login",
        method: "POST",
        body: form, 
      });

      console.log("Login Success:", data);

      // ✅ store token (if backend sends)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert(data.message || "Login successful");

    } catch (err) {
      console.log("Login Failed:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* ❌ Error */}
          {error && <p className="text-danger mt-2">{error}</p>}

          <p className="text-center mt-3">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;