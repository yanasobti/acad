import React from "react";

function Login() {
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
        <div className="flex flex-col gap-4 w-full items-center">
          {/* Username / Email */}
          <div className="relative w-3/5">
            <i className="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Enter your email"
              className="border-gray-400 border-2 p-3 pl-10 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="relative w-3/5">
            <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="password"
              placeholder="Enter your password"
              className="border-gray-400 border-2 p-3 pl-10 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Forget Password */}
          <div className="w-3/5 flex justify-start">
            <button className="text-sm text-blue-600 hover:underline">
              Forget password?
            </button>
          </div>

          {/* Login Button */}
          <button className="text-white bg-blue-700 font-bold p-3 rounded-xl w-3/5 hover:bg-blue-800 transition">
            Login
          </button>
        </div>

        {/* Social Login */}
        <div className="flex flex-col gap-3 items-center">
          <p className="text-gray-600">Or Sign in with</p>
          <button className="border-gray-300 border p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
            <i className="fa-brands fa-google text-red-500"></i> Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
