import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage.js';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError.js';

export default function EditCategory({ close, fetchData, data: initialCategory }) {
  const [category, setCategory] = useState({
    _id: initialCategory._id,
    name: initialCategory.name,
    image: initialCategory.image,
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateCategory,
        data: category,
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

  // Handle image upload
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const response = await uploadImage(file);
      setCategory((prev) => ({
        ...prev,
        image: response.data.data.url,
      }));
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-lg rounded shadow p-5 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Edit Category</h2>
          <button onClick={close} className="text-gray-600 hover:text-gray-800 transition">
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Name Field */}
          <div className="grid gap-1">
            <label htmlFor="categoryName" className="text-sm font-medium">Name</label>
            <input
              type="text"
              id="categoryName"
              name="name"
              value={category.name}
              onChange={handleChange}
              placeholder="Enter category name"
              className="p-2 rounded-md bg-indigo-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>

          {/* Image Upload */}
          <div className="grid gap-1">
            <label>Image</label>
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="border w-full sm:w-32 h-32 flex items-center justify-center bg-gray-50 rounded">
                {category.image ? (
                  <img src={category.image} alt="SubCategory" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage" className="cursor-pointer border-indigo-200 border roundedborder-indigo-200 hover:bg-indigo-100 px-4 py-2 rounded font-medium transition">
                Upload Image
                <input
                  type="file"
                  id="uploadSubCategoryImage"
                  className="hidden"
                  onChange={handleUploadImage}
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!category.name || !category.image || loading}
            className={`w-full py-2 rounded font-semibold text-white transition ${category.name && category.image
              ? "bg-green-700 hover:bg-green-600"
              : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            {loading ? 'Updating...' : 'Update Category'}
          </button>
        </form>
      </div>
    </section>
  );
};