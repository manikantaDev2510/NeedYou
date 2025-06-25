import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { useGlobalContext } from '../provider/GlobalProvider';
import AxiosToastError from '../utils/AxiosToastError';

const AddAddress = ({ close }) => {
  const { register, handleSubmit, reset } = useForm();
  const { fetchAddress } = useGlobalContext();

  // Handle form submit
  const onSubmit = async (data) => {
    try {
      const response = await Axios({
        ...SummaryApi.createAddress,
        data: {
          address_line: data.addressline,
          city: data.city,
          state: data.state,
          country: data.country,
          pincode: data.pincode,
          mobile: data.mobile
        }
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
    <section className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-start justify-center overflow-auto py-8">
      <div className="bg-white w-full max-w-lg rounded shadow-lg p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Add Address</h2>
          <button onClick={close} className="hover:text-red-500 transition">
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* Address Line */}
          <div className="grid gap-1">
            <label htmlFor="addressline" className="text-sm font-medium">Address Line</label>
            <input
              id="addressline"
              type="text"
              {...register('addressline', { required: true })}
              className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>

          {/* City */}
          <div className="grid gap-1">
            <label htmlFor="city" className="text-sm font-medium">City</label>
            <input
              id="city"
              type="text"
              {...register('city', { required: true })}
              className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>

          {/* State */}
          <div className="grid gap-1">
            <label htmlFor="state" className="text-sm font-medium">State</label>
            <input
              id="state"
              type="text"
              {...register('state', { required: true })}
              className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>

          {/* Pincode */}
          <div className="grid gap-1">
            <label htmlFor="pincode" className="text-sm font-medium">Pincode</label>
            <input
              id="pincode"
              type="text"
              {...register('pincode', { required: true })}
              className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>

          {/* Country */}
          <div className="grid gap-1">
            <label htmlFor="country" className="text-sm font-medium">Country</label>
            <input
              id="country"
              type="text"
              {...register('country', { required: true })}
              className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>

          {/* Mobile */}
          <div className="grid gap-1">
            <label htmlFor="mobile" className="text-sm font-medium">Mobile No.</label>
            <input
              id="mobile"
              type="text"
              {...register('mobile', { required: true })}
              className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-600 text-white py-2 rounded font-semibold transition"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddAddress;
