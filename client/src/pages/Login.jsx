import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Axios from "../utils/Axios.js";
import AxiosToastError from "../utils/AxiosToastError.js";
import fetchUserDetails from "../utils/fetchUserDetails.js";

import SummaryApi from "../common/SummaryApi";

import { setUserDetails } from "../store/userSlice";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isFormValid = Object.values(data).every((el) => el.trim() !== "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accesstoken", response.data.data.accesstoken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));

        setData({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 shadow-xl rounded-xl p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-center mb-4">Login to Your Account</h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full bg-indigo-50 p-2 border rounded outline-none border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <div className="flex items-center bg-indigo-50 border border-indigo-200 rounded px-2 focus-within:ring-2 focus-within:ring-indigo-300 transition">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="flex-1 bg-indigo-50 p-2 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="ml-2 text-gray-600"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          <Link to="/forgot-password" className="block text-right text-sm text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 rounded font-semibold tracking-wide transition ${isFormValid
            ? "bg-green-700 hover:bg-green-800 text-white"
            : "bg-gray-400 text-white cursor-not-allowed"
            }`}
        >
          Login
        </button>
      </form>

      {/* Register Link */}
      <p className="mt-4 text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-green-700 font-medium hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};