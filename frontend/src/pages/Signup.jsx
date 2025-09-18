import React, { useState } from "react";
import api from "../api/axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = ({ onSignup }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    role: "citizen"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  } 

  const handleRoleChange = (e) => {
    setForm({ ...form, role: e.target.value });
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.phone || !form.password || !form.confirm) {
      setError("Please fill all fields.");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!strongPasswordRegex.test(form.password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol."
      );
      return;
    }

    try {
      const res = await api.post("/citizen/register", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role
      });
      const data = res.data;
      // Store token in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

  setSuccess("Signup successful! You are now logged in.");
  setForm({ name: "", email: "", phone: "", password: "", confirm: "" });

  if (onSignup) onSignup(data);
  // Navigate to CitizenPortal after signup
  navigate("/citizen");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Server error. Please try again later.");
      }
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          {form.role === "admin" ? "Admin Sign Up" : "Citizen Sign Up"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleRoleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="citizen">Citizen</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                value={form.confirm}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirm((prev) => !prev)}
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            className="text-blue-600 hover:underline bg-transparent border-none p-0 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
