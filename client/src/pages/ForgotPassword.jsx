import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import SummaryApi from "../common/SummaryApi";

import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
  });

  const isValid = Object.values(data).every((value) => value.trim() !== "");

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
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/verification-otp", {
          state: data,
        });
        setData({ email: "" });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 shadow-xl rounded-xl p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-center mb-4">Forgot Password</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-1">
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-2 rounded font-semibold tracking-wide transition ${isValid
            ? "bg-green-700 hover:bg-green-800 text-white"
            : "bg-gray-400 text-white cursor-not-allowed"
            }`}
        >
          Send OTP
        </button>
      </form>

      {/* Link to Login */}
      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-green-700 font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};