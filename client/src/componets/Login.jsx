// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { apiRequest } from "../api";
// import { toast } from "react-toastify";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Login = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/dashboard");
//     }
//   }, []);

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // 👁️ NEW: password visibility state
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");

//     try {
//       const data = await apiRequest({
//         endpoint: "/auth/login",
//         method: "POST",
//         body: form,
//       });

//       console.log("Login Success:", data);

//       if (data.token) {
//         localStorage.setItem("token", data.token);
//       }

//       toast.success(data.message || "Login successful ✅"); // ✅ better than alert
//       navigate("/dashboard");

//     } catch (err) {
//       console.log("Login Failed:", err.message);
//       setError(err.message);
//       toast.error(err.message || "Login failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="d-flex vh-100 justify-content-center align-items-center bg-dark">
//       <div className="card p-4 shadow" style={{ width: "350px" }}>
//         <h3 className="text-center mb-3">Login</h3>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             className="form-control mb-3"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           {/* 👁️ Password with toggle */}
//           <div className="input-group mb-3">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               className="form-control"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//             />

//             <button
//               type="button"
//               className="btn btn-outline-secondary"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {/* {showPassword ? "Hide" : "Show"} */}
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>

//           <button className="btn btn-primary w-100" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           {error && <p className="text-danger mt-2">{error}</p>}

//           <p className="text-center mt-3">
//             Don't have an account? <Link to="/signup">Signup</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Joi from "joi"; // ✅ add this

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Joi schema
  const schema = Joi.object({
    email: Joi.string().email({ tlds: false }).required().messages({
      "string.email": "Enter valid email",
      "string.empty": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password is required",
    }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Joi validation
    const { error } = schema.validate(form);

    if (error) {
      const message = error.details[0].message;
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await apiRequest({
        endpoint: "/auth/login",
        method: "POST",
        body: form,
      });

      console.log("Login Success:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      toast.success(data.message || "Login successful ✅");
      navigate("/dashboard");

    } catch (err) {
      console.log("Login Failed:", err.message);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed ❌";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-dark">
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
          />

          {/* 👁️ Password */}
          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* {error && <p className="text-danger mt-2">{error}</p>} */}

          <p className="text-center mt-3">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;