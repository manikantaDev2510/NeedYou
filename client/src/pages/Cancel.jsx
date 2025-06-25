import React from 'react';
import { Link } from 'react-router-dom';

export default function Cancel() {
  return (
    <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 shadow-xl rounded-xl p-6 sm:p-8 text-center flex flex-col gap-6 items-center">
      <p className="text-xl font-bold text-red-700">Order Cancelled</p>
      <Link
        to="/"
        className="border border-red-800 text-red-800 hover:bg-red-800 hover:text-white transition-all px-6 py-2 rounded font-medium"
      >
        Go to Home
      </Link>
    </div>
  );
};