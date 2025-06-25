import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Success() {
  const location = useLocation();
  const message = location?.state?.text || "Payment";

  return (
    <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center space-y-5 border border-green-200 m-4">
      <div className="text-4xl">✅</div>

      <h1 className="text-2xl font-semibold text-green-800">
        {message} Successful!
      </h1>

      <p className="text-green-600 text-sm sm:text-base">
        Thank you! Your transaction has been completed successfully.
      </p>

      <Link
        to="/"
        className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition-all duration-200"
      >
        Go to Home
      </Link>
    </div>
  );
}
