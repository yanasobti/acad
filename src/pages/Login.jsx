import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErr("");

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({ message: "Login failed" }));
        setErr(j.message || "Login failed");
        return;
      }

      const data = await res.json();
      // Save login info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);

      // Redirect based on role
      if (data.role === "teacher") navigate("/teacher");
      else if (data.role === "admin") navigate("/admin");
      else navigate("/student");

    } catch (error) {
      console.error(error);
      setErr("Server error");
    }
  }

  return (
    <div className="h-screen flex">
      {/* Left Side Image */}
      <div className="w-1/2 flex flex-col pt-[100px]">
        <img src="/assets/login.jpg" alt="Welcome!" className="w-full" />
      </div>

      {/* Right Side Form */}
      <div className="w-1/2 flex flex-col justify-center items-center gap-8">
        {/* Heading */}
        <div className="flex flex-col gap-2 items-center">
          <p className="text-blue-700 text-5xl font-bold">User Login</p>
          <p className="text-gray-600">Hey enter your details to log in to your account</p>
        </div>

        {/* Input Fields */}
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 w-full items-center"
        >
          {/* Email */}
          <div className="relative w-3/5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border-gray-400 border-2 p-3 pl-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="relative w-3/5">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border-gray-400 border-2 p-3 pl-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error */}
          {err && <p className="text-red-500">{err}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="text-white bg-blue-700 font-bold p-3 rounded-xl w-3/5 hover:bg-blue-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
