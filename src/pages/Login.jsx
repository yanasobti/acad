import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);

      // Store token and role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // Redirect based on role
      if (res.data.role === "admin") {
    navigate("/admin");
  } else if (res.data.role === "teacher") {
    navigate("/teacher");
  } else if (res.data.role === "student") {
    navigate("/student");
  } else {
    navigate("/unauthorized");
  }
} catch (error) {
  setErr(error.response?.data?.message || "Error logging in");
}
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/2 hidden md:flex justify-center items-center">
        <img src="/assets/login.jpg" alt="Login illustration" className="w-3/4 h-auto" />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-blue-700 mb-4 text-center">Login</h2>
          <p className="text-gray-600 mb-6 text-center">Welcome back! Please enter your details.</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-gray-300 border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border-gray-300 border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {err && <p className="text-red-500 text-center">{err}</p>}

            <button
              type="submit"
              className="bg-blue-700 text-white font-bold p-3 rounded-xl w-full hover:bg-blue-800 transition"
            >
              Login
            </button>
          </form>

          <p className="text-gray-600 mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-700 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
