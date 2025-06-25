import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import toast from 'react-hot-toast';

import uploadImage from '../utils/UploadImage.js';
import Axios from '../utils/Axios.js';
import AxiosToastError from '../utils/AxiosToastError.js';

import SummaryApi from '../common/SummaryApi.js';

export default function UploadCategoryModel({ close, fetchData }) {
  const [data, setData] = useState({
    name: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);

  // Handle text input change
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadImage(file);
      const { data: imageResponse } = response;

      setData((prev) => ({
        ...prev,
        image: imageResponse.data.url,
      }));
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addCategory,
        data: data,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchData();
        close();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 bg-neutral-800 bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded shadow p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-700">Add Category</h2>
          <button onClick={close} className="text-gray-500 hover:text-gray-700 transition">
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid gap-3">
          {/* Name Input */}
          <div className="grid gap-1">
            <label htmlFor="categoryName" className="text-sm font-medium">Name</label>
            <input
              type="text"
              id="categoryName"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              placeholder="Enter category name"
              className="w-full p-2 border border-indigo-200 rounded bg-indigo-50 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition"
            />
          </div>

          {/* Image Upload */}
          <div className="grid gap-1">
            <label className="text-sm font-medium">Image</label>
            <div className="flex flex-col lg:flex-row gap-3 items-center">
              <div className="w-full lg:w-36 h-36 bg-blue-50 border flex items-center justify-center rounded">
                {data.image ? (
                  <img src={data.image} alt="Category" className="object-contain w-full h-full" />
                ) : (
                  <span className="text-sm text-neutral-400">No Image</span>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`
                    ${!data.name ? 'bg-gray-300 cursor-not-allowed' : 'border border-indigo-200 hover:bg-indigo-100 cursor-pointer'}
                    px-4 py-2 rounded font-medium transition
                  `}
                >
                  Upload Image
                </div>
                <input
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !data.name || !data.image}
            className={`
              ${data.name && data.image ? "bg-green-700 hover:bg-green-800 text-white"
                : 'bg-gray-300 cursor-not-allowed'}
              text-white py-2 rounded font-semibold transition
            `}
          >
            {loading ? 'Adding...' : 'Add Category'}
          </button>
        </form>
      </div>
    </section>
  );
};