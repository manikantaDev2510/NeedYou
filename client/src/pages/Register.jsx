import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

import SummaryApi from "../common/SummaryApi";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const isFormValid = Object.values(data).every((val) => val.trim() !== "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password must match.");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      } else if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 shadow-xl rounded-xl p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-center mb-4">Welcome to Binkeyit</h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter your name"
            autoFocus
            className="w-full bg-indigo-50 p-2 border rounded outline-none border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
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

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <div className="flex items-center bg-indigo-50 border border-indigo-200 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-300 transition">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="flex-1 outline-none bg-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="ml-2 text-gray-600"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
          <div className="flex items-center bg-indigo-50 border border-indigo-200 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-300 transition">

            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="flex-1 outline-none bg-transparent"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="ml-2 text-gray-600"
            >
              {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
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
          Register
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-green-700 font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};