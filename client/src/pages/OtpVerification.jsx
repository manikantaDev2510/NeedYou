import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Axios from "../utils/Axios.js";
import AxiosToastError from "../utils/AxiosToastError.js";

import SummaryApi from "../common/SummaryApi.js";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, []);

  const isOtpValid = otp.every((digit) => digit !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp: otp.join(""),
          email: location?.state?.email,
        },
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setOtp(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: {
            data: response.data,
            email: location?.state?.email,
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRef.current[index + 1]?.focus();
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 shadow-xl rounded-xl p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-center mb-4">OTP Verification</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* OTP Input */}
        <div className="space-y-2">
          <label htmlFor="otp" className="block text-sm font-medium">
            Enter OTP sent to your email
          </label>
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRef.current[index] = el)}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-12 h-12 text-center text-lg font-bold bg-indigo-50 p-2 border rounded outline-none border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isOtpValid}
          className={`w-full py-2 rounded font-semibold tracking-wide transition ${isOtpValid
            ? "bg-green-700 hover:bg-green-800 text-white"
            : "bg-gray-400 text-white cursor-not-allowed"
            }`}
        >
          Verify OTP
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-green-700 font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};