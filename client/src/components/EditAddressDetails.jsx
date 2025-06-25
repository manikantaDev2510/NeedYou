import React from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from '../provider/GlobalProvider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';

export default function EditAddressDetails({ close, data }) {
  const { fetchAddress } = useGlobalContext();

  // Initialize form with default values
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      _id: data._id,
      userId: data.userId,
      address_line: data.address_line,
      city: data.city,
      state: data.state,
      country: data.country,
      pincode: data.pincode,
      mobile: data.mobile
    }
  });

  // Handle form submission
  const onSubmit = async (formData) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateAddress,
        data: formData
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchAddress();
        reset();
        if (close) close();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-start overflow-auto p-4">
      <div className="bg-white w-full max-w-lg rounded shadow-lg mt-10 p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Edit Address</h2>
          <button
            onClick={close}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* Address Line */}
          <div className="grid gap-1">
            <label htmlFor="address_line" className="text-sm font-medium">Address Line</label>
            <input
              id="address_line"
              type="text"
              {...register("address_line", { required: true })}
              className="w-full p-2 border border-indigo-200 rounded bg-indigo-50 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
            />
          </div>

          {/* City */}
          <div className="grid gap-1">
            <label htmlFor="city" className="text-sm font-medium">City</label>
            <input
              id="city"
              type="text"
              {...register("city", { required: true })}
              className="w-full p-2 border border-indigo-200 rounded bg-indigo-50 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
            />
          </div>

          {/* State */}
          <div className="grid gap-1">
            <label htmlFor="state" className="text-sm font-medium">State</label>
            <input
              id="state"
              type="text"
              {...register("state", { required: true })}
              className="w-full p-2 border border-indigo-200 rounded bg-indigo-50 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
            />
          </div>

          {/* Pincode */}
          <div className="grid gap-1">
            <label htmlFor="pincode" className="text-sm font-medium">Pincode</label>
            <input
              id="pincode"
              type="text"
              {...register("pincode", { required: true })}
              className="w-full p-2 border border-indigo-200 rounded bg-indigo-50 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
            />
          </div>

          {/* Country */}
          <div className="grid gap-1">
            <label htmlFor="country" className="text-sm font-medium">Country</label>
            <input
              id="country"
              type="text"
              {...register("country", { required: true })}
              className="w-full p-2 border border-indigo-200 rounded bg-indigo-50 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
            />
          </div>

          {/* Mobile */}
          <div className="grid gap-1">
            <label htmlFor="mobile" className="text-sm font-medium">Mobile No.</label>
            <input
              id="mobile"
              type="text"
              {...register("mobile", { required: true })}
              className="w-full p-2 border border-indigo-200 rounded bg-indigo-50 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
};