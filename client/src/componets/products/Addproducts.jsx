// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { apiRequest } from "../../api";
// import { toast } from "react-toastify";
// const AddProduct = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     sku: "",
//     description: "",
//     quantity: "",
//     costPrice: "",
//     sellingPrice: "",
//     lowStockThreshold: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ✅ Handle input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ✅ Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");

//     try {
//       await apiRequest({
//         endpoint: "/products",
//         method: "POST",
//         body: form,
//         token: localStorage.getItem("token"), // ✅ include token if required
//       });

//     //   alert("Product added successfully");
      
//       toast.success( "Product Added Successfully ✅");
      
//       navigate("/products");

//     } catch (err) {
//       setError(err.message);
//       const message =
//       err?.response?.data?.message ||
//       err?.message ||
//       "products added failed ❌";

//     setError(message);
//     toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Add Product</h3>

//       <form onSubmit={handleSubmit}>

//         <input
//           name="name"
//           className="form-control mb-3"
//           placeholder="Product Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="sku"
//           className="form-control mb-3"
//           placeholder="SKU"
//           value={form.sku}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="description"
//           className="form-control mb-3"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//         />

//         <input
//           name="quantity"
//           type="number"
//           className="form-control mb-3"
//           placeholder="Quantity"
//           value={form.quantity}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="costPrice"
//           type="number"
//           className="form-control mb-3"
//           placeholder="Cost Price"
//           value={form.costPrice}
//           onChange={handleChange}
//         />

//         <input
//           name="sellingPrice"
//           type="number"
//           className="form-control mb-3"
//           placeholder="Selling Price"
//           value={form.sellingPrice}
//           onChange={handleChange}
//         />

//         <input
//           name="lowStockThreshold"
//           type="number"
//           className="form-control mb-3"
//           placeholder="Low Stock Threshold"
//           value={form.lowStockThreshold}
//           onChange={handleChange}
//         />

//         <button className="btn btn-success w-100" disabled={loading}>
//           {loading ? "Adding..." : "Add Product"}
//         </button>

//         {/* {error && <p className="text-danger mt-2">{error}</p>} */}
//       </form>
//     </div>
//   );
// };

// export default AddProduct;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../api";
import { toast } from "react-toastify";
import Joi from "joi"; // ✅ add this

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

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Joi Schema
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.empty": "Product name is required",
      "string.min": "Name must be at least 3 characters",
    }),

    sku: Joi.string().required().messages({
      "string.empty": "SKU is required",
    }),

    description: Joi.string().allow("").optional(),

    quantity: Joi.number().min(0).required().messages({
      "number.base": "Quantity must be a number",
      "number.min": "Quantity cannot be negative",
    }),

    costPrice: Joi.number().min(0).allow("").messages({
      "number.base": "Cost price must be a number",
    }),

    sellingPrice: Joi.number().min(0).allow("").messages({
      "number.base": "Selling price must be a number",
    }),

    lowStockThreshold: Joi.number().min(0).allow("").messages({
      "number.base": "Low stock must be a number",
    }),
  });

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Joi validation
    const { error } = schema.validate(form);

    if (error) {
      const message = error.details[0].message;
      toast.error(message);
      return;
    }

    setLoading(true);

    try {
      await apiRequest({
        endpoint: "/products",
        method: "POST",
        body: form,
        token: localStorage.getItem("token"),
      });

      toast.success("Product Added Successfully ✅");

      navigate("/products");

    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Product add failed ❌";

      toast.error(message);
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
        />

        <input
          name="sku"
          className="form-control mb-3"
          placeholder="SKU"
          value={form.sku}
          onChange={handleChange}
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
      </form>
    </div>
  );
};

export default AddProduct;