// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { apiRequest } from "../api";
// import { toast } from "react-toastify";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     organizationName: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // 👁️ separate states
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match");
//       toast.error("Passwords do not match ❌");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const data = await apiRequest({
//         endpoint: "/auth/signup",
//         method: "POST",
//         body: {
//           name: form.name,
//           email: form.email,
//           password: form.password,
//           organizationName: form.organizationName,
//         },
//       });

//       console.log("Signup Success:", data);

//       toast.success(data.message || "Signup successful ✅");

//       navigate("/");

//     } catch (err) {
//       console.log("Signup Failed:", err.message);

//       const message =
//         err?.response?.data?.message ||
//         err?.message ||
//         "Signup failed ❌";

//       setError(message);
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="d-flex vh-100 justify-content-center align-items-center bg-dark">
//       <div className="card p-4 shadow" style={{ width: "400px" }}>
//         <h3 className="text-center mb-3">Signup</h3>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             className="form-control mb-3"
//             placeholder="Name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="email"
//             name="email"
//             className="form-control mb-3"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           {/* 🔒 Password */}
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
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>

//           {/* 🔒 Confirm Password */}
//           <div className="input-group mb-3">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               name="confirmPassword"
//               className="form-control"
//               placeholder="Confirm Password"
//               value={form.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//             <button
//               type="button"
//               className="btn btn-outline-secondary"
//               onClick={() =>
//                 setShowConfirmPassword(!showConfirmPassword)
//               }
//             >
//               {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>

//           <input
//             type="text"
//             name="organizationName"
//             className="form-control mb-3"
//             placeholder="Organization Name"
//             value={form.organizationName}
//             onChange={handleChange}
//             required
//           />

//           <button className="btn btn-success w-100" disabled={loading}>
//             {loading ? "Signing up..." : "Signup"}
//           </button>

//           {error && <p className="text-danger mt-2">{error}</p>}

//           <p className="text-center mt-3">
//             Already have an account? <Link to="/">Login</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Joi from "joi"; // ✅ add this

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Joi Schema
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
    }),

    email: Joi.string().email({ tlds: false }).required().messages({
      "string.email": "Enter valid email",
      "string.empty": "Email is required",
    }),

    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password is required",
    }),

    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords do not match",
      }),

    organizationName: Joi.string().required().messages({
      "string.empty": "Organization name is required",
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
        endpoint: "/auth/signup",
        method: "POST",
        body: {
          name: form.name,
          email: form.email,
          password: form.password,
          organizationName: form.organizationName,
        },
      });

      console.log("Signup Success:", data);

      toast.success(data.message || "Signup successful ✅");

      navigate("/");

    } catch (err) {
      console.log("Signup Failed:", err.message);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Signup failed ❌";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-dark">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Signup</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          {/* 🔒 Password */}
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

          {/* 🔒 Confirm Password */}
          <div className="input-group mb-3">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <input
            type="text"
            name="organizationName"
            className="form-control mb-3"
            placeholder="Organization Name"
            value={form.organizationName}
            onChange={handleChange}
          />

          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>

          {/* {error && <p className="text-danger mt-2">{error}</p>} */}

          <p className="text-center mt-3">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;